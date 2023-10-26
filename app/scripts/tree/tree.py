class Node:
    def __init__(self, node_type="root", values="()",
                 representation="r", left=None, right=None):
        
        self.type = node_type
        self.values = values
        self.representation = representation
        self.left = left
        self.right = right

    def insert_dictionary(self, stmt_dict: dict):
        for key, values in stmt_dict.items():
            if 'JOIN' in key or 'FROM' in key:
                self.insert_relation("None")
            # regular nodes
            else:
                self.insert_node(key, values)

        return self
                
    def insert_relation(self, node_type):
        None
    
    def insert_node(self, node_type, node_values):
        # It is not a root node and therefore contains values
        if not self.type == "root":
            # Checks left node
            # if node is empty, add a Node class
            if self.left is None:
                representation = Node.assign_representation(node_type)
                self.left = Node(node_type, node_values, representation)
            # if the node is not empty, recursively call the insert node function
            # till it finds an empty spot
            else:
                self.left.insert_node(node_type, node_values)
        # Is a root node
        else:
            self.type = node_type
            self.values = node_values
            self.representation = Node.assign_representation(node_type)

        return self
    
    def PrintTree(self):
        if self.left:
            # print("LEFT")
            self.left.PrintTree()
        # print("ROOT")
        print("\\ | {} | {} {}".format(self.representation.upper(), self.type, self.values))        
        # print("RIGHT")
        if self.right:
            self.right.PrintTree()

    @staticmethod
    def assign_representation(node_type):
        representation = None
        if node_type == 'SELECT':
            representation = 'projection'
        elif node_type in ['WHERE', 'AND', 'OR', 'NOT', 'BETWEEN', 'IN', 'LIKE', 'IS']:
            representation = 'selection'
        elif node_type == 'FROM' or 'JOIN' in node_type:
            representation = 'relation'
        else:
            representation = 'aggregation'

        return representation
    


