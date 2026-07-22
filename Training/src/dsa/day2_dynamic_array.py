"""
Day 2: Dynamic Arrays & Array Resizing
Practical Task: Build a custom DynamicArray class.

Requirements:
- Create an array with a default capacity of 2.
- Implement append(element), get(index), remove_at(index), and capacity doubling when full.
- Avoid using standard list methods for insertion/deletion to simulate low-level array behavior.
"""

class DynamicArray:
    def __init__(self, initial_capacity: int = 2):
        self.capacity = initial_capacity
        self.size = 0
        # Simulating raw array with fixed size list of Nones
        self.array = [None] * self.capacity

    def append(self, element) -> None:
        """Appends element to the end of the array, resizing if necessary."""
        if self.size == self.capacity:
            self._resize(self.capacity * 2)
        
        self.array[self.size] = element
        self.size += 1

    def get(self, index: int):
        """Retrieves element at a specific index."""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        return self.array[index]

    def remove_at(self, index: int):
        """Removes element at a specific index, shifting subsequent elements."""
        if index < 0 or index >= self.size:
            raise IndexError("Index out of bounds")
        
        removed_item = self.array[index]
        # Shift elements to the left
        for i in range(index, self.size - 1):
            self.array[i] = self.array[i + 1]
            
        self.array[self.size - 1] = None
        self.size -= 1
        return removed_item

    def _resize(self, new_capacity: int) -> None:
        """Resizes the internal array buffer to a new capacity."""
        print(f"[*] Resizing array from capacity {self.capacity} to {new_capacity}")
        new_array = [None] * new_capacity
        for i in range(self.size):
            new_array[i] = self.array[i]
        self.array = new_array
        self.capacity = new_capacity

    def __str__(self):
        return "[" + ", ".join(str(self.array[i]) for i in range(self.size)) + f"] (Size: {self.size}, Capacity: {self.capacity})"

if __name__ == "__main__":
    print("--- Testing Day 2: Dynamic Array ---")
    arr = DynamicArray()
    print("Initial:", arr)
    arr.append(10)
    arr.append(20)
    print("After 2 appends:", arr)
    arr.append(30)
    print("After 3rd append (should double capacity):", arr)
    print("Element at index 1:", arr.get(1))
    arr.remove_at(1)
    print("After removing index 1:", arr)
