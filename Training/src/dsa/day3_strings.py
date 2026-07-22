"""
Day 3: Strings & Substring Searching
Practical Task: Build a custom String Utility toolkit.

Requirements:
- Implement reverse_string(text) from scratch.
- Implement is_palindrome(text) from scratch.
- Implement find_substring(text, pattern) using character iteration (do not use built-in find/in/slicing).
"""

def reverse_string(text: str) -> str:
    """Reverses a string manually via character iteration."""
    reversed_chars = []
    for i in range(len(text) - 1, -1, -1):
        reversed_chars.append(text[i])
    return "".join(reversed_chars)

def is_palindrome(text: str) -> bool:
    """Checks if a string is a palindrome by comparing start and end characters."""
    left = 0
    right = len(text) - 1
    while left < right:
        if text[left] != text[right]:
            return False
        left += 1
        right -= 1
    return True

def find_substring(text: str, pattern: str) -> int:
    """Naive substring search: Returns the starting index of pattern in text, or -1 if not found."""
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

if __name__ == "__main__":
    print("--- Testing Day 3: String Utilities ---")
    test_str = "hello"
    print(f"Reverse '{test_str}':", reverse_string(test_str))
    
    palindrome_tests = ["racecar", "hello", "radar", "a"]
    for p in palindrome_tests:
        print(f"Is '{p}' a palindrome?:", is_palindrome(p))
        
    text = "abracadabra"
    pat = "cad"
    idx = find_substring(text, pat)
    print(f"Sub-search: Pattern '{pat}' in '{text}' index:", idx)
    print("Assertion test pass?", text[idx:idx+len(pat)] == pat if idx != -1 else False)
