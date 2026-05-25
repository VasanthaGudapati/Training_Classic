import os
import sys
import subprocess

# Import the web server module directly
try:
    import server
except ImportError:
    server = None

# Define the expected modules and their daily files (Beginner-Friendly version)
CURRICULUM = {
    "1. Foundations & Basic Data Structures (Days 1-6)": {
        0: ("Preparation & CS Roadmap Warmup", "src/dsa/day0_prep.py"),
        1: ("Variables, Flow Control & Functions", "src/dsa/day1_basics.py"),
        2: ("Dynamic Arrays & Array Resizing", "src/dsa/day2_dynamic_array.py"),
        3: ("Strings & Substring Searching", "src/dsa/day3_strings.py"),
        4: ("Recursion & Complexity Basics (Big O)", "src/dsa/day4_recursion.py"),
        5: ("Singly Linked Lists", "src/dsa/day5_linked_list.py"),
        6: ("Basic Search & Sorting", "src/dsa/day6_sorting.py"),
    },
    "2. OOP & Intermediate Data Structures (Days 7-12)": {
        7: ("Object-Oriented Programming (OOP) Basics", "src/os/day7_oop_banking.py"),
        8: ("Stacks & Queues (Linear Structures)", "src/dsa/day8_stacks_queues.py"),
        9: ("Custom Hash Tables", "src/dsa/day9_hash_map.py"),
        10: ("Binary Trees & Recursive Traversals", "src/dsa/day10_binary_tree.py"),
        11: ("Binary Search Trees (BST) Basics", "src/dsa/day11_bst_basics.py"),
        12: ("Graph Representations & BFS Traversal", "src/dsa/day12_graphs.py"),
    },
    "3. OS Basics & Systems Programming (Days 13-18)": {
        13: ("Robust File I/O & Error Log Analysis", "src/os/day13_log_parser.py"),
        14: ("Process CPU Scheduling Simulation", "src/os/day14_scheduling_sim.py"),
        15: ("Introduction to Multi-threading", "src/os/day15_basic_threads.py"),
        16: ("Thread Synchronization & Locks", "src/os/day16_locks.py"),
        17: ("Caching Strategy: The FIFO Cache Simulator", "src/os/day17_fifo_cache.py"),
        18: ("File Compression Basics (RLE)", "src/os/day18_rle_compression.py"),
    },
    "4. Computer Networks & Web Communication (Days 19-24)": {
        19: ("Low-Level Socket Programming Basics", "src/networks/day19_sockets.py"),
        20: ("Handling Multiple Clients (Sequential Loop)", "src/networks/day20_multi_client.py"),
        21: ("The HTTP Protocol & Raw Web Server", "src/networks/day21_http_server.py"),
        22: ("REST APIs & JSON Serialization", "src/networks/day22_rest_api.py"),
        23: ("DNS Concept & IP Address Resolution", "src/networks/day23_dns_lookup.py"),
        24: ("Secure Communication: Hashing & Cryptography", "src/networks/day24_security.py"),
    },
    "5. Database Basics & Data Persistence (Days 25-30)": {
        25: ("Relational Databases & SQL Basics", "src/db/day25_sqlite_basics.py"),
        26: ("Database Relations & SQL Joins", "src/db/day26_sqlite_joins.py"),
        27: ("Database Indexing: Theoretical Concept", "src/db/day27_db_index.py"),
        28: ("Simple Key-Value Disk Store", "src/db/day28_keyvalue_store.py"),
        29: ("System Architecture: The MVC Pattern", "src/design/day29_mvc_todo.py"),
        30: ("System Design: A Basic Rate Limiter", "src/design/day30_rate_limiter.py"),
    }
}

def print_banner():
    print("=" * 65)
    print("   CORE COMPUTER SCIENCE 30-DAY PRACTICAL REVISION (BEGINNER)    ")
    print("=" * 65)
    print(" Choose whether to launch the Interactive Web UI or run the CLI.")
    print("=" * 65)

def check_file_status(relative_path):
    return "[Completed]" if os.path.exists(relative_path) else "[Pending]"

def display_dashboard():
    total_days = 30
    completed_days = 0
    
    print("\n--- SYLLABUS PROGRESS DASHBOARD ---")
    for module_name, days in CURRICULUM.items():
        print(f"\nModule: {module_name}")
        for day, (title, path) in days.items():
            status = check_file_status(path)
            if "Completed" in status:
                completed_days += 1
            print(f"  Day {day:02d}: {title:<45} {status}")
            
    progress_percentage = (completed_days / total_days) * 100
    print("\n" + "=" * 65)
    print(f"  Progress: {completed_days}/{total_days} Days Completed ({progress_percentage:.1f}%)")
    print("=" * 65)

def execute_day(day_num):
    found = False
    target_path = None
    target_title = None
    
    for module_name, days in CURRICULUM.items():
        if day_num in days:
            target_title, target_path = days[day_num]
            found = True
            break
            
    if not found:
        print(f"\n[Warning] Day {day_num} is not in the 1-30 program list.")
        return
 
    if not os.path.exists(target_path):
        print(f"\n[Warning] File for Day {day_num} does not exist yet: `{target_path}`")
        print("   Create it and add your practice code to get started!")
        return
 
    print(f"\nRunning Day {day_num} ({target_title})...\n")
    try:
        # Run the day's file as a subprocess
        result = subprocess.run([sys.executable, target_path], capture_output=False, text=True)
        print(f"\nFinished execution with exit code: {result.returncode}")
    except Exception as e:
        print(f"\nFailed to run script: {e}")

def run_cli_mode():
    while True:
        print("\n--- TERMINAL CLI DASHBOARD MODE ---")
        print(" [1] View Progress Dashboard")
        print(" [2] Run/Verify a Specific Day's Code")
        print(" [3] Return to Main Server Menu")
        print("=" * 65)
        
        choice = input("Enter choice (1-3): ").strip()
        
        if choice == "1":
            display_dashboard()
            input("\nPress Enter to return to menu...")
        elif choice == "2":
            day_str = input("\nEnter day number to run (1-30): ").strip()
            if day_str.isdigit():
                execute_day(int(day_str))
            else:
                print("\n[Warning] Please enter a valid integer.")
            input("\nPress Enter to return to menu...")
        elif choice == "3":
            break
        else:
            print("\n[Warning] Invalid choice. Please select 1-3.")

def main():
    while True:
        print_banner()
        print(" [1] Start Web UI Server (http://localhost:8000)")
        print(" [2] Launch Terminal CLI Dashboard Mode")
        print(" [3] Read schedule.md Details Info")
        print(" [4] Exit")
        print("=" * 65)
        
        choice = input("Enter choice (1-4): ").strip()
        
        if choice == "1":
            if server:
                server.run_server()
            else:
                print("\n[Error] Could not locate server.py. Please verify file exists.")
                input("\nPress Enter to return to menu...")
        elif choice == "2":
            run_cli_mode()
        elif choice == "3":
            print("\nThe schedule is saved in `schedule.md` at the root of this project.")
            print("   You can open it in PyCharm's markdown viewer to see the full detailed plan!")
            input("\nPress Enter to return to menu...")
        elif choice == "4":
            print("\nGood luck with your CS studies! See you tomorrow.")
            break
        else:
            print("\n[Warning] Invalid choice. Please select 1-4.")
            input("\nPress Enter to return to menu...")

if __name__ == "__main__":
    main()
