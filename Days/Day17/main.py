"""
Day 17: Caching Strategy: The FIFO Cache Simulator
Practical Task: Interactive FIFO Cache Simulator & Performance Metrics Analyzer.
"""

from collections import deque
from typing import Any, Dict, List, Optional, Tuple


class FIFOCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache: Dict[Any, Any] = {}
        self.order: deque = deque()
        self.hits = 0
        self.misses = 0

    def get(self, key: Any) -> Optional[Any]:
        """Retrieves value from cache. Updates hit/miss counters."""
        if key in self.cache:
            self.hits += 1
            return self.cache[key]
        self.misses += 1
        return None

    def put(self, key: Any, value: Any) -> Tuple[bool, Optional[Any]]:
        """
        Inserts or updates a key-value pair.
        Returns: (was_updated, evicted_key)
        """
        if self.capacity <= 0:
            return False, None

        if key in self.cache:
            self.cache[key] = value
            return True, None

        evicted_key = None
        if len(self.cache) >= self.capacity:
            evicted_key = self.order.popleft()
            del self.cache[evicted_key]

        self.cache[key] = value
        self.order.append(key)
        return False, evicted_key

    def get_stats(self) -> dict:
        """Returns comprehensive cache efficiency metrics."""
        total = self.hits + self.misses
        hit_ratio = (self.hits / total * 100) if total > 0 else 0.0
        miss_ratio = (self.misses / total * 100) if total > 0 else 0.0
        return {
            "capacity": self.capacity,
            "size": len(self.cache),
            "hits": self.hits,
            "misses": self.misses,
            "total_queries": total,
            "hit_ratio_pct": round(hit_ratio, 2),
            "miss_ratio_pct": round(miss_ratio, 2)
        }

    def visualize(self) -> None:
        """Renders visual ASCII status of cache contents and FIFO queue order."""
        print(f"\n  ┌────────────────────────────────────────────────────────┐")
        print(f"  │ FIFO CACHE MEMORY LAYOUT (Capacity: {self.capacity})                    │")
        print(f"  ├────────────────────────────────────────────────────────┤")
        order_list = list(self.order)
        if not order_list:
            print("  │  [EMPTY CACHE] No entries in memory                    │")
        else:
            for idx, key in enumerate(order_list):
                val = self.cache[key]
                tag = " (OLDEST -> Next Evict)" if idx == 0 else (" (NEWEST)" if idx == len(order_list) - 1 else "")
                print(f"  │  Slot {idx + 1}: Key='{key}' -> Value='{val}'{tag:<22} │")
        print(f"  └────────────────────────────────────────────────────────┘")


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 17 FIFO Cache."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 17")
    print("=" * 60)

    # Test 1: Basic Insertion and Retrieval
    cache = FIFOCache(3)
    cache.put("A", "Apple")
    cache.put("B", "Banana")
    cache.put("C", "Cherry")

    assert cache.get("A") == "Apple", "Test 1 Failed: Key A retrieval"
    assert cache.get("B") == "Banana", "Test 2 Failed: Key B retrieval"
    assert cache.hits == 2, "Test 3 Failed: Hit counter increment"

    # Test 2: Eviction of Oldest Key (FIFO order)
    updated, evicted = cache.put("D", "Date")
    assert not updated, "Test 4 Failed: New key insertion flag"
    assert evicted == "A", f"Test 5 Failed: Oldest key A should be evicted, got {evicted}"
    assert cache.get("A") is None, "Test 6 Failed: Evicted key A should yield None"
    assert cache.misses == 1, "Test 7 Failed: Miss counter increment"

    # Test 3: Updating Existing Key (Order should remain unchanged)
    cache.put("B", "Blueberry")
    assert cache.get("B") == "Blueberry", "Test 8 Failed: Key B value update"
    assert len(cache.cache) == 3, "Test 9 Failed: Size check after update"

    # Test 4: Hit Ratio Statistics Calculation
    stats = cache.get_stats()
    assert stats["hits"] == 3, "Test 10 Failed: Total hits stats"
    assert stats["misses"] == 1, "Test 11 Failed: Total misses stats"
    assert stats["hit_ratio_pct"] == 75.0, f"Test 12 Failed: Hit ratio calculation (75.0%), got {stats['hit_ratio_pct']}%"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 17."""
    capacity = 3
    cache = FIFOCache(capacity)

    while True:
        stats = cache.get_stats()
        print("\n" + "=" * 60)
        print(" [DAY 17] FIFO CACHE SIMULATOR & METRICS TOOLKIT")
        print("=" * 60)
        print(f" Current Cache Status : {stats['size']}/{stats['capacity']} Slots Used | Hits: {stats['hits']} | Misses: {stats['misses']} (Hit Ratio: {stats['hit_ratio_pct']}%)")
        print("-" * 60)
        print(" [1] Put (Insert/Update) Item in Cache")
        print(" [2] Get (Retrieve) Item from Cache")
        print(" [3] View Cache Memory State & FIFO Queue")
        print(" [4] Run Automated Stream Workload Simulation")
        print(" [5] Reset/Change Cache Capacity")
        print(" [6] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-6): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 17 FIFO Cache Simulator.")
            break

        if choice == "1":
            key = input("Enter Key: ").strip()
            val = input("Enter Value: ").strip()
            if key:
                updated, evicted = cache.put(key, val)
                if updated:
                    print(f"[*] Updated existing key '{key}' with new value '{val}'.")
                elif evicted:
                    print(f"[*] Cache Full! Evicted oldest key '{evicted}'. Inserted '{key}' -> '{val}'.")
                else:
                    print(f"[*] Inserted '{key}' -> '{val}'.")
                cache.visualize()

        elif choice == "2":
            key = input("Enter Key to Query: ").strip()
            if key:
                val = cache.get(key)
                if val is not None:
                    print(f"  🎯 [CACHE HIT] Found '{key}' -> '{val}'")
                else:
                    print(f"  ❌ [CACHE MISS] Key '{key}' not found in cache.")

        elif choice == "3":
            cache.visualize()

        elif choice == "4":
            print("\n" + "=" * 60)
            print("  AUTOMATED STREAM WORKLOAD SIMULATION")
            print("=" * 60)
            sim_cache = FIFOCache(3)
            stream = [("A", 1), ("B", 2), ("C", 3), ("A", 1), ("D", 4), ("B", 2), ("E", 5), ("C", 3), ("A", 1)]

            print("  Query Sequence: " + " -> ".join(f"Get({k})" if op == "get" else f"Put({k})" for k, op in [
                ("A", "put"), ("B", "put"), ("C", "put"), ("A", "get"), ("D", "put"), ("B", "get"), ("E", "put"), ("C", "get"), ("A", "get")
            ]))
            print("-" * 60)

            for key, val in stream:
                if key in sim_cache.cache:
                    v = sim_cache.get(key)
                    print(f"  Query Get('{key}') -> 🎯 HIT ('{v}')")
                else:
                    up, ev = sim_cache.put(key, val)
                    ev_info = f"(Evicted '{ev}')" if ev else ""
                    print(f"  Query Put('{key}') -> ❌ MISS {ev_info}")

            s = sim_cache.get_stats()
            print("-" * 60)
            print(f"  Simulation Results -> Hits: {s['hits']}, Misses: {s['misses']}, Hit Ratio: {s['hit_ratio_pct']}%")
            print("=" * 60)

        elif choice == "5":
            try:
                c = int(input("Enter new Cache Capacity (> 0): "))
                if c > 0:
                    capacity = c
                    cache = FIFOCache(capacity)
                    print(f"[*] Reset cache with new capacity: {capacity}")
                else:
                    print("[Warning] Capacity must be positive.")
            except ValueError:
                print("[Warning] Invalid integer input.")

        elif choice == "6":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 17 FIFO Cache Simulator. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 6.")


if __name__ == "__main__":
    interactive_cli()
