import pprint

node_types_dict = {
    "relation": 0,
    "selection": 1,
    "projection": 2,
    "cross": 3,
    "aggregation": 4
}

class Node:
    def __init__(self, node_type="root", values="()",
                 representation="r", left=None, right=None, parent=None):
        
        self.type = node_type
        self.values = values
        self.representation = representation
        self.left = left
        self.right = right
        self.parent = None

    def insert_dictionary(self, stmt_dict: dict):
        # pprint.PrettyPrinter(indent=4, sort_dicts=False).pprint(stmt_dict)
        for key, values in stmt_dict.items():
            self.insert_node(key, values)

        return self
    
    def insert_node(self, node_type, node_values, node_representation):
        # If the node being added is a relation node, requires special processing
        if node_representation is node_types_dict.__getitem__("relation"):
            self.insert_relation(node_type, node_values, node_representation)

        # Otherwise, can be added as basic nodes
        # Adds nodes bottom up
        else:
            # need to check if values contain a sub-query
            sub_rat = None
            for i in range(len(node_values)):
                # check for sub-query
                if type(node_values[i]) is dict:
                    sub_rat = Node.create_tree(node_values[i])
                    # renamed
                    if 'AS' in node_values[i].keys():
                        node_values[i] = node_values[i]['AS']

            new_tree = Node(node_type, node_values, node_representation)
            new_tree.left = self
            if sub_rat:
                new_tree.right = sub_rat
            self.parent = new_tree
                
    def insert_relation(self, node_type, node_values, node_representation):
        # If the current node is already a relational node
        if self.representation is node_types_dict.__getitem__("relation"):
            # Need to insert a cartesian node instead
            self.insert_cartesian(node_type, node_values, node_representation)
        # Otherwise if current node is already a cross node
        elif self.representation is node_types_dict.__getitem__("cross"):
            # the right node of cross is empty
            if self.right is None:
                self.right = Node(node_type, node_values, node_representation)
                self.right.parent = self
            # otherwise, need to add another cartesian
            else:
                self.insert_cartesian(node_type, node_values, node_representation)

    def insert_cartesian(self, node_type, node_values, node_representation):
        # Check if node_type is JOIN
        # or FROM

        if 'JOIN' in node_type:
            right_node = Node('FROM', [node_values['RIGHT TABLE']], node_representation)
            
            # Cross node
            new_tree = Node('INNER JOIN', node_values['ON'], node_types_dict.get('cross'))

            # set right and left node's parents to new
            # cross node
            self.parent = new_tree
            right_node.parent = new_tree

            new_tree.left = self
            new_tree.right = right_node
        else:
            right_node = Node(node_type, node_values, node_representation)
            # create new node as cartesian node
            new_tree = Node("X", "()", node_types_dict.__getitem__("cross"))
            
            # set the parent of the current node to the new tree
            # as it's being added upwards
            self.parent = new_tree
            
            # set right node's parent to new tree
            right_node.parent = new_tree

            # set the new tree's left and right accordingly
            new_tree.left = self
            new_tree.right = right_node
            


    
    {
    # def insert_node(self, node_type, node_values):
    #     # It is not a root node and therefore contains values
    #     if not self.type == "root":
    #         # Checks left node
    #         # if node is empty, add a Node class
    #         if self.left is None:
    #             representation = Node.assign_representation(node_type)
    #             self.left = Node(node_type, node_values, representation)
    #         # if the node is not empty, recursively call the insert node function
    #         # till it finds an empty spot
    #         else:
    #             self.left.insert_node(node_type, node_values)
    #     # Is a root node
    #     else:
    #         self.type = node_type
    #         self.values = node_values
    #         self.representation = Node.assign_representation(node_type)

    #     return self
    }

    def PrintTree(self, side="O"):
        if self.left:
            self.left.PrintTree("/")
        print("{} | {} | {} {}".format(side, self.representation, self.type, self.values))        
        if self.right:
            self.right.PrintTree("\\")

    def to_dict(self):
        pass

    @staticmethod
    def assign_representation(keyword) -> int:
        RELATION = ['FROM', 
                    'INNER JOIN', 'JOIN', 'RIGHT JOIN', 'LEFT JOIN',
                    'FULL JOIN', 'CROSS JOIN', 'ON', 'USING']
    
        PROJECTION = ['SELECT', 'DISTINCT', 'AS', 'INTO', 'UNION',
                      'CROSS', 'NATURAL', 'ORDER BY', 'LIMIT', 'OFFSET',
                      'GROUP CONCAT', 'CONCAT', 'ROUND', 'CAST', 'COALESCE', 
                      'IFNULL', 'NULLIF']
        
        SELECTION = ['WHERE', 'AND', 'OR', 'NOT', 'IN', 'BETWEEN', 'LIKE',
                     'IS NULL', 'IS NOT NULL', 'EXISTS', 'CASE', 'WHEN',
                     'THEN', 'ELSE', 'END']
        
        AGGREGATION = ['COUNT', 'SUM', 'AVG', 'MIN', 'MAX',
                       'GROUP BY', 'DESC', 'ASC', 'HAVING']
        
        # return representation
        if keyword in RELATION:
            return node_types_dict.get("relation")
        elif keyword in PROJECTION:
            return node_types_dict.get("projection")
        elif keyword in SELECTION:
            return node_types_dict.get("selection")
        elif keyword in AGGREGATION:
            return node_types_dict.get("aggregation")

    @staticmethod
    def organize_dictionary(stmt_dict: dict):
        organized_dict = {}
        # Put projection nodes at the very top
        keys = stmt_dict.keys()

        aggr_key, proj_key, sel_key, rel_key = [], [], [], []
        for key in keys:
            repr_type = Node.assign_representation(key)

            # Relation match
            if repr_type == node_types_dict["relation"]:
                rel_key.append(key)
            # projection
            elif repr_type == node_types_dict["projection"]:
                proj_key.append(key)
            # selection
            elif repr_type == node_types_dict["selection"]:
                sel_key.append(key)
            # aggregation
            elif repr_type == node_types_dict["aggregation"]:
                aggr_key.append(key)

        # organize dictionary
        for key in rel_key:
            organized_dict[key] = stmt_dict[key]
        for key in sel_key:
            organized_dict[key] = stmt_dict[key]
        for key in proj_key:
            organized_dict[key] = stmt_dict[key]
        for key in aggr_key:
            organized_dict[key] = stmt_dict[key]

        return {
            "relation": rel_key,
            "selection": sel_key,
            "projection": proj_key,
            "aggregation": aggr_key
        }

    @staticmethod
    def create_relations(stmt_dict:dict, relation_tokens:list):
        print("RELATION NODES:", relation_tokens)
        
        tree: Node = None

        # No relation nodes
        if len(relation_tokens) == 0:
            return tree
        
        # loop through all relation tokens
        for key in relation_tokens:
            # If the tree currently does not exist
            # Create new tree
            if tree is None:
                tree = Node(key, stmt_dict[key], node_types_dict.get("relation"))
            else:
                # Add new relation node
                tree.insert_node(key, stmt_dict[key], node_types_dict.get("relation"))

                tree = Node.fix_root(tree)
    
        return tree
    
    @staticmethod
    def create_valexpbinary(key, values):
        left_done, or_done = False, False
        left, right, op = None, None, None

        for value in values:
            # [left, comparison, right]
            if not left_done:
                # print("left: ", value, type(value))
                left = value
                left_done = True
            
            elif not or_done:
                # print("operator", value, type(value))
                op = value
                or_done = True
            
            else:
                # print("right:", value, type(value))
                if type(value) is dict:
                    right = "sub_query"
                else:
                    right = value
                
                break
        
        return left + " " + str(op) + " " + str(right)

    @staticmethod
    def create_selection(tree, stmt_dict:dict, selection_tokens:list):
        print("SELECTION TOKENS:", selection_tokens)

        # No selection nodes
        if len(selection_tokens) == 0:
            return tree

        for key in selection_tokens:
            cond = Node.create_valexpbinary(key, stmt_dict[key])
            tree.insert_node(key, cond, node_types_dict.get("selection"))
            tree = Node.fix_root(tree)

        return tree

    @staticmethod
    def create_projection(tree, stmt_dict:dict, projection_tokens:list):
        print("PROJECTION TOKENS:", projection_tokens)

        if len(projection_tokens) == 0:
            return tree

        for key in projection_tokens:
            tree.insert_node(key, stmt_dict[key], node_types_dict.get("projection"))
            tree = Node.fix_root(tree)

        return tree

    @staticmethod
    def create_aggregation(tree, stmt_dict:dict, aggregation_tokens:list):
        print("AGGREGATION TOKENS:", aggregation_tokens)

        for key in aggregation_tokens:
            tree.insert_node(key, stmt_dict[key], node_types_dict.get("aggregation"))
            tree = Node.fix_root(tree)

        return tree

    @staticmethod
    def fix_root(tree):
        if tree is None:
            return tree

        # Keep going upwards until you find the top-most node
        # sets that node as root node
        while tree.parent is not None:
            tree = tree.parent
        
        return tree
    
    @staticmethod
    def create_tree(stmt_dict:dict):
        relation = Node.organize_dictionary(stmt_dict)["relation"]
        selection =Node.organize_dictionary(stmt_dict)["selection"]
        projection = Node.organize_dictionary(stmt_dict)["projection"]
        aggregation = Node.organize_dictionary(stmt_dict)["aggregation"]

        rat: Node = Node.create_relations(stmt_dict, relation)
        rat: Node = Node.create_selection(rat, stmt_dict, selection)
        rat: Node = Node.create_aggregation(rat, stmt_dict, aggregation)
        rat: Node = Node.create_projection(rat, stmt_dict, projection)

        return rat


# Notes:

# - Need to process AND nodes (``isolate_where`` can handle this)
# - Need to identify subqueries and build a secondary tree
# - Handle ASC nodes
# - Create to_dict function to send to frontend
