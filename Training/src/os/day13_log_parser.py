"""
Day 13: Robust File I/O & Error Log Analysis
Practical Task: Write a robust Log Parser program.

Requirements:
- Open a text file, catching missing file exceptions gracefully.
- Read logs line-by-line using safe stream buffers.
- Parse out lines containing errors (e.g. keywords "ERROR" or "WARNING").
- Save sorted error summaries/reports to a separate output file.
- Ensure resource cleanup using context managers (with statement).
"""

import os

def generate_mock_log(filepath: str) -> None:
    """Helper to generate a mock log file for testing."""
    mock_data = [
        "INFO 2026-06-30 08:00:00: Server started successfully.\n",
        "WARNING 2026-06-30 08:01:05: Low disk space warning on /dev/sda1.\n",
        "INFO 2026-06-30 08:02:10: User login event: alice.\n",
        "ERROR 2026-06-30 08:05:22: Database connection failed (timeout).\n",
        "INFO 2026-06-30 08:06:40: User login event: bob.\n",
        "ERROR 2026-06-30 08:10:15: Cache service unavailable.\n"
    ]
    with open(filepath, "w") as f:
        f.writelines(mock_data)

def parse_logs(input_file: str, output_file: str) -> int:
    """Parses errors/warnings from input_file and writes sorted summary to output_file."""
    if not os.path.exists(input_file):
        print(f"[*] Input log file '{input_file}' not found. Generating mock log...")
        generate_mock_log(input_file)
        
    error_count = 0
    try:
        with open(input_file, "r") as fin, open(output_file, "w") as fout:
            fout.write("=== LOG ERROR ANALYSIS REPORT ===\n\n")
            for line in fin:
                if "ERROR" in line or "WARNING" in line:
                    fout.write(line)
                    error_count += 1
            print(f"[*] Analysis complete. Found {error_count} warning/error entries.")
            print(f"[*] Report saved successfully to: {output_file}")
    except FileNotFoundError:
        print("[Error] The input log file could not be found.")
    except IOError as e:
        print(f"[Error] I/O issue occurred during log parsing: {e}")
        
    return error_count

if __name__ == "__main__":
    print("--- Testing Day 13: Log Parser ---")
    log_file = "app_logs.txt"
    report_file = "error_report.txt"
    
    # Run parsing
    parse_logs(log_file, report_file)
    
    # Display the report if it exists
    if os.path.exists(report_file):
        print("\nGenerated Report Content:")
        with open(report_file, "r") as f:
            print(f.read())
            
        # Clean up temporary test files
        try:
            os.remove(log_file)
            os.remove(report_file)
            print("[*] Temporary test files removed.")
        except OSError:
            pass
