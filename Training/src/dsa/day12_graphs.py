"""
Day 12: Graph Representations & BFS Traversal
Practical Task: Build a graph layout and traverse it.

Requirements:
- Create a Graph class represented by an Adjacency List.
- Implement add_vertex(v), add_edge(v1, v2) (undirected connection).
- Implement bfs(start_vertex) to traverse the graph level-by-level using a queue.
"""

class Graph:
    def __init__(self):
        # Dictionary mapping vertex to list of neighbors
        self.adjacency_list = {}

    def add_vertex(self, vertex) -> None:
        """Adds a vertex to the graph if it doesn't exist."""
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, v1, v2) -> None:
        """Creates an undirected edge between v1 and v2."""
        self.add_vertex(v1)
        self.add_vertex(v2)
        
        if v2 not in self.adjacency_list[v1]:
            self.adjacency_list[v1].append(v2)
        if v1 not in self.adjacency_list[v2]:
            self.adjacency_list[v2].append(v1)

    def bfs(self, start_vertex) -> list:
        """Breadth-First Search traversal using a queue."""
        if start_vertex not in self.adjacency_list:
            return []
            
        visited = set()
        queue = [start_vertex]
        visited.add(start_vertex)
        traversal_order = []
        
        while queue:
            curr = queue.pop(0)
            traversal_order.append(curr)
            
            for neighbor in self.adjacency_list[curr]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)
                    
        return traversal_order

if __name__ == "__main__":
    print("--- Testing Day 12: Graphs & BFS ---")
    g = Graph()
    
    # Adding edges:
    # A - B - D
    # |   |
    # C - E
    g.add_edge("A", "B")
    g.add_edge("A", "C")
    g.add_edge("B", "D")
    g.add_edge("B", "E")
    g.add_edge("C", "E")
    
    print("Adjacency List:")
    for vertex, neighbors in g.adjacency_list.items():
        print(f"  {vertex}: {neighbors}")
        
    print("\nBFS traversal starting from A:")
    print("  ", g.bfs("A"))
