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
            if self.left is None:
                self.left = Node(node_type, node_values)
            else:
                self.left.insert_node(node_type, node_values)
        # Is a root node
        else:
            self.type = node_type
            self.values = node_values
    
        return self

    def PrintTree(self):
        if self.left:
            self.left.PrintTree()
        print("\\ {}: {}".format(self.type, self.values))        
        if self.right:
            self.right.PrintTree()