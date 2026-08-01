"""
Day 12: Graph Representations, BFS & DFS Traversals
Practical Task: Interactive CLI Graph Playground with Adjacency List, BFS, DFS & Shortest Path Finder.
"""

from collections import deque
from typing import Any, Dict, List, Optional, Set, Tuple


class Graph:
    """
    Custom Graph class represented using an Adjacency List.
    Supports directed and undirected graph operations, BFS, DFS, and Shortest Path finding.
    """

    def __init__(self, is_directed: bool = False):
        self.is_directed: bool = is_directed
        self.adjacency_list: Dict[Any, List[Any]] = {}

    def add_vertex(self, vertex: Any) -> None:
        """Adds a vertex to the graph if it doesn't exist."""
        if vertex not in self.adjacency_list:
            self.adjacency_list[vertex] = []

    def add_edge(self, v1: Any, v2: Any) -> None:
        """Adds an edge between v1 and v2."""
        self.add_vertex(v1)
        self.add_vertex(v2)

        if v2 not in self.adjacency_list[v1]:
            self.adjacency_list[v1].append(v2)

        if not self.is_directed:
            if v1 not in self.adjacency_list[v2]:
                self.adjacency_list[v2].append(v1)

    def bfs(self, start_vertex: Any) -> List[Any]:
        """
        Performs Breadth-First Search (BFS) level-by-level starting from start_vertex.
        Returns ordered list of visited vertices in O(V + E) time.
        """
        if start_vertex not in self.adjacency_list:
            return []

        visited: Set[Any] = {start_vertex}
        queue: deque = deque([start_vertex])
        traversal_order: List[Any] = []

        while queue:
            curr = queue.popleft()
            traversal_order.append(curr)

            for neighbor in self.adjacency_list[curr]:
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

        return traversal_order

    def dfs(self, start_vertex: Any) -> List[Any]:
        """
        Performs Depth-First Search (DFS) recursively starting from start_vertex.
        Returns ordered list of visited vertices in O(V + E) time.
        """
        if start_vertex not in self.adjacency_list:
            return []

        visited: Set[Any] = set()
        traversal_order: List[Any] = []

        def _dfs_recursive(vertex: Any):
            visited.add(vertex)
            traversal_order.append(vertex)
            for neighbor in self.adjacency_list[vertex]:
                if neighbor not in visited:
                    _dfs_recursive(neighbor)

        _dfs_recursive(start_vertex)
        return traversal_order

    def shortest_path_bfs(self, start: Any, target: Any) -> Optional[List[Any]]:
        """
        Finds the shortest path between start and target vertices in an unweighted graph using BFS.
        Returns list representing path sequence, or None if no path exists.
        """
        if start not in self.adjacency_list or target not in self.adjacency_list:
            return None

        if start == target:
            return [start]

        queue: deque = deque([[start]])
        visited: Set[Any] = {start}

        while queue:
            path = queue.popleft()
            node = path[-1]

            for neighbor in self.adjacency_list[node]:
                if neighbor == target:
                    return path + [target]

                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(path + [neighbor])

        return None

    def has_path(self, start: Any, target: Any) -> bool:
        """Checks if a path exists between start and target vertices."""
        return self.shortest_path_bfs(start, target) is not None

    def visual_adjacency_list(self) -> str:
        """Returns string representation of adjacency list."""
        if not self.adjacency_list:
            return "[EMPTY GRAPH]"

        lines = []
        for v, neighbors in self.adjacency_list.items():
            arrow = "->" if self.is_directed else "<->"
            neighbors_str = ", ".join(str(n) for n in neighbors) if neighbors else "None"
            lines.append(f"  [{v}] {arrow} [{neighbors_str}]")
        return "\n".join(lines)


def run_unit_tests():
    """Runs automated verification tests for Graph algorithms."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 12")
    print("=" * 60)

    # Test Undirected Graph
    g = Graph(is_directed=False)
    g.add_edge("A", "B")
    g.add_edge("A", "C")
    g.add_edge("B", "D")
    g.add_edge("B", "E")
    g.add_edge("C", "E")

    # BFS Test
    bfs_result = g.bfs("A")
    assert bfs_result[0] == "A" and set(bfs_result[:3]) == {"A", "B", "C"}, "Test 1 Failed: BFS Traversal"

    # DFS Test
    dfs_result = g.dfs("A")
    assert len(dfs_result) == 5 and set(dfs_result) == {"A", "B", "C", "D", "E"}, "Test 2 Failed: DFS Traversal"

    # Shortest Path Test (A -> E should be A -> C -> E or A -> B -> E)
    path = g.shortest_path_bfs("A", "E")
    assert path is not None and len(path) == 3 and path[0] == "A" and path[-1] == "E", "Test 3 Failed: Shortest Path length"

    # Has Path Test
    assert g.has_path("A", "D") == True, "Test 4 Failed: Has path positive"
    
    # Isolated Vertex Test
    g.add_vertex("Z")
    assert g.has_path("A", "Z") == False, "Test 5 Failed: Has path negative for disconnected vertex"

    # Directed Graph Test
    dg = Graph(is_directed=True)
    dg.add_edge("X", "Y")
    assert dg.has_path("X", "Y") == True and dg.has_path("Y", "X") == False, "Test 6 Failed: Directed edge navigation"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 12."""
    g = Graph(is_directed=False)
    # Default sample graph:
    # A - B - D
    # |   |
    # C - E
    g.add_edge("A", "B")
    g.add_edge("A", "C")
    g.add_edge("B", "D")
    g.add_edge("B", "E")
    g.add_edge("C", "E")

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 12] GRAPH ALGORITHMS, BFS & DFS PLAYGROUND")
        print("=" * 60)
        print(" Current Adjacency List:")
        print(g.visual_adjacency_list())
        print("-" * 60)
        print(" [1] Add Edge")
        print(" [2] Run Breadth-First Search (BFS)")
        print(" [3] Run Depth-First Search (DFS)")
        print(" [4] Find Shortest Path (BFS)")
        print(" [5] Check Path Existence")
        print(" [6] Toggle Graph Type (Undirected vs Directed)")
        print(" [7] Run Automated Unit Tests")
        print(" [8] Reset Graph")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-8): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 12 Graph Playground.")
            break

        if choice == "1":
            v1 = input("Enter source vertex name (e.g. A): ").strip()
            v2 = input("Enter target vertex name (e.g. F): ").strip()
            if v1 and v2:
                g.add_edge(v1, v2)
                print(f"[*] Added edge: {v1} {'->' if g.is_directed else '<->'} {v2}")

        elif choice == "2":
            start = input("Enter start vertex for BFS: ").strip()
            seq = g.bfs(start)
            print(f"[*] BFS Traversal Sequence: {seq}" if seq else f"[Warning] Vertex '{start}' not in graph.")

        elif choice == "3":
            start = input("Enter start vertex for DFS: ").strip()
            seq = g.dfs(start)
            print(f"[*] DFS Traversal Sequence: {seq}" if seq else f"[Warning] Vertex '{start}' not in graph.")

        elif choice == "4":
            start = input("Enter start vertex: ").strip()
            target = input("Enter target vertex: ").strip()
            path = g.shortest_path_bfs(start, target)
            if path:
                print(f"[*] Shortest Path ({len(path)-1} hops): {' -> '.join(path)}")
            else:
                print(f"[Warning] No path exists between '{start}' and '{target}'.")

        elif choice == "5":
            start = input("Enter start vertex: ").strip()
            target = input("Enter target vertex: ").strip()
            exists = g.has_path(start, target)
            print(f"[*] Path Status: {'PATH EXISTS' if exists else 'NO PATH CONNECTED'}")

        elif choice == "6":
            g.is_directed = not g.is_directed
            print(f"[*] Graph mode switched to: {'DIRECTED' if g.is_directed else 'UNDIRECTED'}")

        elif choice == "7":
            run_unit_tests()

        elif choice == "8":
            g = Graph(is_directed=False)
            print("[*] Graph reset.")

        elif choice == "0":
            print("\n[EXIT] Exiting Day 12 Graph Playground. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 8.")


if __name__ == "__main__":
    interactive_cli()
