# 🌲 Day 11: Binary Search Trees (BST) Basics

## 📚 Concepts Learned Today
- **BST Invariant Property**: For every node $N$, all nodes in its left subtree have values strictly less than $N.value$, and all nodes in its right subtree have values greater than or equal to $N.value$.
- **Efficient Operations**:
  - **Search**: $O(\log N)$ average-case lookup by discarding half of the search space at each step.
  - **Insertion**: $O(\log N)$ average-case insertion placing elements in sorted tree locations.
  - **Deletion**: Handling 3 cases (leaf node, 1 child node, 2 children nodes replaced by in-order successor).
- **BST Validation**: Verifying that a binary tree conforms to the valid BST property across all nodes.
- **In-Order Property**: Running In-Order traversal on a BST yields sorted elements in ascending order.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day11/main.py
```
