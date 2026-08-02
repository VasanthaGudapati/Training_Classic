"""
Day 14: Process CPU Scheduling Simulation
Practical Task: Interactive CLI CPU Scheduler & Gantt Chart Visualizer.
"""

import copy
from typing import List, Tuple, Dict


class Process:
    def __init__(self, pid: str, arrival_time: int, burst_time: int):
        self.pid = pid
        self.arrival_time = arrival_time
        self.burst_time = burst_time
        self.remaining_time = burst_time
        self.completion_time = 0
        self.waiting_time = 0
        self.turnaround_time = 0

    def copy(self) -> 'Process':
        return Process(self.pid, self.arrival_time, self.burst_time)


def simulate_fcfs(processes: List[Process]) -> Tuple[List[Process], float, float, List[Tuple[str, int, int]]]:
    """
    Simulates First-Come, First-Served (FCFS) CPU Scheduling.
    Returns: (processed_list, avg_waiting_time, avg_turnaround_time, gantt_timeline)
    """
    procs = [p.copy() for p in processes]
    procs.sort(key=lambda p: (p.arrival_time, p.pid))

    current_time = 0
    gantt_timeline: List[Tuple[str, int, int]] = []

    for p in procs:
        if current_time < p.arrival_time:
            gantt_timeline.append(("IDLE", current_time, p.arrival_time))
            current_time = p.arrival_time

        start_time = current_time
        current_time += p.burst_time
        p.completion_time = current_time
        p.turnaround_time = p.completion_time - p.arrival_time
        p.waiting_time = p.turnaround_time - p.burst_time

        gantt_timeline.append((p.pid, start_time, current_time))

    n = len(procs)
    avg_wt = sum(p.waiting_time for p in procs) / n if n > 0 else 0.0
    avg_tat = sum(p.turnaround_time for p in procs) / n if n > 0 else 0.0

    return procs, avg_wt, avg_tat, gantt_timeline


def simulate_round_robin(processes: List[Process], quantum: int) -> Tuple[List[Process], float, float, List[Tuple[str, int, int]]]:
    """
    Simulates Round Robin (RR) CPU Scheduling with a specified time quantum.
    Returns: (processed_list, avg_waiting_time, avg_turnaround_time, gantt_timeline)
    """
    procs = [p.copy() for p in processes]
    sorted_procs = sorted(procs, key=lambda p: (p.arrival_time, p.pid))
    n = len(sorted_procs)

    for p in sorted_procs:
        p.remaining_time = p.burst_time
        p.waiting_time = 0
        p.completion_time = 0
        p.turnaround_time = 0

    current_time = 0
    completed = 0
    queue: List[Process] = []
    gantt_timeline: List[Tuple[str, int, int]] = []
    enqueued = [False] * n

    def enqueue_arrived(curr_t: int):
        for i, p in enumerate(sorted_procs):
            if p.arrival_time <= curr_t and not enqueued[i] and p.remaining_time > 0:
                queue.append(p)
                enqueued[i] = True

    # Initial enqueue at arrival of first process
    if sorted_procs:
        current_time = sorted_procs[0].arrival_time
        if current_time > 0:
            gantt_timeline.append(("IDLE", 0, current_time))
        enqueue_arrived(current_time)

    while completed < n:
        if not queue:
            # CPU Idle: advance to next process arrival
            rem_procs = [p for p in sorted_procs if p.remaining_time > 0]
            if not rem_procs:
                break
            next_arrival = min(p.arrival_time for p in rem_procs)
            gantt_timeline.append(("IDLE", current_time, next_arrival))
            current_time = next_arrival
            enqueue_arrived(current_time)
            continue

        curr = queue.pop(0)
        exec_time = min(curr.remaining_time, quantum)
        start_time = current_time
        curr.remaining_time -= exec_time
        current_time += exec_time

        gantt_timeline.append((curr.pid, start_time, current_time))

        # Enqueue processes that arrived during execution slice
        enqueue_arrived(current_time)

        if curr.remaining_time > 0:
            queue.append(curr)
        else:
            completed += 1
            curr.completion_time = current_time
            curr.turnaround_time = curr.completion_time - curr.arrival_time
            curr.waiting_time = curr.turnaround_time - curr.burst_time

    avg_wt = sum(p.waiting_time for p in sorted_procs) / n if n > 0 else 0.0
    avg_tat = sum(p.turnaround_time for p in sorted_procs) / n if n > 0 else 0.0

    # Return in original PID order or sorted order
    return sorted_procs, avg_wt, avg_tat, gantt_timeline


def print_gantt_chart(gantt_timeline: List[Tuple[str, int, int]]) -> None:
    """Renders a clean ASCII Gantt chart visualization of CPU execution."""
    if not gantt_timeline:
        print("  [Empty Timeline]")
        return

    top_bar = "┌"
    mid_bar = "│"
    bot_bar = "└"
    time_line = f"{gantt_timeline[0][1]:<2}"

    for pid, start, end in gantt_timeline:
        width = max(len(pid) + 2, (end - start) * 3)
        top_bar += "─" * width + "┬"
        mid_bar += f"{pid:^{width}}" + "│"
        bot_bar += "─" * width + "┴"
        time_line += f"{end:>{width + 1}}"

    # Fix rightmost borders
    top_bar = top_bar[:-1] + "┐"
    bot_bar = bot_bar[:-1] + "┘"

    print("\n  Gantt Chart Execution Timeline:")
    print("  " + top_bar)
    print("  " + mid_bar)
    print("  " + bot_bar)
    print("  " + time_line + "\n")


def display_results_table(procs: List[Process], avg_wt: float, avg_tat: float) -> None:
    """Prints tabular metrics summary for processes."""
    print("┌───────┬──────────────┬────────────┬─────────────────┬─────────────────┬──────────────┐")
    print("│ PID   │ Arrival Time │ Burst Time │ Completion Time │ Turnaround Time │ Waiting Time │")
    print("├───────┼──────────────┼────────────┼─────────────────┼─────────────────┼──────────────┤")
    for p in procs:
        print(f"│ {p.pid:<5} │ {p.arrival_time:^12} │ {p.burst_time:^10} │ {p.completion_time:^15} │ {p.turnaround_time:^15} │ {p.waiting_time:^12} │")
    print("└───────┴──────────────┴────────────┴─────────────────┴─────────────────┴──────────────┘")
    print(f" Average Waiting Time    : {avg_wt:.2f} ms")
    print(f" Average Turnaround Time : {avg_tat:.2f} ms")


def get_default_processes() -> List[Process]:
    return [
        Process("P1", 0, 8),
        Process("P2", 1, 4),
        Process("P3", 2, 2),
        Process("P4", 3, 5)
    ]


def run_unit_tests() -> None:
    """Runs automated unit test verification suite for Day 14 CPU Scheduling."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 14")
    print("=" * 60)

    # Test Case 1: FCFS Verification
    procs_1 = [Process("P1", 0, 8), Process("P2", 1, 4), Process("P3", 2, 2)]
    results_fcfs, avg_wt_fcfs, avg_tat_fcfs, timeline_fcfs = simulate_fcfs(procs_1)

    assert len(results_fcfs) == 3, "Test 1 Failed: FCFS Process count"
    assert round(avg_wt_fcfs, 2) == 5.67, f"Test 2 Failed: Expected FCFS avg WT 5.67, got {avg_wt_fcfs:.2f}"
    assert round(avg_tat_fcfs, 2) == 10.33, f"Test 3 Failed: Expected FCFS avg TAT 10.33, got {avg_tat_fcfs:.2f}"

    # Test Case 2: Round Robin Verification (Quantum = 3)
    procs_2 = [Process("P1", 0, 8), Process("P2", 1, 4), Process("P3", 2, 2)]
    results_rr, avg_wt_rr, avg_tat_rr, timeline_rr = simulate_round_robin(procs_2, quantum=3)

    assert len(results_rr) == 3, "Test 4 Failed: RR Process count"
    assert round(avg_wt_rr, 2) == 5.67, f"Test 5 Failed: Expected RR avg WT 5.67, got {avg_wt_rr:.2f}"
    assert round(avg_tat_rr, 2) == 10.33, f"Test 6 Failed: Expected RR avg TAT 10.33, got {avg_tat_rr:.2f}"

    # Test Case 3: Idle CPU Gap Handling
    procs_gap = [Process("P1", 0, 3), Process("P2", 6, 2)]
    results_gap, avg_wt_gap, _, timeline_gap = simulate_fcfs(procs_gap)
    assert any(t[0] == "IDLE" for t in timeline_gap), "Test 7 Failed: Idle state detection in FCFS"
    assert results_gap[1].waiting_time == 0, "Test 8 Failed: P2 waiting time with arrival gap"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli() -> None:
    """Main interactive terminal CLI menu for Day 14."""
    processes = get_default_processes()
    quantum = 3

    while True:
        print("\n" + "=" * 60)
        print(" [DAY 14] PROCESS CPU SCHEDULING SIMULATION & METRICS TOOLKIT")
        print("=" * 60)
        print(f" Loaded Workload: {len(processes)} Processes | Round Robin Quantum: {quantum} ms")
        print("-" * 60)
        print(" [1] View Current Workload Configuration")
        print(" [2] Run First-Come, First-Served (FCFS) Simulation")
        print(" [3] Run Round Robin (RR) Simulation")
        print(" [4] Compare FCFS vs Round Robin Performance")
        print(" [5] Configure Custom Quantum for Round Robin")
        print(" [6] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-6): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 14 CPU Scheduler.")
            break

        if choice == "1":
            print("\n--- Current Workload ---")
            for p in processes:
                print(f"  Process {p.pid}: Arrival = {p.arrival_time} ms, Burst = {p.burst_time} ms")

        elif choice == "2":
            print("\n" + "=" * 60)
            print("  FIRST-COME, FIRST-SERVED (FCFS) SIMULATION")
            print("=" * 60)
            procs, avg_wt, avg_tat, timeline = simulate_fcfs(processes)
            display_results_table(procs, avg_wt, avg_tat)
            print_gantt_chart(timeline)

        elif choice == "3":
            print("\n" + "=" * 60)
            print(f"  ROUND ROBIN (RR) SIMULATION (Quantum = {quantum} ms)")
            print("=" * 60)
            procs, avg_wt, avg_tat, timeline = simulate_round_robin(processes, quantum)
            display_results_table(procs, avg_wt, avg_tat)
            print_gantt_chart(timeline)

        elif choice == "4":
            print("\n" + "=" * 60)
            print("  COMPARATIVE PERFORMANCE ANALYSIS (FCFS vs RR)")
            print("=" * 60)
            _, fcfs_wt, fcfs_tat, _ = simulate_fcfs(processes)
            _, rr_wt, rr_tat, _ = simulate_round_robin(processes, quantum)

            print(f"  Algorithm                   Avg Waiting Time    Avg Turnaround Time")
            print(f"  -------------------------------------------------------------------")
            print(f"  FCFS                        {fcfs_wt:^16.2f} ms {fcfs_tat:^19.2f} ms")
            print(f"  Round Robin (Quantum={quantum}ms)  {rr_wt:^16.2f} ms {rr_tat:^19.2f} ms")
            print(f"  -------------------------------------------------------------------")
            if rr_wt < fcfs_wt:
                print(f"  🏆 Round Robin achieved lower average waiting time by {fcfs_wt - rr_wt:.2f} ms!")
            elif fcfs_wt < rr_wt:
                print(f"  🏆 FCFS achieved lower average waiting time by {rr_wt - fcfs_wt:.2f} ms!")
            else:
                print("  ⚖️ Both algorithms produced identical average waiting times for this workload.")

        elif choice == "5":
            try:
                val = int(input("Enter new Round Robin time quantum (integer > 0): "))
                if val > 0:
                    quantum = val
                    print(f"[*] Time quantum updated to {quantum} ms.")
                else:
                    print("[Warning] Quantum must be positive.")
            except ValueError:
                print("[Warning] Invalid integer input.")

        elif choice == "6":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 14 CPU Scheduler. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 6.")


if __name__ == "__main__":
    interactive_cli()
