# 🌳 Day 10: Binary Trees & Tree Traversals

## 📚 Concepts Learned Today
- **Tree Fundamentals**: Non-linear hierarchical data structure consisting of parent nodes, child pointers (`left`, `right`), root node, and leaf nodes.
- **Depth-First Search (DFS) Traversals**:
  - **In-Order (L-N-R)**: Visits left subtree, current node, right subtree (yields sorted sequence in BSTs).
  - **Pre-Order (N-L-R)**: Visits current node, left subtree, right subtree (ideal for cloning/serializing trees).
  - **Post-Order (L-R-N)**: Visits left subtree, right subtree, current node (ideal for deleting nodes/evaluating syntax trees).
- **Breadth-First Search (BFS / Level-Order)**: Level-by-level traversal using a Queue.
- **Tree Metrics**: Calculating max depth/height, total node count, and leaf node count recursively.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day10/main.py
```
