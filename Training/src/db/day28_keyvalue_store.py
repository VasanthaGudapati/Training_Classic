"""
Day 28: Simple Key-Value Disk Store
Practical Task: Build a persistent key-value store.

Requirements:
- Implement a SimpleDiskStore class taking a file path on initialization.
- On startup, read database entries from the flat file (JSON format) into a memory dictionary.
- Implement put(key, value) which updates the memory dict and writes all items back to disk.
- Implement get(key) which retrieves values from the memory dictionary.
"""

import os
import json

class SimpleDiskStore:
    def __init__(self, filepath: str):
        self.filepath = filepath
        self.store = {}
        self._load_from_disk()

    def _load_from_disk(self) -> None:
        """Reads database entries from file on startup."""
        if os.path.exists(self.filepath):
            try:
                with open(self.filepath, "r") as f:
                    self.store = json.load(f)
                print(f"[*] Loaded {len(self.store)} keys from disk store: {self.filepath}")
            except (json.JSONDecodeError, IOError) as e:
                print(f"[Warning] Failed to read store file. Initializing empty. ({e})")
                self.store = {}
        else:
            self.store = {}

    def _save_to_disk(self) -> None:
        """Saves current memory state back to flat file."""
        try:
            with open(self.filepath, "w") as f:
                json.dump(self.store, f, indent=4)
        except IOError as e:
            print(f"[Error] Failed to write database state to disk: {e}")

    def put(self, key: str, value) -> None:
        """Inserts or updates key and flushes changes to disk."""
        self.store[str(key)] = value
        self._save_to_disk()

    def get(self, key: str):
        """Retrieves key value from memory store."""
        return self.store.get(str(key))

if __name__ == "__main__":
    print("--- Testing Day 28: Key-Value Disk Store ---")
    db_file = "temp_kv_store.json"
    
    # Clean any old test run files
    if os.path.exists(db_file):
        os.remove(db_file)
        
    print("\nInitializing new store:")
    db = SimpleDiskStore(db_file)
    
    print("\nPutting keys 'username' and 'theme':")
    db.put("username", "developer123")
    db.put("theme", "dark_mode")
    
    print("\nRe-initializing store to simulate reload/restart:")
    db_reloaded = SimpleDiskStore(db_file)
    print("  Get 'username':", db_reloaded.get("username"))
    print("  Get 'theme':", db_reloaded.get("theme"))
    
    # Clean up test file
    if os.path.exists(db_file):
        os.remove(db_file)
        print("\n[*] Cleaned up temporary JSON file.")
