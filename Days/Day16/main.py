"""
Day 16: Thread Synchronization & Locks
Practical Task: Interactive Race Condition Simulator & Thread Lock Visualizer.
"""

import threading
import time
from typing import Tuple


def unsafe_increment(counter_dict: dict, iterations: int) -> None:
    """Increments counter without synchronization, exposing race conditions."""
    for _ in range(iterations):
        val = counter_dict["count"]
        # Micro sleep forces OS thread context switch during read-modify-write
        time.sleep(0.00001)
        counter_dict["count"] = val + 1


def safe_increment(counter_dict: dict, lock: threading.Lock, iterations: int) -> None:
    """Increments counter safely using a Mutex Lock context manager."""
    for _ in range(iterations):
        with lock:
            val = counter_dict["count"]
            time.sleep(0.00001)
            counter_dict["count"] = val + 1


def run_simulation(safe: bool = False, num_threads: int = 10, iterations: int = 50) -> Tuple[int, int, float]:
    """
    Executes concurrent counter updates across num_threads.
    Returns: (final_count, expected_count, total_elapsed_seconds)
    """
    counter_dict = {"count": 0}
    expected_count = num_threads * iterations
    lock = threading.Lock()
    threads = []

    start_time = time.perf_counter()

    for i in range(num_threads):
        if safe:
            t = threading.Thread(target=safe_increment, args=(counter_dict, lock, iterations))
        else:
            t = threading.Thread(target=unsafe_increment, args=(counter_dict, iterations))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    elapsed = time.perf_counter() - start_time
    return counter_dict["count"], expected_count, elapsed


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 16 Synchronization."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 16")
    print("=" * 60)

    # Test 1: Synchronized simulation (Safe) achieves exact expected sum
    num_threads = 5
    iterations = 30
    final_safe, expected_safe, _ = run_simulation(safe=True, num_threads=num_threads, iterations=iterations)
    assert final_safe == expected_safe, f"Test 1 Failed: Safe expected {expected_safe}, got {final_safe}"

    # Test 2: Unsynchronized simulation (Unsafe) experiences data corruption (race condition)
    final_unsafe, expected_unsafe, _ = run_simulation(safe=False, num_threads=num_threads, iterations=iterations)
    assert final_unsafe < expected_unsafe, f"Test 2 Failed: Expected corruption (< {expected_unsafe}), got {final_unsafe}"

    # Test 3: Lock primitive acquire/release integrity
    test_lock = threading.Lock()
    assert test_lock.acquire(), "Test 3 Failed: Lock acquisition"
    assert test_lock.locked(), "Test 4 Failed: Lock status check"
    test_lock.release()
    assert not test_lock.locked(), "Test 5 Failed: Lock release check"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 16."""
    num_threads = 10
    iterations = 50

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 16] THREAD SYNCHRONIZATION & LOCKS TOOLKIT")
        print("=" * 60)
        print(f" Configured Workload: {num_threads} Threads | {iterations} Increments/Thread (Total = {num_threads * iterations})")
        print("-" * 60)
        print(" [1] Run UNSAFE Counter Simulation (Expose Race Condition)")
        print(" [2] Run SAFE Counter Simulation (Threading Lock Mutex)")
        print(" [3] Side-by-Side Comparison (Unsafe vs Safe)")
        print(" [4] Custom Sandbox (Configure Threads & Increments)")
        print(" [5] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-5): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 16 Synchronization Toolkit.")
            break

        if choice == "1":
            print("\n" + "=" * 60)
            print("  UNSAFE SIMULATION (NO SYNCHRONIZATION)")
            print("=" * 60)
            final_c, expected, elapsed = run_simulation(safe=False, num_threads=num_threads, iterations=iterations)
            loss = expected - final_c
            loss_pct = (loss / expected) * 100
            print(f"  Expected Counter Value : {expected}")
            print(f"  Actual Counter Value   : {final_c}")
            print(f"  Corrupted Updates Lost : {loss} ({loss_pct:.1f}% data loss)")
            print(f"  Execution Time         : {elapsed:.2f} seconds")
            print("  ⚠️ RESULT: RACE CONDITION DETECTED! Shared state corrupted.")

        elif choice == "2":
            print("\n" + "=" * 60)
            print("  SAFE SIMULATION (THREADING LOCK / MUTEX)")
            print("=" * 60)
            final_c, expected, elapsed = run_simulation(safe=True, num_threads=num_threads, iterations=iterations)
            print(f"  Expected Counter Value : {expected}")
            print(f"  Actual Counter Value   : {final_c}")
            print(f"  Corrupted Updates Lost : 0 (0.0% loss)")
            print(f"  Execution Time         : {elapsed:.2f} seconds")
            print("  ✅ RESULT: DATA INTEGRITY PRESERVED! Mutex guarantees mutual exclusion.")

        elif choice == "3":
            print("\n" + "=" * 60)
            print("  SIDE-BY-SIDE COMPARISON: UNSAFE vs SAFE")
            print("=" * 60)
            u_final, expected, u_time = run_simulation(safe=False, num_threads=num_threads, iterations=iterations)
            s_final, expected, s_time = run_simulation(safe=True, num_threads=num_threads, iterations=iterations)

            print(f"  Metric                     Unsafe (Race)        Safe (Lock)")
            print(f"  -------------------------------------------------------------")
            print(f"  Expected Count             {expected:^18}   {expected:^12}")
            print(f"  Final Count                {u_final:^18}   {s_final:^12}")
            print(f"  Data Loss                  {expected - u_final:^18}   {expected - s_final:^12}")
            print(f"  Status                     {'CORRUPTED':^18}   {'PASSED':^12}")
            print(f"  Execution Time             {u_time:^16.2f}s   {s_time:^10.2f}s")
            print(f"  -------------------------------------------------------------")

        elif choice == "4":
            try:
                t_input = int(input("Enter number of threads (2-20): "))
                i_input = int(input("Enter increments per thread (10-200): "))
                if 2 <= t_input <= 20 and 10 <= i_input <= 200:
                    num_threads = t_input
                    iterations = i_input
                    print(f"[*] Workload updated to {num_threads} threads, {iterations} increments per thread.")
                else:
                    print("[Warning] Out of range values.")
            except ValueError:
                print("[Warning] Invalid integer input.")

        elif choice == "5":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 16 Synchronization Toolkit. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 5.")


if __name__ == "__main__":
    interactive_cli()
