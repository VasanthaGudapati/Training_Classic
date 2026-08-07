# 🕸️ Day 24: Dijkstra's Shortest Path Algorithm

## 📚 Concepts Learned Today
- **Single-Source Shortest Path**: Finding the minimum cumulative edge weight path from a starting node to all other nodes in a weighted non-negative graph.
- **Priority Queue Optimization**:
  - Naive Dijkstra: $O(V^2)$ using array search for minimum distance node.
  - Min-Heap Accelerated Dijkstra: $O((V + E) \log V)$ using Min-Heap priority queue to efficiently extract the unvisited node with minimum distance.
- **Path Reconstruction**: Utilizing a predecessor map (`previous[node]`) to backtrack and reconstruct the exact step-by-step optimal path sequence.
- **Real-World Applications**: OSPF/IS-IS internet packet routing protocols, GPS mapping navigation (Google Maps, Waze), and flight route optimization.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day24/main.py
```
