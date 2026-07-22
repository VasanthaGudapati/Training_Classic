"""
Day 4: Recursion & Complexity Basics (Big O)
Practical Task: Create recursive mathematical models and timing benchmarks.

Requirements:
- Write recursive implementations of factorial(n) and fibonacci(n).
- Add a custom timer decorator to measure runtime differences as input size grows.
"""

import time
import functools

def timer_decorator(func):
    """Timer decorator to measure execution duration."""
    @functools.wraps(func)
    def wrapper(*args, **kwargs):
        start = time.perf_counter()
        result = func(*args, **kwargs)
        end = time.perf_counter()
        elapsed = end - start
        # Print only top-level calls (we can control nested prints via depth check or just simple prints)
        print(f"[*] {func.__name__}({args[0]}) completed in {elapsed:.8f} seconds")
        return result
    return wrapper

def factorial(n: int) -> int:
    """Computes factorial of n recursively."""
    if n <= 1:
        return 1
    return n * factorial(n - 1)

def fibonacci(n: int) -> int:
    """Computes N-th Fibonacci number recursively (exponential complexity O(2^N))."""
    if n <= 0:
        return 0
    if n == 1:
        return 1
    return fibonacci(n - 1) + fibonacci(n - 2)

# Wrapper functions decorated with timing
@timer_decorator
def timed_factorial(n: int) -> int:
    return factorial(n)

@timer_decorator
def timed_fibonacci(n: int) -> int:
    return fibonacci(n)

if __name__ == "__main__":
    print("--- Testing Day 4: Recursion & Timing ---")
    print("Factorial of 5:", timed_factorial(5))
    print("Factorial of 10:", timed_factorial(10))
    
    print("\nNotice the time difference for Fibonacci as n grows:")
    print("Fibonacci of 10:", timed_fibonacci(10))
    print("Fibonacci of 20:", timed_fibonacci(20))
    print("Fibonacci of 30:", timed_fibonacci(30))
