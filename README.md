# 🎓 CSForge - Days 1 to 5 Training Repository

Learn • Practice • Build • Get Hired

Welcome to **CSForge**! This repository organizes daily Computer Science practice, data structures, algorithms, and interactive CLI tools.

---

## 📂 Days Folder Structure (`Days/`)

All daily training projects are organized inside a single top-level `Days/` folder:

```
Days/
├── Day01/   # 🎯 Variables, Flow Control & Number Guessing Game CLI
├── Day02/   # 📊 Dynamic Arrays, Resizing Visualizer & Benchmark
├── Day03/   # 🔤 Strings, Substring Searching & Sliding Window
├── Day04/   # 🔁 Recursion, Call Stack Visualizer & Memoization Benchmark
└── Day05/   # 🔗 Singly & Doubly Linked Lists & Floyd's Cycle Detection
```

---

## 🚀 How to Run Each Day

You can run any day's interactive CLI playground directly from the repository root:

```bash
# Day 01: Number Guessing Game
python Days/Day01/main.py

# Day 02: Dynamic Array Memory Visualizer
python Days/Day02/main.py

# Day 03: String Manipulation Toolkit
python Days/Day03/main.py

# Day 04: Recursion & Time Complexity Benchmark
python Days/Day04/main.py

# Day 05: Linked List Visualizer & Cycle Detector
python Days/Day05/main.py
```

---

## 🧪 Running Automated Unit Tests

Each Day includes a comprehensive suite of automated unit tests:

```bash
python -c "import Days.Day01.main; import Days.Day02.main as d2; d2.run_unit_tests(); import Days.Day03.main as d3; d3.run_unit_tests(); import Days.Day04.main as d4; d4.run_unit_tests(); import Days.Day05.main as d5; d5.run_unit_tests()"
```

Happy Coding! 🚀
