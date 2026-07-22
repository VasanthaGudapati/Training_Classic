"""
Day 15: Introduction to Multi-threading
Practical Task: Implement basic thread spawns.

Requirements:
- Spawn 5 worker threads using Python's standard `threading` module.
- Each thread should execute a task, print start/end messages, and call time.sleep().
- Notice and analyze how the console log statements are interleaved as execution splits concurrently.
"""

import threading
import time
import random

def worker_task(thread_id: int):
    """Simple task simulating concurrent work."""
    print(f"[Thread-{thread_id}] Started execution...")
    # Simulate dynamic work times
    sleep_duration = random.uniform(0.5, 2.0)
    time.sleep(sleep_duration)
    print(f"[Thread-{thread_id}] Finished after {sleep_duration:.2f} seconds.")

def run_threads():
    threads = []
    print("[*] Spawning 5 worker threads concurrently...")
    
    for i in range(1, 6):
        # Create thread
        t = threading.Thread(target=worker_task, args=(i,))
        threads.append(t)
        # Start execution
        t.start()
        
    print("[*] All threads started. Waiting for them to complete (join)...")
    
    # Wait for all threads to finish
    for t in threads:
        t.join()
        
    print("[*] All worker threads have finished execution.")

if __name__ == "__main__":
    print("--- Testing Day 15: Multi-threading Basics ---")
    run_threads()
