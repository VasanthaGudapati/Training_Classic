# 🔗 Day 05: Linked Lists (Singly & Doubly Linked Lists)

## 📚 Concepts Learned Today
- **Nodes & References**: Discrete memory allocations linked by pointers rather than contiguous memory blocks.
- **Singly Linked Lists**: Head pointer, insertion at head $O(1)$, insertion at tail $O(N)$ (or $O(1)$ with tail pointer), deletion, and search.
- **Doubly Linked Lists**: Bi-directional node pointers (`prev` and `next`), allowing $O(1)$ backward traversal and deletion.
- **In-Place Linked List Reversal**: Reversing node links iteratively using `prev`, `curr`, and `next_node` pointers in $O(N)$ time and $O(1)$ auxiliary space.
- **Cycle Detection (Floyd's Algorithm)**: Two pointers moving at different speeds (Tortoise & Hare) to detect cycles in $O(N)$ time.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day05/main.py
```
