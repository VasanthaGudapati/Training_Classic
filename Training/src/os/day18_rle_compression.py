"""
Day 18: File Compression Basics (RLE)
Practical Task: Build a Run-Length Encoding (RLE) compression utility.

Requirements:
- Implement compress(text) which compresses sequential duplicate characters (e.g. AAABBC -> 3A2B1C).
- Implement decompress(encoded_text) which restores the original string.
- Handle edge cases (empty strings, single characters).
"""

def compress(text: str) -> str:
    """Compresses string using Run-Length Encoding (lossless)."""
    if not text:
        return ""
        
    compressed = []
    current_char = text[0]
    count = 1
    
    for i in range(1, len(text)):
        if text[i] == current_char:
            count += 1
        else:
            compressed.append(f"{count}{current_char}")
            current_char = text[i]
            count = 1
            
    compressed.append(f"{count}{current_char}")
    return "".join(compressed)

def decompress(encoded_text: str) -> str:
    """Restores the original string from Run-Length Encoded format."""
    if not encoded_text:
        return ""
        
    decompressed = []
    num_buffer = []
    
    for char in encoded_text:
        if char.isdigit():
            num_buffer.append(char)
        else:
            count = int("".join(num_buffer))
            decompressed.append(char * count)
            num_buffer = []
            
    return "".join(decompressed)

if __name__ == "__main__":
    print("--- Testing Day 18: RLE Compression ---")
    original = "AAAAABBBCCCDDDDEEEEEF"
    print("Original Text:  ", original)
    
    compressed = compress(original)
    print("Compressed RLE: ", compressed)
    
    decompressed = decompress(compressed)
    print("Decompressed:   ", decompressed)
    
    print("\nCompression Ratio: {:.1f}%".format((1 - len(compressed)/len(original)) * 100))
    print("Verification Pass?:", original == decompressed)
