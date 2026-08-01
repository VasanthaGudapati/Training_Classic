"""
Day 11: Binary Search Trees (BST) Basics
Practical Task: Interactive CLI Binary Search Tree Playground with Insertion, Search, Deletion & Validation.
"""

from typing import Any, List, Optional


class BSTNode:
    """Represents a node in a Binary Search Tree."""

    def __init__(self, value: Any):
        self.value: Any = value
        self.left: Optional["BSTNode"] = None
        self.right: Optional["BSTNode"] = None

    def __repr__(self) -> str:
        return f"BSTNode({self.value})"


class BinarySearchTree:
    """Custom Binary Search Tree implementation."""

    def __init__(self):
        self.root: Optional[BSTNode] = None

    def insert(self, value: Any) -> None:
        """Inserts a new value into the BST in O(log N) average time."""
        if not self.root:
            self.root = BSTNode(value)
        else:
            self._insert_recursive(self.root, value)

    def _insert_recursive(self, node: BSTNode, value: Any) -> None:
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

    def search(self, value: Any) -> bool:
        """Searches if a value exists in the BST in O(log N) average time."""
        return self._search_recursive(self.root, value)

    def _search_recursive(self, node: Optional[BSTNode], value: Any) -> bool:
        if not node:
            return False
        if node.value == value:
            return True
        elif value < node.value:
            return self._search_recursive(node.left, value)
        else:
            return self._search_recursive(node.right, value)

    def delete(self, value: Any) -> bool:
        """Deletes a node with the specified value from the BST. Returns True if deleted."""
        if not self.search(value):
            return False
        self.root = self._delete_recursive(self.root, value)
        return True

    def _delete_recursive(self, node: Optional[BSTNode], value: Any) -> Optional[BSTNode]:
        if not node:
            return None

        if value < node.value:
            node.left = self._delete_recursive(node.left, value)
        elif value > node.value:
            node.right = self._delete_recursive(node.right, value)
        else:
            # Case 1 & 2: 0 or 1 child
            if not node.left:
                return node.right
            elif not node.right:
                return node.left

            # Case 3: 2 children - get in-order successor (min in right subtree)
            min_node = self._find_min(node.right)
            node.value = min_node.value
            node.right = self._delete_recursive(node.right, min_node.value)

        return node

    def find_min(self) -> Optional[Any]:
        """Finds minimum value in BST."""
        if not self.root:
            return None
        return self._find_min(self.root).value

    def find_max(self) -> Optional[Any]:
        """Finds maximum value in BST."""
        if not self.root:
            return None
        curr = self.root
        while curr.right:
            curr = curr.right
        return curr.value

    def _find_min(self, node: BSTNode) -> BSTNode:
        curr = node
        while curr.left:
            curr = curr.left
        return curr

    def in_order_list(self) -> List[Any]:
        """Returns sorted list of elements via in-order traversal."""
        res = []
        def _in_order(n):
            if n:
                _in_order(n.left)
                res.append(n.value)
                _in_order(n.right)
        _in_order(self.root)
        return res

    def is_valid_bst(self) -> bool:
        """Validates that tree adheres strictly to BST invariants."""
        def _validate(node, low=float('-inf'), high=float('inf')):
            if not node:
                return True
            if not (low < node.value < high):
                return False
            return _validate(node.left, low, node.value) and _validate(node.right, node.value, high)
        return _validate(self.root)


def run_unit_tests():
    """Runs automated verification tests for Binary Search Tree."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 11")
    print("=" * 60)

    bst = BinarySearchTree()
    values = [15, 10, 20, 8, 12, 17, 25]
    for v in values:
        bst.insert(v)

    # Test Search & In-Order
    assert bst.in_order_list() == [8, 10, 12, 15, 17, 20, 25], "Test 1 Failed: In-order sorted"
    assert bst.search(12) == True and bst.search(99) == False, "Test 2 Failed: Search"

    # Test Min / Max
    assert bst.find_min() == 8 and bst.find_max() == 25, "Test 3 Failed: Find Min/Max"

    # Test Validation
    assert bst.is_valid_bst() == True, "Test 4 Failed: Valid BST check"

    # Test Deletion of Leaf Node
    assert bst.delete(8) == True and bst.search(8) == False, "Test 5 Failed: Delete leaf node"
    assert bst.in_order_list() == [10, 12, 15, 17, 20, 25], "Test 6 Failed: In-order post leaf delete"

    # Test Deletion of Node with 2 Children (Node 15 - root)
    assert bst.delete(15) == True, "Test 7 Failed: Delete root node with 2 children"
    assert bst.in_order_list() == [10, 12, 17, 20, 25], "Test 8 Failed: In-order post root delete"
    assert bst.is_valid_bst() == True, "Test 9 Failed: Valid BST after root deletion"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 11."""
    bst = BinarySearchTree()
    default_vals = [15, 10, 20, 8, 12, 17, 25]
    for v in default_vals:
        bst.insert(v)

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 11] BINARY SEARCH TREE (BST) PLAYGROUND")
        print("=" * 60)
        print(f" Sorted Values (In-Order) : {bst.in_order_list()}")
        print(f" Min: {bst.find_min()} | Max: {bst.find_max()} | Valid BST: {'YES' if bst.is_valid_bst() else 'NO'}")
        print("-" * 60)
        print(" [1] Insert Value")
        print(" [2] Search for Value")
        print(" [3] Delete Value")
        print(" [4] Find Minimum & Maximum Values")
        print(" [5] Validate BST Invariant Property")
        print(" [6] Run Automated Unit Tests")
        print(" [7] Reset BST")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-7): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 11 BST Playground.")
            break

        if choice == "1":
            val_str = input("Enter integer to insert: ").strip()
            if val_str.lstrip("-").isdigit():
                val = int(val_str)
                bst.insert(val)
                print(f"[*] Inserted {val} into BST.")
            else:
                print("[Warning] Please enter a valid integer.")

        elif choice == "2":
            val_str = input("Enter integer to search: ").strip()
            if val_str.lstrip("-").isdigit():
                val = int(val_str)
                found = bst.search(val)
                print(f"[*] Search Result for {val}: {'FOUND in BST!' if found else 'NOT FOUND.'}")
            else:
                print("[Warning] Invalid integer.")

        elif choice == "3":
            val_str = input("Enter integer to delete: ").strip()
            if val_str.lstrip("-").isdigit():
                val = int(val_str)
                deleted = bst.delete(val)
                if deleted:
                    print(f"[*] Deleted {val} successfully from BST.")
                else:
                    print(f"[Warning] Value {val} not found in BST.")
            else:
                print("[Warning] Invalid integer.")

        elif choice == "4":
            print(f"[*] Minimum Value in BST: {bst.find_min()}")
            print(f"[*] Maximum Value in BST: {bst.find_max()}")

        elif choice == "5":
            valid = bst.is_valid_bst()
            print(f"[*] BST Integrity Check: {'VALID BST' if valid else 'INVALID BST'}")

        elif choice == "6":
            run_unit_tests()

        elif choice == "7":
            bst = BinarySearchTree()
            print("[*] Reset BST to empty.")

        elif choice == "0":
            print("\n[EXIT] Exiting Day 11 BST Playground. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 7.")


if __name__ == "__main__":
    interactive_cli()
