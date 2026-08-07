"""
Day 24: Dijkstra's Shortest Path Algorithm
Practical Task: O((V + E) log V) Min-Heap Priority Queue Dijkstra Engine,
Path Reconstruction, Network Routing Simulator, and Interactive CLI.
"""

import heapq
from typing import Dict, List, Optional, Tuple


class WeightedGraph:
    """Adjacency List representation of a weighted graph."""

    def __init__(self):
        self.adj_list: Dict[str, List[Tuple[str, float]]] = {}

    def add_node(self, node: str) -> None:
        """Adds a node to the graph if not already present."""
        if node not in self.adj_list:
            self.adj_list[node] = []

    def add_edge(self, u: str, v: str, weight: float, bidirectional: bool = True) -> None:
        """Adds a weighted edge between node u and node v."""
        self.add_node(u)
        self.add_node(v)
        self.adj_list[u].append((v, weight))
        if bidirectional:
            self.adj_list[v].append((u, weight))

    def get_nodes(self) -> List[str]:
        """Returns sorted list of all graph nodes."""
        return sorted(list(self.adj_list.keys()))


def dijkstra_shortest_path(
    graph: WeightedGraph, start_node: str
) -> Tuple[Dict[str, float], Dict[str, Optional[str]], List[str]]:
    """
    Computes shortest path distances from start_node to all other nodes
    using Min-Heap Accelerated Dijkstra Algorithm in O((V + E) log V) time.
    Returns (distances_dict, previous_node_map, visited_order).
    """
    if start_node not in graph.adj_list:
        raise ValueError(f"Start node '{start_node}' does not exist in graph.")

    distances: Dict[str, float] = {node: float("inf") for node in graph.adj_list}
    previous: Dict[str, Optional[str]] = {node: None for node in graph.adj_list}
    distances[start_node] = 0.0

    # Min-Heap Priority Queue storing tuples of (current_distance, node_name)
    pq: List[Tuple[float, str]] = [(0.0, start_node)]
    visited_order: List[str] = []

    while pq:
        current_dist, current_node = heapq.heappop(pq)

        # Skip stale entries with larger distances
        if current_dist > distances[current_node]:
            continue

        visited_order.append(current_node)

        for neighbor, weight in graph.adj_list[current_node]:
            distance = current_dist + weight
            if distance < distances[neighbor]:
                distances[neighbor] = distance
                previous[neighbor] = current_node
                heapq.heappush(pq, (distance, neighbor))

    return distances, previous, visited_order


def reconstruct_path(previous_map: Dict[str, Optional[str]], start_node: str, target_node: str) -> List[str]:
    """Reconstructs optimal node sequence from start_node to target_node using previous_map."""
    if target_node not in previous_map:
        return []

    path = []
    curr: Optional[str] = target_node
    while curr is not None:
        path.append(curr)
        if curr == start_node:
            break
        curr = previous_map[curr]

    if path[-1] != start_node:
        return []  # Target is unreachable from start

    path.reverse()
    return path


def load_internet_backbone_preset(graph: WeightedGraph) -> int:
    """Populates graph with a global internet router latency topology."""
    routes = [
        ("Router_NY", "Router_London", 70.0),    # Transatlantic latency (ms)
        ("Router_NY", "Router_Chicago", 15.0),
        ("Router_Chicago", "Router_LA", 40.0),
        ("Router_LA", "Router_Tokyo", 110.0),
        ("Router_London", "Router_Frankfurt", 12.0),
        ("Router_London", "Router_Paris", 10.0),
        ("Router_Frankfurt", "Router_Tokyo", 210.0),
        ("Router_Frankfurt", "Router_Singapore", 180.0),
        ("Router_Tokyo", "Router_Singapore", 65.0),
        ("Router_LA", "Router_Singapore", 160.0),
    ]

    for u, v, w in routes:
        graph.add_edge(u, v, w, bidirectional=True)

    return len(routes)


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 24 Dijkstra Engine."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 24 (DIJKSTRA)")
    print("=" * 60)

    graph = WeightedGraph()
    graph.add_edge("A", "B", 4.0)
    graph.add_edge("A", "C", 2.0)
    graph.add_edge("B", "C", 1.0)
    graph.add_edge("B", "D", 5.0)
    graph.add_edge("C", "D", 8.0)
    graph.add_edge("C", "E", 10.0)
    graph.add_edge("D", "E", 2.0)

    distances, previous, visited = dijkstra_shortest_path(graph, "A")

    # Test 1: Distance to B via A -> C -> B (weight 2 + 1 = 3 < 4)
    assert distances["B"] == 3.0, f"Test 1 Failed: Expected distance to B = 3.0, got {distances['B']}"

    # Test 2: Distance to E via A -> C -> B -> D -> E (2 + 1 + 5 + 2 = 10)
    assert distances["E"] == 10.0, f"Test 2 Failed: Expected distance to E = 10.0, got {distances['E']}"

    # Test 3: Path reconstruction from A to E
    path = reconstruct_path(previous, "A", "E")
    assert path == ["A", "C", "B", "D", "E"], f"Test 3 Failed: Path sequence mismatch, got {path}"

    # Test 4: Unreachable node handling
    graph.add_node("Isolated_Node")
    distances_iso, previous_iso, _ = dijkstra_shortest_path(graph, "A")
    assert distances_iso["Isolated_Node"] == float("inf"), "Test 4 Failed: Isolated node distance should be infinity"
    assert reconstruct_path(previous_iso, "A", "Isolated_Node") == [], "Test 5 Failed: Path to isolated node should be []"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 24."""
    graph = WeightedGraph()

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 24] DIJKSTRA'S SHORTEST PATH ALGORITHM & ROUTER SIMULATOR")
        print("=" * 60)
        print(f" Loaded Graph Nodes: {len(graph.adj_list)}")
        print(" [1] Add Router Connection / Road Link")
        print(" [2] Compute Shortest Path Between Source & Destination")
        print(" [3] Display All-Node Distances from Source Node")
        print(" [4] Load Global Internet Router Network Preset")
        print(" [5] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-5): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 24 Dijkstra Toolkit.")
            break

        if choice == "1":
            u = input("Enter Source Node A: ").strip()
            v = input("Enter Target Node B: ").strip()
            raw_w = input("Enter Distance / Latency Weight: ").strip()
            if u and v and raw_w:
                try:
                    w = float(raw_w)
                    graph.add_edge(u, v, w)
                    print(f"\n[ADDED] Connected ({u} <---> {v}, Latency: {w} ms).")
                except ValueError:
                    print("\n[ERROR] Invalid numeric weight input.")

        elif choice == "2":
            if not graph.adj_list:
                print("\n[ERROR] Graph is empty. Add nodes or load preset first.")
                continue

            src = input("Enter Source Node: ").strip()
            dst = input("Enter Target Destination Node: ").strip()

            if src in graph.adj_list and dst in graph.adj_list:
                distances, previous, visited = dijkstra_shortest_path(graph, src)
                path = reconstruct_path(previous, src, dst)

                print("\n  --- Dijkstra Shortest Path Results ---")
                if distances[dst] == float("inf"):
                    print(f"  Destination '{dst}' is UNREACHABLE from '{src}'.")
                else:
                    print(f"  Source Node        : {src}")
                    print(f"  Target Destination : {dst}")
                    print(f"  Minimum Total Cost : {distances[dst]} ms")
                    print(f"  Optimal Route Path : {' -> '.join(path)}")
                    print(f"  Hop Count          : {len(path) - 1} hops")
            else:
                print("\n[ERROR] One or both nodes do not exist in graph.")

        elif choice == "3":
            if not graph.adj_list:
                print("\n[ERROR] Graph is empty. Add nodes or load preset first.")
                continue

            src = input("Enter Source Node: ").strip()
            if src in graph.adj_list:
                distances, previous, visited = dijkstra_shortest_path(graph, src)
                print(f"\n  --- Distance Map from Source '{src}' ---")
                for node in graph.get_nodes():
                    d = distances[node]
                    d_str = f"{d:.2f} ms" if d != float("inf") else "INF (Unreachable)"
                    path = reconstruct_path(previous, src, node)
                    path_str = " -> ".join(path) if path else "None"
                    print(f"   {node:<20} | Dist: {d_str:<18} | Path: {path_str}")

        elif choice == "4":
            added = load_internet_backbone_preset(graph)
            print(f"\n[PRESET LOADED] Indexed {added} transatlantic & transcontinental fiber optic routes.")

        elif choice == "5":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 24 Dijkstra Toolkit.")
            break
        else:
            print("\n[INVALID] Please select a valid option (0-5).")


if __name__ == "__main__":
    interactive_cli()
