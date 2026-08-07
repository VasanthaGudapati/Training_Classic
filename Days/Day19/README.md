# 🗄️ Day 19: Caching Strategy: The LRU Cache Simulator

## 📚 Concepts Learned Today
- **LRU (Least Recently Used) Eviction Policy**: Evicts the item that has not been accessed for the longest period when cache capacity limit is reached.
- **$O(1)$ Hash Map + Doubly Linked List Architecture**: Combines a Hash Map (`dict`) for $O(1)$ key lookup with a Doubly Linked List for $O(1)$ node updates (moving accessed items to MRU head and evicting LRU tail).
- **Temporal Locality**: Exploits modern access patterns where recently accessed data items have higher probability of being accessed again.
- **LRU vs FIFO Eviction Benchmarking**: Demonstrates performance advantages of LRU over FIFO when workloads exhibit repetitive or localized temporal patterns.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day19/main.py
```
