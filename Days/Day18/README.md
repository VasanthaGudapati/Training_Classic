# 📦 Day 18: File Compression Basics (Run-Length Encoding)

## 📚 Concepts Learned Today
- **Lossless Compression**: Data compression algorithm where original data can be perfectly reconstructed without any data loss.
- **Run-Length Encoding (RLE)**: A simple compression strategy where runs of consecutive identical data elements are stored as a single data value and count.
  - Example: `AAAAABBBCCCDDDDEEEEEF` $\rightarrow$ `5A3B3C4D5E1F`
- **Compression Ratio Metrics**:
  - **Space Savings**: $\left(1 - \frac{\text{Compressed Size}}{\text{Original Size}}\right) \times 100\%$
  - **Compression Ratio**: $\frac{\text{Original Size}}{\text{Compressed Size}}$
- **Algorithm Constraints**: RLE is highly effective for data with frequent repeated sequences (e.g. simple bitmaps, repetitive text), but may expand size when sequences do not repeat.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day18/main.py
```
