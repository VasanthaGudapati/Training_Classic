"""
Day 04: Recursion & Time Complexity Analysis
Practical Task: Interactive CLI Recursion Visualizer & Memoization Benchmark.
"""

import time
import functools
from typing import Dict, List, Tuple


def factorial(n: int, depth: int = 0, trace: bool = False) -> int:
    """Computes factorial recursively with call stack tracing support."""
    if trace:
        indent = "  " * depth
        print(f"{indent}➡️ factorial({n}) called")

    if n < 0:
        raise ValueError("Factorial is undefined for negative numbers.")
    if n <= 1:
        if trace:
            print(f"{indent}⬅️ Base case reached: factorial({n}) = 1")
        return 1

    result = n * factorial(n - 1, depth + 1, trace)
    if trace:
        print(f"{indent}⬅️ Returning: factorial({n}) = {result}")
    return result


def fibonacci_naive(n: int) -> int:
    """Computes N-th Fibonacci number recursively in O(2^N) exponential time."""
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fibonacci_naive(n - 1) + fibonacci_naive(n - 2)


def fibonacci_memoized(n: int, memo: Dict[int, int] = None) -> int:
    """Computes N-th Fibonacci number using Memoization (Top-down DP) in O(N) time."""
    if memo is None:
        memo = {}
    if n in memo:
        return memo[n]
    if n <= 0:
        return 0
    if n == 1:
        return 1

    memo[n] = fibonacci_memoized(n - 1, memo) + fibonacci_memoized(n - 2, memo)
    return memo[n]


def tower_of_hanoi(n: int, source: str, target: str, auxiliary: str, moves: List[str] = None) -> List[str]:
    """Solves the classic Tower of Hanoi problem recursively in O(2^N) steps."""
    if moves is None:
        moves = []
    if n == 1:
        moves.append(f"Move disk 1 from {source} ➡️ {target}")
        return moves

    tower_of_hanoi(n - 1, source, auxiliary, target, moves)
    moves.append(f"Move disk {n} from {source} ➡️ {target}")
    tower_of_hanoi(n - 1, auxiliary, target, source, moves)
    return moves


def benchmark_fibonacci(n: int = 30):
    """Compares execution speed of Naive O(2^N) vs Memoized O(N) Fibonacci."""
    print("\n" + "=" * 60)
    print(f" ⏱️ BENCHMARK: FIBONACCI({n}) SPEED COMPARISON")
    print("=" * 60)

    # Measure Memoized
    t0 = time.perf_counter()
    res_memo = fibonacci_memoized(n)
    t1 = time.perf_counter()
    memo_time = (t1 - t0) * 1000

    print(f"⚡ [Memoized O(N)]   Result: {res_memo} | Time: {memo_time:.5f} ms")

    # Measure Naive
    if n > 35:
        print("⚠️ Naive calculation skipped to prevent long execution delay.")
    else:
        t0 = time.perf_counter()
        res_naive = fibonacci_naive(n)
        t1 = time.perf_counter()
        naive_time = (t1 - t0) * 1000
        print(f"🐢 [Naive O(2^N)]    Result: {res_naive} | Time: {naive_time:.5f} ms")
        
        speedup = naive_time / memo_time if memo_time > 0 else 1
        print(f"\n🚀 Memoization is approximately {speedup:,.1f}x FASTER!")
    print("=" * 60 + "\n")


def run_unit_tests():
    """Runs automated verification tests for Day 04 functions."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 04")
    print("=" * 60)

    # Test Factorial
    assert factorial(0) == 1, "Test 1 Failed: factorial(0)"
    assert factorial(5) == 120, "Test 2 Failed: factorial(5)"

    # Test Fibonacci Naive vs Memoized
    for val in [0, 1, 5, 10, 15]:
        assert fibonacci_naive(val) == fibonacci_memoized(val), f"Test Failed: Fib mismatch at {val}"
    assert fibonacci_memoized(20) == 6765, "Test 3 Failed: fibonacci_memoized(20)"

    # Test Hanoi
    hanoi_moves = tower_of_hanoi(3, 'A', 'C', 'B')
    assert len(hanoi_moves) == 2**3 - 1, "Test 4 Failed: Tower of Hanoi step count (2^N - 1)"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 04."""
    while True:
        print("\n" + "=" * 60)
        print(" [DAY 04] RECURSION & COMPLEXITY VISUALIZER PLAYGROUND")
        print("=" * 60)
        print(" [1] Calculate Factorial (with Call Stack Trace)")
        print(" [2] Compare Naive vs Memoized Fibonacci")
        print(" [3] Tower of Hanoi Move Visualizer")
        print(" [4] Run Benchmark (Fibonacci N=32)")
        print(" [5] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-5): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 04 Recursion Toolkit.")
            break

        if choice == "1":
            n_str = input("Enter non-negative integer N (e.g. 5): ").strip()
            if n_str.isdigit():
                val = int(n_str)
                print(f"\n--- Call Stack Tracing for Factorial({val}) ---")
                res = factorial(val, trace=True)
                print(f"\n🎉 Result: {val}! = {res}")
            else:
                print("⚠️ Please enter a valid non-negative integer.")

        elif choice == "2":
            n_str = input("Enter N for Fibonacci (e.g. 10): ").strip()
            if n_str.isdigit():
                val = int(n_str)
                print(f"\nResult (Memoized): {fibonacci_memoized(val)}")
                if val <= 30:
                    print(f"Result (Naive):    {fibonacci_naive(val)}")
            else:
                print("⚠️ Invalid number.")

        elif choice == "3":
            disks_str = input("Enter number of disks for Tower of Hanoi (1-5): ").strip()
            if disks_str.isdigit() and 1 <= int(disks_str) <= 8:
                d = int(disks_str)
                moves = tower_of_hanoi(d, 'Tower A', 'Tower C', 'Tower B')
                print(f"\n🏰 Tower of Hanoi Steps for {d} disks (Total Moves: {len(moves)}):")
                for step, move in enumerate(moves, 1):
                    print(f"  Step {step:2d}: {move}")
            else:
                print("⚠️ Please enter a number between 1 and 8.")

        elif choice == "4":
            benchmark_fibonacci(32)

        elif choice == "5":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 04 Recursion Playground. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid option. Enter a digit between 0 and 5.")


if __name__ == "__main__":
    interactive_cli()
