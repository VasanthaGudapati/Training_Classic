"""
Day 21: Trie (Prefix Tree) & Autocomplete Engine
Practical Task: O(L) Trie Data Structure Implementation, Prefix Search,
Top-K Autocomplete Ranking Engine, and Interactive CLI.
"""

from typing import Dict, List, Optional, Tuple


class TrieNode:
    """Node in Trie storing child node pointers and word metadata."""

    def __init__(self):
        self.children: Dict[str, "TrieNode"] = {}
        self.is_end_of_word: bool = False
        self.frequency: int = 0  # Frequency weight for autocomplete ranking


class Trie:
    """
    Trie (Prefix Tree) data structure providing O(L) time complexity
    for insertion, search, and prefix matching operations where L is string length.
    """

    def __init__(self):
        self.root: TrieNode = TrieNode()
        self.word_count: int = 0

    def insert(self, word: str, frequency: int = 1) -> None:
        """Inserts word with frequency weight into Trie."""
        word = word.strip().lower()
        if not word:
            return

        curr = self.root
        for char in word:
            if char not in curr.children:
                curr.children[char] = TrieNode()
            curr = curr.children[char]

        if not curr.is_end_of_word:
            curr.is_end_of_word = True
            self.word_count += 1

        curr.frequency += frequency

    def search(self, word: str) -> bool:
        """Returns True if full word exists in Trie."""
        word = word.strip().lower()
        if not word:
            return False

        curr = self.root
        for char in word:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return curr.is_end_of_word

    def starts_with(self, prefix: str) -> bool:
        """Returns True if any word in Trie starts with given prefix."""
        prefix = prefix.strip().lower()
        if not prefix:
            return True

        curr = self.root
        for char in prefix:
            if char not in curr.children:
                return False
            curr = curr.children[char]
        return True

    def autocomplete(self, prefix: str, limit: int = 5) -> List[Tuple[str, int]]:
        """
        Finds all words starting with prefix and returns top `limit`
        suggestions ordered by frequency weight (descending).
        """
        prefix = prefix.strip().lower()
        curr = self.root

        # Navigate to prefix node
        for char in prefix:
            if char not in curr.children:
                return []
            curr = curr.children[char]

        results: List[Tuple[str, int]] = []

        def _dfs(node: TrieNode, current_word: str) -> None:
            if node.is_end_of_word:
                results.append((current_word, node.frequency))
            for char, child_node in node.children.items():
                _dfs(child_node, current_word + char)

        _dfs(curr, prefix)

        # Sort results by frequency descending, then alphabetically ascending
        results.sort(key=lambda x: (-x[1], x[0]))
        return results[:limit]

    def delete(self, word: str) -> bool:
        """Removes a word from the Trie. Returns True if deleted successfully."""
        word = word.strip().lower()
        if not word:
            return False

        def _delete_helper(curr: TrieNode, word: str, index: int) -> bool:
            if index == len(word):
                if not curr.is_end_of_word:
                    return False
                curr.is_end_of_word = False
                self.word_count -= 1
                return len(curr.children) == 0

            char = word[index]
            if char not in curr.children:
                return False

            should_delete_child = _delete_helper(curr.children[char], word, index + 1)
            if should_delete_child:
                del curr.children[char]
                return len(curr.children) == 0 and not curr.is_end_of_word

            return False

        return _delete_helper(self.root, word, 0)


def load_preset_dictionary(trie: Trie) -> int:
    """Populates Trie with standard CS & Tech terms with sample search frequencies."""
    words_with_freq = [
        ("algorithm", 150),
        ("array", 120),
        ("autocomplete", 95),
        ("binary", 110),
        ("binary search", 130),
        ("binary tree", 140),
        ("bit", 45),
        ("bubble sort", 60),
        ("cache", 180),
        ("compiler", 85),
        ("concurrency", 90),
        ("data", 200),
        ("database", 210),
        ("data structure", 175),
        ("dequeue", 50),
        ("dijkstra", 75),
        ("dynamic programming", 160),
        ("encapsulation", 70),
        ("fifo", 65),
        ("graph", 145),
        ("hash map", 190),
        ("heap", 135),
        ("inheritance", 80),
        ("knapsack", 55),
        ("linked list", 165),
        ("log parser", 40),
        ("lru cache", 170),
        ("merge sort", 115),
        ("multithreading", 100),
        ("polymorphism", 75),
        ("priority queue", 125),
        ("queue", 105),
        ("quick sort", 110),
        ("recursion", 155),
        ("rle compression", 50),
        ("stack", 150),
        ("tree", 140),
        ("trie", 195),
        ("variables", 85),
    ]

    count = 0
    for word, freq in words_with_freq:
        trie.insert(word, freq)
        count += 1

    return count


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 21 Trie."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 21 (TRIE)")
    print("=" * 60)

    # Test 1: Insert and Exact Search
    trie = Trie()
    trie.insert("apple", 10)
    trie.insert("app", 20)
    assert trie.search("apple") is True, "Test 1 Failed: Should find 'apple'"
    assert trie.search("app") is True, "Test 2 Failed: Should find 'app'"
    assert trie.search("ap") is False, "Test 3 Failed: 'ap' is prefix, not full word"

    # Test 2: Starts With (Prefix Match)
    assert trie.starts_with("ap") is True, "Test 4 Failed: 'ap' prefix should exist"
    assert trie.starts_with("app") is True, "Test 5 Failed: 'app' prefix should exist"
    assert trie.starts_with("bat") is False, "Test 6 Failed: 'bat' prefix should not exist"

    # Test 3: Autocomplete Ranking Order
    trie.insert("application", 5)
    trie.insert("api", 30)

    suggestions = trie.autocomplete("ap", limit=5)
    suggested_words = [word for word, _ in suggestions]
    assert suggested_words[0] == "api", f"Test 7 Failed: Highest freq 'api' (30) expected first, got {suggested_words}"
    assert "app" in suggested_words and "apple" in suggested_words, "Test 8 Failed: 'app' and 'apple' expected in suggestions"

    # Test 4: Deletion
    trie.delete("apple")
    assert trie.search("apple") is False, "Test 9 Failed: 'apple' should be deleted"
    assert trie.search("app") is True, "Test 10 Failed: 'app' should still exist after deleting 'apple'"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 21."""
    trie = Trie()

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 21] TRIE (PREFIX TREE) & AUTOCOMPLETE ENGINE")
        print("=" * 60)
        print(f" Total Words Indexed: {trie.word_count}")
        print(" [1] Insert Word into Trie (with Frequency Weight)")
        print(" [2] Exact Search for Word")
        print(" [3] Check if Prefix Exists (starts_with)")
        print(" [4] Run Live Autocomplete Suggestions for Prefix")
        print(" [5] Load Preset Tech Terms Dictionary")
        print(" [6] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-6): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 21 Trie Toolkit.")
            break

        if choice == "1":
            word = input("Enter word to insert: ").strip()
            if word:
                raw_freq = input("Enter frequency weight (default 1): ").strip()
                freq = int(raw_freq) if raw_freq.isdigit() else 1
                trie.insert(word, freq)
                print(f"\n[INSERT SUCCESS] Indexed '{word.lower()}' with weight {freq}.")

        elif choice == "2":
            word = input("Enter word to search: ").strip()
            if word:
                found = trie.search(word)
                if found:
                    print(f"\n[FOUND] Word '{word}' exists in Trie.")
                else:
                    print(f"\n[NOT FOUND] Word '{word}' does not exist in Trie.")

        elif choice == "3":
            prefix = input("Enter prefix to check: ").strip()
            if prefix:
                exists = trie.starts_with(prefix)
                if exists:
                    print(f"\n[PREFIX MATCH] Prefix '{prefix}' exists in Trie.")
                else:
                    print(f"\n[NO MATCH] No words start with prefix '{prefix}'.")

        elif choice == "4":
            prefix = input("Enter prefix to autocomplete (e.g. 'ba', 'da', 'cl'): ").strip()
            if prefix:
                results = trie.autocomplete(prefix, limit=5)
                print(f"\n  --- Autocomplete Suggestions for '{prefix}' ---")
                if not results:
                    print("  No suggestions found.")
                else:
                    for i, (w, f) in enumerate(results, 1):
                        print(f"   [{i}] {w:<25} (Weight / Frequency: {f})")

        elif choice == "5":
            added = load_preset_dictionary(trie)
            print(f"\n[PRESET LOADED] Successfully indexed {added} CS & Tech terms into Trie.")

        elif choice == "6":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 21 Trie Toolkit.")
            break
        else:
            print("\n[INVALID] Please select a valid option (0-6).")


if __name__ == "__main__":
    interactive_cli()
