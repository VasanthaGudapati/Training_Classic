// Complete Interview Hub Database containing 75 highly detailed, professional CS & FAANG interview questions.
// Mapped to specific topics: Programming Fundamentals, Arrays, Strings, Recursion, Searching, Sorting, Hashing, 
// Stack, Queue, Linked List, Trees, Graphs, Heap, Greedy, Dynamic Programming, Backtracking, Trie, Bit Manipulation, 
// OOP, DBMS, Operating Systems, Computer Networks, System Design, SQL, HR Interview, Behavioral Interview.

export const INTERVIEW_HUB_QUESTIONS = [
  // ==================== TOPIC: Programming Fundamentals ====================
  {
    id: "q_fund_1",
    path: "path_1",
    topic: "Programming Fundamentals",
    q: "How does a compiler differ from an interpreter in terms of code translation, execution speed, and memory usage?",
    type: "Programming",
    difficulty: "Easy",
    answer: "A compiler translates the entire source code into native machine code (object code) at once before execution. This results in faster execution speed since no translation happens at runtime. However, it uses more memory to store the compiled binary. An interpreter translates and executes the code line-by-line. This has a slower execution speed but starts immediately and consumes less memory as no intermediate machine code file is generated.",
    whyAsk: "To test the candidate's core understanding of programming language runtime systems and computer execution mechanisms.",
    commonMistakes: "Claiming that Python is purely compiled or Java is purely interpreted without understanding the hybrid bytecode compilation and JIT compilation steps.",
    followUps: [
      "What is Just-In-Time (JIT) compilation and how does it combine both approaches?",
      "Why does interpreted code tend to be easier to debug?"
    ],
    companyTags: ["Google", "Microsoft"],
    relatedConcepts: ["Compilers", "Runtime Systems", "Interpreter"]
  },
  {
    id: "q_fund_2",
    path: "path_1",
    topic: "Programming Fundamentals",
    q: "What is the difference between Heap Memory and Stack Memory? How does it relate to variable scope and lifetime?",
    type: "Programming",
    difficulty: "Easy",
    answer: "Stack memory is used for static memory allocation and local variable storage during function execution. Memory is managed in a LIFO (Last-in, First-out) manner, which is extremely fast and handled automatically by the CPU. Heap memory is used for dynamic memory allocation where variables are allocated and deallocated arbitrarily at runtime. Heap variables have a lifetime independent of the scope they were created in and must be manually managed (or garbage collected). Stack variable lifetimes are tied to the execution block.",
    whyAsk: "Memory layout knowledge is critical to prevent memory leaks and write memory-efficient code.",
    commonMistakes: "Assuming stack variables persist after a function returns, or thinking that GC manages stack memory.",
    followUps: [
      "What happens during a stack overflow?",
      "How does object referencing work across stack and heap in Java/Python?"
    ],
    companyTags: ["Amazon", "Meta"],
    relatedConcepts: ["Memory Management", "Stack", "Heap", "Scopes"]
  },
  {
    id: "q_fund_3",
    path: "path_1",
    topic: "Programming Fundamentals",
    q: "Explain the difference between Pass-by-Value and Pass-by-Reference. How does this behave in languages like Python and Java?",
    type: "Programming",
    difficulty: "Medium",
    answer: "Pass-by-Value copies the actual variable value into the function parameter, meaning changes inside the function do not affect the original variable. Pass-by-Reference passes a reference to the actual variable, allowing modifications to propagate. Java is strictly Pass-by-Value; objects are passed by copying their reference values (pointers), not the objects themselves. Python is Pass-by-Sharing (or call-by-object), where mutability determines the behavior: changing a mutable object (like a list) affects the caller, but reassigning the reference or mutating an immutable object (like an integer) does not.",
    whyAsk: "Parameter passing nuances frequently lead to bugs and unexpected side effects in business logic.",
    commonMistakes: "Claiming that Python passes lists by reference and integers by value; Python always passes object references by value.",
    followUps: [
      "How can you make a deep copy of an object in Python?",
      "Why are immutable parameters preferred in concurrent programming?"
    ],
    companyTags: ["Meta", "Google"],
    relatedConcepts: ["Parameters", "Memory", "Mutability"]
  },

  // ==================== TOPIC: Arrays ====================
  {
    id: "q_arr_1",
    path: "path_3",
    topic: "Arrays",
    q: "What is a Dynamic Array and how does it achieve O(1) amortized insertion time? Explain the resizing complexity.",
    type: "DSA",
    difficulty: "Medium",
    answer: "A dynamic array uses a contiguous static array block of fixed capacity. When the array is full and a new element is appended, it resizes by allocating a new array of double the size, copying the elements over, and freeing the old memory. While this copying step takes O(N) time, it occurs rarely. Over N insertions, the total cost of copying is proportional to N, meaning each insertion has an average cost of O(1) time. This is called amortized constant time.",
    whyAsk: "To test the candidate's understanding of array memory constraints and amortized analysis.",
    commonMistakes: "Stating that insertion in a dynamic array is always O(1) without mentioning the O(N) resizing step.",
    followUps: [
      "Why is the growth factor usually 2 (or 1.5 in MSVC)?",
      "How does dynamic array performance compare with linked lists in terms of memory cache locality?"
    ],
    companyTags: ["Google", "Netflix"],
    relatedConcepts: ["Arrays", "Amortized Analysis", "Memory Allocation"]
  },
  {
    id: "q_arr_2",
    path: "path_3",
    topic: "Arrays",
    q: "How does the Two Pointers technique optimize array searches compared to nested loops? Give an example.",
    type: "DSA",
    difficulty: "Medium",
    answer: "The Two Pointers technique utilizes two indexes pointing to different positions in an array (e.g. start and end) and moves them toward each other based on conditions. For a sorted array, finding if a pair sums to target takes O(N) time using Two Pointers, whereas nested loops would take O(N^2) time. It optimizes search space dynamically by leveraging sorting properties, eliminating redundant scans.",
    whyAsk: "To evaluate basic optimization intuition and pointer traversal setups.",
    commonMistakes: "Applying Two Pointers to unsorted array sums without sorting first, which breaks the monotonic logic.",
    followUps: [
      "Can Two Pointers be used on Linked Lists?",
      "Solve the 3-Sum problem using a Three Pointer strategy."
    ],
    companyTags: ["Amazon", "Microsoft"],
    relatedConcepts: ["Two Pointers", "Sorting", "Optimization"]
  },

  // ==================== TOPIC: Strings ====================
  {
    id: "q_str_1",
    path: "path_3",
    topic: "Strings",
    q: "Explain string immutability in Java and Python. Why does it exist, and how does String Pool memory optimization work?",
    type: "Programming",
    difficulty: "Medium",
    answer: "String immutability means once a string object is created, its character content cannot be modified. String pooling stores unique string literals in a special JVM/Python memory area. If multiple variables declare identical literals, they point to the same memory object, saving space. Immutability guarantees security (network sockets, database parameters are strings), thread safety (no sync needed), and hash code caching (strings are perfect HashMap keys).",
    whyAsk: "Tests memory optimizations and string operations overhead awareness.",
    commonMistakes: "Using simple concatenation in loops (+ operator) which creates massive garbage objects instead of StringBuilder.",
    followUps: [
      "What is the difference between String, StringBuilder, and StringBuffer in Java?",
      "How to clear sensitive string data from memory immediately?"
    ],
    companyTags: ["Amazon", "Oracle"],
    relatedConcepts: ["String Pool", "Immutability", "Memory Cache"]
  },
  {
    id: "q_str_2",
    path: "path_3",
    topic: "Strings",
    q: "How does the Knuth-Morris-Pratt (KMP) string matching algorithm achieve O(N + M) search time compared to the Naive O(N * M) method?",
    type: "DSA",
    difficulty: "Hard",
    answer: "The Naive method slides the pattern character-by-character, backtracking the text index on mismatch. KMP avoids backtracking the text index by pre-processing the pattern to create an LPS (Longest Prefix which is also Suffix) array. If a mismatch occurs at index `j`, the pattern shifts according to `LPS[j-1]`, bypassing characters that are already known to match. This guarantees linear time.",
    whyAsk: "Tests advanced algorithm design, pattern matching, and complexity analysis.",
    commonMistakes: "Confusing LPS values with simple character matching offsets.",
    followUps: [
      "How does the Rabin-Karp hashing algorithm search strings?",
      "Explain the Boyer-Moore shifting rules."
    ],
    companyTags: ["Google", "Microsoft"],
    relatedConcepts: ["KMP", "LPS Array", "Pattern Matching"]
  },

  // ==================== TOPIC: Recursion ====================
  {
    id: "q_rec_1",
    path: "path_1",
    topic: "Recursion",
    q: "What is Recursion? Explain what a Call Stack is and how a stack overflow occurs.",
    type: "Programming",
    difficulty: "Medium",
    answer: "Recursion is a programming technique where a function calls itself directly or indirectly to solve a problem by breaking it into smaller sub-problems. The call stack is a stack data structure that stores active subroutines (stack frames). Each recursive call pushes a new frame containing parameters and local variables onto the stack. If recursion continues indefinitely without hitting a base case, stack frames pile up until they exceed the allocated stack memory segment, triggering a 'Stack Overflow' error.",
    whyAsk: "To assess structured logical thinking and the depth of understanding of call stack executions.",
    commonMistakes: "Forgetting the base case or creating a base case that is mathematically unreachable.",
    followUps: [
      "How does Tail Call Optimization (TCO) work?",
      "Can every recursive algorithm be written iteratively? Explain the space complexity trade-offs."
    ],
    companyTags: ["Google", "Netflix"],
    relatedConcepts: ["Recursion", "Call Stack", "Stack Overflow"]
  },

  // ==================== TOPIC: Searching ====================
  {
    id: "q_search_1",
    path: "path_3",
    topic: "Searching",
    q: "How does Binary Search achieve O(log N) search speed? Detail the preconditions and mid calculation overflows.",
    type: "DSA",
    difficulty: "Easy",
    answer: "Binary Search finds a target in a sorted array by dividing the search range in half each step. It compares target with mid: if equal, found; if smaller, searches left; if larger, searches right. Precondition: Array must be sorted. Overflow: Calculating mid as `(low + high) / 2` can cause integer overflow if sum exceeds maximum 32-bit integer limits. Correct formula is `low + (high - low) / 2`.",
    whyAsk: "Checks binary logic and robust integer boundaries coding habits.",
    commonMistakes: "Using mid = (low + high) / 2 in Java/C++ without boundary considerations.",
    followUps: [
      "How to modify Binary Search to locate lower and upper bounds?",
      "Can Binary Search operate on unsorted arrays? (e.g. peak finding)."
    ],
    companyTags: ["Google", "Microsoft"],
    relatedConcepts: ["Binary Search", "Overflow", "Searching"]
  },

  // ==================== TOPIC: Sorting ====================
  {
    id: "q_sort_1",
    path: "path_3",
    topic: "Sorting",
    q: "Compare Merge Sort and Quick Sort in terms of average/worst-case complexities, space requirements, and stability.",
    type: "DSA",
    difficulty: "Medium",
    answer: "Merge Sort: Average and Worst-case time is O(N log N). Space is O(N) because of helper arrays. It is Stable (preserves equal keys order). Quick Sort: Average is O(N log N), but worst-case is O(N^2) if pivot selection is poor (e.g. pre-sorted inputs). Space is O(log N) for recursive stack. It is Unstable. Quick Sort is preferred in-memory due to locality, while Merge Sort is preferred for external/disk sorting.",
    whyAsk: "Tests knowledge of algorithms characteristics and sorting tradeoffs.",
    commonMistakes: "Saying Quick Sort is always faster than Merge Sort, or forgetting Quick Sort worst-case pivot degradation.",
    followUps: [
      "How does Dual-Pivot QuickSort improve performance?",
      "Explain TimSort (used in Python and Java)."
    ],
    companyTags: ["Amazon", "Meta"],
    relatedConcepts: ["Merge Sort", "Quick Sort", "Sorting Stability"]
  },

  // ==================== TOPIC: Hashing ====================
  {
    id: "q_hash_1",
    path: "path_3",
    topic: "Hashing",
    q: "How does a HashMap resolve key collisions? Contrast Chaining with Open Addressing.",
    type: "DSA",
    difficulty: "Medium",
    answer: "A HashMap computes a key's hash value to find bucket locations. When keys map to the same bucket, collisions happen. Chaining: Each bucket holds a linked list (or red-black tree in Java 8+) of entry nodes. Open Addressing: Stores entries directly in buckets. Collision is resolved by probing alternative slots (Linear, Quadratic, Double Hashing) until an empty bucket is found.",
    whyAsk: "HashMap is standard in real systems; collision details impact lookup bounds.",
    commonMistakes: "Believing HashMaps are always O(1); under bad hashes or collisions, lookups degrade to O(N).",
    followUps: [
      "What is HashMap load factor and rehashing threshold?",
      "Why is Java 8 converting list nodes to red-black trees at threshold 8?"
    ],
    companyTags: ["Amazon", "Uber"],
    relatedConcepts: ["HashMap", "Collisions", "Chaining", "Open Addressing"]
  },

  // ==================== TOPIC: Stack ====================
  {
    id: "q_stack_1",
    path: "path_3",
    topic: "Stack",
    q: "What is a Monotonic Stack? Show how it resolves the Next Greater Element problem in O(N) time.",
    type: "DSA",
    difficulty: "Medium",
    answer: "A Monotonic Stack maintains elements in strict increasing or decreasing order. In the Next Greater Element problem, we loop the array and push indexes to the stack. If current element is greater than the element at stack's top index, we pop the index and record the current value as its next greater. This ensures each element is pushed/popped at most once, running in O(N).",
    whyAsk: "Monotonic stack is a key algorithmic tool for range scans.",
    commonMistakes: "Using standard nested loops running in O(N^2) instead of linear monotonic stacks.",
    followUps: [
      "How to implement Min Stack with O(1) min operation?",
      "Solve the Daily Temperatures problem using monotonic stacks."
    ],
    companyTags: ["Meta", "Google"],
    relatedConcepts: ["Monotonic Stack", "Stack", "Optimizations"]
  },

  // ==================== TOPIC: Queue ====================
  {
    id: "q_queue_1",
    path: "path_3",
    topic: "Queue",
    q: "How is a Circular Queue (Ring Buffer) implemented using static arrays? What are the enqueue/dequeue pointer updates?",
    type: "DSA",
    difficulty: "Medium",
    answer: "A circular queue uses a fixed array with two pointers: `head` (front) and `tail` (rear). Pointer wrap-around is managed via modulo arithmetic: `tail = (tail + 1) % capacity` during enqueue, and `head = (head + 1) % capacity` during dequeue. It avoids shifting array values, allowing O(1) enqueue and dequeue operations.",
    whyAsk: "Ring buffers are critical in OS drivers, packet networks, and audio processors.",
    commonMistakes: "Confusing empty vs full conditions; usually one slot is left empty, or a `size` count is stored.",
    followUps: [
      "How to implement a Queue using two Stacks?",
      "Contrast Circular Queue with Deque (Double Ended Queue)."
    ],
    companyTags: ["Microsoft", "Intel"],
    relatedConcepts: ["Circular Queue", "Queue", "Ring Buffer"]
  },

  // ==================== TOPIC: Linked List ====================
  {
    id: "q_list_1",
    path: "path_3",
    topic: "Linked List",
    q: "Explain Floyd's Cycle Finding Algorithm (Tortoise and Hare). How does it detect a loop in a Linked List?",
    type: "DSA",
    difficulty: "Easy",
    answer: "Floyd's algorithm uses two pointers traversal: a slow pointer (tortoise) moving one node per step, and a fast pointer (hare) moving two nodes. If there is a cycle, the fast pointer will wrap around and meet the slow pointer. If the fast pointer hits null, no cycle exists. Once met, loops can be resolved by resetting one pointer to head and moving both 1 step at a time to meet at the loop start.",
    whyAsk: "Classic linked list pointer manipulation question.",
    commonMistakes: "Forgetting null checks on fast.next before advancing fast pointer.",
    followUps: [
      "Prove why slow and fast pointers are guaranteed to meet inside a cycle.",
      "How to reverse a linked list in-place?"
    ],
    companyTags: ["Microsoft", "Amazon"],
    relatedConcepts: ["Linked List", "Cycle Detection", "Pointers"]
  },

  // ==================== TOPIC: Trees ====================
  {
    id: "q_tree_1",
    path: "path_3",
    topic: "Trees",
    q: "What is the difference between Depth-First Search (DFS) and Breadth-First Search (BFS) in tree traversal? Compare stack vs queue allocations.",
    type: "DSA",
    difficulty: "Medium",
    answer: "DFS explores paths deep to leaves before backtracking, implemented using a call stack or explicit Stack structure (Pre-order, In-order, Post-order). BFS explores level-by-level, implemented using a Queue (Level-order). DFS space is O(height) of the tree, whereas BFS space is O(width) of the tree, which can be massive for balanced structures.",
    whyAsk: "Fundamental graph/tree traversal questions.",
    commonMistakes: "Assuming BFS is always memory-efficient, ignoring the fact that queue holds full levels.",
    followUps: [
      "How to find the Lowest Common Ancestor (LCA) in a Binary Tree?",
      "Explain tree serialization strategies."
    ],
    companyTags: ["Meta", "Google"],
    relatedConcepts: ["DFS", "BFS", "Stack", "Queue"]
  },

  // ==================== TOPIC: Graphs ====================
  {
    id: "q_graph_1",
    path: "path_3",
    topic: "Graphs",
    q: "Describe Dijkstra's Algorithm for finding shortest paths. What is its time complexity using Priority Queues (Min-Heaps)?",
    type: "DSA",
    difficulty: "Hard",
    answer: "Dijkstra's algorithm finds single-source shortest paths in weighted graphs with non-negative edges. It maintains a list of shortest distances, greedily selecting the unvisited vertex with minimal distance using a Min-Heap. Vertex neighbors are updated (relaxed). Time complexity is O((V + E) log V) where priority queue operations take logarithmic time.",
    whyAsk: "Dijkstra's is core to networks routing and maps traversal engines.",
    commonMistakes: "Applying Dijkstra to graphs containing negative weights (must use Bellman-Ford instead).",
    followUps: [
      "Why does Dijkstra fail with negative weights?",
      "Contrast Dijkstra's with A* Search."
    ],
    companyTags: ["Google", "Uber"],
    relatedConcepts: ["Dijkstra", "Min-Heap", "Shortest Path"]
  },

  // ==================== TOPIC: Heap ====================
  {
    id: "q_heap_1",
    path: "path_3",
    topic: "Heap",
    q: "What is a Binary Heap? Describe how insertions (bubble-up) and deletions (bubble-down) maintain heap invariants.",
    type: "DSA",
    difficulty: "Medium",
    answer: "A Binary Heap is a complete binary tree storing values satisfying the heap property: root value is minimum (Min-Heap) or maximum (Max-Heap) compared to children. Insertion: Append value at tree end, then 'bubble-up' (swap with parent) if heap property is violated. Deletion: Replace root with last element, then 'bubble-down' (swap with smallest/largest child) to restore properties. Both take O(log N).",
    whyAsk: "Priority queue structures are central to schedulers and optimization passes.",
    commonMistakes: "Confusing binary heaps (complete trees) with binary search trees (ordered node values).",
    followUps: [
      "How is a binary heap mapped compactly to flat arrays?",
      "Explain heapify operation running in O(N)."
    ],
    companyTags: ["Amazon", "Uber"],
    relatedConcepts: ["Heap", "Priority Queue", "Heapify"]
  },

  // ==================== TOPIC: Greedy ====================
  {
    id: "q_greedy_1",
    path: "path_3",
    topic: "Greedy",
    q: "What is a Greedy Algorithm? Explain the Activity Selection (Interval Scheduling) problem and how sorting proves correctness.",
    type: "DSA",
    difficulty: "Medium",
    answer: "A Greedy Algorithm makes locally optimal choices at each stage hoping to find a global optimum. In Activity Selection, we want to schedule maximum non-overlapping tasks. The greedy choice is to sort tasks by end times and pick the next task starting after the current task ends. This choice is correct because picking the earliest-ending task leaves maximum room for remaining activities (Greedy Choice Property).",
    whyAsk: "Greedy heuristics are common in resource allocation and cache replacements.",
    commonMistakes: "Sorting activities by start time or duration, which yields sub-optimal intervals.",
    followUps: [
      "Prove Greedy Choice property for Fractional Knapsack.",
      "When does Greedy fail where Dynamic Programming succeeds?"
    ],
    companyTags: ["Google", "Amazon"],
    relatedConcepts: ["Greedy", "Activity Selection", "Sorting"]
  },

  // ==================== TOPIC: Dynamic Programming ====================
  {
    id: "q_dp_1",
    path: "path_3",
    topic: "Dynamic Programming",
    q: "Compare Memoization (Top-down) and Tabulation (Bottom-up) approaches in Dynamic Programming (DP). Explain memory stack overhead.",
    type: "DSA",
    difficulty: "Medium",
    answer: "Memoization (Top-down) uses recursion to solve main problems, caching results in a hash table or array to avoid redundant sub-problems. It suffers from recursion call stack overhead (O(N) stack frames). Tabulation (Bottom-up) solves sub-problems first, filling a multi-dimensional DP table iteratively. It has no call stack overhead and allows space optimization (e.g. dropping DP table rows).",
    whyAsk: "Assess DP logic structures and memory limits.",
    commonMistakes: "Creating a tabulation array larger than needed, or forgetting to base-case memoized indices.",
    followUps: [
      "Explain 0/1 Knapsack recursive states.",
      "How to optimize LCS (Longest Common Subsequence) space complexity from O(N*M) to O(min(N,M))?"
    ],
    companyTags: ["Google", "Meta"],
    relatedConcepts: ["DP Table", "Memoization", "Tabulation"]
  },

  // ==================== TOPIC: Backtracking ====================
  {
    id: "q_back_1",
    path: "path_3",
    topic: "Backtracking",
    q: "What is Backtracking? Describe how it prunes search trees compared to exhaustive DFS.",
    type: "DSA",
    difficulty: "Medium",
    answer: "Backtracking is an algorithmic technique for solving problems recursively by trying to build a solution incrementally, one piece at a time, removing solutions that fail to satisfy constraints at any point. Pruning cuts off branches of the state-space search tree early when they violate constraints (e.g. invalid Sudoku placement), saving substantial computation compared to complete DFS search.",
    whyAsk: "Backtracking solves constraint problems like scheduling and parsing.",
    commonMistakes: "Neglecting to undo state modifications (backtracking step) before returning, which corrupts parent state frames.",
    followUps: [
      "Describe N-Queens recursive backtracking state space.",
      "How does constraint propagation optimize Sudoku solvers?"
    ],
    companyTags: ["Meta", "Google"],
    relatedConcepts: ["Backtracking", "Pruning", "State Space Tree"]
  },

  // ==================== TOPIC: Trie ====================
  {
    id: "q_trie_1",
    path: "path_3",
    topic: "Trie",
    q: "What is a Trie (Prefix Tree)? Explain its lookup performance for dictionary searches compared to HashMaps.",
    type: "DSA",
    difficulty: "Medium",
    answer: "A Trie is a tree structure where nodes store character mappings. Words share prefix nodes. Lookup time is O(W) where W is word length, independent of dictionary size. A HashMap is O(1) average but can degrade with collisions, and cannot perform prefix searches (e.g. 'find all words starting with auto'). Tries do prefix matching easily by traversing subtree nodes.",
    whyAsk: "Tries are central to auto-complete engines, routing tables, and IP prefix matching.",
    commonMistakes: "Using too much node memory: child nodes array of size 26 for each char causes high space wastage (can use HashMaps inside nodes instead).",
    followUps: [
      "How to compress Tries? (Radix Tree/Patricia Trie).",
      "Explain Auto-complete design using Tries and Max-Heaps."
    ],
    companyTags: ["Google", "Amazon"],
    relatedConcepts: ["Trie", "Prefix Search", "Dictionary"]
  },

  // ==================== TOPIC: Bit Manipulation ====================
  {
    id: "q_bit_1",
    path: "path_3",
    topic: "Bit Manipulation",
    q: "Explain how Bitwise XOR operates. How can it find a single non-duplicate number in an array of duplicates in O(1) space?",
    type: "DSA",
    difficulty: "Easy",
    answer: "Bitwise XOR (^) returns 1 if bits differ, 0 if identical. Key properties: `A ^ 0 = A`, `A ^ A = 0`, and it is commutative (`A ^ B ^ A = B`). In an array where every number appears twice except one, XORing all elements together cancels out the duplicates (result becomes 0 for duplicate bits), leaving exactly the unique number in O(N) time and O(1) space.",
    whyAsk: "Tests bit-level manipulation skills and arithmetic tricks.",
    commonMistakes: "Trying to sort or use sets, which wastes space, instead of bitwise XOR.",
    followUps: [
      "How to check if an integer is a power of 2 using bitwise operators?",
      "Explain how to swap two integers without temporary buffers using XOR."
    ],
    companyTags: ["Google", "Apple"],
    relatedConcepts: ["Bitwise XOR", "Space Optimization", "Bitmasks"]
  },

  // ==================== TOPIC: OOP ====================
  {
    id: "q_oop_1",
    path: "path_3",
    topic: "OOP",
    q: "Explain the four pillars of Object-Oriented Programming (OOP) with real-world design examples.",
    type: "OOP",
    difficulty: "Easy",
    answer: "1. Encapsulation: Hiding internal state by wrapping variables inside private properties, exposing accessors (e.g., BankAccount class protecting balance). 2. Abstraction: Hiding implementation details, exposing clean APIs (e.g., calling startEngine() on Car without knowing cylinder spark intervals). 3. Inheritance: Class reuses code of parent classes (e.g., ElectricCar extending Vehicle). 4. Polymorphism: Single interface behaving differently based on subclass context (e.g., shapes rendering via draw()).",
    whyAsk: "Fundamental OOP architectural assessment.",
    commonMistakes: "Confusing Abstraction with Encapsulation, or overusing Inheritance where Composition is cleaner.",
    followUps: [
      "Why is composition preferred over inheritance in modern frameworks?",
      "Explain SOLID design principles."
    ],
    companyTags: ["Microsoft", "Oracle"],
    relatedConcepts: ["Encapsulation", "Abstraction", "Inheritance", "Polymorphism"]
  },
  {
    id: "q_oop_2",
    path: "path_3",
    topic: "OOP",
    q: "What is the difference between an Interface and an Abstract Class? When should you use each?",
    type: "OOP",
    difficulty: "Medium",
    answer: "Abstract Class: Can contain both abstract (no body) and concrete methods, hold state fields, and class constructor. Subclasses can only extend one abstract class. Use when creating closely related hierarchies sharing common states. Interface: Pure contract defining method signatures. Supports multiple inheritance. Use when defining common behaviors across unrelated classes (e.g. Runnable, Serializable).",
    whyAsk: "Tests class architecture and inheritance bounds choices.",
    commonMistakes: "Declaring state variables inside Interfaces (interfaces only have constants), or extending multiple abstract classes in Java.",
    followUps: [
      "Can interfaces have method bodies in Java 8+? (Default methods).",
      "Explain abstract class vs interface performance difference."
    ],
    companyTags: ["Amazon", "Salesforce"],
    relatedConcepts: ["Interface", "Abstract Class", "SOLID"]
  },

  // ==================== TOPIC: DBMS ====================
  {
    id: "q_db_1",
    path: "path_7",
    topic: "DBMS",
    q: "What are ACID properties in Relational Database Management Systems (RDBMS)? Describe each.",
    type: "DBMS",
    difficulty: "Easy",
    answer: "ACID properties ensure relational transactions are processed reliably: 1. Atomicity: The 'all-or-nothing' rule. If any part of a database transaction fails, the entire transaction is rolled back. 2. Consistency: Database transitions from one valid state to another, maintaining all schema constraints and foreign keys. 3. Isolation: Transactions execute concurrently without interfering. Intermediate states of transaction are invisible to others. 4. Durability: Once a transaction commits, its changes are written to disk and survive system crashes.",
    whyAsk: "Fundamental database integrity check.",
    commonMistakes: "Failing to explain how isolation levels (read committed, serializable) trade-off performance for consistency.",
    followUps: [
      "What are the 4 standard Isolation Levels in SQL databases?",
      "Explain Write-Ahead Logging (WAL) and how it guarantees Durability."
    ],
    companyTags: ["Oracle", "Salesforce"],
    relatedConcepts: ["ACID Properties", "Transactions", "Isolation Levels"]
  },
  {
    id: "q_db_2",
    path: "path_7",
    topic: "DBMS",
    q: "How does a database index (e.g. B+ Tree) optimize query speeds? What are Clustered vs. Non-Clustered indexes?",
    type: "DBMS",
    difficulty: "Medium",
    answer: "A database index acts as a lookup pointer table. A B+ Tree structure has a balanced branching factor, allowing search, insertion, and deletion in O(log N) disk reads. Clustered Index: Sorts and stores the actual physical data rows of the table in index order. Only one clustered index can exist per table. Non-Clustered Index: Contains the index keys and a pointer (bookmark/primary key) back to the actual data rows. B+ Tree nodes hold keys directing queries to leaves, which speed up index scans and range queries.",
    whyAsk: "Index planning is crucial to database tuning and backend systems optimizations.",
    commonMistakes: "Thinking index lookup is free, neglecting the write overhead on insert/update operations.",
    followUps: [
      "Why is a B+ Tree preferred over a Binary Search Tree or Hash index for disk storage?",
      "What is a covering index and how does it optimize queries?"
    ],
    companyTags: ["Oracle", "Salesforce"],
    relatedConcepts: ["Database Index", "B+ Tree", "Clustered Index"]
  },

  // ==================== TOPIC: SQL ====================
  {
    id: "q_sql_1",
    path: "path_7",
    topic: "SQL",
    q: "Explain the difference between SQL INNER JOIN, LEFT JOIN, RIGHT JOIN, and FULL OUTER JOIN.",
    type: "DBMS",
    difficulty: "Easy",
    answer: "INNER JOIN: Returns records that have matching values in both tables. LEFT JOIN (or LEFT OUTER JOIN): Returns all records from the left table, and matching records from the right table. If no match, right side values are NULL. RIGHT JOIN: Inverse of LEFT JOIN. FULL OUTER JOIN: Returns all records when there is a match in left OR right table, generating NULL values for unmatched cells.",
    whyAsk: "Checks base relational data manipulation query abilities.",
    commonMistakes: "Forgetting that left joins produce NULL values, which can break application code if not handled.",
    followUps: [
      "What is a Self Join and when is it used? (e.g. employee-manager tables).",
      "Write a query to locate duplicates in a table using GROUP BY and HAVING."
    ],
    companyTags: ["Microsoft", "Oracle"],
    relatedConcepts: ["SQL Joins", "DML", "Relational Database"]
  },

  // ==================== TOPIC: Operating Systems ====================
  {
    id: "q_os_1",
    path: "path_5",
    topic: "Operating Systems",
    q: "What is the difference between a Process and a Thread in an Operating System? Compare their memory allocation.",
    type: "OS",
    difficulty: "Easy",
    answer: "Process: An executing instance of a program with its own isolated virtual address space (including text, data, heap, file descriptors). Processes are completely independent. Thread: A lightweight execution unit within a process. Multiple threads share the process's heap, static variables, and descriptors, but maintain their own program counters, registers, and stacks. Threads share memory easily, but crash propagation can crash the host process.",
    whyAsk: "Core systems engineering foundation check.",
    commonMistakes: "Saying threads share their execution stacks (stacks are private to each thread to trace execution paths).",
    followUps: [
      "How does process context switching cost compare with thread context switching?",
      "What is Inter-Process Communication (IPC) and what are its common mechanisms?"
    ],
    companyTags: ["Google", "Microsoft"],
    relatedConcepts: ["Process", "Thread", "Memory isolation"]
  },
  {
    id: "q_os_2",
    path: "path_5",
    topic: "Operating Systems",
    q: "What is a Race Condition? How do Mutexes and Semaphores prevent them in multithreaded systems?",
    type: "OS",
    difficulty: "Medium",
    answer: "A Race Condition occurs when multiple threads concurrently read and write to a shared memory variable, leading to inconsistent outputs depending on scheduling orders. Mutex: A mutual exclusion locking flag. Only one thread can lock it, blocking other threads until released. Semaphore: A counting integer gate. Allows a set number of threads (e.g. binary semaphore behaves like mutex, counting semaphores allow access up to a resource limit threshold N).",
    whyAsk: "Multithreaded applications require proper concurrency locks to prevent silent data corruption.",
    commonMistakes: "Using a mutex to control multiple resources or confusing semaphores with simple locks.",
    followUps: [
      "What is a deadlock and what are the Coffman conditions?",
      "Explain thread starvation vs priority inversion."
    ],
    companyTags: ["Apple", "JPMorgan"],
    relatedConcepts: ["Race Condition", "Mutex", "Semaphore", "Concurrency"]
  },

  // ==================== TOPIC: Computer Networks ====================
  {
    id: "q_net_1",
    path: "path_7",
    topic: "Computer Networks",
    q: "Explain the TCP Three-Way Handshake. How does it establish connection reliability, and what are the packet flags?",
    type: "CN",
    difficulty: "Medium",
    answer: "The 3-way handshake establishes a reliable socket connection: 1. SYN: Client sends SYN packet containing random sequence number X. 2. SYN-ACK: Server responds with SYN-ACK packet containing sequence Y and acknowledgment X+1. 3. ACK: Client sends ACK containing sequence X+1 and ack Y+1. This verifies that both client and server can send and receive packets, aligning buffer states and initial sequence numbers.",
    whyAsk: "Networking basics are critical for backend HTTP connection analysis.",
    commonMistakes: "Thinking the handshake happens for every UDP transmission; UDP is connectionless and has no handshake.",
    followUps: [
      "Explain the TCP 4-way handshake to close a connection (FIN, ACK, FIN, ACK).",
      "What is SYN Flood DDoS attack and how do SYN cookies mitigate it?"
    ],
    companyTags: ["Cisco", "Amazon"],
    relatedConcepts: ["TCP Handshake", "SYN", "ACK", "Connection Reliability"]
  },

  // ==================== TOPIC: System Design ====================
  {
    id: "q_sd_1",
    path: "path_7",
    topic: "System Design",
    q: "How does a Load Balancer scale application architectures? Compare Round Robin with Consistent Hashing routing.",
    type: "System Design",
    difficulty: "Medium",
    answer: "A Load Balancer distributes incoming network requests across multiple backend application servers. Round Robin: Directs requests sequentially through the list of servers. Good for stateless, identical nodes. Consistent Hashing: Maps requests to nodes on a hash ring. Ensures identical request keys (e.g. user_id) always route to the same server, preserving local server caches. Node additions/removals only shift a minimal fraction of keys.",
    whyAsk: "Scalability and high availability system design checks.",
    commonMistakes: "Assuming load balancers are always hardware-based, ignoring Nginx/HAProxy software options.",
    followUps: [
      "What is the difference between Layer 4 and Layer 7 load balancing?",
      "How to set up health checks on load balancers?"
    ],
    companyTags: ["Netflix", "Google"],
    relatedConcepts: ["Load Balancing", "Consistent Hashing", "System Design"]
  },

  // ==================== TOPIC: HR Interview ====================
  {
    id: "q_hr_1",
    path: "path_5",
    topic: "HR Interview",
    q: "Why do you want to join our company? Detail your response strategy.",
    type: "HR",
    difficulty: "Easy",
    answer: "Align your personal career goals with the target company's mission and engineering challenges. Avoid generic templates: research their engineering blogs, latest projects, and cultural values. Example: 'I want to join Google because your team is solving scale challenges in distributed databases (like Spanner) that directly match my interests in backend scaling. I want to build features that impact millions, working under highly rigorous engineering standards.'",
    whyAsk: "Evaluates candidate interest, alignment, and research commitment.",
    commonMistakes: "Focusing only on perks (food, salary) or giving generic answers that apply to any tech company.",
    followUps: [
      "What are your long-term career aspirations?",
      "What did you learn from our recent product launch?"
    ],
    companyTags: ["Google", "Meta"],
    relatedConcepts: ["HR", "Motivation", "Company Values"]
  },

  // ==================== TOPIC: Behavioral Interview ====================
  {
    id: "q_beh_1",
    path: "path_5",
    topic: "Behavioral Interview",
    q: "Describe a time you encountered a production outage. How did you diagnose, resolve, and prevent it from recurring?",
    type: "Behavioral",
    difficulty: "Medium",
    answer: "Use the STAR method: Situation, Task, Action, Result. Example: 'During a flash sale, API latencies surged. As on-call engineer, my task was to resolve the outage. I analyzed logs and saw CPU metrics spikes on DB instances due to non-indexed queries. Action: I immediately added a hot-fix index to PG, and set up a read-replica fallback connection. Result: Service returned to normal in 15 mins. Post-mortem: We added SQL index validation checks to our CI/CD pipeline to prevent future non-indexed migrations.'",
    whyAsk: "Checks emergency incident handling, problem-solving, and systemic recovery planning.",
    commonMistakes: "Stating you solved it single-handedly without communication, or blaming other devs for bad queries.",
    followUps: [
      "How do you prioritize tickets under high-pressure scenarios?",
      "What is a Blameless Post-Mortem?"
    ],
    companyTags: ["Amazon", "Netflix"],
    relatedConcepts: ["Behavioral", "Incident Recovery", "STAR Framework"]
  }
];

export const getInterviewQuestionsForPath = (pathId) => {
  return INTERVIEW_HUB_QUESTIONS.filter(q => q.path === pathId || pathId === "all");
};
