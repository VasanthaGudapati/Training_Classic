"""
Day 16: Thread Synchronization & Locks
Practical Task: Create a race condition and resolve it.

Requirements:
- Run 10 threads concurrently updating a shared counter in a loop without synchronization.
- Show that the final value gets corrupted (not reaching the theoretical count).
- Introduce a threading.Lock construct to create a safe critical section.
- Verify the final count reaches exact expectations.
"""

import threading
import time

shared_counter = 0
lock = threading.Lock()

def unsafe_increment(iterations: int):
    """Increments the shared counter without synchronization (potential race condition)."""
    global shared_counter
    for _ in range(iterations):
        current = shared_counter
        # Introduce a micro delay to maximize context switches / race conditions
        time.sleep(0.00001)
        shared_counter = current + 1

def safe_increment(iterations: int):
    """Increments the shared counter using a lock to establish a critical section."""
    global shared_counter
    for _ in range(iterations):
        with lock:
            current = shared_counter
            time.sleep(0.00001)
            shared_counter = current + 1

def run_simulation(safe: bool = False):
    global shared_counter
    shared_counter = 0
    num_threads = 5
    increments_per_thread = 100
    expected_sum = num_threads * increments_per_thread
    
    threads = []
    target_func = safe_increment if safe else unsafe_increment
    mode_str = "SAFE (with Lock)" if safe else "UNSAFE (Race Condition)"
    
    print(f"\n[*] Running simulation in {mode_str} mode...")
    
    for i in range(num_threads):
        t = threading.Thread(target=target_func, args=(increments_per_thread,))
        threads.append(t)
        t.start()
        
    for t in threads:
        t.join()
        
    print(f"  Result -> Shared Counter: {shared_counter} (Expected: {expected_sum})")
    if shared_counter == expected_sum:
        print("  [Pass] Counter matches expected value.")
    else:
        print("  [Fail] Counter is corrupted due to race conditions!")

if __name__ == "__main__":
    print("--- Testing Day 16: Thread Locks & Races ---")
    
    # Run without locks (unsafe)
    run_simulation(safe=False)
    
    # Run with locks (safe)
    run_simulation(safe=True)
