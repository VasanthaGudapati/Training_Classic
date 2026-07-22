"""
Day 6: Basic Search & Sorting
Practical Task: Build sorting and searching algorithms.

Requirements:
- Implement bubble_sort(arr) and selection_sort(arr) returning sorted copy or modifying in place.
- Implement a recursive binary_search(arr, target, low, high) which returns index of target, or -1 if not found.
- Verify array is sorted before executing binary search.
"""

def bubble_sort(arr: list) -> list:
    """Sorts array using bubble sort algorithm."""
    n = len(arr)
    sorted_arr = list(arr) # Make a copy to avoid mutation
    for i in range(n):
        for j in range(0, n - i - 1):
            if sorted_arr[j] > sorted_arr[j + 1]:
                sorted_arr[j], sorted_arr[j + 1] = sorted_arr[j + 1], sorted_arr[j]
    return sorted_arr

def selection_sort(arr: list) -> list:
    """Sorts array using selection sort algorithm."""
    n = len(arr)
    sorted_arr = list(arr)
    for i in range(n):
        min_idx = i
        for j in range(i + 1, n):
            if sorted_arr[j] < sorted_arr[min_idx]:
                min_idx = j
        sorted_arr[i], sorted_arr[min_idx] = sorted_arr[min_idx], sorted_arr[i]
    return sorted_arr

def binary_search(arr: list, target: int, low: int, high: int) -> int:
    """Performs binary search recursively on a sorted array."""
    if low > high:
        return -1
        
    mid = (low + high) // 2
    if arr[mid] == target:
        return mid
    elif arr[mid] > target:
        return binary_search(arr, target, low, mid - 1)
    else:
        return binary_search(arr, target, mid + 1, high)

def run_binary_search(arr: list, target: int) -> int:
    """Verifies array is sorted first, then runs binary search."""
    # Verification: check if sorted
    is_sorted = all(arr[i] <= arr[i+1] for i in range(len(arr)-1))
    if not is_sorted:
        print("[Warning] Array must be sorted to perform binary search! Sorting it first...")
        arr = bubble_sort(arr)
        
    return binary_search(arr, target, 0, len(arr) - 1)

if __name__ == "__main__":
    print("--- Testing Day 6: Sorting & Searching ---")
    unsorted = [64, 25, 12, 22, 11]
    print("Original array:", unsorted)
    
    bubble_res = bubble_sort(unsorted)
    print("Bubble Sort Result:", bubble_res)
    
    selection_res = selection_sort(unsorted)
    print("Selection Sort Result:", selection_res)
    
    target = 22
    print(f"\nSearching for {target} in sorted array:")
    idx = run_binary_search(selection_res, target)
    print(f"Target {target} found at index: {idx}")
    
    print("\nAttempting binary search on unsorted array:")
    idx_unsorted = run_binary_search(unsorted, target)
    print(f"Target {target} found at index (after sorting): {idx_unsorted}")
