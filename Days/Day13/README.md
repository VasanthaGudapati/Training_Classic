# 📋 Day 13: File I/O & Error Log Analysis

## 📚 Concepts Learned Today
- **Context Managers (`with` statement)**: Ensuring deterministic resource allocation and file handle cleanup to prevent file descriptor leaks.
- **Streaming Line-by-Line File Processing**: Memory-efficient stream buffering that parses gigabyte-scale log files line-by-line without loading entire files into RAM.
- **Robust Exception Handling**: Graceful error handling catching `FileNotFoundError`, `PermissionError`, and `IOError`.
- **Log Parsing & Filtering**: Extraction of log severity levels (`INFO`, `WARNING`, `ERROR`, `CRITICAL`), error frequency counting, and formatted summary generation.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day13/main.py
```
