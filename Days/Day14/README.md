# ⏱️ Day 14: Process CPU Scheduling Simulation

## 📚 Concepts Learned Today
- **OS CPU Scheduling**: How operating systems allocate CPU time to processes in the ready queue.
- **First-Come, First-Served (FCFS)**: Simple non-preemptive scheduling where processes run to completion in order of arrival.
- **Round Robin (RR)**: Preemptive time-sliced scheduling where each process receives a fixed CPU time quantum.
- **Performance Metrics**:
  - **Completion Time ($CT$)**: Time at which a process finishes execution.
  - **Turnaround Time ($TAT$)**: Total elapsed time from arrival to completion ($TAT = CT - Arrival$).
  - **Waiting Time ($WT$)**: Total time spent waiting in the ready queue ($WT = TAT - Burst$).
- **Gantt Chart Visualization**: Graphical representation of CPU execution timeline across processes.

## 🚀 How to Run
From the repository root, run:
```bash
python Days/Day14/main.py
```
