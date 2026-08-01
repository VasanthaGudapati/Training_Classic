"""
Day 06: Basic Search & Sorting Algorithms
Practical Task: Interactive CLI Sorting & Searching Visualizer & Benchmark.
"""

import random
import time
from typing import List, Tuple


def bubble_sort(arr: List[int], trace: bool = False) -> List[int]:
    """Sorts an array using Bubble Sort in O(N^2) time."""
    sorted_arr = list(arr)
    n = len(sorted_arr)
    passes = 0
    
    for i in range(n):
        swapped = False
        for j in range(0, n - i - 1):
            if sorted_arr[j] > sorted_arr[j + 1]:
                sorted_arr[j], sorted_arr[j + 1] = sorted_arr[j + 1], sorted_arr[j]
                swapped = True
        passes += 1
        if trace:
            print(f" Pass {passes}: {sorted_arr}")
        if not swapped:
            break
            
    return sorted_arr


def selection_sort(arr: List[int], trace: bool = False) -> List[int]:
    """Sorts an array using Selection Sort in O(N^2) time."""
    sorted_arr = list(arr)
    n = len(sorted_arr)
    
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if sorted_arr[j] < sorted_arr[min_idx]:
                min_idx = j
        sorted_arr[i], sorted_arr[min_idx] = sorted_arr[min_idx], sorted_arr[i]
        if trace:
            print(f" Pass {i + 1}: {sorted_arr}")
            
    return sorted_arr


def insertion_sort(arr: List[int], trace: bool = False) -> List[int]:
    """Sorts an array using Insertion Sort in O(N^2) time."""
    sorted_arr = list(arr)
    n = len(sorted_arr)
    
    for i in range(1, n):
        key = sorted_arr[i]
        j = i - 1
        while j >= 0 and sorted_arr[j] > key:
            sorted_arr[j + 1] = sorted_arr[j]
            j -= 1
        sorted_arr[j + 1] = key
        if trace:
            print(f" Pass {i}: {sorted_arr}")
            
    return sorted_arr


def merge_sort(arr: List[int]) -> List[int]:
    """Sorts an array using Merge Sort in O(N log N) time."""
    if len(arr) <= 1:
        return list(arr)

    mid = len(arr) // 2
    left_half = merge_sort(arr[:mid])
    right_half = merge_sort(arr[mid:])

    return _merge(left_half, right_half)


def _merge(left: List[int], right: List[int]) -> List[int]:
    """Helper function to merge two sorted arrays into one sorted array."""
    merged = []
    i = j = 0

    while i < len(left) and j < len(right):
        if left[i] <= right[j]:
            merged.append(left[i])
            i += 1
        else:
            merged.append(right[j])
            j += 1

    merged.extend(left[i:])
    merged.extend(right[j:])
    return merged


def linear_search(arr: List[int], target: int) -> int:
    """Performs Linear Search in O(N) time. Returns index or -1 if not found."""
    for idx, val in enumerate(arr):
        if val == target:
            return idx
    return -1


def binary_search(arr: List[int], target: int, low: int = 0, high: int = -1) -> int:
    """Performs recursive Binary Search in O(log N) time on a sorted array."""
    if high == -1:
        high = len(arr) - 1

    if low > high:
        return -1

    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, low, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, high)


def run_binary_search_with_check(arr: List[int], target: int) -> Tuple[int, bool]:
    """Verifies if array is sorted before running binary search. Returns (index, was_pre_sorted)."""
    is_sorted = all(arr[i] <= arr[i + 1] for i in range(len(arr) - 1))
    
    if not is_sorted:
        print("[Warning] Array was unsorted! Sorting automatically prior to Binary Search...")
        arr = merge_sort(arr)
        
    idx = binary_search(arr, target)
    return idx, is_sorted


def benchmark_sorting_algorithms(size: int = 1000):
    """Compares execution time of Bubble, Selection, Insertion, Merge Sort and Timsort."""
    print("\n" + "=" * 60)
    print(f" ⏱️ BENCHMARK: SORTING {size:,} RANDOM INTEGERS")
    print("=" * 60)

    dataset = [random.randint(1, 10000) for _ in range(size)]

    # Bubble Sort
    t0 = time.perf_counter()
    bubble_sort(dataset)
    t1 = time.perf_counter()
    b_time = (t1 - t0) * 1000
    print(f" 🧼 Bubble Sort (O(N^2))    : {b_time:.3f} ms")

    # Selection Sort
    t0 = time.perf_counter()
    selection_sort(dataset)
    t1 = time.perf_counter()
    s_time = (t1 - t0) * 1000
    print(f" 🎯 Selection Sort (O(N^2)) : {s_time:.3f} ms")

    # Insertion Sort
    t0 = time.perf_counter()
    insertion_sort(dataset)
    t1 = time.perf_counter()
    i_time = (t1 - t0) * 1000
    print(f" 📥 Insertion Sort (O(N^2)) : {i_time:.3f} ms")

    # Merge Sort
    t0 = time.perf_counter()
    merge_sort(dataset)
    t1 = time.perf_counter()
    m_time = (t1 - t0) * 1000
    print(f" 🔀 Merge Sort (O(N log N)) : {m_time:.3f} ms")

    # Built-in Timsort
    t0 = time.perf_counter()
    sorted(dataset)
    t1 = time.perf_counter()
    t_time = (t1 - t0) * 1000
    print(f" ⚡ Built-in Timsort        : {t_time:.3f} ms")

    print("\n💡 Notice how O(N log N) Merge Sort dramatically outperforms O(N^2) algorithms!")
    print("=" * 60 + "\n")


def run_unit_tests():
    """Runs automated verification tests for Day 06 algorithms."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 06")
    print("=" * 60)

    test_arr = [64, 25, 12, 22, 11]
    expected = [11, 12, 22, 25, 64]

    assert bubble_sort(test_arr) == expected, "Test 1 Failed: Bubble Sort"
    assert selection_sort(test_arr) == expected, "Test 2 Failed: Selection Sort"
    assert insertion_sort(test_arr) == expected, "Test 3 Failed: Insertion Sort"
    assert merge_sort(test_arr) == expected, "Test 4 Failed: Merge Sort"

    # Test Linear Search
    assert linear_search(expected, 22) == 2, "Test 5 Failed: Linear Search"
    assert linear_search(expected, 99) == -1, "Test 6 Failed: Linear Search absent"

    # Test Binary Search
    assert binary_search(expected, 22) == 2, "Test 7 Failed: Binary Search"
    assert binary_search(expected, 11) == 0, "Test 8 Failed: Binary Search head"
    assert binary_search(expected, 64) == 4, "Test 9 Failed: Binary Search tail"
    assert binary_search(expected, 99) == -1, "Test 10 Failed: Binary Search absent"

    print("[PASS] All 10 Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 06."""
    while True:
        print("\n" + "=" * 60)
        print(" [DAY 06] SORTING & SEARCHING ALGORITHM PLAYGROUND")
        print("=" * 60)
        print(" [1] Step-by-Step Sorting Pass Tracing (Small Array)")
        print(" [2] Compare Linear Search vs Binary Search")
        print(" [3] Run Sorting Algorithm Speed Benchmark (1,000 items)")
        print(" [4] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-4): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 06 Sorting Toolkit.")
            break

        if choice == "1":
            inp = input("Enter comma-separated integers (e.g. 64, 25, 12, 22, 11): ").strip()
            try:
                arr = [int(x.strip()) for x in inp.split(",") if x.strip()]
                if not arr:
                    arr = [64, 25, 12, 22, 11]
            except ValueError:
                print("⚠️ Invalid format, using default array: [64, 25, 12, 22, 11]")
                arr = [64, 25, 12, 22, 11]

            print(f"\nOriginal Array: {arr}")
            print("\n--- 🧼 Bubble Sort Passes ---")
            b_res = bubble_sort(arr, trace=True)
            print("\n--- 🎯 Selection Sort Passes ---")
            s_res = selection_sort(arr, trace=True)
            print("\n--- 🔀 Merge Sort Final ---")
            m_res = merge_sort(arr)
            print(f" Result: {m_res}")

        elif choice == "2":
            arr = sorted([random.randint(1, 500) for _ in range(20)])
            target = random.choice(arr)
            print(f"\nSorted Sample Array: {arr}")
            print(f"Target: {target}")

            lin_idx = linear_search(arr, target)
            bin_idx = binary_search(arr, target)

            print(f"🔎 Linear Search Result Index : {lin_idx}")
            print(f"⚡ Binary Search Result Index : {bin_idx}")

        elif choice == "3":
            benchmark_sorting_algorithms(1000)

        elif choice == "4":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 06 Sorting & Searching Playground. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 4.")


if __name__ == "__main__":
    interactive_cli()
