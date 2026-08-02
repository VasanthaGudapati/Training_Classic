# 🧵 Day 15: Introduction to Multi-threading

## 📚 Concepts Learned Today
- **Concurrency vs. Parallelism**: Concurrency is dealing with lots of things at once; parallelism is doing lots of things at once.
- **Python `threading` Module**: Creating and managing OS threads using `threading.Thread(target=..., args=...)`.
- **Thread Lifecycle**:
  - `start()`: Spawns the thread execution flow.
  - `join()`: Blocks the calling thread until the target thread terminates.
- **Global Interpreter Lock (GIL)**: Python's mutex lock that prevents multiple native threads from executing Python bytecode simultaneously. Excellent for **I/O-bound** tasks (network, disk, sleep), but limited for CPU-bound tasks.
- **Sequential vs Concurrent Benchmarking**: Demonstrating massive time savings when running I/O-bound operations concurrently.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day15/main.py
```
