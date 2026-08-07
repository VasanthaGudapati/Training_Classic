"""
Day 23: Dynamic Programming (0/1 Knapsack Problem)
Practical Task: Pure Recursion vs Memoization vs 2D/1D Tabulation,
DP Matrix Visualizer, Item Backtracking, and Performance Benchmark.
"""

import time
from typing import Dict, List, Tuple


def knapsack_recursive(weights: List[int], values: List[int], capacity: int) -> Tuple[int, int]:
    """
    Pure brute-force recursive 0/1 Knapsack solver.
    Time Complexity: O(2^N), Space Complexity: O(N) call stack.
    Returns (max_value, call_count).
    """
    call_count = 0

    def _solve(n: int, w: int) -> int:
        nonlocal call_count
        call_count += 1

        if n == 0 or w == 0:
            return 0

        # If weight of item n-1 exceeds remaining capacity w, skip it
        if weights[n - 1] > w:
            return _solve(n - 1, w)
        else:
            # Maximum of (including item n-1, excluding item n-1)
            include = values[n - 1] + _solve(n - 1, w - weights[n - 1])
            exclude = _solve(n - 1, w)
            return max(include, exclude)

    max_val = _solve(len(weights), capacity)
    return max_val, call_count


def knapsack_memoized(weights: List[int], values: List[int], capacity: int) -> Tuple[int, int]:
    """
    Top-down DP with Memoization.
    Time Complexity: O(N * W), Space Complexity: O(N * W).
    Returns (max_value, call_count).
    """
    memo: Dict[Tuple[int, int], int] = {}
    call_count = 0

    def _solve(n: int, w: int) -> int:
        nonlocal call_count
        call_count += 1

        if n == 0 or w == 0:
            return 0

        key = (n, w)
        if key in memo:
            return memo[key]

        if weights[n - 1] > w:
            result = _solve(n - 1, w)
        else:
            include = values[n - 1] + _solve(n - 1, w - weights[n - 1])
            exclude = _solve(n - 1, w)
            result = max(include, exclude)

        memo[key] = result
        return result

    max_val = _solve(len(weights), capacity)
    return max_val, call_count


def knapsack_tabulation_2d(
    weights: List[int], values: List[int], capacity: int
) -> Tuple[int, List[List[int]], List[int]]:
    """
    Bottom-up 2D Tabulation DP solver.
    Time Complexity: O(N * W), Space Complexity: O(N * W).
    Returns (max_value, dp_matrix, selected_indices).
    """
    n = len(weights)
    dp = [[0] * (capacity + 1) for _ in range(n + 1)]

    # Build DP matrix bottom-up
    for i in range(1, n + 1):
        w_i = weights[i - 1]
        v_i = values[i - 1]
        for w in range(1, capacity + 1):
            if w_i <= w:
                dp[i][w] = max(v_i + dp[i - 1][w - w_i], dp[i - 1][w])
            else:
                dp[i][w] = dp[i - 1][w]

    # Backtrack to identify selected item indices
    selected_indices: List[int] = []
    w = capacity
    for i in range(n, 0, -1):
        if dp[i][w] != dp[i - 1][w]:
            selected_indices.append(i - 1)
            w -= weights[i - 1]

    selected_indices.reverse()
    return dp[n][capacity], dp, selected_indices


def knapsack_space_optimized_1d(weights: List[int], values: List[int], capacity: int) -> int:
    """
    Bottom-up 1D Array Tabulation DP solver.
    Time Complexity: O(N * W), Space Complexity: O(W).
    """
    dp = [0] * (capacity + 1)

    for i in range(len(weights)):
        w_i = weights[i]
        v_i = values[i]
        # Iterate backwards to avoid using same item multiple times
        for w in range(capacity, w_i - 1, -1):
            dp[w] = max(dp[w], v_i + dp[w - w_i])

    return dp[capacity]


def run_performance_benchmark() -> None:
    """Compares pure recursion vs memoization vs tabulation execution performance."""
    print("\n" + "=" * 60)
    print(" [BENCHMARK] PURE RECURSION VS MEMOIZATION VS TABULATION")
    print("=" * 60)

    # 18 items test case to highlight exponential growth
    weights = [2, 3, 4, 5, 1, 6, 7, 8, 2, 3, 5, 4, 6, 7, 3, 2, 4, 5]
    values = [3, 4, 5, 8, 2, 9, 10, 12, 4, 5, 9, 7, 11, 12, 5, 3, 6, 8]
    capacity = 35

    print(f" Parameters: {len(weights)} items, Weight Capacity = {capacity}")

    # Pure Recursion
    t0 = time.perf_counter()
    rec_val, rec_calls = knapsack_recursive(weights, values, capacity)
    t1 = time.perf_counter()
    rec_time = (t1 - t0) * 1000

    # Memoized DP
    t0 = time.perf_counter()
    memo_val, memo_calls = knapsack_memoized(weights, values, capacity)
    t1 = time.perf_counter()
    memo_time = (t1 - t0) * 1000

    # 2D Tabulation
    t0 = time.perf_counter()
    tab2d_val, _, _ = knapsack_tabulation_2d(weights, values, capacity)
    t1 = time.perf_counter()
    tab2d_time = (t1 - t0) * 1000

    # 1D Tabulation
    t0 = time.perf_counter()
    tab1d_val = knapsack_space_optimized_1d(weights, values, capacity)
    t1 = time.perf_counter()
    tab1d_time = (t1 - t0) * 1000

    print("\n" + "-" * 60)
    print(f" {'Approach':<22} | {'Max Value':<10} | {'Calls / Ops':<12} | {'Time (ms)':<10}")
    print("-" * 60)
    print(f" {'Pure Recursion':<22} | {rec_val:<10} | {rec_calls:<12} | {rec_time:<10.3f}")
    print(f" {'Top-Down Memoization':<22} | {memo_val:<10} | {memo_calls:<12} | {memo_time:<10.3f}")
    print(f" {'Bottom-Up 2D DP':<22} | {tab2d_val:<10} | {'Matrix NxW':<12} | {tab2d_time:<10.3f}")
    print(f" {'Space-Opt 1D DP':<22} | {tab1d_val:<10} | {'Array 1xW':<12} | {tab1d_time:<10.3f}")
    print("-" * 60)
    reduction = (1 - (memo_calls / rec_calls)) * 100
    print(f" [RESULT] DP Memoization reduced function calls by {reduction:.2f}%!")
    print("=" * 60 + "\n")


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 23 0/1 Knapsack DP."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 23 (0/1 KNAPSACK DP)")
    print("=" * 60)

    weights = [10, 20, 30]
    values = [60, 100, 120]
    capacity = 50

    # Test 1: Verification across all 4 implementations
    v_rec, _ = knapsack_recursive(weights, values, capacity)
    v_memo, _ = knapsack_memoized(weights, values, capacity)
    v_2d, dp_mat, sel_idx = knapsack_tabulation_2d(weights, values, capacity)
    v_1d = knapsack_space_optimized_1d(weights, values, capacity)

    assert v_rec == 220, f"Test 1 Failed: Expected max value 220, got {v_rec}"
    assert v_memo == 220, f"Test 2 Failed: Memoized max value {v_memo} mismatch"
    assert v_2d == 220, f"Test 3 Failed: 2D Tabulation max value {v_2d} mismatch"
    assert v_1d == 220, f"Test 4 Failed: 1D Tabulation max value {v_1d} mismatch"

    # Test 2: Item Backtracking verification
    assert sel_idx == [1, 2], f"Test 5 Failed: Selected item indices expected [1, 2], got {sel_idx}"
    tot_weight = sum(weights[i] for i in sel_idx)
    tot_val = sum(values[i] for i in sel_idx)
    assert tot_weight == 50, f"Test 6 Failed: Total weight {tot_weight} should equal 50"
    assert tot_val == 220, f"Test 7 Failed: Total value {tot_val} should equal 220"

    # Test 3: Zero capacity edge case
    assert knapsack_space_optimized_1d(weights, values, 0) == 0, "Test 8 Failed: Zero capacity should return 0"
    assert knapsack_space_optimized_1d([], [], 50) == 0, "Test 9 Failed: Empty items should return 0"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 23."""
    weights = [2, 3, 4, 5]
    values = [3, 4, 5, 6]
    capacity = 5

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 23] DYNAMIC PROGRAMMING (0/1 KNAPSACK PROBLEM)")
        print("=" * 60)
        print(f" Loaded Items Count: {len(weights)} | Capacity W: {capacity}")
        print(" [1] Input Custom Items (Weights & Values) and Capacity")
        print(" [2] Solve 0/1 Knapsack & View Selected Items")
        print(" [3] Print Step-by-Step 2D DP Matrix Grid")
        print(" [4] Run Performance Benchmark (Recursion vs Memoization vs DP)")
        print(" [5] Load Spacecraft Payload Cargo Preset")
        print(" [6] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-6): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 23 Dynamic Programming Toolkit.")
            break

        if choice == "1":
            raw_w = input("Enter comma-separated weights (e.g. 2, 3, 4, 5): ").strip()
            raw_v = input("Enter comma-separated values (e.g. 3, 4, 5, 6): ").strip()
            raw_cap = input("Enter weight capacity limit W: ").strip()

            if raw_w and raw_v and raw_cap:
                try:
                    w_list = [int(x.strip()) for x in raw_w.split(",") if x.strip()]
                    v_list = [int(x.strip()) for x in raw_v.split(",") if x.strip()]
                    cap_val = int(raw_cap)

                    if len(w_list) != len(v_list):
                        print("\n[ERROR] Number of weights must match number of values.")
                    else:
                        weights, values, capacity = w_list, v_list, cap_val
                        print(f"\n[UPDATED] Successfully loaded {len(weights)} items with capacity {capacity}.")
                except ValueError:
                    print("\n[ERROR] Invalid integer inputs.")

        elif choice == "2":
            max_val, dp_mat, sel_idx = knapsack_tabulation_2d(weights, values, capacity)
            tot_w = sum(weights[i] for i in sel_idx)

            print("\n  --- 0/1 Knapsack Solution Summary ---")
            print(f"  Maximum Attainable Value : {max_val}")
            print(f"  Total Weight Utilized    : {tot_w} / {capacity}")
            print(f"  Selected Items Count     : {len(sel_idx)}")
            print("\n  Chosen Payload Items Breakdown:")
            for idx in sel_idx:
                print(f"   - Item #{idx + 1}: Weight = {weights[idx]}, Value = {values[idx]}")

        elif choice == "3":
            max_val, dp_mat, sel_idx = knapsack_tabulation_2d(weights, values, capacity)
            print(f"\n  --- 2D DP Matrix Table (Items vs Capacity 0..{capacity}) ---")

            header = f"  {'Item':<8} | " + " ".join([f"{w:>4}" for w in range(capacity + 1)])
            print(header)
            print("  " + "-" * len(header))

            print(f"  {'Row 0':<8} | " + " ".join([f"{dp_mat[0][w]:>4}" for w in range(capacity + 1)]))
            for i in range(1, len(weights) + 1):
                item_label = f"#{i} (w:{weights[i-1]},v:{values[i-1]})"
                row_str = " ".join([f"{dp_mat[i][w]:>4}" for w in range(capacity + 1)])
                print(f"  {item_label:<8} | {row_str}")

        elif choice == "4":
            run_performance_benchmark()

        elif choice == "5":
            weights = [5, 10, 15, 22, 25, 30]
            values = [50, 120, 180, 240, 280, 310]
            capacity = 45
            print(f"\n[PRESET LOADED] Spacecraft Cargo Payload Scenario: 6 high-value equipment modules, Max Capacity: {capacity} kg.")

        elif choice == "6":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 23 Dynamic Programming Toolkit.")
            break
        else:
            print("\n[INVALID] Please select a valid option (0-6).")


if __name__ == "__main__":
    interactive_cli()
