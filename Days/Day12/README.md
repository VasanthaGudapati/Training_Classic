# 🕸️ Day 12: Graph Representations, BFS & DFS Traversals

## 📚 Concepts Learned Today
- **Graph Fundamentals**: Non-linear data structure consisting of vertices (nodes) $V$ and edges (connections) $E$.
- **Graph Representation**:
  - **Adjacency List**: Hash map mapping each vertex to its list of neighbors (space efficient $O(V + E)$).
  - **Directed vs. Undirected Edges**: Bi-directional links for social networks vs one-way links for dependency networks.
- **Graph Traversals**:
  - **Breadth-First Search (BFS)**: Level-by-level exploration using a Queue ($O(V + E)$ time). Guaranteed to find shortest path in unweighted graphs!
  - **Depth-First Search (DFS)**: Exploring deeply along each branch using recursion or Stack ($O(V + E)$ time).
- **Shortest Path & Path Finding**: Finding shortest path length and node sequence between source and destination.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day12/main.py
```
