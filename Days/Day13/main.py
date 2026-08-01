"""
Day 13: File I/O & Error Log Analysis
Practical Task: Interactive CLI Log Parser & System Error Analyzer.
"""

import os
from datetime import datetime
from typing import Dict, List, Tuple


def generate_mock_log(filepath: str) -> None:
    """Generates sample system log file for testing."""
    mock_data = [
        "INFO 2026-08-01 08:00:00: Server started successfully on port 8000.\n",
        "WARNING 2026-08-01 08:01:05: High memory usage threshold reached (85%).\n",
        "INFO 2026-08-01 08:02:10: User authentication event: admin.\n",
        "ERROR 2026-08-01 08:05:22: Database connection failure: ConnectionTimeout.\n",
        "INFO 2026-08-01 08:06:40: API request served /api/v1/health in 12ms.\n",
        "ERROR 2026-08-01 08:10:15: Redis cache service unavailable.\n",
        "CRITICAL 2026-08-01 08:15:00: Disk space low on /dev/sda1 (98% full).\n",
        "WARNING 2026-08-01 08:20:45: Slow query detected (duration: 3.4s).\n",
    ]
    with open(filepath, "w", encoding="utf-8") as f:
        f.writelines(mock_data)


def parse_log_file(input_file: str, report_file: str) -> Tuple[int, Dict[str, int]]:
    """
    Parses input_file line-by-line, filters non-INFO log severity levels,
    writes formatted summary report to report_file, and counts severity occurrences.
    """
    if not os.path.exists(input_file):
        print(f"[*] Creating sample log file '{input_file}'...")
        generate_mock_log(input_file)

    severity_counts: Dict[str, int] = {"INFO": 0, "WARNING": 0, "ERROR": 0, "CRITICAL": 0}
    filtered_lines: List[str] = []

    try:
        with open(input_file, "r", encoding="utf-8") as fin:
            for line in fin:
                # Count severities
                for sev in severity_counts.keys():
                    if line.startswith(sev):
                        severity_counts[sev] += 1
                        if sev in ["WARNING", "ERROR", "CRITICAL"]:
                            filtered_lines.append(line)
                        break

        with open(report_file, "w", encoding="utf-8") as fout:
            fout.write("============================================================\n")
            fout.write("           SYSTEM LOG SEVERITY ANALYSIS REPORT              \n")
            fout.write("============================================================\n")
            fout.write(f" Generated At : {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}\n")
            fout.write(f" Input File   : {input_file}\n")
            fout.write("------------------------------------------------------------\n")
            fout.write(" SEVERITY SUMMARY BREAKDOWN:\n")
            for sev, count in severity_counts.items():
                fout.write(f"   - {sev:<10}: {count:3d} occurrence(s)\n")
            fout.write("------------------------------------------------------------\n")
            fout.write(" FILTERED WARNINGS & ERRORS:\n\n")

            if filtered_lines:
                fout.writelines(filtered_lines)
            else:
                fout.write("   [CLEAN] No warnings or errors detected.\n")
            fout.write("============================================================\n")

        total_issues = len(filtered_lines)
        return total_issues, severity_counts

    except FileNotFoundError:
        print(f"[Error] Log file '{input_file}' not found.")
        return 0, severity_counts
    except IOError as e:
        print(f"[Error] I/O failure during log processing: {e}")
        return 0, severity_counts


def run_unit_tests():
    """Runs automated verification tests for Log Parser."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 13")
    print("=" * 60)

    test_log = "test_system.log"
    test_report = "test_report.txt"

    # Generate sample
    generate_mock_log(test_log)
    assert os.path.exists(test_log), "Test 1 Failed: Log file generation"

    # Run parser
    issues, counts = parse_log_file(test_log, test_report)

    assert os.path.exists(test_report), "Test 2 Failed: Report file creation"
    assert issues == 5, f"Test 3 Failed: Issues count expected 5, got {issues}"
    assert counts["ERROR"] == 2, "Test 4 Failed: Error count"
    assert counts["WARNING"] == 2, "Test 5 Failed: Warning count"
    assert counts["CRITICAL"] == 1, "Test 6 Failed: Critical count"

    # Clean up test artifacts
    try:
        os.remove(test_log)
        os.remove(test_report)
    except OSError:
        pass

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 13."""
    log_file = "app_logs.txt"
    report_file = "error_report.txt"

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 13] LOG PARSER & ERROR ANALYSIS TOOLKIT")
        print("=" * 60)
        print(f" Target Log File : {log_file} ({'EXISTS' if os.path.exists(log_file) else 'NOT CREATED'})")
        print(f" Target Report   : {report_file} ({'EXISTS' if os.path.exists(report_file) else 'NOT CREATED'})")
        print("-" * 60)
        print(" [1] Generate Sample Log File")
        print(" [2] Parse Log File & Generate Summary Report")
        print(" [3] View Output Summary Report")
        print(" [4] Run Automated Unit Tests")
        print(" [5] Clean Up Generated Log & Report Files")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-5): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 13 Log Parser.")
            break

        if choice == "1":
            generate_mock_log(log_file)
            print(f"[*] Generated sample log file '{log_file}'.")

        elif choice == "2":
            issues, counts = parse_log_file(log_file, report_file)
            print(f"[*] Analysis completed: {issues} issues logged.")
            print(f"[*] Summary Breakdown: {counts}")

        elif choice == "3":
            if os.path.exists(report_file):
                print("\n--- Summary Report Content ---")
                with open(report_file, "r", encoding="utf-8") as f:
                    print(f.read())
            else:
                print("[Warning] Report file has not been generated yet.")

        elif choice == "4":
            run_unit_tests()

        elif choice == "5":
            for fpath in [log_file, report_file]:
                if os.path.exists(fpath):
                    os.remove(fpath)
                    print(f"[*] Removed '{fpath}'.")

        elif choice == "0":
            print("\n[EXIT] Exiting Day 13 Log Parser. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 5.")


if __name__ == "__main__":
    interactive_cli()
