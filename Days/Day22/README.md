# 🌐 Day 22: Disjoint Set Union (DSU) & Kruskal's MST Algorithm

## 📚 Concepts Learned Today
- **Disjoint Set Union (DSU / Union-Find)**: A data structure that tracks a partition of a set into disjoint (non-overlapping) subsets.
- **Key Optimizations**:
  - **Path Compression**: Flattens tree structure during `find()` operations by pointing nodes directly to the representative root.
  - **Union by Rank**: Attaches smaller tree under root of larger tree to keep tree height minimal.
  - **Time Complexity**: Near-constant amortized time complexity $O(\alpha(N))$ per operation, where $\alpha$ is the Inverse Ackermann function.
- **Kruskal's Minimum Spanning Tree (MST) Algorithm**:
  - A greedy algorithm that finds a subset of edges connecting all vertices in a weighted graph with minimum total edge weight and no cycles.
  - **Steps**: Sort edges by weight $O(E \log E)$, iterate through sorted edges, and use DSU to add edge if endpoints are in different components.
- **Real-World Application**: Minimum cost infrastructure design (fiber optic cables, power grids, road networks).

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day22/main.py
```
