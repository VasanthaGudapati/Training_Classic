"""
Day 10: Binary Trees & Recursive Traversals
Practical Task: Implement a binary tree layout and recursive traversals.

Requirements:
- Create a TreeNode class representing a node in a tree.
- Build a hardcoded binary tree structure.
- Write recursive functions for:
  - in_order(node) (Left, Root, Right)
  - pre_order(node) (Root, Left, Right)
  - post_order(node) (Left, Right, Root)
- Print/collect traversal sequences.
"""

class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def in_order(node: TreeNode, result: list = None) -> list:
    """In-order traversal: Left, Root, Right."""
    if result is None:
        result = []
    if node:
        in_order(node.left, result)
        result.append(node.value)
        in_order(node.right, result)
    return result

def pre_order(node: TreeNode, result: list = None) -> list:
    """Pre-order traversal: Root, Left, Right."""
    if result is None:
        result = []
    if node:
        result.append(node.value)
        pre_order(node.left, result)
        pre_order(node.right, result)
    return result

def post_order(node: TreeNode, result: list = None) -> list:
    """Post-order traversal: Left, Right, Root."""
    if result is None:
        result = []
    if node:
        post_order(node.left, result)
        post_order(node.right, result)
        result.append(node.value)
    return result

if __name__ == "__main__":
    print("--- Testing Day 10: Binary Tree Traversals ---")
    
    # Building tree:
    #        1
    #       / \
    #      2   3
    #     / \
    #    4   5
    
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    
    print("In-order (expect [4, 2, 5, 1, 3]):")
    print(" ", in_order(root))
    
    print("Pre-order (expect [1, 2, 4, 5, 3]):")
    print(" ", pre_order(root))
    
    print("Post-order (expect [4, 5, 2, 3, 1]):")
    print(" ", post_order(root))
