"""
Day 27: Database Indexing: Theoretical Concept
Practical Task: Write a mock DB Index simulator.

Requirements:
- Generate a list of 10,000 mock student records (each represented as a dictionary).
- Implement a search function that scans the list linearly to find a record by ID (time it).
- Build a index hash map key-value store mapping ID to the student dictionary.
- Implement an indexed search function utilizing this index (time it).
- Print the performance comparison stats.
"""

import time
import random

# Generate mock data
def generate_mock_records(count: int = 10000) -> list:
    records = []
    for i in range(1, count + 1):
        records.append({
            "id": i,
            "name": f"Student_{i}",
            "age": random.randint(18, 30),
            "major": random.choice(["CS", "EE", "Math", "Physics", "Bio"])
        })
    return records

def linear_search(records: list, target_id: int) -> dict:
    """O(N) search by scanning every element sequentially."""
    for record in records:
        if record["id"] == target_id:
            return record
    return None

if __name__ == "__main__":
    print("--- Testing Day 27: DB Indexing Simulation ---")
    
    # 1. Setup records
    print("[*] Generating 10,000 mock student records...")
    db_records = generate_mock_records(10000)
    
    # 2. Build index
    print("[*] Building hash index on 'id'...")
    start_index_build = time.perf_counter()
    db_index = {record["id"]: record for record in db_records}
    end_index_build = time.perf_counter()
    print(f"  Index built in {end_index_build - start_index_build:.6f} seconds.")
    
    # Target to find (near the end to highlight linear search worst case)
    target_id = 9999
    
    # 3. Time Linear Search
    print(f"\nSearching for student ID {target_id}...")
    start_time = time.perf_counter()
    res_linear = linear_search(db_records, target_id)
    end_time = time.perf_counter()
    linear_duration = end_time - start_time
    print(f"  Linear Search: Found record: {res_linear}")
    print(f"  Linear Search Time: {linear_duration:.8f} seconds")
    
    # 4. Time Indexed Search
    start_time = time.perf_counter()
    res_indexed = db_index.get(target_id)
    end_time = time.perf_counter()
    indexed_duration = end_time - start_time
    print(f"  Indexed Search: Found record: {res_indexed}")
    print(f"  Indexed Search Time: {indexed_duration:.8f} seconds")
    
    # Speedup factor
    if indexed_duration > 0:
        speedup = linear_duration / indexed_duration
        print(f"\nSpeedup: Index lookup was {speedup:.1f}x faster!")
