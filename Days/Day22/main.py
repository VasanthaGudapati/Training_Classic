"""
Day 22: Disjoint Set Union (DSU) & Kruskal's Minimum Spanning Tree (MST)
Practical Task: Path Compression & Union-by-Rank DSU Implementation,
Greedy Kruskal MST Algorithm, Network Cost Minimizer, and Interactive CLI.
"""

from typing import Any, Dict, List, Set, Tuple


class DisjointSetUnion:
    """
    Disjoint Set Union (DSU / Union-Find) data structure featuring
    Path Compression and Union-by-Rank for near-O(1) amortized operations.
    """

    def __init__(self):
        self.parent: Dict[Any, Any] = {}
        self.rank: Dict[Any, int] = {}
        self.num_sets: int = 0

    def add(self, element: Any) -> None:
        """Adds an element as its own set representative if not present."""
        if element not in self.parent:
            self.parent[element] = element
            self.rank[element] = 0
            self.num_sets += 1

    def find(self, element: Any) -> Any:
        """Finds root representative of target element using Path Compression."""
        if element not in self.parent:
            self.add(element)
            return element

        if self.parent[element] != element:
            # Path compression: point element directly to set root
            self.parent[element] = self.find(self.parent[element])
        return self.parent[element]

    def union(self, elem1: Any, elem2: Any) -> bool:
        """
        Merges sets containing elem1 and elem2 using Union by Rank.
        Returns True if sets were merged, False if already in the same set.
        """
        root1 = self.find(elem1)
        root2 = self.find(elem2)

        if root1 == root2:
            return False  # Already in the same set

        # Union by Rank optimization
        if self.rank[root1] < self.rank[root2]:
            self.parent[root1] = root2
        elif self.rank[root1] > self.rank[root2]:
            self.parent[root2] = root1
        else:
            self.parent[root2] = root1
            self.rank[root1] += 1

        self.num_sets -= 1
        return True

    def is_connected(self, elem1: Any, elem2: Any) -> bool:
        """Checks if two elements belong to the same disjoint set."""
        return self.find(elem1) == self.find(elem2)


class Edge:
    """Weighted graph edge connecting node u and node v."""

    def __init__(self, u: str, v: str, weight: float):
        self.u: str = u
        self.v: str = v
        self.weight: float = weight

    def __repr__(self) -> str:
        return f"Edge({self.u} -- {self.v}, weight={self.weight})"


class KruskalMST:
    """Computes Minimum Spanning Tree using Kruskal's Greedy Algorithm and DSU."""

    def __init__(self):
        self.edges: List[Edge] = []
        self.vertices: Set[str] = set()

    def add_edge(self, u: str, v: str, weight: float) -> None:
        """Adds a weighted undirected edge to the graph."""
        self.edges.append(Edge(u, v, weight))
        self.vertices.add(u)
        self.vertices.add(v)

    def compute_mst(self) -> Tuple[List[Edge], float, bool]:
        """
        Computes MST of the graph using Kruskal's algorithm.
        Returns (mst_edges, total_cost, is_fully_connected).
        """
        if not self.vertices:
            return [], 0.0, True

        # Step 1: Sort all edges in non-decreasing order of weight (O(E log E))
        sorted_edges = sorted(self.edges, key=lambda e: e.weight)

        dsu = DisjointSetUnion()
        for v in self.vertices:
            dsu.add(v)

        mst_edges: List[Edge] = []
        total_cost: float = 0.0

        # Step 2: Iterate through sorted edges and add if it doesn't form a cycle
        for edge in sorted_edges:
            if dsu.union(edge.u, edge.v):
                mst_edges.append(edge)
                total_cost += edge.weight

                # Stop early if MST has V - 1 edges
                if len(mst_edges) == len(self.vertices) - 1:
                    break

        is_connected = len(mst_edges) == (len(self.vertices) - 1) if len(self.vertices) > 1 else True
        return mst_edges, round(total_cost, 2), is_connected


def load_city_network_preset(graph: KruskalMST) -> int:
    """Populates graph with a fiber-optic network infrastructure design scenario."""
    connections = [
        ("DataCenter_A", "Server_Node_1", 10),
        ("DataCenter_A", "Server_Node_2", 15),
        ("Server_Node_1", "Server_Node_2", 8),
        ("Server_Node_1", "Office_East", 20),
        ("Server_Node_2", "Office_West", 25),
        ("Office_East", "Office_West", 5),
        ("Office_East", "Remote_Hub", 12),
        ("Office_West", "Remote_Hub", 18),
    ]

    for u, v, w in connections:
        graph.add_edge(u, v, float(w))

    return len(connections)


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 22 DSU and Kruskal MST."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 22 (DSU & KRUSKAL MST)")
    print("=" * 60)

    # Test 1: Basic DSU Union & Find with Path Compression
    dsu = DisjointSetUnion()
    dsu.union("A", "B")
    dsu.union("B", "C")
    assert dsu.find("A") == dsu.find("C"), "Test 1 Failed: 'A' and 'C' should be connected"
    assert dsu.is_connected("A", "C") is True, "Test 2 Failed: is_connected('A', 'C') should be True"
    assert dsu.is_connected("A", "D") is False, "Test 3 Failed: 'A' and 'D' should not be connected"

    # Test 2: Set Count Tracking
    assert dsu.num_sets == 2, f"Test 4 Failed: Expected 2 sets ({{A,B,C}}, {{D}}), got {dsu.num_sets}"

    # Test 3: Kruskal MST calculation on known graph
    graph = KruskalMST()
    graph.add_edge("A", "B", 1.0)
    graph.add_edge("B", "C", 2.0)
    graph.add_edge("A", "C", 3.0)
    graph.add_edge("C", "D", 4.0)

    mst_edges, cost, connected = graph.compute_mst()
    assert len(mst_edges) == 3, f"Test 5 Failed: MST should have 3 edges, got {len(mst_edges)}"
    assert cost == 7.0, f"Test 6 Failed: Minimum MST cost should be 1 + 2 + 4 = 7.0, got {cost}"
    assert connected is True, "Test 7 Failed: Graph should be fully connected"

    # Test 4: Cycle Prevention
    edge_weights = [e.weight for e in mst_edges]
    assert 3.0 not in edge_weights, "Test 8 Failed: Edge A-C (weight 3.0) forms cycle and must be excluded"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 22."""
    dsu = DisjointSetUnion()
    graph = KruskalMST()

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 22] DISJOINT SET UNION (DSU) & KRUSKAL MST TOOLKIT")
        print("=" * 60)
        print(f" Active Graph Vertices: {len(graph.vertices)} | Edges: {len(graph.edges)} | DSU Sets: {dsu.num_sets}")
        print(" [1] Perform DSU Union (Connect Elements)")
        print(" [2] Check if Two Elements are Connected (DSU Find)")
        print(" [3] Add Weighted Edge to Graph")
        print(" [4] Run Kruskal's MST Network Design Simulator")
        print(" [5] Load City Fiber-Optic Infrastructure Preset")
        print(" [6] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-6): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 22 DSU & Kruskal Toolkit.")
            break

        if choice == "1":
            e1 = input("Enter first element: ").strip()
            e2 = input("Enter second element: ").strip()
            if e1 and e2:
                merged = dsu.union(e1, e2)
                if merged:
                    print(f"\n[UNION SUCCESS] Merged sets containing '{e1}' and '{e2}'. Current disjoint sets: {dsu.num_sets}")
                else:
                    print(f"\n[ALREADY CONNECTED] Elements '{e1}' and '{e2}' were already in the same set.")

        elif choice == "2":
            e1 = input("Enter first element: ").strip()
            e2 = input("Enter second element: ").strip()
            if e1 and e2:
                connected = dsu.is_connected(e1, e2)
                if connected:
                    print(f"\n[CONNECTED] Yes, '{e1}' and '{e2}' belong to the same disjoint set (Root: {dsu.find(e1)}).")
                else:
                    print(f"\n[DISCONNECTED] No, '{e1}' (Root: {dsu.find(e1)}) and '{e2}' (Root: {dsu.find(e2)}) are in separate sets.")

        elif choice == "3":
            u = input("Enter Node A: ").strip()
            v = input("Enter Node B: ").strip()
            raw_w = input("Enter Edge Weight / Distance: ").strip()
            if u and v and raw_w:
                try:
                    w = float(raw_w)
                    graph.add_edge(u, v, w)
                    print(f"\n[EDGE ADDED] Added edge ({u} <---> {v}, Weight: {w}).")
                except ValueError:
                    print("\n[ERROR] Invalid numeric weight input.")

        elif choice == "4":
            print("\n  --- Kruskal's Minimum Spanning Tree (MST) Simulation ---")
            mst_edges, total_cost, is_connected = graph.compute_mst()
            if not mst_edges:
                print("  Graph is empty. Please add edges or load preset first.")
            else:
                print(f"  Total Vertices Connected : {len(graph.vertices)}")
                print(f"  Selected MST Edges Count : {len(mst_edges)}")
                print(f"  Minimum Total Link Cost  : ${total_cost:,.2f}")
                print(f"  Fully Connected Topology : {'Yes' if is_connected else 'No (Disconnected Graph)'}")
                print("\n  Optimal Low-Cost Network Backbone Edges:")
                for i, edge in enumerate(mst_edges, 1):
                    print(f"   [{i}] {edge.u:<18} <---> {edge.v:<18} (Cost / Distance: {edge.weight})")

        elif choice == "5":
            added = load_city_network_preset(graph)
            print(f"\n[PRESET LOADED] Loaded {added} weighted fiber optic links connecting {len(graph.vertices)} nodes.")

        elif choice == "6":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 22 DSU & Kruskal Toolkit.")
            break
        else:
            print("\n[INVALID] Please select a valid option (0-6).")


if __name__ == "__main__":
    interactive_cli()
