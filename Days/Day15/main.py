"""
Day 15: Introduction to Multi-threading
Practical Task: Interactive Multi-threading Playground & Concurrency Benchmark.
"""

import threading
import time
import random
from typing import List, Dict, Tuple


def worker_task(thread_id: int, duration: float, log_list: List[str], lock: threading.Lock) -> None:
    """Simulates an I/O-bound worker task with safe thread-logging."""
    with lock:
        log_list.append(f"[Thread-{thread_id:02d}] 🚀 Started (Simulated work: {duration:.2f}s)")

    time.sleep(duration)

    with lock:
        log_list.append(f"[Thread-{thread_id:02d}] ✅ Completed after {duration:.2f}s")


def run_concurrent_threads(num_threads: int, min_sleep: float = 0.2, max_sleep: float = 0.5) -> Tuple[List[str], float]:
    """Spawns num_threads worker threads concurrently and waits for completion via join()."""
    threads: List[threading.Thread] = []
    log_list: List[str] = []
    lock = threading.Lock()

    start_time = time.perf_counter()

    for i in range(1, num_threads + 1):
        duration = random.uniform(min_sleep, max_sleep)
        t = threading.Thread(target=worker_task, args=(i, duration, log_list, lock), name=f"Worker-{i}")
        threads.append(t)

    for t in threads:
        t.start()

    for t in threads:
        t.join()

    total_time = time.perf_counter() - start_time
    return log_list, total_time


def run_sequential_tasks(num_tasks: int, min_sleep: float = 0.2, max_sleep: float = 0.5) -> float:
    """Executes num_tasks sequentially in a single thread for speedup comparison."""
    start_time = time.perf_counter()

    for i in range(1, num_tasks + 1):
        duration = random.uniform(min_sleep, max_sleep)
        time.sleep(duration)

    return time.perf_counter() - start_time


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 15 Multi-threading."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 15")
    print("=" * 60)

    # Test 1: Spawning 5 threads completes successfully
    logs, concurrent_time = run_concurrent_threads(5, min_sleep=0.1, max_sleep=0.1)
    assert len(logs) == 10, f"Test 1 Failed: Expected 10 log messages (5 start + 5 end), got {len(logs)}"
    assert concurrent_time < 2.0, f"Test 2 Failed: Concurrent time expected < 2.0s, got {concurrent_time:.2f}s"

    # Test 2: Verify all 5 threads logged start and end
    starts = [log for log in logs if "Started" in log]
    completes = [log for log in logs if "Completed" in log]
    assert len(starts) == 5, "Test 3 Failed: 5 threads started"
    assert len(completes) == 5, "Test 4 Failed: 5 threads completed"

    # Test 3: Concurrency speedup test (5 threads x 0.2s sleep)
    fixed_sleep = 0.2
    start_t = time.perf_counter()
    threads = []
    log_test: List[str] = []
    lock_test = threading.Lock()

    for i in range(5):
        t = threading.Thread(target=worker_task, args=(i + 1, fixed_sleep, log_test, lock_test))
        threads.append(t)
        t.start()

    for t in threads:
        t.join()

    c_time = time.perf_counter() - start_t
    s_time = fixed_sleep * 5  # 1.0s

    assert c_time < (s_time * 0.5), f"Test 5 Failed: Concurrent time ({c_time:.2f}s) should be much faster than sequential ({s_time:.2f}s)"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 15."""
    while True:
        print("\n" + "=" * 60)
        print(" [DAY 15] INTRODUCTION TO MULTI-THREADING TOOLKIT")
        print("=" * 60)
        print(" [1] Spawn 5 Concurrent Worker Threads (Observe Interleaving Log Output)")
        print(" [2] Benchmark Sequential vs Concurrent Execution (I/O Speedup)")
        print(" [3] Custom Thread Spawner Playground")
        print(" [4] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-4): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 15 Multi-threading Toolkit.")
            break

        if choice == "1":
            print("\n" + "=" * 60)
            print("  CONCURRENT WORKER THREADS EXECUTION LOG")
            print("=" * 60)
            logs, elapsed = run_concurrent_threads(5, min_sleep=0.5, max_sleep=1.5)
            for log in logs:
                print("  " + log)
            print("-" * 60)
            print(f"  ⏱️ Total Wall-Clock Execution Time: {elapsed:.2f} seconds")
            print("=" * 60)

        elif choice == "2":
            num_workers = 5
            sleep_per_worker = 0.4
            print("\n" + "=" * 60)
            print("  BENCHMARK: SEQUENTIAL vs CONCURRENT EXECUTION")
            print(f"  Workload: {num_workers} I/O-bound tasks, ~{sleep_per_worker}s work per task")
            print("=" * 60)

            print("  [*] Running Sequential Execution...")
            seq_time = run_sequential_tasks(num_workers, min_sleep=sleep_per_worker, max_sleep=sleep_per_worker)
            print(f"      Sequential Time : {seq_time:.2f} seconds")

            print("  [*] Running Concurrent Execution (5 Threads)...")
            _, conc_time = run_concurrent_threads(num_workers, min_sleep=sleep_per_worker, max_sleep=sleep_per_worker)
            print(f"      Concurrent Time : {conc_time:.2f} seconds")

            speedup = seq_time / conc_time if conc_time > 0 else 0
            print("-" * 60)
            print(f"  🏆 Speedup Factor : {speedup:.2f}x Faster with Concurrency!")
            print("=" * 60)

        elif choice == "3":
            try:
                n = int(input("Enter number of threads to spawn (1-20): "))
                if 1 <= n <= 20:
                    print(f"\n[*] Spawning {n} concurrent worker threads...")
                    logs, elapsed = run_concurrent_threads(n, min_sleep=0.2, max_sleep=0.8)
                    for log in logs:
                        print("  " + log)
                    print(f"[*] Total Execution Time for {n} threads: {elapsed:.2f} seconds")
                else:
                    print("[Warning] Please enter a number between 1 and 20.")
            except ValueError:
                print("[Warning] Invalid integer input.")

        elif choice == "4":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 15 Multi-threading Toolkit. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 4.")


if __name__ == "__main__":
    interactive_cli()
