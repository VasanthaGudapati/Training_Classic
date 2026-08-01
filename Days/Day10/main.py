"""
Day 10: Binary Trees & Tree Traversals
Practical Task: Interactive CLI Binary Tree Visualizer, Traversal Generator & Tree Metrics Evaluator.
"""

from collections import deque
from typing import Any, List, Optional


class TreeNode:
    """Represents a node in a Binary Tree."""

    def __init__(self, value: Any):
        self.value: Any = value
        self.left: Optional["TreeNode"] = None
        self.right: Optional["TreeNode"] = None

    def __repr__(self) -> str:
        return f"Node({self.value})"


def in_order(node: Optional[TreeNode], result: Optional[List[Any]] = None) -> List[Any]:
    """In-Order Traversal (Left -> Root -> Right)."""
    if result is None:
        result = []
    if node:
        in_order(node.left, result)
        result.append(node.value)
        in_order(node.right, result)
    return result


def pre_order(node: Optional[TreeNode], result: Optional[List[Any]] = None) -> List[Any]:
    """Pre-Order Traversal (Root -> Left -> Right)."""
    if result is None:
        result = []
    if node:
        result.append(node.value)
        pre_order(node.left, result)
        pre_order(node.right, result)
    return result


def post_order(node: Optional[TreeNode], result: Optional[List[Any]] = None) -> List[Any]:
    """Post-Order Traversal (Left -> Right -> Root)."""
    if result is None:
        result = []
    if node:
        post_order(node.left, result)
        post_order(node.right, result)
        result.append(node.value)
    return result


def level_order(root: Optional[TreeNode]) -> List[Any]:
    """Level-Order Traversal (BFS) using Queue."""
    if not root:
        return []

    result = []
    queue = deque([root])

    while queue:
        curr = queue.popleft()
        result.append(curr.value)
        if curr.left:
            queue.append(curr.left)
        if curr.right:
            queue.append(curr.right)

    return result


def max_depth(node: Optional[TreeNode]) -> int:
    """Calculates maximum depth/height of binary tree recursively."""
    if not node:
        return 0
    return 1 + max(max_depth(node.left), max_depth(node.right))


def count_nodes(node: Optional[TreeNode]) -> int:
    """Counts total number of nodes in tree recursively."""
    if not node:
        return 0
    return 1 + count_nodes(node.left) + count_nodes(node.right)


def count_leaves(node: Optional[TreeNode]) -> int:
    """Counts leaf nodes (nodes without children) recursively."""
    if not node:
        return 0
    if not node.left and not node.right:
        return 1
    return count_leaves(node.left) + count_leaves(node.right)


def build_sample_tree() -> TreeNode:
    """
    Builds a sample binary tree:
             1
           /   \\
          2     3
         / \\   / \\
        4   5 6   7
    """
    root = TreeNode(1)
    root.left = TreeNode(2)
    root.right = TreeNode(3)
    root.left.left = TreeNode(4)
    root.left.right = TreeNode(5)
    root.right.left = TreeNode(6)
    root.right.right = TreeNode(7)
    return root


def visual_tree_ascii(root: Optional[TreeNode]) -> str:
    """Returns an ASCII visual representation of the sample tree structure."""
    return (
        "       [1]\n"
        "      /   \\\n"
        "   [2]     [3]\n"
        "   / \\     / \\\n"
        " [4] [5] [6] [7]"
    )


def run_unit_tests():
    """Runs automated verification tests for Binary Tree traversals & metrics."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 10")
    print("=" * 60)

    root = build_sample_tree()

    # Traversal Tests
    assert in_order(root) == [4, 2, 5, 1, 6, 3, 7], "Test 1 Failed: In-Order Traversal"
    assert pre_order(root) == [1, 2, 4, 5, 3, 6, 7], "Test 2 Failed: Pre-Order Traversal"
    assert post_order(root) == [4, 5, 2, 6, 7, 3, 1], "Test 3 Failed: Post-Order Traversal"
    assert level_order(root) == [1, 2, 3, 4, 5, 6, 7], "Test 4 Failed: Level-Order Traversal"

    # Metrics Tests
    assert max_depth(root) == 3, "Test 5 Failed: Max Depth"
    assert count_nodes(root) == 7, "Test 6 Failed: Total Node Count"
    assert count_leaves(root) == 4, "Test 7 Failed: Leaf Node Count"

    # Edge Case: Single Node
    single = TreeNode(10)
    assert in_order(single) == [10], "Test 8 Failed: Single node traversal"
    assert max_depth(single) == 1, "Test 9 Failed: Single node depth"
    assert count_leaves(single) == 1, "Test 10 Failed: Single node leaf count"

    print("[PASS] All 10 Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 10."""
    root = build_sample_tree()

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 10] BINARY TREE & TRAVERSAL PLAYGROUND")
        print("=" * 60)
        print(" Tree Structure:")
        print(visual_tree_ascii(root))
        print("-" * 60)
        print(" [1] Run In-Order Traversal (Left -> Root -> Right)")
        print(" [2] Run Pre-Order Traversal (Root -> Left -> Right)")
        print(" [3] Run Post-Order Traversal (Left -> Right -> Root)")
        print(" [4] Run Level-Order Traversal (BFS)")
        print(" [5] View Tree Metrics (Height, Node Count, Leaf Count)")
        print(" [6] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-6): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 10 Binary Tree Playground.")
            break

        if choice == "1":
            seq = in_order(root)
            print(f"[*] In-Order Traversal  : {seq}")

        elif choice == "2":
            seq = pre_order(root)
            print(f"[*] Pre-Order Traversal : {seq}")

        elif choice == "3":
            seq = post_order(root)
            print(f"[*] Post-Order Traversal: {seq}")

        elif choice == "4":
            seq = level_order(root)
            print(f"[*] Level-Order (BFS)   : {seq}")

        elif choice == "5":
            depth = max_depth(root)
            nodes = count_nodes(root)
            leaves = count_leaves(root)
            print(f"[*] Tree Max Depth / Height : {depth}")
            print(f"[*] Total Node Count       : {nodes}")
            print(f"[*] Leaf Node Count        : {leaves}")

        elif choice == "6":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 10 Binary Tree Playground. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 6.")


if __name__ == "__main__":
    interactive_cli()
