"""
Day 09: Custom Hash Tables & HashMaps
Practical Task: Interactive CLI HashMap Playground with Polynomial Rolling Hash & Separate Chaining.
"""

from typing import Any, List, Optional, Tuple


class HashMap:
    """
    Custom HashMap implementation with Polynomial Rolling Hash, Separate Chaining,
    and Dynamic Resizing (Rehashing).
    """

    def __init__(self, initial_capacity: int = 5, load_factor_threshold: float = 0.75):
        if initial_capacity < 1:
            raise ValueError("Capacity must be at least 1")
        self.capacity: int = initial_capacity
        self.load_factor_threshold: float = load_factor_threshold
        self.size: int = 0
        self.buckets: List[List[Tuple[Any, Any]]] = [[] for _ in range(self.capacity)]

    def _hash(self, key: Any) -> int:
        """Computes bucket index using Polynomial Rolling Hash algorithm."""
        key_str = str(key)
        hash_val = 0
        prime = 31
        for char in key_str:
            hash_val = (hash_val * prime + ord(char)) % self.capacity
        return hash_val

    def put(self, key: Any, value: Any) -> None:
        """Inserts or updates key-value pair in HashMap. Triggers rehash if load factor exceeds threshold."""
        if (self.size + 1) / self.capacity > self.load_factor_threshold:
            self._rehash(self.capacity * 2)

        bucket_idx = self._hash(key)
        bucket = self.buckets[bucket_idx]

        for i, (k, v) in enumerate(bucket):
            if k == key:
                bucket[i] = (key, value)
                return

        bucket.append((key, value))
        self.size += 1

    def get(self, key: Any, default: Any = None) -> Any:
        """Retrieves value corresponding to key. Returns default if key is missing."""
        bucket_idx = self._hash(key)
        bucket = self.buckets[bucket_idx]

        for k, v in bucket:
            if k == key:
                return v
        return default

    def contains(self, key: Any) -> bool:
        """Checks whether key exists in HashMap."""
        bucket_idx = self._hash(key)
        bucket = self.buckets[bucket_idx]
        for k, v in bucket:
            if k == key:
                return True
        return False

    def remove(self, key: Any) -> bool:
        """Removes key-value pair from HashMap. Returns True if removed, False if not found."""
        bucket_idx = self._hash(key)
        bucket = self.buckets[bucket_idx]

        for i, (k, v) in enumerate(bucket):
            if k == key:
                del bucket[i]
                self.size -= 1
                return True
        return False

    def keys(self) -> List[Any]:
        """Returns list of all keys in HashMap."""
        all_keys = []
        for bucket in self.buckets:
            for k, v in bucket:
                all_keys.append(k)
        return all_keys

    def values(self) -> List[Any]:
        """Returns list of all values in HashMap."""
        all_values = []
        for bucket in self.buckets:
            for k, v in bucket:
                all_values.append(v)
        return all_values

    def _rehash(self, new_capacity: int) -> None:
        """Resizes internal bucket array and re-indexes all entries."""
        print(f"[*] [REHASH] Capacity limit reached! Resizing table: {self.capacity} -> {new_capacity}")
        old_buckets = self.buckets
        self.capacity = new_capacity
        self.buckets = [[] for _ in range(self.capacity)]
        self.size = 0

        for bucket in old_buckets:
            for k, v in bucket:
                self.put(k, v)

    def visual_bucket_representation(self) -> str:
        """Returns string representation of bucket distribution and collision chains."""
        lines = []
        for idx, bucket in enumerate(self.buckets):
            if bucket:
                chain = " -> ".join(f"[{k}: {v}]" for k, v in bucket)
                lines.append(f" Bucket {idx:2d}: {chain}")
            else:
                lines.append(f" Bucket {idx:2d}: [EMPTY]")
        return "\n".join(lines)

    def __str__(self) -> str:
        pairs = []
        for bucket in self.buckets:
            for k, v in bucket:
                pairs.append(f"{repr(k)}: {repr(v)}")
        return "{" + ", ".join(pairs) + f"}} (Size: {self.size}, Capacity: {self.capacity})"


def run_unit_tests():
    """Runs automated verification tests for HashMap implementation."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 09")
    print("=" * 60)

    hmap = HashMap(initial_capacity=3, load_factor_threshold=0.75)
    assert hmap.size == 0 and hmap.capacity == 3, "Test 1 Failed: Initial state"

    hmap.put("apple", 1.29)
    hmap.put("banana", 0.59)
    assert hmap.get("apple") == 1.29 and hmap.get("banana") == 0.59, "Test 2 Failed: Put and Get"

    # Test Update
    hmap.put("apple", 1.49)
    assert hmap.get("apple") == 1.49, "Test 3 Failed: Key update"

    # Test Rehash (adding 3rd item triggers resize 3 -> 6)
    hmap.put("cherry", 3.99)
    assert hmap.capacity == 6 and hmap.size == 3, "Test 4 Failed: Automatic Rehashing"

    # Test Contains & Remove
    assert hmap.contains("banana") == True, "Test 5 Failed: Contains key"
    assert hmap.remove("banana") == True, "Test 6 Failed: Remove key"
    assert hmap.contains("banana") == False, "Test 7 Failed: Key removed"

    # Test Default lookup for missing key
    assert hmap.get("non_existent", default=-1) == -1, "Test 8 Failed: Default lookup"

    # Test Keys and Values
    assert set(hmap.keys()) == {"apple", "cherry"}, "Test 9 Failed: Keys list"
    assert set(hmap.values()) == {1.49, 3.99}, "Test 10 Failed: Values list"

    print("[PASS] All 10 Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 09."""
    hmap = HashMap(initial_capacity=5)

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 09] CUSTOM HASHMAP & COLLISION PLAYGROUND")
        print("=" * 60)
        print(f" Current State : {hmap}")
        print("-" * 60)
        print(" [1] Put (Insert/Update Key-Value Pair)")
        print(" [2] Get Value by Key")
        print(" [3] Remove Key")
        print(" [4] Check if Key Exists")
        print(" [5] View Internal Bucket Chains (Collision Visualizer)")
        print(" [6] Run Automated Unit Tests")
        print(" [7] Reset HashMap")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-7): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 09 HashMap Playground.")
            break

        if choice == "1":
            key = input("Enter key: ").strip()
            val = input("Enter value: ").strip()
            hmap.put(key, val)
            print(f"[*] Set '{key}' => '{val}' successfully.")

        elif choice == "2":
            key = input("Enter key to retrieve: ").strip()
            val = hmap.get(key, default="[NOT FOUND]")
            print(f"[*] Key '{key}': {val}")

        elif choice == "3":
            key = input("Enter key to remove: ").strip()
            removed = hmap.remove(key)
            if removed:
                print(f"[*] Removed key '{key}' successfully.")
            else:
                print(f"[Warning] Key '{key}' not found.")

        elif choice == "4":
            key = input("Enter key: ").strip()
            exists = hmap.contains(key)
            print(f"[*] Key '{key}' status: {'EXISTS' if exists else 'NOT FOUND'}")

        elif choice == "5":
            print("\n--- Internal Bucket Collision Visualizer ---")
            print(hmap.visual_bucket_representation())

        elif choice == "6":
            run_unit_tests()

        elif choice == "7":
            cap_str = input("Enter new initial capacity (default 5): ").strip()
            cap = int(cap_str) if cap_str.isdigit() and int(cap_str) > 0 else 5
            hmap = HashMap(initial_capacity=cap)
            print(f"[*] Reset HashMap with capacity {cap}.")

        elif choice == "0":
            print("\n[EXIT] Exiting Day 09 HashMap Playground. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 7.")


if __name__ == "__main__":
    interactive_cli()
