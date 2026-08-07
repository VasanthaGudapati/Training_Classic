"""
Day 19: LRU (Least Recently Used) Cache Strategy Simulator
Practical Task: O(1) LRU Cache Implementation (Hash Map + Doubly Linked List),
Hit Ratio Analyzer, Access Order Visualizer & FIFO Comparison Benchmark.
"""

import random
from typing import Any, Dict, List, Optional, Tuple


class Node:
    """Doubly Linked List node storing key-value pair and pointers."""

    def __init__(self, key: Any = None, value: Any = None):
        self.key: Any = key
        self.value: Any = value
        self.prev: Optional["Node"] = None
        self.next: Optional["Node"] = None


class LRUCache:
    """
    Least Recently Used (LRU) Cache implementing O(1) operations
    using a Hash Map combined with a Doubly Linked List with Sentinel (dummy) Head and Tail nodes.
    """

    def __init__(self, capacity: int):
        if capacity <= 0:
            raise ValueError("Cache capacity must be a positive integer (> 0).")
        self.capacity: int = capacity
        self.cache: Dict[Any, Node] = {}

        # Sentinel dummy nodes
        self.head: Node = Node()
        self.tail: Node = Node()
        self.head.next = self.tail
        self.tail.prev = self.head

        # Cache Metrics
        self.hits: int = 0
        self.misses: int = 0
        self.evictions: int = 0

    def _add_node(self, node: Node) -> None:
        """Adds new node right after dummy head (Most Recently Used position)."""
        node.prev = self.head
        node.next = self.head.next
        if self.head.next:
            self.head.next.prev = node
        self.head.next = node

    def _remove_node(self, node: Node) -> None:
        """Removes an existing node from the doubly linked list."""
        prev_node = node.prev
        next_node = node.next
        if prev_node:
            prev_node.next = next_node
        if next_node:
            next_node.prev = prev_node

    def _move_to_head(self, node: Node) -> None:
        """Moves an accessed node to the head (MRU) position."""
        self._remove_node(node)
        self._add_node(node)

    def _pop_tail(self) -> Node:
        """Pops and returns the node right before dummy tail (Least Recently Used node)."""
        lru_node = self.tail.prev
        assert lru_node is not None and lru_node != self.head
        self._remove_node(lru_node)
        return lru_node

    def get(self, key: Any) -> Any:
        """
        Retrieves item value by key.
        Moves accessed item to MRU head. Updates hits/misses metrics.
        Returns value if key exists, otherwise None.
        """
        if key in self.cache:
            node = self.cache[key]
            self._move_to_head(node)
            self.hits += 1
            return node.value
        else:
            self.misses += 1
            return None

    def put(self, key: Any, value: Any) -> None:
        """
        Inserts or updates a key-value pair.
        If key exists: updates value and moves node to MRU head.
        If new key: inserts node at MRU head. If capacity is exceeded, evicts LRU tail node.
        """
        if key in self.cache:
            node = self.cache[key]
            node.value = value
            self._move_to_head(node)
        else:
            new_node = Node(key, value)
            self.cache[key] = new_node
            self._add_node(new_node)

            if len(self.cache) > self.capacity:
                lru_node = self._pop_tail()
                del self.cache[lru_node.key]
                self.evictions += 1

    def peek(self, key: Any) -> Any:
        """Retrieves value without modifying LRU access order or hit/miss metrics."""
        if key in self.cache:
            return self.cache[key].value
        return None

    def get_items_order(self) -> List[Tuple[Any, Any]]:
        """Returns list of (key, value) pairs ordered from MRU (head) to LRU (tail)."""
        items = []
        curr = self.head.next
        while curr and curr != self.tail:
            items.append((curr.key, curr.value))
            curr = curr.next
        return items

    def get_metrics(self) -> Dict[str, Any]:
        """Calculates current cache metrics including Hit Ratio %."""
        total_requests = self.hits + self.misses
        hit_ratio = (self.hits / total_requests * 100) if total_requests > 0 else 0.0
        return {
            "capacity": self.capacity,
            "current_size": len(self.cache),
            "hits": self.hits,
            "misses": self.misses,
            "evictions": self.evictions,
            "total_requests": total_requests,
            "hit_ratio_pct": round(hit_ratio, 2),
        }

    def clear(self) -> None:
        """Resets cache contents and metrics."""
        self.cache.clear()
        self.head.next = self.tail
        self.tail.prev = self.head
        self.hits = 0
        self.misses = 0
        self.evictions = 0


class FIFOCache:
    """Simple Queue-based FIFO Cache for benchmark comparison with LRU."""

    def __init__(self, capacity: int):
        self.capacity: int = capacity
        self.cache: Dict[Any, Any] = {}
        self.order: List[Any] = []
        self.hits: int = 0
        self.misses: int = 0
        self.evictions: int = 0

    def get(self, key: Any) -> Any:
        if key in self.cache:
            self.hits += 1
            return self.cache[key]
        self.misses += 1
        return None

    def put(self, key: Any, value: Any) -> None:
        if key in self.cache:
            self.cache[key] = value
        else:
            if len(self.cache) >= self.capacity:
                oldest_key = self.order.pop(0)
                del self.cache[oldest_key]
                self.evictions += 1
            self.cache[key] = value
            self.order.append(key)

    def get_metrics(self) -> Dict[str, Any]:
        total = self.hits + self.misses
        hit_ratio = (self.hits / total * 100) if total > 0 else 0.0
        return {
            "hits": self.hits,
            "misses": self.misses,
            "evictions": self.evictions,
            "hit_ratio_pct": round(hit_ratio, 2),
        }


def run_workload_benchmark(capacity: int = 5, total_ops: int = 1000) -> None:
    """
    Simulates temporal locality workload (80% requests hit 20% hot items)
    and compares LRU vs FIFO cache eviction performance.
    """
    print("\n" + "=" * 60)
    print(" [BENCHMARK] WORKLOAD SIMULATION: LRU VS FIFO CACHE")
    print("=" * 60)
    print(f" Parameters: Cache Capacity = {capacity}, Total Requests = {total_ops}")
    print(" Workload Type: High Temporal Locality (80/20 Access Pattern)")

    lru = LRUCache(capacity)
    fifo = FIFOCache(capacity)

    # 20% hot keys, 80% cold keys out of 25 total keys
    hot_keys = [f"key_{i}" for i in range(1, 6)]
    cold_keys = [f"key_{i}" for i in range(6, 26)]

    random.seed(42)
    workload = []
    for _ in range(total_ops):
        if random.random() < 0.8:
            workload.append(random.choice(hot_keys))
        else:
            workload.append(random.choice(cold_keys))

    # Execute workload on both LRU and FIFO
    for k in workload:
        val_lru = lru.get(k)
        if val_lru is None:
            lru.put(k, f"val_{k}")

        val_fifo = fifo.get(k)
        if val_fifo is None:
            fifo.put(k, f"val_{k}")

    lru_m = lru.get_metrics()
    fifo_m = fifo.get_metrics()

    print("\n" + "-" * 60)
    print(f" {'Metric':<25} | {'LRU Cache':<14} | {'FIFO Cache':<14}")
    print("-" * 60)
    print(f" {'Cache Hits':<25} | {lru_m['hits']:<14} | {fifo_m['hits']:<14}")
    print(f" {'Cache Misses':<25} | {lru_m['misses']:<14} | {fifo_m['misses']:<14}")
    print(f" {'Evictions Count':<25} | {lru_m['evictions']:<14} | {fifo_m['evictions']:<14}")
    print(f" {'Hit Ratio (%)':<25} | {lru_m['hit_ratio_pct']:<14}% | {fifo_m['hit_ratio_pct']:<14}%")
    print("-" * 60)
    diff = lru_m['hit_ratio_pct'] - fifo_m['hit_ratio_pct']
    print(f" [RESULT] LRU outperformed FIFO by +{diff:.2f}% Hit Ratio under temporal locality!")
    print("=" * 60 + "\n")


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 19 LRU Cache."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 19 (LRU CACHE)")
    print("=" * 60)

    # Test 1: Basic Put and Get
    lru = LRUCache(3)
    lru.put("A", 1)
    lru.put("B", 2)
    lru.put("C", 3)
    assert lru.get("A") == 1, "Test 1 Failed: Should retrieve value 1 for key 'A'"

    # Test 2: Order check after access (MRU should be A)
    order = [k for k, _ in lru.get_items_order()]
    assert order == ["A", "C", "B"], f"Test 2 Failed: Expected ['A', 'C', 'B'], got {order}"

    # Test 3: Eviction of LRU node when capacity exceeded
    lru.put("D", 4)  # Capacity 3 reached, least recently used 'B' should be evicted
    assert lru.get("B") is None, "Test 3 Failed: Key 'B' should be evicted"
    assert lru.get("C") == 3, "Test 4 Failed: Key 'C' should still exist"
    assert lru.get("D") == 4, "Test 5 Failed: Key 'D' should exist"

    # Test 4: Updating existing key value & moving to MRU
    lru.put("C", 99)
    assert lru.get("C") == 99, "Test 6 Failed: Value for 'C' should be updated to 99"
    assert lru.get_metrics()["current_size"] == 3, "Test 7 Failed: Size should remain 3"

    # Test 5: Metrics accuracy
    metrics = lru.get_metrics()
    assert metrics["hits"] > 0, "Test 8 Failed: Hits should be > 0"
    assert metrics["misses"] > 0, "Test 9 Failed: Misses should be > 0"
    assert metrics["evictions"] == 1, f"Test 10 Failed: Evictions expected 1, got {metrics['evictions']}"

    # Test 6: Invalid capacity error handling
    try:
        LRUCache(0)
        assert False, "Test 11 Failed: Capacity 0 should raise ValueError"
    except ValueError:
        pass

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 19."""
    capacity = 3
    cache = LRUCache(capacity)

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 19] LRU (LEAST RECENTLY USED) CACHE SIMULATOR")
        print("=" * 60)
        print(f" Active Cache Capacity: {cache.capacity} items | Current Items: {len(cache.cache)}")
        print(" [1] Put Key-Value Pair")
        print(" [2] Get Value by Key (Updates LRU Order)")
        print(" [3] Peek Value by Key (No Order Change)")
        print(" [4] Display Cache State & MRU -> LRU Node Chain")
        print(" [5] Run Workload Benchmark (LRU vs FIFO)")
        print(" [6] Run Automated Unit Tests")
        print(" [7] Reset / Re-initialize Cache Capacity")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-7): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 19 LRU Cache Simulator.")
            break

        if choice == "1":
            key = input("Enter Key (e.g. user_123 or A): ").strip()
            val = input("Enter Value (e.g. Alice or 100): ").strip()
            if key:
                cache.put(key, val)
                print(f"\n[PUT SUCCESS] Stored ({key} -> {val}) in LRU Cache.")

        elif choice == "2":
            key = input("Enter Key to fetch: ").strip()
            if key:
                val = cache.get(key)
                if val is not None:
                    print(f"\n[HIT] Found key '{key}' => Value: {val}")
                else:
                    print(f"\n[MISS] Key '{key}' not found in cache.")

        elif choice == "3":
            key = input("Enter Key to peek: ").strip()
            if key:
                val = cache.peek(key)
                if val is not None:
                    print(f"\n[PEEK] Key '{key}' => Value: {val} (Access order unchanged)")
                else:
                    print(f"\n[MISS] Key '{key}' not found in cache.")

        elif choice == "4":
            metrics = cache.get_metrics()
            items = cache.get_items_order()
            print("\n  --- LRU Cache Internal State ---")
            print(f"  Capacity      : {metrics['capacity']}")
            print(f"  Size          : {metrics['current_size']}")
            print(f"  Hits / Misses : {metrics['hits']} / {metrics['misses']}")
            print(f"  Hit Ratio     : {metrics['hit_ratio_pct']}%")
            print(f"  Evictions     : {metrics['evictions']}")
            print("\n  --- MRU to LRU Pointers Chain ---")
            if not items:
                print("  (Cache is currently empty)")
            else:
                chain_str = " [HEAD (MRU)] -> " + " -> ".join([f"[{k}:{v}]" for k, v in items]) + " -> [TAIL (LRU)]"
                print(f"  {chain_str}")

        elif choice == "5":
            run_workload_benchmark(capacity=5, total_ops=1000)

        elif choice == "6":
            run_unit_tests()

        elif choice == "7":
            try:
                new_cap = int(input("Enter new capacity (> 0): ").strip())
                cache = LRUCache(new_cap)
                print(f"\n[RESET] Initialized new LRU Cache with capacity {new_cap}.")
            except ValueError as e:
                print(f"\n[ERROR] Invalid capacity input: {e}")

        elif choice == "0":
            print("\n[EXIT] Exiting Day 19 LRU Cache Simulator.")
            break
        else:
            print("\n[INVALID] Please select a valid option (0-7).")


if __name__ == "__main__":
    interactive_cli()
