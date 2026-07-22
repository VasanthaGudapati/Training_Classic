"""
Day 5: Singly Linked Lists
Practical Task: Build a clean, simple SinglyLinkedList.

Requirements:
- Implement a Node class to store data and a reference to the next node.
- Implement a LinkedList class containing:
  - insert_at_head(value)
  - insert_at_tail(value)
  - delete(value)
  - display() to print the list sequence.
"""

class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def insert_at_head(self, value) -> None:
        """Inserts a new node with value at the beginning of the list."""
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node

    def insert_at_tail(self, value) -> None:
        """Inserts a new node with value at the end of the list."""
        new_node = Node(value)
        if not self.head:
            self.head = new_node
            return
        
        curr = self.head
        while curr.next:
            curr = curr.next
        curr.next = new_node

    def delete(self, value) -> bool:
        """Deletes the first node containing the specified value. Returns True if found & deleted."""
        if not self.head:
            return False
            
        if self.head.value == value:
            self.head = self.head.next
            return True
            
        curr = self.head
        while curr.next:
            if curr.next.value == value:
                curr.next = curr.next.next
                return True
            curr = curr.next
        return False

    def display(self) -> None:
        """Prints the elements of the list sequentially."""
        elements = []
        curr = self.head
        while curr:
            elements.append(str(curr.value))
            curr = curr.next
        print(" -> ".join(elements) if elements else "Empty List")

if __name__ == "__main__":
    print("--- Testing Day 5: Singly Linked List ---")
    sll = SinglyLinkedList()
    sll.display()
    
    print("\nInserting nodes:")
    sll.insert_at_tail(10)
    sll.insert_at_tail(20)
    sll.insert_at_head(5)
    sll.insert_at_tail(30)
    sll.display() # Should display: 5 -> 10 -> 20 -> 30
    
    print("\nDeleting node with value 20:")
    deleted = sll.delete(20)
    print(f"Deleted successfully?: {deleted}")
    sll.display()
    
    print("\nDeleting node with value 5 (head):")
    sll.delete(5)
    sll.display()
