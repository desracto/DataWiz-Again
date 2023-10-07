# Credit: https://github.com/ahoirg/convert-sql-to-relational-algebra

import sys
import radb
import radb.ast
import radb.parse
import sqlparse
from sqlparse import sql
from pyparsing import Optional
from .select_parser import select_stmt

# Types
from sqlparse.sql import Statement, Token

# The equivalents of SQL condition in the "radb" library
cond_dict = {
    "=": 43,
    "and": 11
}

# Data types that can be on root of Node
node_types_dict = {
    "relation": 0,
    "selection": 1,
    "projection": 2,
    "cross": 3  # (cartesian product)
}


# The sql query, which is divided into statements, is turned into a tree so that each statement corresponds to a node.
# "Tree" class is the class that contains the necessary functions for these operations.
class Tree:
    def __init__(self, root, node_type):
        self.left = None
        self.right = None
        self.parent = None
        self.root = root
        self.type = node_type

    # The method that adds the node to the tree.
    def insert_node(self, new_node, node_type):
        if node_type is node_types_dict.__getitem__("relation"):
            self.__insert_relations(new_node, node_type)
        else:
            new_tree = Tree(new_node, node_type)
            new_tree.left = self
            self.parent = new_tree

    # It starts the return from sql to ra from the lowest and leftmost node of the tree.
    # This is the method that finds this node.
    def get_last_left_child(self):
        if self.left is not None:
            return self.left.get_last_left_child()

        return self

    # It converts relational algebra statements to relational algebra query,
    # moves from "the leftmost and lowest node" to the root.
    def create_ra(self, last_child):
        if last_child.parent is None:
            return last_child.root

        parent = last_child.parent
        if last_child.type is node_types_dict.__getitem__("relation"):
            return self.__create_relation_parts(parent, last_child)

        elif last_child.type is node_types_dict.__getitem__("selection"):
            return self.__create_selection_parts(parent, last_child)

        elif last_child.type is node_types_dict.__getitem__("projection"):
            return self.__create_projection_parts(parent, last_child)

    # It is a method that inserts relation type nodes into the tree. It prevents two relation type nodes from passing
    # into parent-child relation. Instead, it adds a cross(cartesian product) type node and add the related relations
    # to the right and left children of this node. Thus, it makes the optimization process easier.
    def __insert_relations(self, new_node, node_type):
        if self.type is node_types_dict.__getitem__("relation"):
            self.__insert_cartesian(new_node, node_type)
        elif self.type is node_types_dict.__getitem__("cross"):
            if self.right is None:
                self.right = Tree(new_node, node_type)
                self.right.parent = self
            else:
                self.__insert_cartesian(new_node, node_type)

    # Adds the Cartesian product. The types of right and left children always are relations.
    def __insert_cartesian(self, new_node, node_type):
        right_node = Tree(new_node, node_type)

        new_tree = Tree("X", node_types_dict.__getitem__("cross"))
        self.parent = new_tree
        right_node.parent = new_tree

        new_tree.left = self
        new_tree.right = right_node

    # It is the selection part in the translation from ra statements to ra query.
    def __create_selection_parts(self, parent, last_child):
        if parent.type is node_types_dict.__getitem__("selection"):
            __selection = radb.ast.Select(cond=parent.root, input=last_child.root)
            parent.root = __selection
            return self.create_ra(parent)

        if parent.type is node_types_dict.__getitem__("projection"):
            return self.__create_projection_parts(parent, last_child)

    # It is the projection part in the translation from ra statements to ra query.
    def __create_projection_parts(self, parent, last_child):
        if parent.parent is None:
            if isinstance(parent.root, list):
                return radb.ast.Project(parent.root, last_child.root)
            else:
                return radb.ast.Project([radb.ast.AttrRef(rel=None, name=parent.root)], last_child.root)

        if parent.parent.type is node_types_dict.__getitem__("projection"):
            parent.parent.root = [radb.ast.AttrRef(rel=None, name=parent.root),
                                  radb.ast.AttrRef(rel=None, name=parent.parent.root)]
            parent.root = last_child.root
            parent.type = last_child.type
            return self.create_ra(parent)

    # It is the relation part in the translation from ra statements to ra query.
    def __create_relation_parts(self, parent, last_child):
        if parent.type is node_types_dict.__getitem__("cross"):
            parent.root = radb.ast.Cross(parent.left.root, parent.right.root)
            parent.type = node_types_dict.__getitem__("relation")
            return self.create_ra(parent)

        elif parent.type is node_types_dict.__getitem__("selection"):
            # if parent and parent's parent is selection, it writes these two values as a new selection.
            # The new node's parent's type can still be selection.
            # Therefore, the flow continues without combining selection and relation.
            if parent.parent is not None and parent.parent.type is node_types_dict.__getitem__("selection"):
                parent.parent.root = radb.ast.ValExprBinaryOp(op=cond_dict.__getitem__("and"), left=parent.root,
                                                              right=parent.parent.root)
                parent.root = last_child.root
                parent.type = last_child.type
                return self.create_ra(parent)

            __selection = radb.ast.Select(cond=parent.root, input=last_child.root)
            parent.root = __selection
            return self.create_ra(parent)

        else:
            return self.__create_projection_parts(parent, last_child)


# If a new parent is added to the node, it sets the parent as root.
def __fix_root(tree):
    if tree is None:
        return tree

    while tree.parent is not None:
        tree = tree.parent

    return tree


# There can also be tokens inside relation tokens. It separates them.
def __get_all_relation_tokens__(sql_statement):
    tokens = []
    sql_statement = sql_statement[0].tokens
    for add_token in sql_statement:

        # Checks if the attribute "tokens" is present within the tokens
        # If no, its a raw token and can be added
        if not hasattr(add_token, 'tokens'):
            tokens.append(add_token)
            continue

        # If the token has sub tokens, loop through those tokens
        # and add to final array
        for i in add_token.tokens:
            tokens.append(i)

    return tokens


# Adds the sql relational statement to the tree by converting them to the ra statements.
def __create_relation(tokens):
    tree, relations, is_rename = None, [], False

    # Possible tokens:
    # TABLE AS TB
    # Table,
    for token in tokens:
        if token.is_whitespace:
            continue

        # Check if table has been renamed or not
        if token.value == ",":
            is_rename = False
            continue

        # Table has been renamed
        if is_rename:
            # If the last relation was renamed
            # This sets the last node to be a renamed node 
            # Sets last element in relations to be a radb.ast.Rename object
            last_element = len(relations) - 1
            relations[last_element] = radb.ast.Rename(relname=None, attrnames=[token.value + ": *"],
                                                      input=relations[last_element])
        
        # If table hasn't been renamed (yet)
        # append current token to the relations array
        # set rename to True as the next token might be
        # ',' or 'AS'
        else:
            relations.append(radb.ast.RelRef(token.value))
            is_rename = True

    for r in relations:
        # If current tree hasn't been built
        # Set current relation token as root and root type as "relation"
        if tree is None:
            tree = Tree(r, node_types_dict.__getitem__("relation"))
        
        # if current tree has started to build, insert new relation node
        # If the node to be inserted is relation
        # Insert new node cross node, "X", and set current node and new node's parent to X
        else:
            tree.insert_node(r, node_types_dict.__getitem__("relation"))

            # If new node added (such as X node), sets the new parent node as root
            tree = __fix_root(tree)

    return tree


# Adds the sql select statement to the tree by converting them to the ra projection.
def __create_projection(sql_select_statement, tree):
    if sql_select_statement[0].value == "*":
        return tree

    only_one_projection = True
    for token in sql_select_statement[0].tokens:

        # Check if there is only one projection
        if token.value == ",":
            only_one_projection = False
            break

    if only_one_projection:
        tree.insert_node(sql_select_statement[0].value, node_types_dict.__getitem__("projection"))
        return __fix_root(tree)

    for token in sql_select_statement[0].tokens:
        if token.is_whitespace or token.value == ",":
            continue
        
        # Adds projection node as the new node
        tree.insert_node(token.value, node_types_dict.__getitem__("projection"))
        tree = __fix_root(tree)

    return tree


# It turns tokens into an object that the ra library can understand.
# Called by the __create_selection method.
def __create_valexprbinaryop(tokens):
    left_done, or_done = False, False
    left, right, op = None, None, None

    # Loop through the comparison token
    # left_side | operator | right_side
    for token in tokens:
        if token.is_whitespace:
            continue
        
        # If the left side of the comparison hasn't been set
        if not left_done:
            # Set the left side to the current token
            left = radb.ast.AttrRef(rel=None, name=token.value)
            left_done = True
        
        # If the operator hasn't been set yet
        # Set the operator to current token
        elif not or_done:
            op = cond_dict.__getitem__(token.value)
            or_done = True

        # Last token to be set is the right side
        else:
            right = radb.ast.RANumber(token.value)

            # Loop no longer needed, all 3 tokens set
            break
    
    return radb.ast.ValExprBinaryOp(op=op, left=left, right=right)


# Adds the sql where statement to the tree by converting them to the ra selection.
def __create_selection(sql_where_statement, tree):

    # If no selection tokens, return tree
    if sql_where_statement.__len__() == 0:
        return tree

    # Loop through WHERE token (tokens within a token)
    for token in sql_where_statement[0].tokens:
        if token.is_whitespace or token.normalized == "WHERE":
            continue
        
        # if the current token is a comparison token
        # Example: EMP.ID=1 -> Comparison
        if type(token) is sql.Comparison:
            # Create new node
            cond = __create_valexprbinaryop(token.tokens)
            # Insert new node
            # Creates a new Tree object with new node
            # Sets the current tree's parent to new node
            # Sets the new tree's left to current tree
            tree.insert_node(cond, node_types_dict.__getitem__("selection"))
            tree = __fix_root(tree)

    return tree


# The tokens returned from the sql parser are separated into the relevant statements.
def __separate_tokens(sqlstring: Statement):
    in_from = False
    relation, projection, selection = [], [], []

    for token in sqlstring.tokens:
        if token.is_whitespace:
            continue

        if token.is_keyword:
            # Checking if loop has passed the projection part of the query
            if token.value.lower() == 'from':
                in_from = True
            continue
        
        # If the query still hasn't passed the projection part of the query
        # Add to projection array
        if not in_from:
            projection.append(token)
            continue

        # If token is part of the where clause (SQLPARSE groups the where token as one)
        # Add to selection branch
        if token.is_group and token.value[:5].lower() == 'where':
            selection.append(token)
            continue

        # All other tokens filtered out, all that's left is relation tokens
        # basically the tables
        relation.append(token)

    # Relation tokens can contain either tables or sub-queries
    # This breaks it down
    relation = __get_all_relation_tokens__(relation)

    # Returns the inital statement broken down into respective tokens
    return relation, selection, projection

def check_syntax(s):
    (select_stmt + Optional(';')).parseString(s, parseAll=True)

# The main method accessed from outside the library.
def translate(sqlstring: str):
    """
        Checks the validity of the query syntax. Raises pyparsing.ParseException error
        if invalid syntax.

        Then converts it into tokens which are further categorized into:
            relation
            selection
            projection
        
        Returns sql2ra.Tree object
    """
    # Checks validity of sqlstring -> ParseException if error
    check_syntax(sqlstring)

    # Split query into tokens
    parsed_sqlstring: Statement = sqlparse.parse(sqlstring)[0]
    relation, selection, projection = __separate_tokens(parsed_sqlstring)

    # Build Tree
    tree:Tree = __create_relation(relation)
    tree:Tree = __create_selection(selection, tree)
    tree:Tree = __create_projection(projection, tree)

    # By the end of these three functions:
    # The tree structure will be:

    #       Projection
    #           |
    #           |
    #       Selection
    #           |
    #           |
    #        Relation

    # Obviously each level can be different as nodes are added such as:
    # Relation:

    #                X
    #               /  \
    #              /    \
    #             /      \
    #             X     Table 3
    #            / \
    #           /   \
    #      Table 1  Table 2

    return tree.create_ra(tree.get_last_left_child())
