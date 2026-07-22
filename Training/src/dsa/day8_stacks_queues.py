"""
Day 8: Stacks & Queues (Linear Structures)
Practical Task: Build Stack and Queue structures and solve a validation puzzle.

Requirements:
- Implement a Stack class (LIFO) supporting push(), pop(), peek(), is_empty(), and size().
- Implement a Queue class (FIFO) supporting enqueue(), dequeue(), is_empty(), and size().
- Use the Stack to implement validate_brackets(expression) checking if (), [], {} are balanced.
"""

class Stack:
    def __init__(self):
        self.items = []

    def push(self, item) -> None:
        self.items.append(item)

    def pop(self):
        if self.is_empty():
            raise IndexError("Pop from empty stack")
        return self.items.pop()

    def peek(self):
        if self.is_empty():
            return None
        return self.items[-1]

    def is_empty(self) -> bool:
        return len(self.items) == 0

    def size(self) -> int:
        return len(self.items)

class Queue:
    def __init__(self):
        self.items = []

    def enqueue(self, item) -> None:
        self.items.append(item)

    def dequeue(self):
        if self.is_empty():
            raise IndexError("Dequeue from empty queue")
        return self.items.pop(0)

    def is_empty(self) -> bool:
        return len(self.items) == 0

    def size(self) -> int:
        return len(self.items)

def validate_brackets(expression: str) -> bool:
    """Uses a stack to validate if the brackets in expression are balanced."""
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

if __name__ == "__main__":
    print("--- Testing Day 8: Stacks, Queues, & Brackets ---")
    
    print("\nTesting Stack:")
    s = Stack()
    s.push(1)
    s.push(2)
    print("Popped:", s.pop()) # 2
    print("Peek:", s.peek())  # 1
    
    print("\nTesting Queue:")
    q = Queue()
    q.enqueue("A")
    q.enqueue("B")
    print("Dequeued:", q.dequeue()) # A
    print("Dequeued:", q.dequeue()) # B
    
    print("\nTesting Bracket Validation:")
    test_expressions = [
        "([]{})",      # True
        "([)]",        # False
        "{[()()]}",    # True
        "((()",        # False
        "",            # True
    ]
    for expr in test_expressions:
        print(f"Expression '{expr}' balanced?:", validate_brackets(expr))
