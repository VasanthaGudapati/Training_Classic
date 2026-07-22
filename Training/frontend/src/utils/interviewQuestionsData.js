// Interview Questions Database for Days 0 to 30
// Generates 15 comprehensive questions per day categorized with full metadata.

export const getInterviewQuestions = (dayNum) => {
  const getTopicInfo = (day) => {
    switch (day) {
      case 0: return { topic: "CS Foundations & Roadmap", keyTerms: ["Compilers", "Virtual Memory", "Operating Systems", "Networking", "Database Systems"] };
      case 1: return { topic: "Variables, Flow Control & Functions", keyTerms: ["LEGB Scope", "Call Stack", "Stack Frames", "Recursion Limits", "Value vs Reference"] };
      case 2: return { topic: "Dynamic Arrays & Array Resizing", keyTerms: ["Amortized insertion", "Contiguous allocation", "Doubling factor", "Pointer updates"] };
      case 3: return { topic: "Strings & Substring Searching", keyTerms: ["String Immutability", "Substring patterns", "KMP Prefix Table", "Unicode Buffers"] };
      case 4: return { topic: "Recursion & Complexity Basics (Big O)", keyTerms: ["Call Stack height", "Base Case failures", "Logarithmic Time", "Binary Exponentiation"] };
      case 5: return { topic: "Singly Linked Lists", keyTerms: ["Pointer references", "Node insertion O(1)", "Cycle detection", "Memory collection"] };
      case 6: return { topic: "Basic Search & Sorting", keyTerms: ["Binary Search conditions", "Pivot selection", "Sorting stabilities", "In-place updates"] };
      case 7: return { topic: "Object-Oriented Programming (OOP) Basics", keyTerms: ["Encapsulation rules", "Polymorphism overrides", "Multiple Inheritance", "Interface contracts"] };
      case 8: return { topic: "Stacks & Queues (Linear Structures)", keyTerms: ["LIFO/FIFO buffers", "Monotonic Stacks", "Circular Queue structures", "Deque operations"] };
      case 9: return { topic: "Custom Hash Tables", keyTerms: ["Hash collision resolution", "Load factor thresholds", "Amortized buckets", "Consistent Hashing"] };
      case 10: return { topic: "Binary Trees & Recursive Traversals", keyTerms: ["DFS traversals", "In-order ordering", "Threaded trees", "Height balances"] };
      case 11: return { topic: "Binary Search Trees (BST) Basics", keyTerms: ["BST Property", "In-order successors", "BST Deletions", "Balanced BST limits"] };
      case 12: return { topic: "Graph Representations & BFS Traversal", keyTerms: ["Adjacency matrix comparison", "BFS queue levels", "Shortest path weights", "Bipartite graphs"] };
      case 13: return { topic: "Robust File I/O & Error Log Analysis", keyTerms: ["File descriptors", "Context manager loops", "Buffer sizes", "Concurrency conflicts"] };
      case 14: return { topic: "Process CPU Scheduling Simulation", keyTerms: ["Preemptive Round Robin", "Time Quantum latency", "Starvation rules", "Context switches"] };
      case 15: return { topic: "Introduction to Multi-threading", keyTerms: ["GIL limits", "Thread allocation", "Shared heap states", "Context overheads"] };
      case 16: return { topic: "Thread Synchronization & Locks", keyTerms: ["Mutex locking boundaries", "Deadlock conditions", "Reentrant locks", "Atomic increments"] };
      case 17: return { topic: "Caching Strategy: The FIFO Cache Simulator", keyTerms: ["Eviction rules", "Locality of reference", "Cache pollution", "Belady's anomaly"] };
      case 18: return { topic: "File Compression Basics (RLE)", keyTerms: ["RLE limitations", "Lossless calculations", "Data redundancy check", "Bit-level shifts"] };
      case 19: return { topic: "Low-Level Socket Programming Basics", keyTerms: ["TCP bind errors", "Socket buffers", "Listen backlog queues", "TIME_WAIT states"] };
      case 20: return { topic: "Handling Multiple Clients (Sequential Loop)", keyTerms: ["Blocking system calls", "Select/poll structures", "Concurrency threads", "Accept bottlenecks"] };
      case 21: return { topic: "The HTTP Protocol & Raw Web Server", keyTerms: ["CRLF parser details", "Content-Length headers", "HTTP/1.1 pipelining", "Status ranges"] };
      case 22: return { topic: "REST APIs & JSON Serialization", keyTerms: ["Statelessness", "Idempotent HTTP verbs", "Serialization performance", "REST API security"] };
      case 23: return { topic: "DNS Concept & IP Address Resolution", keyTerms: ["DNS caching TTL", "Recursive queries", "DNS UDP vs TCP", "Hosts override"] };
      case 24: return { topic: "Secure Communication: Hashing & Cryptography", keyTerms: ["SHA-256 collision safety", "Cryptographic salts", "Rainbow tables", "Key stretching"] };
      case 25: return { topic: "Relational Databases & SQL Basics", keyTerms: ["ACID transaction bounds", "Primary Key index", "SQL parser syntax", "Query planner"] };
      case 26: return { topic: "Database Relations & SQL Joins", keyTerms: ["Foreign Key constraints", "Hash vs Loop Join", "Many-to-many design", "Nullable joins"] };
      case 27: return { topic: "Database Indexing: Theoretical Concept", keyTerms: ["B+ Tree leaf nodes", "Clustered index rules", "Index scan speeds", "Composite index order"] };
      case 28: return { topic: "Simple Key-Value Disk Store", keyTerms: ["Write-ahead logs", "Memory compaction", "Buffer flush delays", "Crash consistency"] };
      case 29: return { topic: "System Architecture: The MVC Pattern", keyTerms: ["Decoupled state logic", "Controller boundaries", "Model storage rules", "View presentation"] };
      case 30: return { topic: "System Design: A Basic Rate Limiter", keyTerms: ["Token Bucket refills", "Distributed lock stores", "Throttling responses", "Sliding window log"] };
      default: return { topic: "Computer Science Foundations", keyTerms: ["Complexity", "Data Modeling", "Systems Design", "Thread safety"] };
    }
  };

  const info = getTopicInfo(dayNum);
  const companies = ["Google", "Amazon", "Microsoft", "Meta", "Adobe", "Netflix", "Uber", "Oracle", "Goldman Sachs", "ServiceNow"];
  const questions = [];

  const addQuestion = (q, type, difficulty, expected, explanation, whyAsk, mistakes, tags) => {
    questions.push({
      q,
      type,
      difficulty,
      expectedAnswer: expected,
      explanation,
      whyInterviewersAsk: whyAsk,
      commonMistakes: mistakes,
      companyTags: tags
    });
  };

  // Types map: Beginner, Intermediate, Advanced, Theory, Coding, Output Prediction, Scenario Based, Debugging, Follow-up, Behavioral
  
  // 1. Beginner Theory
  addQuestion(
    `Explain the concept of ${info.keyTerms[0]} and how it impacts the stability of a software architecture.`,
    "Theory", "Easy",
    `It defines the core rules managing memory, compilations, or states in ${info.topic}. It ensures predictability and correctness.`,
    `A detailed explanation covering memory limits, compiler check levels, and data structure constraints in the context of ${info.topic}.`,
    `To evaluate if the candidate has solid grasp of basic computer science systems instead of just memorizing frameworks.`,
    `Vague descriptions without referencing memory or execution flow.`,
    [companies[0], companies[2]]
  );

  // 2. Beginner Basic Concept
  addQuestion(
    `What is the primary difference between a static implementation and a dynamic implementation of ${info.keyTerms[1]}?`,
    "Beginner", "Easy",
    `Static allocates fixed sizes on the thread stack at compile time, whereas dynamic uses reference pointers to store content on the heap.`,
    `Stack allocations are highly fast but rigid. Heap allocations allow dynamic expansion but add garbage-collection or pointer redirection overhead.`,
    `To test the candidate's understanding of heap vs. stack memory and array allocation mechanisms.`,
    `Confusing compile-time allocations with run-time operations.`,
    [companies[1], companies[3]]
  );

  // 3. Intermediate Scenario
  addQuestion(
    `Scenario: A service at scale encounters latency spikes when initializing ${info.keyTerms[2]}. How do you fix this?`,
    "Scenario Based", "Medium",
    `Pre-allocate capacity or use pool allocators to prevent frequent resizing or dynamic reallocation.`,
    `By allocating the required capacity upfront, you bypass the expensive copying step (which runs in O(N) time) and secure continuous memory blocks.`,
    `To test real-world systems engineering knowledge and performance tuning skills.`,
    `Suggesting a hardware upgrade instead of fixing the software allocation bottlenecks.`,
    [companies[4], companies[5]]
  );

  // 4. Intermediate Coding
  addQuestion(
    `Coding: Implement a basic thread-safe wrapper or utility for ${info.keyTerms[3]}.`,
    "Coding", "Medium",
    `Use a mutex lock (or synchronize block) around write calls, while keeping read operations non-blocking if immutability is guaranteed.`,
    `Providing python code with threading.Lock() or Java synchronized blocks to prevent concurrent data races.`,
    `To see if the candidate can translate theory into safe, functional code.`,
    `Forgetting to release the lock in exceptions blocks (missing try/finally or with statements).`,
    [companies[6], companies[7]]
  );

  // 5. Intermediate Debugging
  addQuestion(
    `Debugging: Identify the bug in a recursive check where ${info.keyTerms[4]} causes a Stack Overflow error.`,
    "Debugging", "Medium",
    `The function lacks a valid base case or the input value does not progress toward it.`,
    `Show recursion loop traceback. Explain that without hit conditions, the call stack frame exceeds system limits.`,
    `To assess the candidate's tracking and debugging skills in call stack executions.`,
    `Guessing variables instead of tracing the call stack frames systematically.`,
    [companies[8], companies[9]]
  );

  // 6. Advanced System Design
  addQuestion(
    `Advanced: Explain how ${info.keyTerms[0]} handles garbage collection or memory cleanup.`,
    "Advanced", "Hard",
    `It uses reference counting or tracing sweeps (Mark-and-Sweep) to identify unreachable pointers and deallocate them.`,
    `Deep dive into reference counts, cycle references, and generational sweep pools.`,
    `To test advanced knowledge of systems and language runtime environments.`,
    `Simplistic answers like 'it just does it automatically'.`,
    [companies[0], companies[4], companies[9]]
  );

  // 7. Advanced Follow-up
  addQuestion(
    `Follow-up: How does the load factor of ${info.keyTerms[1]} impact search complexity, and how do we resolve it dynamically?`,
    "Follow-up", "Hard",
    `A high load factor increases collisions (degrading O(1) searches to O(N)). We resolve this by re-hashing elements into a larger table when threshold (e.g. 0.75) is hit.`,
    `Re-hashing requires allocating new memory, scanning all active keys, recalculating hashes, and inserting.`,
    `To test the limits of algorithmic performance and data structure boundaries.`,
    `Confusing load factor with simple array resizing checks.`,
    [companies[1], companies[2], companies[3]]
  );

  // 8. Theory: Memory Allocation
  addQuestion(
    `How does ${info.keyTerms[2]} affect cache locality compared to pointer-based structures?`,
    "Theory", "Medium",
    `Contiguous memory layouts load adjacent items into cache lines, maximizing L1/L2 cache hits (spatial locality), whereas pointer-linked nodes cause cache misses.`,
    `Details about CPU cash line size (usually 64 bytes) and memory pre-fetching in continuous layouts.`,
    `To check if the candidate understands hardware-software integration levels.`,
    `Ignoring the architectural difference between main RAM and CPU Cache.`,
    [companies[0], companies[5]]
  );

  // 9. Output Prediction
  addQuestion(
    `Output Prediction: What is printed when executing a function with enclosing variables under ${info.keyTerms[1]} scoping rules?`,
    "Output Prediction", "Medium",
    `Returns value based on local, then enclosing, then global scope resolution.`,
    `Explain the LEGB lookup sequence on a specific mock code snippet, showing what happens when a variable is modified inside a nested function without nonlocal/global flags.`,
    `To test exact compiler syntax and scope binding behaviors.`,
    `Confusing global variable definitions with enclosing closures.`,
    [companies[2], companies[3]]
  );

  // 10. Behavioral: System Outage
  addQuestion(
    `Behavioral: Tell me about a time you optimized a slow process. How did you identify ${info.keyTerms[0]} as the source, and how did you coordinate with the team?`,
    "Behavioral", "Medium",
    `I ran profiling tools (like cProfile/perf), identified the bottleneck in resource allocation, proposed a fix, and documented the performance improvements before deploying.`,
    `Focus on communication, analytics tools, risk mitigation, and team collaboration.`,
    `To evaluate problem-solving strategies, teamwork, and communication in technical settings.`,
    `Blaming others or lack of detailed metrics on performance differences.`,
    [companies[0], companies[1], companies[9]]
  );

  // Fill up to 15 questions
  for (let i = 11; i <= 15; i++) {
    const term = info.keyTerms[i % info.keyTerms.length];
    addQuestion(
      `Question ${i}: Analyze the edge cases of ${term} when handling null pointers or extreme bounds inputs.`,
      i % 2 === 0 ? "Scenario Based" : "Theory",
      i % 3 === 0 ? "Hard" : "Medium",
      `The program must include defensive guard checks (like if node is None) to prevent system crashes.`,
      `Explain the importance of validation guards at API and function entry points.`,
      `To evaluate if the candidate writes robust, defensive, production-ready code.`,
      `Skipping edge case analysis or assuming inputs are always valid.`,
      [companies[i % companies.length], companies[(i + 2) % companies.length]]
    );
  }

  return questions;
};
