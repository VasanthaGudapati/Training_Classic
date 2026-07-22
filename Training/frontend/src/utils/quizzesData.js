// Quizzes Database for Days 0 to 30
// Generates 35 quiz questions per day: 15 MCQs, 5 True/False, 5 Fill in the blanks, 5 Code Output, 5 Scenario Based.

export const getQuizzesForDay = (dayNum) => {
  const getTopicInfo = (day) => {
    switch (day) {
      case 0: return { topic: "CS Foundations & Roadmap", keyTerms: ["Roadmap", "Compilation", "Execution", "Operating Systems", "Networking", "Database"] };
      case 1: return { topic: "Variables, Flow Control & Functions", keyTerms: ["LEGB Scope", "Stack Frames", "Recursion Limit", "Control Flow", "Variables"] };
      case 2: return { topic: "Dynamic Arrays & Array Resizing", keyTerms: ["Amortized O(1)", "Contiguous Memory", "Capacity Doubling", "Memory Pointer"] };
      case 3: return { topic: "Strings & Substring Searching", keyTerms: ["Immutability", "Knuth-Morris-Pratt", "Sliding Window", "Unicode", "ASCII"] };
      case 4: return { topic: "Recursion & Complexity Basics (Big O)", keyTerms: ["Base Case", "Call Stack", "Logarithmic Time", "Factorial", "Fibonacci"] };
      case 5: return { topic: "Singly Linked Lists", keyTerms: ["Pointers", "Node Linking", "O(1) Head Insertion", "Null Reference"] };
      case 6: return { topic: "Basic Search & Sorting", keyTerms: ["Binary Search", "Bubble Sort", "Divide & Conquer", "Merge Sort"] };
      case 7: return { topic: "Object-Oriented Programming (OOP) Basics", keyTerms: ["Encapsulation", "Inheritance", "Polymorphism", "Abstraction", "Classes"] };
      case 8: return { topic: "Stacks & Queues (Linear Structures)", keyTerms: ["LIFO", "FIFO", "Call Stack", "Circular Buffer", "Deque"] };
      case 9: return { topic: "Custom Hash Tables", keyTerms: ["Hash Collision", "Chaining", "Linear Probing", "Load Factor", "Hash Function"] };
      case 10: return { topic: "Binary Trees & Recursive Traversals", keyTerms: ["DFS Traversals", "Pre-order", "In-order", "Post-order", "Leaf Nodes"] };
      case 11: return { topic: "Binary Search Trees (BST) Basics", keyTerms: ["O(log N)", "Left Child < Parent", "Right Child > Parent", "BST Search"] };
      case 12: return { topic: "Graph Representations & BFS Traversal", keyTerms: ["Adjacency List", "Breadth-First Search", "Queue Traversal", "Vertices", "Edges"] };
      case 13: return { topic: "Robust File I/O & Error Log Analysis", keyTerms: ["File Streams", "Resource Leak", "Context Managers", "Log Parsing"] };
      case 14: return { topic: "Process CPU Scheduling Simulation", keyTerms: ["First-Come First-Served", "Round Robin", "Time Quantum", "Preemption"] };
      case 15: return { topic: "Introduction to Multi-threading", keyTerms: ["Concurrency", "Context Switching", "GIL (Global Interpreter Lock)", "Thread Execution"] };
      case 16: return { topic: "Thread Synchronization & Locks", keyTerms: ["Race Conditions", "Mutex Locks", "Mutual Exclusion", "Deadlock"] };
      case 17: return { topic: "Caching Strategy: The FIFO Cache Simulator", keyTerms: ["FIFO Eviction", "Cache Hit/Miss", "Temporal Locality", "Page Replacement"] };
      case 18: return { topic: "File Compression Basics (RLE)", keyTerms: ["Run-Length Encoding", "Lossless Compression", "Data Redundancy", "Byte Savings"] };
      case 19: return { topic: "Low-Level Socket Programming Basics", keyTerms: ["TCP Sockets", "Bind State", "Port Numbers", "Three-Way Handshake"] };
      case 20: return { topic: "Handling Multiple Clients (Sequential Loop)", keyTerms: ["Accept Loop", "Blocking Calls", "Sequential Processing", "Client Queues"] };
      case 21: return { topic: "The HTTP Protocol & Raw Web Server", keyTerms: ["HTTP 1.1 Headers", "GET/POST Request", "Carriage Return Line Feed (CRLF)", "MIME Types"] };
      case 22: return { topic: "REST APIs & JSON Serialization", keyTerms: ["REST Constraints", "JSON Parsing", "HTTP Status Codes", "Serialization"] };
      case 23: return { topic: "DNS Concept & IP Address Resolution", keyTerms: ["Domain Name System", "IP Lookup", "Resolver", "Root Name Servers"] };
      case 24: return { topic: "Secure Communication: Hashing & Cryptography", keyTerms: ["SHA-256", "Salting", "One-way Hashing", "Cryptographic Salt"] };
      case 25: return { topic: "Relational Databases & SQL Basics", keyTerms: ["SQLite", "SELECT Filter", "Database Schemas", "Primary Key"] };
      case 26: return { topic: "Database Relations & SQL Joins", keyTerms: ["Foreign Key", "INNER JOIN", "Many-to-Many Relationships", "Data Integrity"] };
      case 27: return { topic: "Database Indexing: Theoretical Concept", keyTerms: ["B-Tree Indexes", "Binary Index Lookup", "Scan Performance", "Query Optimization"] };
      case 28: return { topic: "Simple Key-Value Disk Store", keyTerms: ["Disk Durability", "Key-Value Store", "Flat File Log", "Flush Buffer"] };
      case 29: return { topic: "System Architecture: The MVC Pattern", keyTerms: ["Model-View-Controller", "Decoupled Architecture", "Presenter Logic", "Application State"] };
      case 30: return { topic: "System Design: A Basic Rate Limiter", keyTerms: ["Token Bucket", "Rate Limiting Middleware", "DDoS Mitigation", "Leaky Bucket"] };
      default: return { topic: "Computer Science", keyTerms: ["Algorithm", "Data Structure", "Complexity", "System"] };
    }
  };

  const info = getTopicInfo(dayNum);
  const quizList = [];

  // Helper to generate a question
  const createQuestion = (id, type, qText, options, answerIdx, explanation) => ({
    id: `q_${dayNum}_${id}`,
    type,
    question: qText,
    options,
    answer: answerIdx,
    explanation
  });

  // 1. 15 MCQs
  for (let i = 1; i <= 15; i++) {
    const term = info.keyTerms[i % info.keyTerms.length];
    quizList.push(
      createQuestion(
        `mcq_${i}`,
        "MCQ",
        `Which of the following statements best describes the role of ${term} in computer science?`,
        [
          `It is a mechanism used exclusively to optimize cache performance in backend architectures.`,
          `It represents a core building block of ${info.topic} to structure and manage execution flow and resource states.`,
          `It is an obsolete paradigm replaced by modern AI-assisted compilers.`,
          `It provides cryptographic assurance of data integrity during multi-threaded processes.`
        ],
        1,
        `In ${info.topic}, ${term} plays a crucial role. It is designed to handle execution, organize states, or manage resources efficiently, making it a foundational concept.`
      )
    );
  }

  // 2. 5 True/False
  for (let i = 1; i <= 5; i++) {
    const term = info.keyTerms[i % info.keyTerms.length];
    const isTrue = i % 2 === 0;
    quizList.push(
      createQuestion(
        `tf_${i}`,
        "True/False",
        `True or False: In ${info.topic}, ${term} is strictly limited to compile-time analysis and has zero impact on runtime performance.`,
        ["True", "False"],
        isTrue ? 0 : 1,
        `This is ${isTrue ? "True" : "False"}. ${term} has dynamic runtime qualities that directly affect memory consumption, CPU execution speeds, and thread safety depending on execution contexts.`
      )
    );
  }

  // 3. 5 Fill in the blanks
  for (let i = 1; i <= 5; i++) {
    const term = info.keyTerms[i % info.keyTerms.length];
    quizList.push(
      createQuestion(
        `fitb_${i}`,
        "Fill in the blank",
        `In the context of ${info.topic}, the term __________ refers directly to the mechanism used for resolving ${term} operations and maintaining structural integrity.`,
        [term, "Abstraction", "Compilation", "Pointers"],
        0,
        `The correct answer is ${term}. It is the exact terminology used to address this operational behavior in standard CS curriculums.`
      )
    );
  }

  // 4. 5 Code Output Questions
  const codes = [
    `def process_data(val):\n    res = val * 2\n    return res\n\nprint(process_data(10))`,
    `let items = [1, 2, 3];\nitems.push(4);\nconsole.log(items.length);`,
    `def calc(n):\n    if n <= 1: return 1\n    return n * calc(n-1)\nprint(calc(3))`,
    `x = 5\ndef update():\n    global x\n    x = 10\nupdate()\nprint(x)`,
    `let val = "racecar";\nlet rev = val.split("").reverse().join("");\nconsole.log(val === rev);`
  ];
  const outputs = ["20", "4", "6", "10", "true"];
  for (let i = 1; i <= 5; i++) {
    quizList.push(
      createQuestion(
        `code_${i}`,
        "Code Output",
        `Predict the stdout output of the following code snippet related to ${info.topic}:\n\n${codes[i-1]}`,
        [outputs[i-1], "None", "Error", "Undefined"],
        0,
        `Evaluating the execution line by line shows that the result is computed as ${outputs[i-1]}, which matches standard language rules.`
      )
    );
  }

  // 5. 5 Scenario Based Questions
  for (let i = 1; i <= 5; i++) {
    const term = info.keyTerms[i % info.keyTerms.length];
    quizList.push(
      createQuestion(
        `scenario_${i}`,
        "Scenario",
        `You are designing an enterprise systems manager for a product-based platform. You discover a bottleneck caused by poor handling of ${term}. How would you refactor this to optimize latency?`,
        [
          `Replace the structure entirely with flat file logs on disk.`,
          `Wrap the critical block in a decoupled architecture and optimize data-store indexes to support fast memory lookups.`,
          `Increase the CPU clock rate of the virtual machine and ignore the algorithmic complexity.`,
          `Disable memory cache and force client sessions to rebuild the data model sequentially.`
        ],
        1,
        `Refactoring variables, sorting routines, thread boundaries, or database access layers is the best practice. Optimizing ${term} using appropriate collections and indices directly reduces time complexity.`
      )
    );
  }

  return quizList;
};
