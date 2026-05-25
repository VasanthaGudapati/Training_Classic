# -*- coding: utf-8 -*-
"""
📚 AUTHORITATIVE SERVER-SIDE CS REVISION COURSEWARE DATA (30 DAYS)
Contains high-density, academic textbook-quality descriptions of core CS concepts,
complete with analogies, exact complexity analyses, Python/JS source examples, 
and active-recall self-assessment questions.
"""

THEORY_DATA = {
    0: {
        "title": "Preparation & CS Roadmap Warmup",
        "module": "1. Foundations & Basic Data Structures",
        "concept": """### Syllabus Architecture & The 5-Layer Stack
Computer Science is the systematic study of algorithmic processes, information representation, and system hardware-software interfaces. Modern software development abstracts physical silicon execution into a layered vertical stack:

1. **Foundations & Algorithms (Days 1–6)**: The mathematical constraints of computation. Focuses on memory allocations, Big O execution bounds, string matching, call frames, and pointer node links.
2. **OOP & Data Structures (Days 7–12)**: The structural modeling of information. Moves from flat continuous structures to hierarchical tree node pointers and cyclical graph adjacency matrices.
3. **Operating Systems & Systems Programming (Days 13–18)**: Interfacing with physical hardware. Handles line-by-line file descriptor stream buffering, CPU context-switching scheduling loops, threads concurrency, and mutual exclusion (Mutex) locks.
4. **Computer Networks & Web Communication (Days 19–24)**: Connecting independent nodes. Focuses on raw low-level TCP Socket bindings, client sequential loop acceptance, HTTP string serialization, and password cryptographic salting.
5. **Databases & Persistent Systems (Days 25–30)**: Long-term data durability. Covers SQLite Relational schemas, ACID properties, foreign key Joins, B-Tree index lookups, and Token Bucket traffic control.

Understanding this 5-Layer roadmap ensures that as you write lines of code, you visualize exactly how memory is reserved, how threads compete for time, and how packets traverse interfaces.""",
        "analogy": "Think of Layer 1 as language syntax and alphabet, Layer 2 as organizing paragraphs, Layer 3 as printing books, Layer 4 as distributing libraries, and Layer 5 as cataloging archives.",
        "complexity": "Program Trajectory: O(30 Days) learning cycle.\nRetention Efficiency: O(1) high-retention active recall.",
        "examples": {
            "python": """# Dynamic Layer Indexing & Roadmap Check
layers = ["Foundations", "OOP & Data Modeling", "OS & Multi-threading", "Networks", "Databases"]
for idx, layer in enumerate(layers, start=1):
    print(f"Layer {idx}: {layer} verified.")""",
            "javascript": """// Dynamic Layer Indexing & Roadmap Check
const layers = ["Foundations", "OOP & Data Modeling", "OS & Multi-threading", "Networks", "Databases"];
layers.forEach((layer, index) => {
  console.log(`Layer ${index + 1}: ${layer} verified.`);
});"""
        },
        "exercises": [
            "Write a script that prints a custom welcome message and dynamically calculates remaining days.",
            "Analyze why understanding Layer 1 (Foundations) is required before studying Layer 3 (OS Multi-threading).",
            "Diagram the 5 layers on paper and note down one real-world system corresponding to each layer."
        ]
    },
    
    1: {
        "title": "Variables, Flow Control & Functions",
        "module": "1. Foundations & Basic Data Structures",
        "concept": """### 1. Variables and Computer Memory Architecture
At the physical hardware level, variables are human-readable aliases mapped to specific byte addresses in Random Access Memory (RAM). The compiler or interpreter manages this mapping via a symbol table. A running process's memory is segmented into distinct regions:
*   **Text (Code) Segment**: Read-only region holding compiled binary instructions.
*   **Data Segments (Initialized & Uninitialized)**: Stores global and static variables.
*   **Heap Segment**: Managed dynamic memory region used for runtime allocations (e.g. dynamic objects, arrays). Grows upward. It has a slight overhead due to runtime allocator scans and pointer dereferences.
*   **Stack Segment**: A high-speed, contiguous memory block allocated by the CPU. Grows downward. Holds local variables and function execution frames. Managed automatically by the CPU's stack pointer register.

### 2. Type Binding & Sizing Systems
*   **Static vs. Dynamic Typing**: In statically-typed languages (C++, Rust), types are resolved at compile-time, allowing the compiler to reserve precise byte sizes on the stack. In dynamically-typed environments (Python, JS), variables are pointers (references) pointing to dynamic objects on the heap.
*   **Memory Sizing**: Standard registers process 4 or 8 bytes (32-bit or 64-bit pointers) at a time. Variable-length structures (e.g., objects) cannot fit in static stack variables and must utilize the heap.

### 3. Execution Flow Control Mechanics
Flow control statements direct the CPU's Program Counter (PC) register:
*   **Conditional Branches (`if-else`)**: Evaluates a boolean conditional statement. At the machine level, this compiles into conditional jump instructions (e.g., `JZ` (jump if zero), `JNZ`). Modern CPUs use **Branch Predictors** to guess the branch target. Mispredictions trigger pipeline flushes, creating execution latency.
*   **Iterative Loops (`for`, `while`)**: Loops compile as backward jump instructions with exit condition evaluations. Optimizers often employ **Loop Unrolling** to duplicate loop bodies and minimize jump evaluation overhead at the cost of binary size.

### 4. Function Calls and Call Stack Dynamics
When a function is invoked, an **Activation Record (Stack Frame)** is pushed onto the call stack.
*   **Stack Frame Anatomy**:
    1.  **Arguments**: Input parameters passed by the caller.
    2.  **Return Address**: The instruction address in the caller code to resume execution at after the function exits.
    3.  **Frame Pointer (Base Pointer)**: A fixed reference pointer inside the stack frame to easily locate parameters and local variables via relative offsets.
    4.  **Local Variables**: Variables declared inside the function body.
*   **Stack Overflow**: Since stack memory is finite and contiguous, excessive nested calls (e.g. infinite recursion) exceed stack bounds, crashing the process with a Stack Overflow.

### 5. Scoping and Variable Name Resolution
*   **LEGB Rule (Python's Scope Resolution)**: Local -> Enclosing -> Global -> Built-in. Names are searched sequentially in these scopes.
*   **Lexical vs. Dynamic Scoping**: Lexical scoping resolves scopes based on the physical position of variables in source code at compile-time (used by Python, JS, C). Dynamic scoping resolves scopes based on the runtime execution call stack.""",
        "analogy": "Think of variables as post-it notes pointing to storage lockers, branches as track switchers on a railway line, and stack frames as a stack of cafeteria trays where only the top tray can be worked on.",
        "complexity": "Variable Assignment: O(1) time, O(1) space.\nConditional Branching: O(1) time.\nLinear Loop (N iterations): O(N) time.\nFunction Call Frame Push: O(1) time & space.",
        "examples": {
            "python": """def verify_scope(x):
    # 'x' is in the local stack frame scope
    global_val = "I am Global" # Resolves to Module Scope
    
    def nested_func():
        # Accesses 'x' via Enclosing (E) scope
        return f"Nested: {x}"
        
    return nested_func()

print(verify_scope("Local Value"))""",
            "javascript": """function verifyScope(x) {
  // 'x' is in the local execution context
  const globalVal = "I am Global";
  
  function nestedFunc() {
    // Accesses 'x' via lexical closure (Enclosing scope)
    return `Nested: ${x}`;
  }
  
  return nestedFunc();
}

console.log(verifyScope("Local Value"));"""
        },
        "exercises": [
            "Explain the exact physical difference in RAM between Stack and Heap memory allocations.",
            "Trace the step-by-step changes on the CPU Call Stack when a recursive function `factorial(3)` is executed.",
            "Write a function demonstrating the LEGB lexical scope rule, showing how a local variable overrides an enclosing variable."
        ]
    },
    
    2: {
        "title": "Dynamic Arrays & Array Resizing",
        "module": "1. Foundations & Basic Data Structures",
        "concept": """### Contiguous Memory & Dynamic Resizing
Static arrays represent contiguous, fixed-size blocks of physical memory. Because memory is contiguous, access is a simple offset arithmetic calculation: `Address(Index) = BaseAddress + Index * ElementSize`. This enables extremely fast $O(1)$ random access.

However, static arrays cannot grow once allocated. **Dynamic Arrays** bypass this limitation by simulating resizing. When a dynamic array exceeds its allocated capacity:
1.  **Allocation**: A new, larger contiguous block of memory is reserved on the Heap.
2.  **Growth Factor**: The growth factor is typically **$2x$** (doubling) or **$1.5x$** (used in Java's ArrayList) to balance memory waste vs allocation overhead.
3.  **Data Copying**: All existing elements are copied from the old contiguous block to the new block ($O(N)$ copying time).
4.  **Reference Update & Deallocation**: The internal pointer is redirected to the new block, and the old memory block is freed.

### Amortized Time Complexity
While appending an element is normally $O(1)$, an append that triggers a resize takes $O(N)$ time. However, because resizing occurs rarely, the cost of copying can be distributed across all previous appends. Summing up the insertions:
$$\\text{Total Cost} = N \\text{ (appends)} + (1 + 2 + 4 + ... + N) \\text{ (copying costs)} \\approx 3N$$
Dividing by $N$ insertions yields an **Amortized Time Complexity of $O(1)$** per append operation.""",
        "analogy": "Imagine renting a storage locker with space for 2 boxes. When you buy a 3rd box, you must buy a larger locker with space for 4 boxes, carry all 2 existing boxes to the new locker, and discard the old locker.",
        "complexity": "Random Index Access: O(1) time.\nInsertion (At Tail - Amortized): O(1) time.\nInsertion (At Tail - Worst Case on Resize): O(N) time.\nInsertion (At Head or Middle): O(N) time due to element shifting.",
        "examples": {
            "python": """# Simulating dynamic array append growth behavior
class MockDynamicArray:
    def __init__(self):
        self.capacity = 2
        self.size = 0
        self.array = [None] * self.capacity
        
    def append(self, val):
        if self.size == self.capacity:
            self._resize()
        self.array[self.size] = val
        self.size += 1
        
    def _resize(self):
        self.capacity *= 2
        print(f"[Resize Triggered] New Capacity: {self.capacity}")
        new_arr = [None] * self.capacity
        for i in range(self.size):
            new_arr[i] = self.array[i]
        self.array = new_arr""",
            "javascript": """// Simulating dynamic array append growth behavior
class MockDynamicArray {
  constructor() {
    this.capacity = 2;
    this.size = 0;
    this.array = new Array(this.capacity);
  }
  
  append(val) {
    if (this.size === this.capacity) {
      this._resize();
    }
    this.array[this.size] = val;
    this.size++;
  }
  
  _resize() {
    this.capacity *= 2;
    console.log(`[Resize Triggered] New Capacity: ${this.capacity}`);
    const newArr = new Array(this.capacity);
    for (let i = 0; i < this.size; i++) {
      newArr[i] = this.array[i];
    }
    this.array = newArr;
  }
}"""
        },
        "exercises": [
            "Prove mathematically why doubling capacity (2x) yields amortized O(1) insertions, whereas adding a fixed constant (e.g., +10 slots) yields O(N) amortized insertions.",
            "Write a function to remove an element at index `i` from a dynamic array, shifting subsequent elements to maintain contiguity.",
            "Analyze the memory overhead (wasted allocated capacity) of a dynamic array that has grown to a capacity of 1024 but contains only 513 elements."
        ]
    },
    
    # Pre-populating remaining days with clean, detailed syllabus structures for full server data coverage
    3: {
        "title": "Strings & Substring Searching",
        "module": "1. Foundations & Basic Data Structures",
        "concept": "Strings are sequences of characters stored in continuous memory buffers. Character sets map glyphs to numbers (ASCII uses 1 byte, UTF-8 uses variable 1-4 bytes). In many languages (Python, Java), strings are **immutable**: any modification creates a completely new string object on the heap. Substring searching is a core algorithmic problem. A naive search checks matching alignments sequentially ($O(N \\times M)$), whereas advanced algorithms like KMP use pre-compiled prefix tables to achieve linear $O(N + M)$ speeds.",
        "analogy": "Think of an immutable string as a printed sign. You cannot change a letter on it; you must repaint a completely new sign. Substring search is like sliding a magnifying stencil over text to spot a matching phrase.",
        "complexity": "String Concatenation (length N + M): O(N + M) time and space.\nNaive Substring Search: O(N * M) time.\nKMP Substring Search: O(N + M) time, O(M) space.",
        "examples": {
            "python": """def naive_search(text, pattern):
    n, m = len(text), len(pattern)
    for i in range(n - m + 1):
        if text[i:i+m] == pattern:
            return i # Found index
    return -1""",
            "javascript": """function naiveSearch(text, pattern) {
  const n = text.length, m = pattern.length;
  for (let i = 0; i <= n - m; i++) {
    if (text.substring(i, i + m) === pattern) {
      return i; // Found index
    }
  }
  return -1;
}"""
        },
        "exercises": [
            "Explain why string immutability makes string concatenations in a loop highly inefficient.",
            "Write a manual KMP prefix-table helper function that computes the longest prefix which is also a suffix.",
            "Analyze the memory implications of creating a substring from a large file in a language that retains the original buffer."
        ]
    },
    
    4: {
        "title": "Recursion & Complexity Basics (Big O)",
        "module": "1. Foundations & Basic Data Structures",
        "concept": "Recursion occurs when an execution path redirects back into its own starting instruction, forming nested calls. A robust recursive algorithm must contain a **Base Case** (direct value exit) and a **Recursive Step** (advancing toward the base case). Each recursive call reserves a new activation record on the Call Stack. Big O notation measures how execution time and space requirements scale relative to input size $N$, abstracting hardware differences into standard bounds ($O(1), O(\\log N), O(N), O(N \\log N), O(N^2), O(2^N)$).",
        "analogy": "Recursion is like nested Russian Matryoshka dolls; you open each layer until you find the solid core (base case), then assemble them back.",
        "complexity": "Recursive Fibonacci: O(2^N) time, O(N) call stack space.\nIterative Fibonacci: O(N) time, O(1) space.",
        "examples": {
            "python": """def recursive_factorial(n):
    if n <= 1: # Base Case
        return 1
    return n * recursive_factorial(n - 1) # Recursive Step""",
            "javascript": """function recursiveFactorial(n) {
  if (n <= 1) return 1; // Base Case
  return n * recursiveFactorial(n - 1); // Recursive Step
}"""
        },
        "exercises": [
            "Draw the complete call tree and explain the time complexity of the naive recursive Fibonacci function.",
            "Explain what a stack overflow error is and how to design tail-call optimizations.",
            "Add a timing decorator in Python to measure and compare factorial execution speed at N=20 using iteration vs recursion."
        ]
    },
    
    5: {
        "title": "Singly Linked Lists",
        "module": "1. Foundations & Basic Data Structures",
        "concept": "A linked list is a dynamic collection of discrete object nodes stored non-contiguously in memory (Heap). Each Node encapsulates a data value and a **next** reference pointer pointing to the subsequent node. The list starts at a **Head** pointer and terminates with a Null pointer. Unlike arrays, linked lists do not support $O(1)$ random indexing. However, they allow $O(1)$ insertions and deletions at any active node reference without shifting elements in memory.",
        "analogy": "Think of a linked list as a scavenger hunt: you go to the first location, find a clue pointing to the second location, which points to the third, and so on.",
        "complexity": "Head Insertion/Deletion: O(1) time.\nTail Insertion (with Tail pointer): O(1) time.\nSearch / Index Access: O(N) time.\nDeallocation / Traversal: O(N) time.",
        "examples": {
            "python": """class Node:
    def __init__(self, val):
        self.val = val
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None
        
    def insert_at_head(self, val):
        new_node = Node(val)
        new_node.next = self.head
        self.head = new_node""",
            "javascript": """class Node {
  constructor(val) {
    this.val = val;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }
  
  insertAtHead(val) {
    const newNode = new Node(val);
    newNode.next = this.head;
    this.head = newNode;
  }
}"""
        },
        "exercises": [
            "Write a function to reverse a Singly Linked List in place using three sliding pointers.",
            "Analyze the memory overhead of a Singly Linked List of 1000 integers compared to a static array of 1000 integers.",
            "Implement a slow-fast two-pointer cycle detection algorithm (Floyd's Tortoise and Hare)."
        ]
    },
    
    6: {
        "title": "Basic Search & Sorting",
        "module": "1. Foundations & Basic Data Structures",
        "concept": "Search algorithms find a target value in a collection. Linear Search ($O(N)$) scans entries sequentially. **Binary Search** requires a sorted collection and repeatedly cuts the search space in half ($O(\\log N)$). Sorting rearranges items. Basic sorting algorithms like Bubble and Selection Sort compare pairs and shift entries, yielding quadratic $O(N^2)$ bounds. Modern divide-and-conquer algorithms like Merge Sort split collections, sort recursively, and merge them in linear-logarithmic $O(N \\log N)$ bounds.",
        "analogy": "Linear search is looking for a word in a book page-by-page. Binary search is splitting a dictionary in half repeatedly to find a word.",
        "complexity": "Linear Search: O(N) time.\nBinary Search (Sorted Array): O(log N) time.\nBubble Sort: O(N^2) time, O(1) auxiliary space.\nMerge Sort: O(N log N) time, O(N) auxiliary space.",
        "examples": {
            "python": """def binary_search(sorted_arr, target):
    low, high = 0, len(sorted_arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if sorted_arr[mid] == target:
            return mid
        elif sorted_arr[mid] < target:
            low = mid + 1
        else:
            high = mid - 1
    return -1""",
            "javascript": """function binarySearch(sortedArr, target) {
  let low = 0, high = sortedArr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (sortedArr[mid] === target) return mid;
    else if (sortedArr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}"""
        },
        "exercises": [
            "Implement a recursive version of Binary Search and trace the call stack tree.",
            "Analyze the stability and in-place sorting characteristics of Selection Sort vs Merge Sort.",
            "Write a function that verifies whether an array is sorted before running Binary Search on it."
        ]
    },
    
    # 7-30 Pre-loaded index metadata templates that map to modular endpoints cleanly
    7: {
        "title": "Object-Oriented Programming (OOP) Basics",
        "module": "2. OOP & Intermediate Data Structures",
        "concept": "OOP organizes software design around data objects. Encapsulation hides state behind interfaces. Abstraction filters out complex details. Inheritance allows subclasses to inherit state and behavior. Polymorphism enables custom behaviors via interface overrides.",
        "analogy": "Think of a class as an architectural blueprint, and objects as actual houses built from that blueprint.",
        "complexity": "Class Instance Creation: O(1) memory allocation.\nVirtual Method Call: O(1) offset lookup.",
        "examples": {
            "python": "class BankAccount:\n    def __init__(self, balance): self._balance = balance",
            "javascript": "class BankAccount { constructor(balance) { this._balance = balance; } }"
        },
        "exercises": [
            "Define classes modeling a BankAccount system with custom interest rates.",
            "Explain the difference between composition and inheritance."
        ]
    },
    
    8: {
        "title": "Stacks & Queues (Linear Structures)",
        "module": "2. OOP & Intermediate Data Structures",
        "concept": "Stacks are Last-In-First-Out (LIFO) buffers. Queues are First-In-First-Out (FIFO) buffers. Stacks are used for function call stacks and bracket matching. Queues are used for asynchronous print buffers and BFS paths.",
        "analogy": "Think of a stack as a stack of dinner plates, and a queue as a line at a checkout register.",
        "complexity": "Stack Push/Pop: O(1) time.\nQueue Enqueue/Dequeue: O(1) time.",
        "examples": {
            "python": "stack = []; stack.append(1); val = stack.pop()",
            "javascript": "const stack = []; stack.push(1); const val = stack.pop();"
        },
        "exercises": [
            "Use a stack to write a balanced parenthesis validator.",
            "Implement a queue using two stacks."
        ]
    },
    
    9: {
        "title": "Custom Hash Tables",
        "module": "2. OOP & Intermediate Data Structures",
        "concept": "Hash tables map keys to index locations using a hash function. Collisions occur when different keys hash to the same index. They are resolved via Linear Probing (finding the next empty slot) or Chaining (storing entries in a linked list).",
        "analogy": "Think of a hash table as a library catalog card system where a book's code instantly points you to the exact aisle and shelf.",
        "complexity": "Average Lookup / Insert: O(1) time.\nWorst Case (All Collisions): O(N) time.",
        "examples": {
            "python": "hash_idx = hash('key') % 10",
            "javascript": "const hashIdx = hash('key') % 10;"
        },
        "exercises": [
            "Write a simple HashMap from scratch with linear probing collision resolution.",
            "Explain how the load factor triggers automatic resizing of a hash table."
        ]
    },
    
    10: {
        "title": "Binary Trees & Recursive Traversals",
        "module": "2. OOP & Intermediate Data Structures",
        "concept": "A Binary Tree is a hierarchical structure where each node has at most two children (left and right). Depth-First Search (DFS) traversals visit nodes recursively: Pre-order (Root-Left-Right), In-order (Left-Root-Right), and Post-order (Left-Right-Root).",
        "analogy": "Think of a binary tree as a family tree showing ancestors splitting into descendants.",
        "complexity": "Traversal (all nodes): O(N) time.\nRecursion Stack Space (Balanced): O(log N) space.\nRecursion Stack Space (Skewed): O(N) space.",
        "examples": {
            "python": "def in_order(node):\n    if node:\n        in_order(node.left)\n        print(node.val)\n        in_order(node.right)",
            "javascript": "function inOrder(node) {\n  if (node) {\n    inOrder(node.left);\n    console.log(node.val);\n    inOrder(node.right);\n  }\n}"
        },
        "exercises": [
            "Write recursive implementations for Pre-order, In-order, and Post-order traversals.",
            "Analyze tree height effects on execution call stack limits."
        ]
    },
    
    11: {
        "title": "Binary Search Trees (BST) Basics",
        "module": "2. OOP & Intermediate Data Structures",
        "concept": "A Binary Search Tree (BST) is an ordered tree where every node's left subtree contains values less than the node, and the right subtree contains values greater. This ordered property enables fast search, insertion, and deletion operations.",
        "analogy": "Think of a BST as playing the number guessing game: each node comparison tells you whether the target is 'too high' or 'too low', cutting the search space in half.",
        "complexity": "Search/Insert (Balanced Tree): O(log N) average time.\nSearch/Insert (Skewed Tree): O(N) worst-case time.",
        "examples": {
            "python": "def search(node, val):\n    if not node or node.val == val: return node\n    return search(node.left, val) if val < node.val else search(node.right, val)",
            "javascript": "function search(node, val) {\n  if (!node || node.val === val) return node;\n  return val < node.val ? search(node.left, val) : search(node.right, val);\n}"
        },
        "exercises": [
            "Implement insert and search methods for a dynamic BST class.",
            "Explain how tree balancing algorithms (AVL, Red-Black) prevent skewed degradation."
        ]
    },
    
    12: {
        "title": "Graph Representations & BFS Traversal",
        "module": "2. OOP & Intermediate Data Structures",
        "concept": "Graphs model networks of vertices connected by edges. They are represented via Adjacency Lists (arrays of linked lists) or Adjacency Matrices (2D arrays of booleans). Breadth-First Search (BFS) explores vertices level-by-level using a Queue.",
        "analogy": "Think of BFS as a ripple expanding in a pond: it visits all close locations first before spreading further out.",
        "complexity": "BFS Traversal: O(V + E) time, O(V) space.",
        "examples": {
            "python": "adj_list = {0: [1, 2], 1: [2]}",
            "javascript": "const adjList = {0: [1, 2], 1: [2]};"
        },
        "exercises": [
            "Implement a Graph class represented by an Adjacency List and write a BFS traversal method.",
            "Contrast BFS level-order tracking with DFS pathfinding traversal."
        ]
    },
    
    13: {
        "title": "Robust File I/O & Error Log Analysis",
        "module": "3. OS Basics & Systems Programming",
        "concept": "File I/O bridges persistent disk storage and volatile RAM. Operating systems manage files using system calls and **File Descriptors** (numerical references to open file slots). Applications use **stream buffers** to read chunk-by-chunk to prevent memory bloating on large files. Robust I/O handles errors gracefully (missing files, write locks, hardware disk full errors) and manages resources using context managers to automatically close descriptors.",
        "analogy": "Streamed file reading is like sipping water from a straw rather than drinking the entire bucket at once.",
        "complexity": "Buffered Read (chunk size B): O(N/B) system call overhead, O(B) memory space.",
        "examples": {
            "python": "with open('file.txt', 'r') as f:\n    for line in f:\n        print(line.strip())",
            "javascript": "const fs = require('fs');\nfs.createReadStream('file.txt').on('data', chunk => { console.log(chunk); });"
        },
        "exercises": [
            "Write a robust Log Parser that catches file missing exceptions and summarizes error codes.",
            "Analyze memory footprint differences between `file.read()` and `file.readline()`."
        ]
    },
    
    14: {
        "title": "Process CPU Scheduling Simulation",
        "module": "3. OS Basics & Systems Programming",
        "concept": "The CPU Scheduler decides which running process gets CPU time. Operating systems swap processes in and out via **Context Switching** (saving registers and CPU state). Key algorithms include: **First-Come First-Served (FCFS)** (non-preemptive, suffers from convoy effect) and **Round Robin (RR)** (preemptive, schedules processes in time slices).",
        "analogy": "Round Robin is like a card dealer giving one card to each player around the table, rather than dealing the entire deck to one player first.",
        "complexity": "FCFS Schedule: O(N log N) sorting by arrival, O(N) waiting calculations.\nRound Robin: O(N * (Burst/Quantum)) time slice allocations.",
        "examples": {
            "python": "processes = [{'id': 1, 'burst': 5}, {'id': 2, 'burst': 3}]",
            "javascript": "const processes = [{id: 1, burst: 5}, {id: 2, burst: 3}];"
        },
        "exercises": [
            "Simulate FCFS and Round Robin scheduling and compute average wait times.",
            "Compare preemptive scheduling vs non-preemptive scheduling."
        ]
    },
    
    15: {
        "title": "Introduction to Multi-threading",
        "module": "3. OS Basics & Systems Programming",
        "concept": "Processes are isolated memory boxes managed by the OS. **Threads** are execution sub-units inside a process that share the same memory space (global heap) but have their own execution stack frames. While multi-threading allows concurrent execution, it creates synchronization overhead.",
        "analogy": "A process is a restaurant kitchen, and threads are multiple chefs working inside that kitchen, sharing the same ovens and ingredients.",
        "complexity": "Thread Spawn: O(1) system call.\nThread Context Switch: O(1) CPU register save/restores.",
        "examples": {
            "python": "import threading\nt = threading.Thread(target=print, args=('Thread Active!',))\nt.start()",
            "javascript": "const { Worker } = require('worker_threads');\nconst worker = new Worker('// code string');"
        },
        "exercises": [
            "Spawn 5 worker threads concurrently printing messages with random sleep delays.",
            "Explain memory sharing differences between multi-processing and multi-threading."
        ]
    },
    
    16: {
        "title": "Thread Synchronization & Locks",
        "module": "3. OS Basics & Systems Programming",
        "concept": "Since threads share memory, concurrent writes to a shared variable create a **Race Condition** (data corruption). A **Lock (Mutex)** establishes mutual exclusion: only one thread can acquire the lock and enter the **Critical Section** of code, while other threads are blocked until the lock is released.",
        "analogy": "A lock is like a bathroom key in a coffee shop: only one customer can hold the key and use the bathroom at a time.",
        "complexity": "Lock Acquisition / Release: O(1) atomic CPU instruction (e.g., Test-and-Set).",
        "examples": {
            "python": "lock = threading.Lock()\nwith lock:\n    # Critical Section\n    shared_counter += 1",
            "javascript": "const lock = new SharedArrayBuffer(4);\nAtomics.compareExchange(new Int32Array(lock), 0, 0, 1);"
        },
        "exercises": [
            "Simulate a race condition using concurrent increments, then introduce a threading Lock to fix it.",
            "Explain the difference between a deadlock and a livelock."
        ]
    },
    
    17: {
        "title": "Caching Strategy: The FIFO Cache Simulator",
        "module": "3. OS Basics & Systems Programming",
        "concept": "Caches are high-speed memory slots that hold copy of primary data for instant access. Because cache size is limited, a **Cache Replacement Protocol** decides which item to evict when the cache is full. **FIFO (First-In First-Out)** discards the oldest loaded item first, regardless of access frequency.",
        "analogy": "Think of a FIFO cache as a grocery shelf where new cans are loaded from the back, pushing the oldest loaded cans off the front first.",
        "complexity": "Cache Hit/Miss Check: O(1) via Hash Table.\nFIFO Eviction: O(1) via Queue / Linked List.",
        "examples": {
            "python": "from collections import deque\nqueue = deque(maxlen=3)",
            "javascript": "const cache = []; if (cache.length > 3) cache.shift();"
        },
        "exercises": [
            "Implement a FIFOCache class and track hit and miss counts on dynamic lookups.",
            "Contrast FIFO eviction efficiency with Least Recently Used (LRU) caching."
        ]
    },
    
    18: {
        "title": "File Compression Basics (RLE)",
        "module": "3. OS Basics & Systems Programming",
        "concept": "Data compression reduces size. **Run-Length Encoding (RLE)** is a lossless compression algorithm that replaces consecutive repeating data characters with a single character and its repeat count. It is highly efficient for data containing large runs of identical characters.",
        "analogy": "Instead of writing 'AAAAAABBB', you write '6A3B' to save space.",
        "complexity": "RLE Compression: O(N) time, O(1) auxiliary space.",
        "examples": {
            "python": "compressed = '6A3B' # Expanded: 'AAAAAABBB'",
            "javascript": "const compressed = '6A3B';"
        },
        "exercises": [
            "Write an RLE compression and decompression utility.",
            "Analyze worst-case inputs for RLE (e.g. data with no repeating characters)."
        ]
    },
    
    19: {
        "title": "Low-Level Socket Programming Basics",
        "module": "4. Computer Networks & Web Communication",
        "concept": "Sockets are software endpoints that allow communication over networks. System-level socket setup involves: `socket()` (create), `bind()` (bind to a specific port), `listen()` (start accepting connection attempts), and `accept()` (establish connection).",
        "analogy": "A socket binding is like installing a telephone line in a house and assigning it a specific phone number.",
        "complexity": "Socket Bind/Listen: O(1) OS register call.\nPacket Send/Receive (MTU size): O(Packet Size) network transfer.",
        "examples": {
            "python": "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.bind(('localhost', 8080))",
            "javascript": "const net = require('net');\nconst server = net.createServer().listen(8080);"
        },
        "exercises": [
            "Write a simple TCP Socket Echo Server and client to send and receive greetings.",
            "Contrast TCP stream connection sockets with UDP datagram sockets."
        ]
    },
    
    20: {
        "title": "Handling Multiple Clients (Sequential Loop)",
        "module": "4. Computer Networks & Web Communication",
        "concept": "A raw socket server only handles one connection at a time. To support multiple clients sequentially, we run a persistent `while True` loop that accepts, processes, and closes one connection before moving to the next. For concurrency, we eventually require threads or async event loops.",
        "analogy": "A sequential loop is like a single cashier at a store who must fully serve one customer before calling the next person in line.",
        "complexity": "Client Accept Loop: O(1) connection block, O(Processing Time) per customer.",
        "examples": {
            "python": "while True:\n    conn, addr = s.accept()\n    conn.sendall(b'Connected!')\n    conn.close()",
            "javascript": "server.on('connection', socket => { socket.write('Connected!'); socket.end(); });"
        },
        "exercises": [
            "Implement a persistent socket connection loop that processes client requests in sequence.",
            "Analyze the connection drop risk when multiple clients connect concurrently to a sequential server."
        ]
    },
    
    21: {
        "title": "The HTTP Protocol & Raw Web Server",
        "module": "4. Computer Networks & Web Communication",
        "concept": "HTTP is a text-based request-response protocol running over TCP. An HTTP response starts with a Status-Line (e.g., `HTTP/1.1 200 OK`), followed by Response Headers (e.g., `Content-Type: text/html`), an empty line, and the Response Body.",
        "analogy": "An HTTP envelope is like a standard postal letter: it has a clear address block, standard sender info, and the letter body inside.",
        "complexity": "Header Parsing: O(Header Lines) parsing time.\nServing File: O(File Size) read/write streaming.",
        "examples": {
            "python": "http_response = 'HTTP/1.1 200 OK\\r\\nContent-Type: text/plain\\r\\n\\r\\nHello World!'",
            "javascript": "const httpResponse = 'HTTP/1.1 200 OK\\r\\nContent-Type: text/plain\\r\\n\\r\\nHello World!';"
        },
        "exercises": [
            "Build a raw HTTP web server that parses incoming GET requests and returns a valid HTML webpage.",
            "Explain the difference between persistent HTTP/1.1 connections (Keep-Alive) and HTTP/1.0."
        ]
    },
    
    22: {
        "title": "REST APIs & JSON Serialization",
        "module": "4. Computer Networks & Web Communication",
        "concept": "RESTful web services use standard HTTP methods: GET (read), POST (create), PUT (update), and DELETE (remove). Data payloads are serialized into **JSON (JavaScript Object Notation)**, a text-based format for exchanging data objects.",
        "analogy": "JSON is like a standardized shipping invoice form that custom agents around the world can read instantly.",
        "complexity": "JSON Serialization (size S): O(S) serialization time and memory.",
        "examples": {
            "python": "import json\njson_str = json.dumps({'id': 1, 'status': 'active'})",
            "javascript": "const jsonStr = JSON.stringify({id: 1, status: 'active'});"
        },
        "exercises": [
            "Write POST and GET API endpoints serving and validating JSON payloads.",
            "Analyze performance overheads of text-based JSON vs binary serialization (e.g., Protocol Buffers)."
        ]
    },
    
    23: {
        "title": "DNS Concept & IP Address Resolution",
        "module": "4. Computer Networks & Web Communication",
        "concept": "DNS (Domain Name System) is the phone book of the internet. It maps human-readable domain names (e.g. `google.com`) to machine-routable IP addresses (e.g. `142.250.190.46`). Sockets use DNS name resolution system calls to resolve hostnames.",
        "analogy": "DNS is like looking up a person's name in a address book to find their physical street address.",
        "complexity": "DNS Lookup (with local cache): O(1) time.\nDNS Lookup (Recursive query): O(Domain Levels) lookup latency.",
        "examples": {
            "python": "import socket\nip_addr = socket.gethostbyname('google.com')",
            "javascript": "const dns = require('dns');\ndns.lookup('google.com', (err, address) => { console.log(address); });"
        },
        "exercises": [
            "Build a hostname lookup tool utilizing socket name resolution with strict error handling.",
            "Explain the different record types in a DNS server (A, AAAA, CNAME, MX)."
        ]
    },
    
    24: {
        "title": "Secure Communication: Hashing & Cryptography",
        "module": "4. Computer Networks & Web Communication",
        "concept": "Secure databases never store flat-text passwords. **One-Way Cryptographic Hash Functions** (like SHA-256) convert passwords into fixed-size hash values. To prevent **Rainbow Table attacks** (precomputed hash matching), we append a random string called a **Salt** to the password before hashing.",
        "analogy": "Hashing is like baking a cake: you can easily get the cake from the recipe, but you cannot extract the individual raw eggs back out from the baked cake.",
        "complexity": "Hash Computation: O(Password Length) mathematical operations, O(1) fixed hash size.",
        "examples": {
            "python": "import hashlib\nhashed = hashlib.sha256(b'pass' + b'salt').hexdigest()",
            "javascript": "const crypto = require('crypto');\nconst hashed = crypto.createHash('sha256').update('pass' + 'salt').digest('hex');"
        },
        "exercises": [
            "Build a password hashing utility using SHA-256 and dynamic salt keys.",
            "Contrast symmetric encryption (AES) with asymmetric encryption (RSA)."
        ]
    },
    
    25: {
        "title": "Relational Databases & SQL Basics",
        "module": "5. Database Basics & Data Persistence",
        "concept": "Relational Databases (RDBMS) organize data into structured tables linked by relationships. They adhere to **ACID** properties (Atomicity, Consistency, Isolation, Durability) to guarantee transactions. We manipulate data using SQL (Structured Query Language).",
        "analogy": "An RDBMS table is like a highly organized Excel spreadsheet tab with strict column rules and types.",
        "complexity": "Unindexed Table Scan: O(N) time.\nIndexed Key Lookup: O(log N) time.",
        "examples": {
            "python": "import sqlite3\nconn = sqlite3.connect('local.db')\nconn.execute('SELECT * FROM users')",
            "javascript": "const sqlite3 = require('sqlite3');\nconst db = new sqlite3.Database('local.db');"
        },
        "exercises": [
            "Connect to SQLite, create a table schema, insert values, and filter results via SQL SELECT.",
            "Explain each letter of the ACID transactional properties."
        ]
    },
    
    26: {
        "title": "Database Relations & SQL Joins",
        "module": "5. Database Basics & Data Persistence",
        "concept": "Tables relate via **Primary Key** and **Foreign Key** constraints. An **INNER JOIN** merges matching records from two tables based on a relational key, while an **OUTER JOIN** includes unmatching rows from one side.",
        "analogy": "A Join is like matching employee cards to department cards based on matching department IDs printed on both cards.",
        "complexity": "Nested Loop Join: O(N * M) time.\nIndex-based Join: O(N log M) time.\nHash Join: O(N + M) average time.",
        "examples": {
            "python": "join_query = 'SELECT * FROM users JOIN notes ON users.id = notes.user_id'",
            "javascript": "const joinQuery = 'SELECT * FROM users JOIN notes ON users.id = notes.user_id';"
        },
        "exercises": [
            "Establish multi-table relational layers and perform SQL INNER JOIN queries with averages.",
            "Compare INNER JOIN, LEFT JOIN, and FULL OUTER JOIN behaviors."
        ]
    },
    
    27: {
        "title": "Database Indexing: Theoretical Concept",
        "module": "5. Database Basics & Data Persistence",
        "concept": "Without an index, finding a row requires scanning the entire table ($O(N)$ time). A database **Index** acts as a lookup directory. Indexes are implemented as **B-Trees** or balanced search trees, reducing search time to $O(\\log N)$ at the cost of additional write overhead.",
        "analogy": "An index is like the index section at the back of a textbook: instead of reading all 500 pages to find 'B-Trees', you look up the word and jump directly to page 341.",
        "complexity": "Sequential Scan: O(N) time.\nIndexed Index Search: O(log N) time.\nIndex Write / Space Overhead: O(log N) write penalty.",
        "examples": {
            "python": "indexed_search = 'CREATE INDEX idx_user_day ON notes(user_id, day)'",
            "javascript": "const indexedSearch = 'CREATE INDEX idx_user_day ON notes(user_id, day)';"
        },
        "exercises": [
            "Implement a simulated search index in memory and measure execution time differences.",
            "Explain why adding indexes to every single column is a bad database design decision."
        ]
    },
    
    28: {
        "title": "Simple Key-Value Disk Store",
        "module": "5. Database Basics & Data Persistence",
        "concept": "A key-value store is a non-relational database engine. It stores flat dictionary data directly. Dynamic changes are serialized (e.g. into JSON or key-value text lines) and written directly to a flat disk file for persistent durability.",
        "analogy": "A key-value disk store is like saving your game status inside a text file so it loads exactly where you left off when you restart.",
        "complexity": "Write/Persist: O(Data Size) serialization, O(Disk Latency).\nRead/Load: O(File Size) read parsing.",
        "examples": {
            "python": "import json\n# Write to disk\nwith open('kv.db', 'w') as f:\n    json.dump({'score': 100}, f)",
            "javascript": "const fs = require('fs');\nfs.writeFileSync('kv.db', JSON.stringify({score: 100}));"
        },
        "exercises": [
            "Build a simple Key-Value store engine that serializes state to flat files on disk.",
            "Explain compaction mechanisms in append-only storage logs (like LSM Trees)."
        ]
    },
    
    29: {
        "title": "System Architecture: The MVC Pattern",
        "module": "5. Database Basics & Data Persistence",
        "concept": "Model-View-Controller (MVC) decouples applications: **Model** (data/logic), **View** (UI), and **Controller** (routes inputs to Model/View). This separation ensures modularity, clean maintenance, and easy unit testing.",
        "analogy": "Think of MVC as a restaurant: the Cook is the Model, the waiter is the Controller handling inputs, and the beautifully served plate is the View.",
        "complexity": "Code decoupling: reduces dependency loops to O(1) boundaries.",
        "examples": {
            "python": "# Model: handles data. View: prints CLI. Controller: loops choices.",
            "javascript": "// Model: handles data. View: prints HTML. Controller: binds events."
        },
        "exercises": [
            "Design a modular CLI program adhering strictly to the Model-View-Controller pattern.",
            "Analyze how MVC facilitates testing parts of an application in isolation."
        ]
    },
    
    30: {
        "title": "System Design: A Basic Rate Limiter",
        "module": "5. Database Basics & Data Persistence",
        "concept": "Rate limiters protect servers from request spikes (DDoS, API scraping). The **Token Bucket algorithm** adds tokens to a bucket at a fixed rate. Each request consumes one token. If the bucket is empty, the request is rejected with `429 Too Many Requests`.",
        "analogy": "Think of a movie theater ticket counter: tickets fill up at a rate of 1 per minute, and you can only enter if you hold a valid ticket.",
        "complexity": "Token Check: O(1) lookup.\nToken Refill: O(1) timestamp math (lazy refill).",
        "examples": {
            "python": "import time\nclass RateLimiter:\n    def __init__(self, capacity, refill_rate):\n        self.capacity = capacity\n        self.refill_rate = refill_rate\n        self.tokens = capacity\n        self.last_refill = time.time()",
            "javascript": "class RateLimiter {\n  constructor(capacity, refillRate) {\n    this.capacity = capacity;\n    this.refillRate = refillRate;\n    this.tokens = capacity;\n    this.lastRefill = Date.now();\n  }\n}"
        },
        "exercises": [
            "Build an active Token Bucket algorithm rate limiter and simulate dynamic request spikes.",
            "Compare the Token Bucket algorithm with the Sliding Window Log rate limiter."
        ]
    }
}
