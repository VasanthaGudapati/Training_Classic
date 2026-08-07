# 🎒 Day 23: Dynamic Programming (0/1 Knapsack Problem)

## 📚 Concepts Learned Today
- **Dynamic Programming (DP)**: An algorithmic paradigm for solving complex problems by breaking them down into overlapping subproblems with optimal substructure.
- **0/1 Knapsack Problem**:
  - Given $N$ items each with a weight $w_i$ and value $v_i$, determine the maximum value achievable within weight capacity $W$.
  - Each item can either be taken (1) or left behind (0) — no fractional items allowed.
- **Approaches Compared**:
  - **Pure Brute-Force Recursion**: $O(2^N)$ exponential time, re-calculating redundant subproblems.
  - **Top-Down Memoization**: $O(N \times W)$ time using recursion + caching dictionary/table.
  - **Bottom-Up 2D Tabulation**: $O(N \times W)$ time and space iterative DP grid.
  - **Space-Optimized 1D Tabulation**: $O(N \times W)$ time and $O(W)$ space using backwards inner loop iteration.
- **Item Backtracking**: Tracing selected items backwards through the completed 2D DP matrix.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day23/main.py
```
