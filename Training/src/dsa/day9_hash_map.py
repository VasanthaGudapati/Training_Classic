"""
Day 9: Custom Hash Tables
Practical Task: Implement a simple HashMap from scratch.

Requirements:
- Create a HashMap class with fixed size buckets (e.g. size 10).
- Write a custom polynomial rolling hash function.
- Implement collision resolution using chaining (storing list of key-value tuples).
- Implement put(key, value) and get(key) methods.
"""

class HashMap:
    def __init__(self, num_buckets: int = 10):
        self.num_buckets = num_buckets
        # Chaining collision resolution: list of lists
        self.buckets = [[] for _ in range(self.num_buckets)]

    def _hash(self, key) -> int:
        """Custom polynomial rolling hash function for strings or integers."""
        key_str = str(key)
        hash_val = 0
        prime = 31
        for char in key_str:
            hash_val = (hash_val * prime + ord(char)) % self.num_buckets
        return hash_val

    def put(self, key, value) -> None:
        """Inserts or updates a key-value pair in the map."""
        bucket_idx = self._hash(key)
        bucket = self.buckets[bucket_idx]
        
        # Check if key already exists, if so update it
        for idx, (k, v) in enumerate(bucket):
            if k == key:
                bucket[idx] = (key, value)
                return
                
        # Key does not exist, append to bucket
        bucket.append((key, value))

    def get(self, key):
        """Retrieves value corresponding to key. Raises KeyError if not found."""
        bucket_idx = self._hash(key)
        bucket = self.buckets[bucket_idx]
        
        for k, v in bucket:
            if k == key:
                return v
        raise KeyError(f"Key '{key}' not found in HashMap")

    def __str__(self):
        result = []
        for idx, bucket in enumerate(self.buckets):
            if bucket:
                result.append(f"Bucket {idx}: {bucket}")
        return "\n".join(result) if result else "Empty HashMap"

if __name__ == "__main__":
    print("--- Testing Day 9: Custom HashMap ---")
    hmap = HashMap(5)
    
    print("\nAdding values:")
    hmap.put("apple", 1.29)
    hmap.put("banana", 0.59)
    hmap.put("cherry", 3.99)
    hmap.put("date", 4.99)
    print(hmap)
    
    print("\nRetrieving values:")
    print("Value for 'apple':", hmap.get("apple"))
    print("Value for 'banana':", hmap.get("banana"))
    
    print("\nUpdating 'apple':")
    hmap.put("apple", 1.49)
    print("Value for 'apple':", hmap.get("apple"))
    
    try:
        hmap.get("durian")
    except KeyError as e:
        print("\nCorrectly caught error for missing key:", e)
