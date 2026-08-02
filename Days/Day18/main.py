"""
Day 18: File Compression Basics (RLE)
Practical Task: Interactive Run-Length Encoding (RLE) Compressor & Benchmark.
"""

from typing import Tuple, Dict


def compress_rle(text: str) -> str:
    """
    Compresses input string using Run-Length Encoding (lossless).
    Converts runs of identical consecutive characters into count+char (e.g. AAABBC -> 3A2B1C).
    """
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


def decompress_rle(encoded_text: str) -> str:
    """
    Decompresses RLE-encoded string back to its original lossless form.
    Parses multi-digit counts and expands target characters.
    """
    if not encoded_text:
        return ""

    decompressed = []
    num_buffer = []

    for char in encoded_text:
        if char.isdigit():
            num_buffer.append(char)
        else:
            if not num_buffer:
                raise ValueError(f"Malformed RLE string: character '{char}' missing count prefix.")
            count = int("".join(num_buffer))
            decompressed.append(char * count)
            num_buffer = []

    if num_buffer:
        raise ValueError("Malformed RLE string: trailing digits without target character.")

    return "".join(decompressed)


def calculate_metrics(original: str, compressed: str) -> Dict[str, float]:
    """Calculates compression metrics including byte sizes, ratio, and space savings."""
    orig_bytes = len(original.encode("utf-8"))
    comp_bytes = len(compressed.encode("utf-8"))
    ratio = (orig_bytes / comp_bytes) if comp_bytes > 0 else 1.0
    savings = ((orig_bytes - comp_bytes) / orig_bytes * 100) if orig_bytes > 0 else 0.0

    return {
        "original_bytes": orig_bytes,
        "compressed_bytes": comp_bytes,
        "compression_ratio": round(ratio, 2),
        "space_savings_pct": round(savings, 2)
    }


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 18 RLE Compression."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 18")
    print("=" * 60)

    # Test 1: Standard compression
    orig_1 = "AAABBC"
    comp_1 = compress_rle(orig_1)
    assert comp_1 == "3A2B1C", f"Test 1 Failed: Expected '3A2B1C', got '{comp_1}'"

    # Test 2: Standard decompression
    decomp_1 = decompress_rle(comp_1)
    assert decomp_1 == orig_1, "Test 2 Failed: Decompression roundtrip fidelity"

    # Test 3: Multi-digit run handling (12As)
    orig_2 = "A" * 12 + "B" * 5
    comp_2 = compress_rle(orig_2)
    assert comp_2 == "12A5B", f"Test 3 Failed: Expected '12A5B', got '{comp_2}'"
    assert decompress_rle(comp_2) == orig_2, "Test 4 Failed: Multi-digit decompression roundtrip"

    # Test 4: Empty string handling
    assert compress_rle("") == "", "Test 5 Failed: Empty string compression"
    assert decompress_rle("") == "", "Test 6 Failed: Empty string decompression"

    # Test 5: Malformed input error handling
    try:
        decompress_rle("A3B")
        assert False, "Test 7 Failed: Malformed RLE should raise ValueError"
    except ValueError:
        pass

    # Test 6: Compression ratio calculation
    m = calculate_metrics("AAAAABBBCC", "5A3B2C")
    assert m["original_bytes"] == 10, "Test 8 Failed: Original byte count"
    assert m["compressed_bytes"] == 6, "Test 9 Failed: Compressed byte count"
    assert m["space_savings_pct"] == 40.0, f"Test 10 Failed: Space savings (40%), got {m['space_savings_pct']}%"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 18."""
    while True:
        print("\n" + "=" * 60)
        print(" [DAY 18] RUN-LENGTH ENCODING (RLE) COMPRESSION TOOLKIT")
        print("=" * 60)
        print(" [1] Compress Custom Text String")
        print(" [2] Decompress RLE Encoded String")
        print(" [3] Run Workload Compression Benchmark (Highly Repetitive vs Random)")
        print(" [4] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-4): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 18 RLE Compression Toolkit.")
            break

        if choice == "1":
            user_str = input("Enter text string to compress: ").strip()
            if user_str:
                compressed = compress_rle(user_str)
                metrics = calculate_metrics(user_str, compressed)
                print("\n  --- Compression Summary ---")
                print(f"  Original Text      : {user_str}")
                print(f"  Compressed RLE     : {compressed}")
                print(f"  Original Size      : {metrics['original_bytes']} bytes")
                print(f"  Compressed Size    : {metrics['compressed_bytes']} bytes")
                print(f"  Space Savings      : {metrics['space_savings_pct']}%")
                print(f"  Compression Ratio  : {metrics['compression_ratio']}x")

        elif choice == "2":
            rle_str = input("Enter RLE encoded string (e.g. 5A3B2C): ").strip()
            if rle_str:
                try:
                    decompressed = decompress_rle(rle_str)
                    print("\n  --- Decompression Result ---")
                    print(f"  RLE Input          : {rle_str}")
                    print(f"  Decompressed Output: {decompressed}")
                    print(f"  Restored Length    : {len(decompressed)} characters")
                except ValueError as e:
                    print(f"  ❌ [ERROR] {e}")

        elif choice == "3":
            print("\n" + "=" * 60)
            print("  BENCHMARK: RLE COMPRESSION EFFICIENCY ON DIFFERENT WORKLOADS")
            print("=" * 60)
            workloads = [
                ("Highly Repetitive (Bitmap Stream)", "WWWWWWWWWWWWBWWWWWWWWWWWWBBBWWWWWWWWWWWWWWWWWWWWWWWWBWWWWWWWWWWWW"),
                ("Moderate Repetition (Log Stream)", "INFO  INFO  INFO  WARNING WARNING ERROR ERROR ERROR ERROR"),
                ("Low Repetition / Unique String", "ABCDEFGH1234567890XYZ")
            ]

            print(f"  {'Workload Name':<35} │ {'Original':<8} │ {'Compressed':<10} │ {'Savings':<8} │ {'Ratio'}")
            print("  " + "─" * 78)
            for name, text in workloads:
                comp = compress_rle(text)
                m = calculate_metrics(text, comp)
                print(f"  {name:<35} │ {m['original_bytes']:>5} B   │ {m['compressed_bytes']:>7} B   │ {m['space_savings_pct']:>6.1f}% │ {m['compression_ratio']:>4.1f}x")
            print("=" * 60)

        elif choice == "4":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 18 RLE Compression Toolkit. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 4.")


if __name__ == "__main__":
    interactive_cli()
