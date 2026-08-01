"""
Day 08: Stacks & Queues (Linear Abstract Data Types)
Practical Task: Interactive CLI Stack, Queue & Bracket Validation Playground.
"""

from collections import deque
from typing import Any, List, Optional


class Stack:
    """Custom Stack implementation following LIFO (Last-In, First-Out)."""

    def __init__(self):
        self._items: List[Any] = []

    def push(self, item: Any) -> None:
        """Pushes an element onto the top of the stack in O(1) time."""
        self._items.append(item)

    def pop(self) -> Any:
        """Removes and returns the top element of the stack in O(1) time."""
        if self.is_empty():
            raise IndexError("Pop from empty stack.")
        return self._items.pop()

    def peek(self) -> Optional[Any]:
        """Returns the top element without removing it in O(1) time."""
        if self.is_empty():
            return None
        return self._items[-1]

    def is_empty(self) -> bool:
        """Checks if the stack is empty."""
        return len(self._items) == 0

    def size(self) -> int:
        """Returns number of elements in stack."""
        return len(self._items)

    def __str__(self) -> str:
        if self.is_empty():
            return "Stack: [EMPTY]"
        items_str = ", ".join(repr(x) for x in self._items)
        return f"Stack (Bottom -> Top): [{items_str}]"


class Queue:
    """Custom Queue implementation following FIFO (First-In, First-Out) using deque."""

    def __init__(self):
        self._items: deque = deque()

    def enqueue(self, item: Any) -> None:
        """Adds an item to the end of the queue in O(1) time."""
        self._items.append(item)

    def dequeue(self) -> Any:
        """Removes and returns the front item of the queue in O(1) time."""
        if self.is_empty():
            raise IndexError("Dequeue from empty queue.")
        return self._items.popleft()

    def peek(self) -> Optional[Any]:
        """Returns the front item without removing it in O(1) time."""
        if self.is_empty():
            return None
        return self._items[0]

    def is_empty(self) -> bool:
        """Checks if the queue is empty."""
        return len(self._items) == 0

    def size(self) -> int:
        """Returns number of elements in queue."""
        return len(self._items)

    def __str__(self) -> str:
        if self.is_empty():
            return "Queue: [EMPTY]"
        items_str = " -> ".join(repr(x) for x in self._items)
        return f"Queue (Front -> Rear): [{items_str}]"


def validate_brackets(expression: str) -> bool:
    """
    Validates if brackets '()', '[]', '{}' in an expression are correctly balanced and nested.
    Uses a Stack in O(N) time and O(N) space.
    """
    stack = Stack()
    bracket_pairs = {')': '(', ']': '[', '}': '{'}

    for char in expression:
        if char in "([{":
            stack.push(char)
        elif char in ")]}":
            if stack.is_empty():
                return False
            top = stack.pop()
            if top != bracket_pairs[char]:
                return False

    return stack.is_empty()


def run_unit_tests():
    """Runs automated verification tests for Stack, Queue, and Bracket Validator."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 08")
    print("=" * 60)

    # Test Stack
    s = Stack()
    assert s.is_empty() == True, "Test 1 Failed: Stack empty check"
    s.push(10)
    s.push(20)
    assert s.size() == 2 and s.peek() == 20, "Test 2 Failed: Stack push & peek"
    assert s.pop() == 20 and s.pop() == 10, "Test 3 Failed: Stack LIFO order"
    assert s.is_empty() == True, "Test 4 Failed: Stack empty after pops"

    # Test Queue
    q = Queue()
    assert q.is_empty() == True, "Test 5 Failed: Queue empty check"
    q.enqueue("Task 1")
    q.enqueue("Task 2")
    assert q.size() == 2 and q.peek() == "Task 1", "Test 6 Failed: Queue enqueue & peek"
    assert q.dequeue() == "Task 1" and q.dequeue() == "Task 2", "Test 7 Failed: Queue FIFO order"
    assert q.is_empty() == True, "Test 8 Failed: Queue empty after dequeues"

    # Test Bracket Validator
    valid_test_cases = ["([]{})", "{[()()]}", "a + (b * [c - {d}])", ""]
    invalid_test_cases = ["([)]", "((()", "]", "{(})"]

    for expr in valid_test_cases:
        assert validate_brackets(expr) == True, f"Test Failed: Valid expression '{expr}' failed"

    for expr in invalid_test_cases:
        assert validate_brackets(expr) == False, f"Test Failed: Invalid expression '{expr}' passed"

    print("[PASS] All 10 Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 08."""
    stack = Stack()
    queue = Queue()

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 08] STACKS & QUEUES PLAYGROUND")
        print("=" * 60)
        print(f" Current {stack}")
        print(f" Current {queue}")
        print("-" * 60)
        print(" [1] Stack: Push Element")
        print(" [2] Stack: Pop Element")
        print(" [3] Stack: Peek Top Element")
        print(" [4] Queue: Enqueue Element")
        print(" [5] Queue: Dequeue Element")
        print(" [6] Queue: Peek Front Element")
        print(" [7] Validate Brackets Expression")
        print(" [8] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-8): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 08 Playground.")
            break

        if choice == "1":
            val = input("Enter item to push to stack: ").strip()
            stack.push(val)
            print(f"[*] Pushed '{val}' to stack.")

        elif choice == "2":
            try:
                val = stack.pop()
                print(f"[*] Popped '{val}' from stack.")
            except IndexError as e:
                print(f"[Warning] Error: {e}")

        elif choice == "3":
            val = stack.peek()
            print(f"[*] Top element: '{val}'" if val is not None else "[Warning] Stack is empty.")

        elif choice == "4":
            val = input("Enter item to enqueue: ").strip()
            queue.enqueue(val)
            print(f"[*] Enqueued '{val}' to queue.")

        elif choice == "5":
            try:
                val = queue.dequeue()
                print(f"[*] Dequeued '{val}' from queue.")
            except IndexError as e:
                print(f"[Warning] Error: {e}")

        elif choice == "6":
            val = queue.peek()
            print(f"[*] Front element: '{val}'" if val is not None else "[Warning] Queue is empty.")

        elif choice == "7":
            expr = input("Enter mathematical expression with brackets: ").strip()
            is_valid = validate_brackets(expr)
            print(f"Result: {'[PASS] Brackets are BALANCED!' if is_valid else '[FAIL] UNBALANCED or mismatched brackets.'}")

        elif choice == "8":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 08 Playground. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 8.")


if __name__ == "__main__":
    interactive_cli()
