# 🔑 Day 09: Custom Hash Tables & HashMaps

## 📚 Concepts Learned Today
- **Hash Function Design**: Mapping keys (strings or integers) to bucket indices using a polynomial rolling hash function (`hash_val = (hash_val * prime + ord(char)) % buckets`).
- **Collision Resolution via Separate Chaining**: Handling hash collisions by storing lists of `(key, value)` tuples in each bucket array.
- **Time & Space Complexity**: Average $O(1)$ insertion, lookup, and deletion vs $O(N)$ worst-case collision degradation.
- **Rehashing & Load Factor**: Resizing table capacity and re-indexing existing items when size surpasses load threshold ($0.75$).

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day09/main.py
```
