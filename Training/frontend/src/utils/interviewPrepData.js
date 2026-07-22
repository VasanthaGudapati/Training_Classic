// Complete Interview Preparation and Guide Database
// Exposes company guidelines, core revision notes, flashcards, STAR templates, and engineering tips.

export const COMPANY_PREP_DATA = [
  {
    id: "google",
    name: "Google",
    difficulty: "Hard",
    process: "1. Online Assessment (2 coding questions, 90 mins)\n2. Technical Phone Screen (1-2 coding problems, focus on edge cases and complexity)\n3. Onsite Loop: 3 Coding Rounds (Algorithmic problem solving, data structures, scale), 1 System Design / LLD Round, 1 Googleyness & Leadership (behavioral).",
    topics: "Graphs (DFS, BFS, Dijkstra, MST), Dynamic Programming, Advanced Trees (Tries, Segment Trees), Sliding Window, Binary Search.",
    strategy: "Google highly prioritizes clean code, optimization steps, and mathematical proofs of time and space complexity. Always talk out loud and write unit tests for edge cases before finishing your solution. Avoid jumping directly to code; discuss alternative approaches (e.g. brute force vs. optimal) first.",
    faqs: [
      {
        q: "What level of coding optimization does Google expect?",
        a: "Google expects you to find the most optimal time and space complexity solution. An O(N^2) solution when an O(N log N) or O(N) solution exists will result in a lower score."
      },
      {
        q: "How important is the Googleyness round?",
        a: "Extremely important. Google uses this round to evaluate cultural fit, handling of bias, leadership capability, ambiguity resolution, and collaboration."
      }
    ]
  },
  {
    id: "amazon",
    name: "Amazon",
    difficulty: "Medium-Hard",
    process: "1. Online Assessment (Coding + Work Style Simulation)\n2. Technical Phone Screen (1 coding question + 15 mins Leadership Principles)\n3. Onsite Loop: 4-5 Rounds, each containing 20-30 mins of Leadership Principles (STAR method) followed by Coding, LLD, or System Design.",
    topics: "Trees, HashMaps, Heaps (Priority Queues), Backtracking, Object-Oriented Design (LLD), System Design.",
    strategy: "Amazon evaluates candidates heavily on their 16 Leadership Principles (e.g. Customer Obsession, Bias for Action, Ownership). Prepare 2 STAR-method stories for each principle. In coding, practice standard LeetCode Medium problems, especially design-heavy structures.",
    faqs: [
      {
        q: "Can I pass Amazon coding but fail due to Leadership Principles?",
        a: "Yes. Even a perfect coding performance will be rejected if the candidate fails to align with Amazon's Leadership Principles during the STAR interviews."
      },
      {
        q: "What is the focus of the LLD round at Amazon?",
        a: "To design a clean class hierarchy (e.g., Chess, Parking Lot, Movie Booking) using SOLID principles and design patterns like Factory or Strategy."
      }
    ]
  },
  {
    id: "microsoft",
    name: "Microsoft",
    difficulty: "Medium-Hard",
    process: "1. Online Test (Codility: 3 questions, 120 mins)\n2. Onsite Technical Rounds (3-4 rounds covering DSA, System Design, and Windows/Azure system internals if team-specific)\n3. AA (As Appropriate) Round: Final check on cultural alignment and technical depth.",
    topics: "Arrays, Strings, Linked Lists, Trees, Stacks/Queues, System Design, Operating Systems basics.",
    strategy: "Focus on classical data structures and logical puzzle solving. Microsoft interviewers appreciate developers who write robust production code with defensive checks (like null references or buffer overflow checks).",
    faqs: [
      {
        q: "How important is low-level operating system knowledge?",
        a: "It depends on the team (e.g., Azure or OS core requires deep knowledge), but basic OS memory layout (stack vs heap) and multithreading concepts are expected of all candidates."
      }
    ]
  },
  {
    id: "meta",
    name: "Meta",
    difficulty: "Hard",
    process: "1. Technical Phone Screen (2 coding questions, 45 mins)\n2. Onsite Loop: 2 Coding Rounds (2 questions in 45 mins each), 1 System Design (Product architecture), 1 Behavioral (PE - Behavioral & Collaboration).",
    topics: "Arrays, Strings, HashMaps, Binary Search, Two Pointers, BFS/DFS, Trees.",
    strategy: "Meta requires high speed. You must solve 2 coding questions in 45 minutes, including dry run, complexity explanation, and code writing. Speed-run standard LeetCode questions, focusing on optimal indexing and minimal boilerplate.",
    faqs: [
      {
        q: "What happens if I only solve 1 question during a Meta coding round?",
        a: "Unless the single question was highly complex, solving only 1 question usually results in a rejection. Meta looks for high speed and accuracy."
      }
    ]
  },
  {
    id: "apple",
    name: "Apple",
    difficulty: "Medium-Hard",
    process: "1. Technical Phone Screen (1 coding + basic CS theory)\n2. Onsite Loop: 4-5 rounds of coding, systems, and low-level details. Apple's process is highly team-specific.",
    topics: "Memory Management, Caching, Operating Systems (Concurrences, Mutex, Semaphores), Arrays, Strings.",
    strategy: "Apple focus is close to hardware integration. Understand L1/L2 caches, multi-threading, concurrency locks, and memory layouts. Show high passion for craftsmanship and product perfection.",
    faqs: [
      {
        q: "Is Apple's interview process standardized like Google's?",
        a: "No. Apple interviews are driven entirely by individual engineering teams, so the topics and structure vary significantly between divisions."
      }
    ]
  },
  {
    id: "netflix",
    name: "Netflix",
    difficulty: "Hard",
    process: "1. Technical Phone Screen (System design + coding)\n2. Onsite Loop: 2 Technical Architecture Rounds, 1-2 Coding Rounds, 2 Culture & Collaboration Rounds with Director/VP.",
    topics: "System Design, High Availability, Caching (Redis/Memcached), REST/gRPC APIs, Concurrency.",
    strategy: "Netflix values freedom and responsibility. Study high-throughput system architectures, Netflix open-source stacks (like Eureka or Hystrix), CDN designs, and have strong opinions on software delivery culture.",
    faqs: [
      {
        q: "What is Netflix's stance on cultural alignment?",
        a: "Netflix takes cultural fit extremely seriously. Read their culture memo thoroughly. They look for mature, self-driven developers who can coordinate large changes with minimal supervision."
      }
    ]
  },
  {
    id: "adobe",
    name: "Adobe",
    difficulty: "Medium-Hard",
    process: "1. Online Test (Coding + Aptitude)\n2. Onsite Loop: 2 Coding rounds, 1 Object-Oriented Design (LLD) round, 1 Managerial/Behavioral round.",
    topics: "Arrays, Linked Lists, Trees, Dynamic Programming, System Design.",
    strategy: "Focus on classical data structures and math-based algorithms. Ensure you are comfortable designing classes and class diagrams for desktop or cloud application systems.",
    faqs: [
      {
        q: "What topics are commonly asked in Adobe LLD rounds?",
        a: "Design patterns like Observer, Singleton, Decorator, and Factory. You will be asked to design components like a Text Editor or a Canvas Drawing tool."
      }
    ]
  },
  {
    id: "uber",
    name: "Uber",
    difficulty: "Hard",
    process: "1. Online Test (Coding on Codesignal)\n2. Technical Phone Screen (Algorithmic problem solving)\n3. Onsite Loop: 2 Coding Rounds, 1 Architecture/System Design (focused on concurrency and location services), 1 Uberyness (Behavioral).",
    topics: "Graphs (Dijkstra, A*), Concurrency, High-Concurrency Queues, Cache Ring, Databases.",
    strategy: "Uber systems handle massive real-time geospatial calculations. Study quadtrees, geohashing, consistent hashing, real-time streaming pipelines, and writing highly concurrent, thread-safe code.",
    faqs: [
      {
        q: "How important is system design for Uber?",
        a: "Extremely. Uber's system design rounds focus heavily on low-latency, real-time distributed updates, making concurrency and networking knowledge crucial."
      }
    ]
  },
  {
    id: "atlassian",
    name: "Atlassian",
    difficulty: "Medium-Hard",
    process: "1. Codility Coding assessment\n2. Interactive Phone Screen (usually system design or algorithmic problem solving)\n3. Onsite: 1 Coding round, 1 System Design, 1 Code Craft (refactoring code for clean SOLID style), 1 Values Fit round.",
    topics: "Design Patterns, Code Refactoring, Clean Code, API design, standard DSA.",
    strategy: "Atlassian values the 'Code Craft' round highly. You will be evaluated on test-driven development (TDD), clean variable naming, SOLID designs, and code readability rather than just getting the solution.",
    faqs: [
      {
        q: "What is Atlassian's Values Fit round?",
        a: "A behavioral interview evaluating alignment with Atlassian values like 'Don't #@!% the customer' and 'Play, as a team'."
      }
    ]
  },
  {
    id: "salesforce",
    name: "Salesforce",
    difficulty: "Medium-Hard",
    process: "1. Online Assessment\n2. Technical Phone Screen\n3. Onsite: 2 Algorithmic Coding rounds, 1 System Architecture / LLD round, 1 Managerial/Culture round.",
    topics: "Object-Oriented Design, Database schemas, API structures, Stacks/Queues, Trees.",
    strategy: "Focus on REST APIs, cloud databases, scaling transaction processing systems, and design patterns. Be prepared to explain how database locks and isolation levels behave.",
    faqs: [
      {
        q: "What is the focus of Salesforce architecture rounds?",
        a: "Designing scalable multi-tenant SaaS architectures, API rate limiting, and database caching patterns."
      }
    ]
  },
  {
    id: "servicenow",
    name: "ServiceNow",
    difficulty: "Medium",
    process: "1. Online coding test\n2. Technical Interview 1 (Java/JS coding + database fundamentals)\n3. Technical Interview 2 (System Design / LLD + REST APIs)\n4. Hiring Manager Loop.",
    topics: "Data Structures, Database Normalization, Indexing, Web Protocols, JavaScript internals.",
    strategy: "Practice standard relational database designs, SQL queries, indexing optimizations, and JavaScript event loops. ServiceNow builds enterprise workflow software, so API design is highly valued.",
    faqs: [
      {
        q: "How deep do they quiz on JavaScript/Java?",
        a: "Quite deep. They expect good knowledge of JVM performance parameters, garbage collection, and JS event-loop concurrency."
      }
    ]
  },
  {
    id: "oracle",
    name: "Oracle",
    difficulty: "Medium-Hard",
    process: "1. Online coding assessment\n2. Technical Round 1 (Data structures & recursion)\n3. Technical Round 2 (Database internals, indexing, SQL queries)\n4. Technical Round 3 (System design & cloud architecture).",
    topics: "Trees, DBMS, Transaction locks, ACID compliance, Networks, Operating Systems.",
    strategy: "Oracle builds DBMS and cloud infrastructure. Study database engines, transaction locks, file systems, disk pre-fetching, and standard computer science networking protocols.",
    faqs: [
      {
        q: "What DBMS questions are common?",
        a: "Indexing physics (B+ Tree vs hash index), transaction isolation levels (dirty reads, phantom reads), and SQL join execution algorithms (Hash vs Loop)."
      }
    ]
  }
];

export const FLASH_CARDS = [
  {
    id: "fc1",
    category: "OOP",
    question: "What is the Liskov Substitution Principle (LSP)?",
    answer: "Subclasses must be substitutable for their base classes without altering the correctness of the program. If Class B extends Class A, any code expecting Class A must function perfectly when passed an instance of Class B."
  },
  {
    id: "fc2",
    category: "DSA",
    question: "What is the time complexity of QuickSort in the worst case and how do you optimize it?",
    answer: "Worst case is O(N^2) which occurs when the pivot splits the array into sizes 0 and N-1 (e.g. sorted arrays with first/last pivot selection). Optimize by choosing a random pivot or the median-of-three, bringing average complexity to O(N log N)."
  },
  {
    id: "fc3",
    category: "OS",
    question: "What is the difference between a Mutex and a Binary Semaphore?",
    answer: "Ownership. A Mutex is owned by the thread that locks it, and only that thread can unlock it. A Binary Semaphore does not have ownership; any thread can trigger a release signal to unlock it."
  },
  {
    id: "fc4",
    category: "DBMS",
    question: "What is a Clustered Index?",
    answer: "A clustered index determines the physical order of data rows in a table. Because rows can only be stored in one order, a table can have only one clustered index (usually the Primary Key)."
  },
  {
    id: "fc5",
    category: "CN",
    question: "Explain the TCP 3-Way Handshake.",
    answer: "1. SYN: Client sends Synchronize packet to server. 2. SYN-ACK: Server responds with Synchronize-Acknowledgment packet. 3. ACK: Client sends Acknowledgment packet. Connection is established."
  },
  {
    id: "fc6",
    category: "System Design",
    question: "What is the role of a Load Balancer?",
    answer: "A load balancer distributes incoming network traffic across a cluster of servers to prevent single points of overload, increase availability, and ensure horizontal scalability."
  },
  {
    id: "fc7",
    category: "Programming",
    question: "What is a Closure in JavaScript?",
    answer: "A closure is a function that retains access to its outer lexical scope variables even after the outer function has returned. It is stored on the heap to preserve state."
  },
  {
    id: "fc8",
    category: "Backend",
    question: "What makes an HTTP method 'idempotent'?",
    answer: "An HTTP method is idempotent if executing it multiple times leaves the system in the exact same state as the first call. GET, PUT, and DELETE are idempotent; POST is not."
  }
];

export const REVISION_NOTES = [
  {
    title: "Programming & OOP Cheat Sheet",
    content: "• Heap vs Stack: Stack manages fast LIFO local variable frames; Heap manages dynamic objects.\n• OOP Pillars: Encapsulation (hide states via variables), Abstraction (expose interfaces), Inheritance (reuse codes), Polymorphism (vtables/overrides).\n• SOLID: SRP (one reason to change), OCP (open for extension, closed for modification), LSP (subclass substitutability), ISP (small interfaces), DIP (depend on abstractions)."
  },
  {
    title: "Data Structures & Algorithms (DSA) Cheat Sheet",
    content: "• Search: Binary Search O(log N) requires sorted arrays. Don't overflow: mid = L + (R-L)/2.\n• Trees: BST properties: Left < Root < Right. Balance is key to guarantee O(log N) searches.\n• Graph: BFS (Queue, shortest path), DFS (Stack/recursion, cycle detection). Complexity: O(V + E).\n• Hash Map: O(1) average lookup. Resizes and rehashes at load factor thresholds (typically 0.75)."
  },
  {
    title: "Operating Systems (OS) Cheat Sheet",
    content: "• Processes vs Threads: Process has its own address space; threads share heap but have private stacks.\n• Deadlock Conditions: Mutual Exclusion, Hold & Wait, No Preemption, Circular Wait.\n• Scheduling: Round Robin (preemptive, time slice), SJF (minimal waiting time, starves long jobs)."
  },
  {
    title: "Databases (DBMS) Cheat Sheet",
    content: "• ACID: Atomicity (all-or-nothing), Consistency (schema rules), Isolation (concurrency control), Durability (written to disk).\n• B+ Trees: High branching factor, stores values in leaf nodes connected by double links. Excellent for range queries.\n• Joins: Hash Join builds hash table of small table. Merge Join merges pre-sorted tables. Nested Loop scans inner for each outer."
  },
  {
    title: "Networking & System Design Cheat Sheet",
    content: "• Protocols: TCP (connection-oriented, reliable, flow control); UDP (connectionless, fast, video/DNS).\n• CAP Theorem: distributed databases choose between Consistency (CP) or Availability (AP) under network partitions.\n• Rate Limiting: Token Bucket (allows bursts) vs. Leaking Bucket (smooths traffic at constant rate)."
  }
];

export const STAR_GUIDE = {
  method: "STAR Method (Situation, Task, Action, Result)",
  description: "Product-based companies (especially Amazon) use the STAR method to evaluate behavioral questions. Structure your answers following this breakdown to provide a clear, measurable story.",
  steps: [
    {
      name: "Situation",
      desc: "Set the context of the story. Detail the project, timeline, and stakes involved. Keep it under 2-3 sentences."
    },
    {
      name: "Task",
      desc: "Define the specific challenge or bottleneck you had to address. What was your personal responsibility?"
    },
    {
      name: "Action",
      desc: "Explain the technical and interpersonal actions you took. Detail the tools, algorithms, refactorings, or communication strategies you implemented. This should be 60% of your answer."
    },
    {
      name: "Result",
      desc: "Provide the quantitative outcome of your action. Did latency drop? Did API throughput double? Use percentages, timelines, and measurable values."
    }
  ],
  example: {
    question: "Behavioral: Describe a time you optimized a slow system component.",
    situation: "Our video processing service was taking 8 seconds to parse media metadata under high concurrent uploads, causing CPU usage to spike to 95%.",
    task: "I was assigned to decrease latency below 2 seconds and reduce CPU load to prevent server crashes.",
    action: "I profiled the Node.js server using flame graphs and found that the JSON parser was blocking the main thread inside a loop. I refactored the pipeline to execute the parsing inside an asynchronous worker pool using node-worker-threads, bypassing event-loop blocks. I also added a Redis caching layer for recurring file metadata tags.",
    result: "Average metadata parsing latency dropped from 8 seconds to 1.1 seconds (an 86% reduction), and CPU spikes were capped at 40% under peak load, saving $12,000 in monthly server scaling costs."
  }
};

export const TIPS_DATA = {
  coding: [
    "Speak out loud: Explain your thinking process clearly. Interviewers grade your thought flow, not just your code.",
    "Discuss constraints: Ask for the input scale (e.g. N <= 10^5) to determine if O(N^2) or O(N log N) is expected.",
    "Start with brute force: Propose a simple solution first to establish a baseline, then outline your optimized path.",
    "Verify edge cases: Check empty inputs, single element arrays, duplicate elements, negative numbers, and integer overflows.",
    "Dry run: Walk through your code with a small sample input before telling the interviewer you are done."
  ],
  machine: [
    "Clarify requirements first: Identify all models, interfaces, and API contracts before writing classes.",
    "Use SOLID principles: Ensure classes have a single responsibility and interfaces are segregated.",
    "Include Unit Tests: Write basic unit tests or print statements checking core operations.",
    "Keep it buildable: Ensure code compiles without syntax bugs. Better to have a simple working system than a complex broken one.",
    "Handle exceptions: Implement defensive check guards and catch standard exceptions."
  ],
  design: [
    "Start high-level: Sketch the clients, load balancers, API gateways, app servers, and databases before diving into details.",
    "Do back-of-the-envelope estimations: Calculate traffic (RPS), storage requirements, and bandwith bounds.",
    "Pick the right database: Justify NoSQL (key-value, document) vs Relational (SQL) based on scale and integrity constraints.",
    "Explain bottlenecks: Address single points of failure, database replication lag, cache invalidation, and rate limiting.",
    "Trade-offs: Always explain the cost of your design choices (e.g. eventual consistency vs high latency)."
  ],
  resume: [
    "Use the Google X-Y-Z formula: 'Accomplished [X] as measured by [Y], by doing [Z]'.",
    "List measurable achievements: 'Reduced page load time by 40% by implementing lazy loading and bundle compression.'",
    "Tailor key skills: Place core languages (Python, Java, JS) and systems (SQL, Redis, Docker) at the top.",
    "Keep it to 1 page: Limit bullet points and focus on high-impact projects. Use clean markdown formatting.",
    "Link active profiles: Link your GitHub, LinkedIn, and portfolio page at the top."
  ],
  comm: [
    "Be structured: Use bullet points and numbered lists when explaining complex systems.",
    "Acknowledge gaps: If you don't know a concept, admit it and explain how you would search for the solution.",
    "Listen actively: Pay attention to hints. If an interviewer directs you away from an approach, they are trying to help.",
    "Collaborative mindset: Frame discussions as pair-programming with a colleague, not as a test.",
    "Summarize at the end: Give a 1-minute wrap-up of your solution and the tradeoffs you selected."
  ]
};
