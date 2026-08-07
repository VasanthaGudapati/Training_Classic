# 🌲 Day 21: Trie (Prefix Tree) & Autocomplete Engine

## 📚 Concepts Learned Today
- **Trie Data Structure**: An $R$-ary search tree for storing strings where each node represents a single character prefix.
  - **Node Schema**: `children: Dict[str, TrieNode]`, `is_end_of_word: bool`, `frequency: int`.
- **Time Complexity Benefits**:
  - **Insertion**: $O(L)$ where $L$ is word length.
  - **Search & Prefix Lookup**: $O(L)$ time, independent of dictionary size $N$.
- **Real-World Applications**: Search bar autocomplete suggestions, spell checking, IP routing tables (longest prefix match), and predictive text input systems.
- **Top-K Autocomplete**: Collecting all matching words under a prefix subtree and ranking by frequency weight using Depth-First Search (DFS).

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day21/main.py
```
