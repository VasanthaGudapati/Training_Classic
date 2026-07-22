"""
Day 11: Binary Search Trees (BST) Basics
Practical Task: Implement an active BinarySearchTree collection.

Requirements:
- Build a BST class with node references.
- Support insert(value) to place nodes ordered (left < parent < right).
- Support search(value) returning True or False based on existence.
"""

class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, value) -> None:
        """Inserts a new value into the BST recursively."""
        if not self.root:
            self.root = BSTNode(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node: BSTNode, value) -> None:
        if value < node.value:
            if not node.left:
                node.left = BSTNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if not node.right:
                node.right = BSTNode(value)
            else:
                self._insert_recursive(node.right, value)

    def search(self, value) -> bool:
        """Searches if a value exists in the BST. Returns True or False."""
        return self._search_recursive(self.root, value)

    def _search_recursive(self, node: BSTNode, value) -> bool:
        if not node:
            return False
        if node.value == value:
            return True
        elif value < node.value:
            return self._search_recursive(node.left, value)
        else:
            return self._search_recursive(node.right, value)

    def in_order_list(self) -> list:
        """Helper to print ordered BST values."""
        res = []
        self._in_order(self.root, res)
        return res

    def _in_order(self, node: BSTNode, res: list):
        if node:
            self._in_order(node.left, res)
            res.append(node.value)
            self._in_order(node.right, res)

if __name__ == "__main__":
    print("--- Testing Day 11: Binary Search Tree ---")
    bst = BST()
    
    values = [15, 10, 20, 8, 12, 17, 25]
    print("Inserting values:", values)
    for val in values:
        bst.insert(val)
        
    print("Ordered elements (in-order traversal):", bst.in_order_list())
    
    search_vals = [12, 18, 25, 5]
    for sv in search_vals:
        print(f"Is {sv} in BST?:", bst.search(sv))
