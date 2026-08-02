# 🗄️ Day 17: Caching Strategy: The FIFO Cache Simulator

## 📚 Concepts Learned Today
- **Cache Memory & Locality**: Storing high-frequency data in fast, low-latency memory to reduce expensive lookups.
- **FIFO (First-In, First-Out) Eviction Policy**: A queue-based eviction strategy where the item residing in the cache the longest is evicted first when capacity is reached.
- **Cache Metrics**:
  - **Cache Hit**: Requested key exists in cache.
  - **Cache Miss**: Requested key missing, requiring a fetch from underlying store.
  - **Hit Ratio**: $\frac{\text{Hits}}{\text{Hits} + \text{Misses}} \times 100\%$
- **Data Structures**: Hash map (`dict`) for $O(1)$ key-value lookups paired with a FIFO double-ended queue (`collections.deque` or list) for insertion tracking.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day17/main.py
```
