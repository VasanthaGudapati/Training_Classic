"""
Day 03: Strings & String Manipulation Algorithms
Practical Task: Interactive CLI String Toolkit & Algorithm Playground.
"""

from typing import List, Tuple


def reverse_string(text: str) -> str:
    """Reverses a string manually via character array manipulation in O(N) time."""
    chars = list(text)
    left, right = 0, len(chars) - 1
    while left < right:
        chars[left], chars[right] = chars[right], chars[left]
        left += 1
        right -= 1
    return "".join(chars)


def is_palindrome(text: str) -> bool:
    """Checks if a string is a palindrome using two pointers (ignoring non-alphanumeric & case)."""
    left, right = 0, len(text) - 1
    while left < right:
        while left < right and not text[left].isalnum():
            left += 1
        while left < right and not text[right].isalnum():
            right -= 1

        if text[left].lower() != text[right].lower():
            return False
        left += 1
        right -= 1
    return True


def find_substring(text: str, pattern: str) -> int:
    """
    Naive substring search: Returns starting index of pattern in text, or -1 if not found.
    Implements character-by-character comparison without relying on string built-ins.
    """
    if not pattern:
        return 0
    n, m = len(text), len(pattern)
    for i in range(n - m + 1):
        match = True
        for j in range(m):
            if text[i + j] != pattern[j]:
                match = False
                break
        if match:
            return i
    return -1


def find_all_substring_occurrences(text: str, pattern: str) -> List[int]:
    """Finds all starting indices of pattern in text."""
    if not pattern:
        return []
    occurrences = []
    n, m = len(text), len(pattern)
    for i in range(n - m + 1):
        if text[i:i + m] == pattern:
            occurrences.append(i)
    return occurrences


def is_anagram(str1: str, str2: str) -> bool:
    """Determines if str1 and str2 are anagrams using a character frequency count."""
    s1 = [c.lower() for c in str1 if c.isalnum()]
    s2 = [c.lower() for c in str2 if c.isalnum()]
    if len(s1) != len(s2):
        return False
    
    freq = {}
    for c in s1:
        freq[c] = freq.get(c, 0) + 1
    for c in s2:
        if c not in freq or freq[c] == 0:
            return False
        freq[c] -= 1
    return True


def longest_unique_substring(text: str) -> Tuple[int, str]:
    """
    Finds the length and content of the longest substring without repeating characters
    using the Sliding Window algorithm.
    """
    char_map = {}
    left = 0
    max_len = 0
    start_idx = 0

    for right in range(len(text)):
        ch = text[right]
        if ch in char_map and char_map[ch] >= left:
            left = char_map[ch] + 1
        char_map[ch] = right

        if right - left + 1 > max_len:
            max_len = right - left + 1
            start_idx = left

    return max_len, text[start_idx:start_idx + max_len]


def run_unit_tests():
    """Runs automated verification tests for Day 03 functions."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 03")
    print("=" * 60)

    # Test Reverse String
    assert reverse_string("hello") == "olleh", "Test 1 Failed: reverse_string"
    assert reverse_string("Python") == "nohtyP", "Test 2 Failed: reverse_string"

    # Test Is Palindrome
    assert is_palindrome("A man, a plan, a canal: Panama") == True, "Test 3 Failed: Palindrome"
    assert is_palindrome("racecar") == True, "Test 4 Failed: Palindrome"
    assert is_palindrome("hello") == False, "Test 5 Failed: Palindrome"

    # Test Substring Search
    assert find_substring("abracadabra", "cad") == 4, "Test 6 Failed: Substring search"
    assert find_substring("hello", "world") == -1, "Test 7 Failed: Substring search"

    # Test Anagrams
    assert is_anagram("listen", "silent") == True, "Test 8 Failed: Anagram"
    assert is_anagram("hello", "billion") == False, "Test 9 Failed: Anagram"

    # Test Sliding Window
    length, sub = longest_unique_substring("abcabcbb")
    assert length == 3 and sub in ["abc", "bca", "cab"], "Test 10 Failed: Sliding Window"

    print("[PASS] All 10 Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 03."""
    while True:
        print("\n" + "=" * 60)
        print(" [DAY 03] STRING MANIPULATION & ALGORITHM PLAYGROUND")
        print("=" * 60)
        print(" [1] Reverse a String")
        print(" [2] Check if String is Palindrome")
        print(" [3] Find Substring (Naive Pattern Matcher)")
        print(" [4] Check if Two Strings are Anagrams")
        print(" [5] Longest Substring Without Repeating Characters (Sliding Window)")
        print(" [6] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-6): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 03 String Toolkit.")
            break

        if choice == "1":
            text = input("Enter text to reverse: ")
            print(f"✨ Reversed Result: '{reverse_string(text)}'")

        elif choice == "2":
            text = input("Enter text to check palindrome: ")
            result = is_palindrome(text)
            status = "✅ YES, it's a palindrome!" if result else "❌ NO, not a palindrome."
            print(f"Result: {status}")

        elif choice == "3":
            text = input("Enter main text: ")
            pattern = input("Enter pattern to find: ")
            idx = find_substring(text, pattern)
            if idx != -1:
                print(f"🎯 Pattern found at index {idx}: '{text[:idx]}[{text[idx:idx+len(pattern)]}]{text[idx+len(pattern):]}'")
            else:
                print("❌ Pattern not found.")

        elif choice == "4":
            s1 = input("Enter first string: ")
            s2 = input("Enter second string: ")
            res = is_anagram(s1, s2)
            print(f"Result: {'✅ Valid Anagrams!' if res else '❌ Not Anagrams.'}")

        elif choice == "5":
            text = input("Enter text: ")
            length, sub = longest_unique_substring(text)
            print(f"💡 Longest unique substring: '{sub}' (Length: {length})")

        elif choice == "6":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 03 String Toolkit. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 6.")


if __name__ == "__main__":
    interactive_cli()
