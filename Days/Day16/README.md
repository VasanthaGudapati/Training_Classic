# 🔒 Day 16: Thread Synchronization & Locks

## 📚 Concepts Learned Today
- **Critical Section**: A block of code that accesses shared mutable state and must not be executed by more than one thread simultaneously.
- **Race Condition**: Flaw in a concurrent system where output is dependent on non-deterministic sequence/timing of thread execution.
- **Mutual Exclusion (Mutex)**: Mechanism ensuring only one thread enters a critical section at a time.
- **Thread Locks (`threading.Lock`)**:
  - `acquire()`: Blocks until lock becomes available, then claims ownership.
  - `release()`: Relinquishes ownership of lock for waiting threads.
  - `with lock:` (Context Manager): Ensures lock release even if exceptions occur inside critical section.
- **Data Integrity**: Guaranteeing mathematical correctness in multi-threaded counter updates.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day16/main.py
```
