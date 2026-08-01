"""
Day 05: Linked Lists (Singly & Doubly Linked Lists)
Practical Task: Interactive CLI Linked List Visualizer & Cycle Detector.
"""

from typing import Any, List, Optional


class Node:
    """Represents a node in a Singly Linked List."""

    def __init__(self, value: Any):
        self.value: Any = value
        self.next: Optional["Node"] = None

    def __repr__(self) -> str:
        return f"Node({self.value})"


class SinglyLinkedList:
    """Custom Singly Linked List with common list operations."""

    def __init__(self):
        self.head: Optional[Node] = None
        self.size: int = 0

    def insert_at_head(self, value: Any) -> None:
        """Inserts a new node at the head in O(1) time."""
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node
        self.size += 1

    def insert_at_tail(self, value: Any) -> None:
        """Inserts a new node at the tail in O(N) time."""
        new_node = Node(value)
        if not self.head:
            self.head = new_node
        else:
            curr = self.head
            while curr.next:
                curr = curr.next
            curr.next = new_node
        self.size += 1

    def delete(self, value: Any) -> bool:
        """Deletes first occurrence of value. Returns True if deleted, False otherwise."""
        if not self.head:
            return False

        if self.head.value == value:
            self.head = self.head.next
            self.size -= 1
            return True

        curr = self.head
        while curr.next:
            if curr.next.value == value:
                curr.next = curr.next.next
                self.size -= 1
                return True
            curr = curr.next
        return False

    def reverse(self) -> None:
        """Reverses the linked list in-place in O(N) time and O(1) space."""
        prev = None
        curr = self.head
        while curr:
            next_node = curr.next
            curr.next = prev
            prev = curr
            curr = next_node
        self.head = prev

    def has_cycle(self) -> bool:
        """Detects if the list contains a cycle using Floyd's Tortoise and Hare algorithm."""
        slow = self.head
        fast = self.head
        while fast and fast.next:
            slow = slow.next
            fast = fast.next.next
            if slow is fast:
                return True
        return False

    def to_list(self) -> List[Any]:
        """Converts linked list elements into a standard list."""
        result = []
        curr = self.head
        visited = set()
        while curr and id(curr) not in visited:
            result.append(curr.value)
            visited.add(id(curr))
            curr = curr.next
        return result

    def visual_representation(self) -> str:
        """Returns a string visually demonstrating pointer connections."""
        if not self.head:
            return "[HEAD] ➡️ None"
        
        nodes_str = []
        curr = self.head
        visited = set()
        
        while curr:
            if id(curr) in visited:
                nodes_str.append(f"[{curr.value}] 🔄 (Cycle Detected!)")
                break
            visited.add(id(curr))
            nodes_str.append(f"[{curr.value}]")
            curr = curr.next
        
        if curr is None:
            nodes_str.append("None")
            
        return "[HEAD] ➡️ " + " ➡️ ".join(nodes_str)


class DoublyNode:
    """Represents a node in a Doubly Linked List."""

    def __init__(self, value: Any):
        self.value: Any = value
        self.next: Optional["DoublyNode"] = None
        self.prev: Optional["DoublyNode"] = None


class DoublyLinkedList:
    """Custom Doubly Linked List with forward and backward traversal."""

    def __init__(self):
        self.head: Optional[DoublyNode] = None
        self.tail: Optional[DoublyNode] = None

    def append(self, value: Any) -> None:
        """Appends value to tail in O(1) time."""
        new_node = DoublyNode(value)
        if not self.head:
            self.head = new_node
            self.tail = new_node
        else:
            new_node.prev = self.tail
            self.tail.next = new_node
            self.tail = new_node

    def visual_representation(self) -> str:
        """Returns a bi-directional visual representation."""
        if not self.head:
            return "None 🔀 None"
        
        nodes = []
        curr = self.head
        while curr:
            nodes.append(f"[{curr.value}]")
            curr = curr.next
        return "None ⬅️➡️ " + " 🔀 ".join(nodes) + " ⬅️➡️ None"


def run_unit_tests():
    """Runs automated verification tests for Linked List implementations."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 05")
    print("=" * 60)

    # Test SinglyLinkedList
    sll = SinglyLinkedList()
    sll.insert_at_tail(10)
    sll.insert_at_tail(20)
    sll.insert_at_head(5)
    assert sll.to_list() == [5, 10, 20], "Test 1 Failed: Insertion order"

    sll.delete(10)
    assert sll.to_list() == [5, 20], "Test 2 Failed: Deletion"

    sll.reverse()
    assert sll.to_list() == [20, 5], "Test 3 Failed: Reverse list"

    assert sll.has_cycle() == False, "Test 4 Failed: No cycle detection"

    # Test DoublyLinkedList
    dll = DoublyLinkedList()
    dll.append("A")
    dll.append("B")
    assert dll.tail.value == "B" and dll.tail.prev.value == "A", "Test 5 Failed: Doubly linked list"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 05."""
    sll = SinglyLinkedList()

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 05] LINKED LIST PLAYGROUND & VISUALIZER")
        print("=" * 60)
        print(f" Current List : {sll.visual_representation()}")
        print("-" * 60)
        print(" [1] Insert at Head")
        print(" [2] Insert at Tail")
        print(" [3] Delete Element")
        print(" [4] Reverse Linked List (In-Place)")
        print(" [5] Check for Cycle (Floyd's Algorithm)")
        print(" [6] Create Doubly Linked List Demo")
        print(" [7] Run Automated Unit Tests")
        print(" [8] Reset List")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-8): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 05 Linked List Playground.")
            break

        if choice == "1":
            val = input("Enter value to insert at head: ").strip()
            sll.insert_at_head(val)
            print(f"✨ Inserted '{val}' at head.")

        elif choice == "2":
            val = input("Enter value to insert at tail: ").strip()
            sll.insert_at_tail(val)
            print(f"✨ Inserted '{val}' at tail.")

        elif choice == "3":
            val = input("Enter value to delete: ").strip()
            deleted = sll.delete(val)
            if deleted:
                print(f"✅ Deleted '{val}' successfully.")
            else:
                print(f"❌ Value '{val}' not found in list.")

        elif choice == "4":
            sll.reverse()
            print("🔄 Reversed list in-place!")

        elif choice == "5":
            cycle_found = sll.has_cycle()
            print(f"🔍 Cycle Status: {'⚠️ CYCLE DETECTED!' if cycle_found else '✅ Clean (No cycle detected).'}")

        elif choice == "6":
            dll = DoublyLinkedList()
            for item in ["Node_1", "Node_2", "Node_3"]:
                dll.append(item)
            print("\n--- Doubly Linked List Demo ---")
            print(dll.visual_representation())

        elif choice == "7":
            run_unit_tests()

        elif choice == "8":
            sll = SinglyLinkedList()
            print("🧹 List reset.")

        elif choice == "0":
            print("\n[EXIT] Exiting Day 05 Linked List Playground. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 8.")


if __name__ == "__main__":
    interactive_cli()
