"""
Day 02: Dynamic Arrays & Array Resizing
Practical Task: Interactive CLI Dynamic Array Playground & Resizing Visualizer.
"""

import sys
import time
from typing import Any, List, Optional


class DynamicArray:
    """
    A custom dynamic array implementation simulating low-level array operations.
    Uses a fixed-size Python list initialized with None values as memory buffer.
    """

    def __init__(self, initial_capacity: int = 2):
        if initial_capacity < 1:
            raise ValueError("Capacity must be at least 1")
        self.capacity: int = initial_capacity
        self.size: int = 0
        self.array: List[Optional[Any]] = [None] * self.capacity

    def append(self, element: Any) -> None:
        """Appends an element to the array, doubling capacity when full."""
        if self.size == self.capacity:
            self._resize(self.capacity * 2)

        self.array[self.size] = element
        self.size += 1

    def get(self, index: int) -> Any:
        """Retrieves element at index in O(1) time."""
        self._validate_index(index)
        return self.array[index]

    def set(self, index: int, value: Any) -> None:
        """Updates element at index in O(1) time."""
        self._validate_index(index)
        self.array[index] = value

    def insert(self, index: int, element: Any) -> None:
        """Inserts element at specified index, shifting subsequent elements right in O(N) time."""
        if index < 0 or index > self.size:
            raise IndexError(f"Index {index} out of bounds for size {self.size}")

        if self.size == self.capacity:
            self._resize(self.capacity * 2)

        # Shift elements to the right
        for i in range(self.size, index, -1):
            self.array[i] = self.array[i - 1]

        self.array[index] = element
        self.size += 1

    def remove_at(self, index: int) -> Any:
        """Removes element at index, shifting subsequent elements left in O(N) time."""
        self._validate_index(index)
        removed_item = self.array[index]

        # Shift elements to the left
        for i in range(index, self.size - 1):
            self.array[i] = self.array[i + 1]

        self.array[self.size - 1] = None
        self.size -= 1

        # Optionally shrink capacity if size drops to 1/4 of capacity
        if 0 < self.size <= self.capacity // 4 and self.capacity // 2 >= 2:
            self._resize(self.capacity // 2)

        return removed_item

    def pop(self) -> Any:
        """Removes and returns the last element in O(1) time."""
        if self.size == 0:
            raise IndexError("Pop from empty array")
        return self.remove_at(self.size - 1)

    def _resize(self, new_capacity: int) -> None:
        """Resizes internal buffer to new_capacity by allocating new block and copying elements."""
        print(f"  [*] [MEMORY ALLOCATION] Resizing buffer: Capacity {self.capacity} -> {new_capacity}")
        new_array = [None] * new_capacity
        for i in range(self.size):
            new_array[i] = self.array[i]
        self.array = new_array
        self.capacity = new_capacity

    def _validate_index(self, index: int) -> None:
        """Validates that index is within range [0, size - 1]."""
        if index < 0 or index >= self.size:
            raise IndexError(f"Index {index} out of bounds for array size {self.size}")

    def visual_memory_representation(self) -> str:
        """Returns a string visually showing occupied slots vs allocated memory slots."""
        slots = []
        for i in range(self.capacity):
            if i < self.size:
                slots.append(f"[{self.array[i]}]")
            else:
                slots.append("[_]")
        return " ".join(slots)

    def __str__(self) -> str:
        items = [str(self.array[i]) for i in range(self.size)]
        return f"[{', '.join(items)}] (Size: {self.size}, Capacity: {self.capacity})"


def run_unit_tests():
    """Runs automated verification tests for DynamicArray."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 02")
    print("=" * 60)
    
    arr = DynamicArray(initial_capacity=2)
    assert arr.size == 0 and arr.capacity == 2, "Test 1 Failed: Initial state"

    arr.append(10)
    arr.append(20)
    assert arr.size == 2 and arr.capacity == 2, "Test 2 Failed: Appends before resize"

    arr.append(30)
    assert arr.size == 3 and arr.capacity == 4, "Test 3 Failed: Capacity doubling after resize"
    assert arr.get(0) == 10 and arr.get(2) == 30, "Test 4 Failed: Get elements"

    arr.insert(1, 15)
    assert arr.get(1) == 15 and arr.get(2) == 20 and arr.size == 4, "Test 5 Failed: Insert at index 1"

    val = arr.remove_at(1)
    assert val == 15 and arr.get(1) == 20 and arr.size == 3, "Test 6 Failed: Remove at index 1"

    val_pop = arr.pop()
    assert val_pop == 30 and arr.size == 2, "Test 7 Failed: Pop element"

    print("[PASS] All 7 Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def benchmark_resizing(count: int = 1000):
    """Demonstrates amortized O(1) performance and logs resize events during bulk append."""
    print("\n" + "=" * 60)
    print(f" [BENCHMARK] Bulk Appending {count} Elements")
    print("=" * 60)

    arr = DynamicArray(initial_capacity=2)
    start_time = time.perf_counter()

    for i in range(1, count + 1):
        arr.append(i)

    end_time = time.perf_counter()
    duration_ms = (end_time - start_time) * 1000

    print(f"\n[PASS] Inserted {count} elements in {duration_ms:.3f} ms.")
    print(f"[STATUS] Final Size: {arr.size}, Final Capacity: {arr.capacity}")
    print(f"[NOTE] Notice how capacity doubled geometrically (2 -> 4 -> 8 -> 16 -> ... -> {arr.capacity}).")
    print("   This geometric progression guarantees Amortized O(1) time complexity per append!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 02."""
    arr = DynamicArray(initial_capacity=2)

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 02] DYNAMIC ARRAY PLAYGROUND & MEMORY VISUALIZER")
        print("=" * 60)
        print(f" Current State : {arr}")
        print(f" Memory Buffer : {arr.visual_memory_representation()}")
        print("-" * 60)
        print(" [1] Append Element")
        print(" [2] Get Element by Index")
        print(" [3] Set Element at Index")
        print(" [4] Insert Element at Index")
        print(" [5] Remove Element at Index")
        print(" [6] Pop Last Element")
        print(" [7] Run Amortized Resizing Benchmark (1,000 items)")
        print(" [8] Run Automated Unit Tests")
        print(" [9] Reset Array")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-9): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 02 Dynamic Array Playground.")
            break

        if choice == "1":
            val = input("Enter value to append: ").strip()
            arr.append(val)
            print(f"[SUCCESS] Appended '{val}' successfully.")

        elif choice == "2":
            idx_str = input("Enter index: ").strip()
            if idx_str.lstrip("-").isdigit():
                try:
                    val = arr.get(int(idx_str))
                    print(f"[LOOKUP] Value at index {idx_str}: {val}")
                except IndexError as e:
                    print(f"[WARNING] Error: {e}")
            else:
                print("[WARNING] Invalid index.")

        elif choice == "3":
            idx_str = input("Enter index: ").strip()
            if idx_str.lstrip("-").isdigit():
                val = input("Enter new value: ").strip()
                try:
                    arr.set(int(idx_str), val)
                    print(f"[SUCCESS] Updated index {idx_str} to '{val}'.")
                except IndexError as e:
                    print(f"[WARNING] Error: {e}")
            else:
                print("[WARNING] Invalid index.")

        elif choice == "4":
            idx_str = input("Enter index to insert at: ").strip()
            if idx_str.lstrip("-").isdigit():
                val = input("Enter value: ").strip()
                try:
                    arr.insert(int(idx_str), val)
                    print(f"[SUCCESS] Inserted '{val}' at index {idx_str}.")
                except IndexError as e:
                    print(f"[WARNING] Error: {e}")
            else:
                print("[WARNING] Invalid index.")

        elif choice == "5":
            idx_str = input("Enter index to remove: ").strip()
            if idx_str.lstrip("-").isdigit():
                try:
                    removed = arr.remove_at(int(idx_str))
                    print(f"[REMOVE] Removed '{removed}' from index {idx_str}.")
                except IndexError as e:
                    print(f"[WARNING] Error: {e}")
            else:
                print("[WARNING] Invalid index.")

        elif choice == "6":
            try:
                removed = arr.pop()
                print(f"[REMOVE] Popped last element '{removed}'.")
            except IndexError as e:
                print(f"[WARNING] Error: {e}")

        elif choice == "7":
            benchmark_resizing(1000)

        elif choice == "8":
            run_unit_tests()

        elif choice == "9":
            cap_str = input("Enter new initial capacity (default 2): ").strip()
            cap = int(cap_str) if cap_str.isdigit() and int(cap_str) > 0 else 2
            arr = DynamicArray(initial_capacity=cap)
            print(f"[RESET] Reset array with initial capacity {cap}.")

        elif choice == "0":
            print("\n[EXIT] Exiting Day 02 Dynamic Array Playground. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid selection. Please enter a digit between 0 and 9.")


if __name__ == "__main__":
    interactive_cli()
