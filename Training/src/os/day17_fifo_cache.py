"""
Day 17: Caching Strategy: The FIFO Cache Simulator
Practical Task: Build a FIFO Cache manager.

Requirements:
- Implement a FIFOCache class holding key-value items up to a defined capacity limit.
- Discard the oldest inserted item first (First In, First Out) when capacity is exceeded.
- Maintain hit and miss statistics over a stream of queries.
"""

class FIFOCache:
    def __init__(self, capacity: int):
        self.capacity = capacity
        self.cache = {}
        # Queue to track insertion order
        self.order = []
        self.hits = 0
        self.misses = 0

    def get(self, key):
        """Retrieves value for key from cache. Updates stats."""
        if key in self.cache:
            self.hits += 1
            return self.cache[key]
        else:
            self.misses += 1
            return None

    def put(self, key, value) -> None:
        """Inserts key-value pair. If capacity exceeded, evicts FIFO element."""
        if self.capacity <= 0:
            return
            
        if key in self.cache:
            # Update value, order doesn't change for FIFO
            self.cache[key] = value
            return
            
        # Evict oldest if full
        if len(self.cache) >= self.capacity:
            oldest_key = self.order.pop(0)
            del self.cache[oldest_key]
            print(f"[*] Cache Full. Evicting oldest key: '{oldest_key}'")
            
        self.cache[key] = value
        self.order.append(key)

    def get_stats(self) -> dict:
        total = self.hits + self.misses
        hit_ratio = (self.hits / total) if total > 0 else 0.0
        return {
            "hits": self.hits,
            "misses": self.misses,
            "hit_ratio": f"{hit_ratio * 100:.1f}%"
        }

    def __str__(self):
        return f"Cache: {self.cache} (Order: {self.order})"

if __name__ == "__main__":
    print("--- Testing Day 17: FIFO Cache ---")
    cache = FIFOCache(3)
    
    print("\nPutting elements A, B, C:")
    cache.put("A", "Apple")
    cache.put("B", "Banana")
    cache.put("C", "Cherry")
    print(cache)
    
    print("\nReading A (Hit expected):")
    print("  Read A:", cache.get("A")) # Hit
    
    print("\nPutting D (should evict A as it's the oldest inserted):")
    cache.put("D", "Date")
    print(cache)
    
    print("\nReading A (Miss expected):")
    print("  Read A:", cache.get("A")) # Miss
    
    print("\nReading B (Hit expected):")
    print("  Read B:", cache.get("B")) # Hit
    
    print("\nCache Stats:")
    print("  ", cache.get_stats())
