"""
Day 20: Priority Queue & Binary Heap (Min-Heap / Max-Heap)
Practical Task: Array-Based Min-Heap Implementation, O(N) Build-Heap Algorithm,
Heap Visualizer, and Priority Task Scheduler Simulation.
"""

from typing import Any, List, Optional, Tuple


class MinHeap:
    """
    Array-based Min-Heap implementation.
    Parent at index i: (i - 1) // 2
    Left Child at index i: 2 * i + 1
    Right Child at index i: 2 * i + 2
    """

    def __init__(self, elements: Optional[List[Any]] = None):
        self.heap: List[Any] = []
        if elements:
            self.build_heap(elements)

    def _parent(self, index: int) -> int:
        return (index - 1) // 2

    def _left_child(self, index: int) -> int:
        return 2 * index + 1

    def _right_child(self, index: int) -> int:
        return 2 * index + 2

    def _swap(self, i: int, j: int) -> None:
        self.heap[i], self.heap[j] = self.heap[j], self.heap[i]

    def _heapify_up(self, index: int) -> None:
        """Restores min-heap property upward from target index."""
        while index > 0 and self.heap[index] < self.heap[self._parent(index)]:
            parent_idx = self._parent(index)
            self._swap(index, parent_idx)
            index = parent_idx

    def _heapify_down(self, index: int) -> None:
        """Restores min-heap property downward from target index."""
        size = len(self.heap)
        smallest = index

        while True:
            left = self._left_child(index)
            right = self._right_child(index)

            if left < size and self.heap[left] < self.heap[smallest]:
                smallest = left
            if right < size and self.heap[right] < self.heap[smallest]:
                smallest = right

            if smallest != index:
                self._swap(index, smallest)
                index = smallest
            else:
                break

    def insert(self, value: Any) -> None:
        """Inserts new element into heap in O(log N) time."""
        self.heap.append(value)
        self._heapify_up(len(self.heap) - 1)

    def extract_min(self) -> Any:
        """Removes and returns the minimum element (root) in O(log N) time."""
        if not self.heap:
            raise IndexError("Cannot extract from an empty heap.")

        min_val = self.heap[0]
        last_val = self.heap.pop()

        if self.heap:
            self.heap[0] = last_val
            self._heapify_down(0)

        return min_val

    def peek(self) -> Any:
        """Returns the minimum element without removing it in O(1) time."""
        if not self.heap:
            raise IndexError("Cannot peek into an empty heap.")
        return self.heap[0]

    def build_heap(self, array: List[Any]) -> None:
        """Builds heap in-place from unsorted array in O(N) linear time."""
        self.heap = list(array)
        # Start from the last non-leaf node and heapify down to index 0
        last_non_leaf = (len(self.heap) - 2) // 2
        for i in range(last_non_leaf, -1, -1):
            self._heapify_down(i)

    def is_empty(self) -> bool:
        return len(self.heap) == 0

    def __len__(self) -> int:
        return len(self.heap)


class Task:
    """Task object with priority score for priority queue scheduling."""

    def __init__(self, name: str, priority: int):
        self.name: str = name
        self.priority: int = priority  # Lower integer indicates higher urgency (e.g. 1 = Critical)

    def __lt__(self, other: "Task") -> bool:
        return self.priority < other.priority

    def __repr__(self) -> str:
        return f"Task(name='{self.name}', priority={self.priority})"


class PriorityTaskScheduler:
    """Scheduler that processes tasks in priority order using MinHeap."""

    def __init__(self):
        self.heap: MinHeap = MinHeap()

    def add_task(self, name: str, priority: int) -> None:
        task = Task(name, priority)
        self.heap.insert(task)

    def process_next_task(self) -> Optional[Task]:
        if self.heap.is_empty():
            return None
        return self.heap.extract_min()

    def get_pending_tasks(self) -> List[Task]:
        # Return copy of heap elements
        return sorted(self.heap.heap)


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 20 MinHeap."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 20 (BINARY HEAP)")
    print("=" * 60)

    # Test 1: Insert and Peek
    heap = MinHeap()
    heap.insert(10)
    heap.insert(5)
    heap.insert(15)
    assert heap.peek() == 5, f"Test 1 Failed: Expected min 5, got {heap.peek()}"

    # Test 2: Extraction order (Heap Sort behavior)
    extracted = []
    while not heap.is_empty():
        extracted.append(heap.extract_min())
    assert extracted == [5, 10, 15], f"Test 2 Failed: Expected [5, 10, 15], got {extracted}"

    # Test 3: Build Heap O(N) from unsorted list
    unsorted = [9, 3, 7, 1, 4, 2, 8]
    heap.build_heap(unsorted)
    assert heap.peek() == 1, "Test 3 Failed: Root after build_heap should be 1"

    sorted_out = []
    while not heap.is_empty():
        sorted_out.append(heap.extract_min())
    assert sorted_out == [1, 2, 3, 4, 7, 8, 9], f"Test 4 Failed: Expected sorted list, got {sorted_out}"

    # Test 4: Priority Task Scheduler
    scheduler = PriorityTaskScheduler()
    scheduler.add_task("Low Priority Sync", 4)
    scheduler.add_task("CRITICAL: System Crash", 1)
    scheduler.add_task("High Priority DB Patch", 2)

    next_task = scheduler.process_next_task()
    assert next_task is not None and next_task.name == "CRITICAL: System Crash", (
        f"Test 5 Failed: Expected critical task first, got {next_task}"
    )

    next_task_2 = scheduler.process_next_task()
    assert next_task_2 is not None and next_task_2.name == "High Priority DB Patch", (
        f"Test 6 Failed: Expected high priority task second, got {next_task_2}"
    )

    # Test 5: Empty heap exception handling
    empty_heap = MinHeap()
    try:
        empty_heap.extract_min()
        assert False, "Test 7 Failed: Extracting from empty heap should raise IndexError"
    except IndexError:
        pass

    try:
        empty_heap.peek()
        assert False, "Test 8 Failed: Peeking into empty heap should raise IndexError"
    except IndexError:
        pass

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 20."""
    heap = MinHeap()

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 20] PRIORITY QUEUE & BINARY HEAP (MIN-HEAP) TOOLKIT")
        print("=" * 60)
        print(f" Current Heap Size: {len(heap)} elements | Heap Root (Min): {heap.peek() if not heap.is_empty() else 'N/A'}")
        print(" [1] Insert Element into Min-Heap")
        print(" [2] Extract Minimum (Root) Element")
        print(" [3] Peek Minimum Element")
        print(" [4] Build Heap from Unsorted Array (O(N) Heapify)")
        print(" [5] Run Priority Task Scheduler Simulation")
        print(" [6] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-6): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 20 Min-Heap Toolkit.")
            break

        if choice == "1":
            raw_val = input("Enter integer value to insert: ").strip()
            if raw_val:
                try:
                    val = int(raw_val)
                    heap.insert(val)
                    print(f"\n[INSERT SUCCESS] Added {val} to Min-Heap. Current Heap Array: {heap.heap}")
                except ValueError:
                    print("\n[ERROR] Invalid integer input.")

        elif choice == "2":
            try:
                min_val = heap.extract_min()
                print(f"\n[EXTRACT SUCCESS] Extracted minimum element: {min_val}")
                print(f" Remaining Heap Array: {heap.heap}")
            except IndexError as e:
                print(f"\n[ERROR] {e}")

        elif choice == "3":
            try:
                min_val = heap.peek()
                print(f"\n[PEEK] Minimum element is: {min_val}")
            except IndexError as e:
                print(f"\n[ERROR] {e}")

        elif choice == "4":
            raw_arr = input("Enter comma-separated integers (e.g. 9, 3, 7, 1, 4): ").strip()
            if raw_arr:
                try:
                    nums = [int(x.strip()) for x in raw_arr.split(",") if x.strip()]
                    heap.build_heap(nums)
                    print(f"\n[BUILD HEAP SUCCESS] Heap constructed in O(N) time.")
                    print(f" Array representation: {heap.heap}")
                except ValueError:
                    print("\n[ERROR] Invalid numbers in input list.")

        elif choice == "5":
            print("\n  --- Priority Task Scheduler Simulation ---")
            scheduler = PriorityTaskScheduler()
            scheduler.add_task("Routine Log Cleanup", 5)
            scheduler.add_task("SECURITY ALERT: Invalid Auth Tokens", 1)
            scheduler.add_task("Database Index Optimization", 3)
            scheduler.add_task("Payment Gateway Timeout Warning", 2)

            print("\n  Pending Tasks (Prioritized by Min-Heap):")
            for t in scheduler.get_pending_tasks():
                print(f"   - [Priority {t.priority}] {t.name}")

            print("\n  Executing Tasks in Order of Priority:")
            step = 1
            while True:
                t = scheduler.process_next_task()
                if not t:
                    break
                print(f"   Step {step}: Processed '{t.name}' (Priority Level {t.priority})")
                step += 1

        elif choice == "6":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 20 Min-Heap Toolkit.")
            break
        else:
            print("\n[INVALID] Please select a valid option (0-6).")


if __name__ == "__main__":
    interactive_cli()
