"""
Day 14: Process CPU Scheduling Simulation
Practical Task: Implement a scheduler simulator.

Requirements:
- Define a list of mock processes with arrival times and burst times.
- Implement First-Come, First-Served (FCFS) scheduling.
- Implement Round Robin (RR) scheduling (with a time quantum).
- Calculate and compare the average waiting time for both algorithms.
"""

from typing import List, Dict

class Process:
    def __init__(self, pid: str, arrival_time: int, burst_time: int):
        self.pid = pid
        self.arrival_time = arrival_time
        self.burst_time = burst_time
        self.remaining_time = burst_time
        self.completion_time = 0
        self.waiting_time = 0
        self.turnaround_time = 0

def simulate_fcfs(processes: List[Process]) -> float:
    """Simulates FCFS CPU Scheduling. Returns average waiting time."""
    # Sort processes by arrival time
    sorted_processes = sorted(processes, key=lambda p: p.arrival_time)
    current_time = 0
    total_waiting_time = 0
    
    print("\nFCFS Scheduling Order:")
    for p in sorted_processes:
        if current_time < p.arrival_time:
            current_time = p.arrival_time
            
        p.waiting_time = current_time - p.arrival_time
        current_time += p.burst_time
        p.completion_time = current_time
        p.turnaround_time = p.completion_time - p.arrival_time
        total_waiting_time += p.waiting_time
        
        print(f"  Process {p.pid}: Arrival={p.arrival_time}, Burst={p.burst_time}, Waiting={p.waiting_time}, Completion={p.completion_time}")
        
    return total_waiting_time / len(processes)

def simulate_round_robin(processes: List[Process], quantum: int) -> float:
    """Simulates Round Robin CPU Scheduling. Returns average waiting time."""
    queue: List[Process] = []
    current_time = 0
    completed = 0
    n = len(processes)
    total_waiting_time = 0
    
    # Sort by arrival time to start
    sorted_proc = sorted(processes, key=lambda p: p.arrival_time)
    for p in sorted_proc:
        p.remaining_time = p.burst_time
        p.waiting_time = 0
        
    print(f"\nRound Robin Scheduling (Quantum={quantum}):")
    
    # Track which processes have arrived and entered queue
    arrived = [False] * n
    
    # Helper to push newly arrived processes to queue
    def check_arrivals():
        for i, p in enumerate(sorted_proc):
            if p.arrival_time <= current_time and not arrived[i] and p.remaining_time > 0:
                queue.append(p)
                arrived[i] = True

    # Seed the first process
    current_time = sorted_proc[0].arrival_time
    check_arrivals()
    
    while completed < n:
        if not queue:
            # CPU Idle: find next process arrival
            next_arrival = min([p.arrival_time for p in sorted_proc if p.remaining_time > 0])
            current_time = next_arrival
            check_arrivals()
            continue
            
        curr = queue.pop(0)
        execution_time = min(curr.remaining_time, quantum)
        curr.remaining_time -= execution_time
        current_time += execution_time
        
        # Add processes that arrived during this execution slice
        check_arrivals()
        
        if curr.remaining_time > 0:
            queue.append(curr) # Add current back to end of queue
        else:
            completed += 1
            curr.completion_time = current_time
            curr.turnaround_time = curr.completion_time - curr.arrival_time
            curr.waiting_time = curr.turnaround_time - curr.burst_time
            total_waiting_time += curr.waiting_time
            print(f"  Process {curr.pid} Completed: Time={current_time}, Waiting={curr.waiting_time}")
            
    return total_waiting_time / n

if __name__ == "__main__":
    print("--- Testing Day 14: CPU Scheduling Simulation ---")
    
    # Mock Processes: (PID, Arrival, Burst)
    # P1: (0, 8), P2: (1, 4), P3: (2, 2)
    def create_mock_processes():
        return [
            Process("P1", 0, 8),
            Process("P2", 1, 4),
            Process("P3", 2, 2)
        ]
        
    p_fcfs = create_mock_processes()
    avg_w_fcfs = simulate_fcfs(p_fcfs)
    print(f"Average FCFS Waiting Time: {avg_w_fcfs:.2f} ms")
    
    p_rr = create_mock_processes()
    avg_w_rr = simulate_round_robin(p_rr, quantum=3)
    print(f"Average Round Robin Waiting Time: {avg_w_rr:.2f} ms")
