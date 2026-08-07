# 🌲 Day 20: Priority Queue & Binary Heap (Min/Max Heap)

## 📚 Concepts Learned Today
- **Binary Heap Property**: Complete binary tree structure mapped efficiently to a 0-indexed contiguous array where parent/child relationships are calculated via indices:
  - $\text{Parent}(i) = \lfloor \frac{i - 1}{2} \rfloor$
  - $\text{Left Child}(i) = 2i + 1$
  - $\text{Right Child}(i) = 2i + 2$
- **Heap Operations**:
  - **Insertion**: Add item to array end and `heapify_up` ($O(\log N)$ time complexity).
  - **Extract Top Element**: Replace root with last element and `heapify_down` ($O(\log N)$ time complexity).
  - **Build Heap (Floyd's Algorithm)**: Heapifying array bottom-up in $O(N)$ time complexity.
- **Priority Queue Application**: Simulates real-world process task scheduling based on priority weights rather than arrival order (FIFO).

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day20/main.py
```
