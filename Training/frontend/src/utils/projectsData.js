// Projects blueprints database. Recommendations for 3 Beginner, 3 Intermediate, and 2 Advanced projects per lesson.
// Includes full details for core buildable projects to support the in-app buildable project workbench.

export const BUILDABLE_PROJECTS = [
  {
    projectId: "proj_day1_1",
    day: 1,
    title: "Dynamic High Score Tracker",
    difficulty: "Beginner",
    estimatedTime: "3 Hours",
    prerequisites: "Variables, basic scope, arithmetic operators, and file operations",
    objective: "Build an interactive command-line gaming dashboard that tracks student high scores, calculates rankings, and handles persistent score records in a text file.",
    requiredConcepts: ["File operations", "Enclosing closures", "Input validation", "LEGB Scope"],
    folderStructure: "src/\n├── main.py            # Entrypoint and input loops\n└── database.txt       # Raw score logs file",
    architectureDiagram: "User Input -> input verification loop -> score manager closure (local/enclosing) -> append database.txt -> read & compute statistics",
    databaseDesign: "Raw text file database.txt where each line stores score: 'player_name:score:timestamp'",
    uiMockup: "========================================\n GAME HIGH SCORE TRACKER (CLI Dashboard)\n========================================\n1. Add New Score\n2. View Leaderboard\n3. Exit\nSelection: _",
    implementationGuide: [
      {
        title: "Initialize Project Files",
        desc: "Create main.py and register the symbol table variables.",
        code: "# main.py\nscores = {}\ndef load_scores():\n    pass"
      },
      {
        title: "Develop the Score Manager Closure",
        desc: "Create a closure function that encapsulates scores dictionary to demonstrate Enclosing (E) scope safety.",
        code: "def make_score_keeper():\n    local_scores = {}\n    def keep(name, score):\n        local_scores[name] = score\n        return local_scores\n    return keep"
      },
      {
        title: "Implement File Persistence",
        desc: "Add reading and writing loops to persist database.txt.",
        code: "def save_scores(scores_dict):\n    with open('database.txt', 'w') as f:\n        for k, v in scores_dict.items():\n            f.write(f'{k}:{v}\\n')"
      }
    ],
    extensionIdeas: ["Add a CLI parameter parser", "Sort players by ranking score"],
    bonusFeatures: ["Multi-game score directories", "Colorized console outputs"],
    commonMistakes: ["Using global scores directly inside local scopes causing UnboundLocalError.", "Not closing the file descriptor (use context managers)."],
    deploymentGuide: "Run locally in Python sandbox. No external package dependencies.",
    testingStrategy: "Run automated inputs via subprocess simulation to verify rankings are correctly computed.",
    gitHubBestPractices: "Ignore local temporary database.txt files in .gitignore. Commit clean main.py with comprehensive docstrings."
  },
  {
    projectId: "proj_day2_1",
    day: 2,
    title: "Custom Dynamic List Builder",
    difficulty: "Intermediate",
    estimatedTime: "6 Hours",
    prerequisites: "Dynamic Array Resizing, Heap Allocation concepts",
    objective: "Implement a custom DynamicArray class in Python from scratch mimicking list internals with automatic resizing, amortization calculations, and shifting indexes.",
    requiredConcepts: ["Memory Address Arithmetic", "Amortized Complexity", "Array Shifting"],
    folderStructure: "src/\n└── dynamic_array.py   # Custom class and validation tests",
    architectureDiagram: "User append -> capacity check -> resize if full (alloc larger list, copy, redirect pointer) -> write element",
    databaseDesign: "None. In-memory data structures.",
    uiMockup: "--- CUSTOM DYNAMIC ARRAY VISUALIZER ---\nCapacity: 4 | Size: 3\n[Element 1, Element 2, Element 3, <Unallocated>]",
    implementationGuide: [
      {
        title: "Implement Class Constructor",
        desc: "Build constructor initializing size, capacity, and an internal raw list of fixed capacity.",
        code: "class DynamicArray:\n    def __init__(self):\n        self.size = 0\n        self.capacity = 2\n        self.array = [None] * self.capacity"
      },
      {
        title: "Add Append & Resize methods",
        desc: "Create append and helper resize methods that double capacity.",
        code: "    def append(self, val):\n        if self.size == self.capacity:\n            self._resize(self.capacity * 2)\n        self.array[self.size] = val\n        self.size += 1"
      },
      {
        title: "Implement Remove At Index method",
        desc: "Write remove_at(idx) that shifts all subsequent elements to the left to maintain contiguity.",
        code: "    def remove_at(self, index):\n        # Shift entries left\n        pass"
      }
    ],
    extensionIdeas: ["Shrink list when size drops below 25% of capacity.", "Implement index slicing [start:end]."],
    bonusFeatures: ["Custom iterator support", "Memory usage reporter"],
    commonMistakes: ["Resizing by a fixed size (e.g. capacity += 10) instead of multiplying, which breaks amortized O(1) complexity.", "Forgetting bounds checks in index queries."],
    deploymentGuide: "Package as a reusable helper module for your DSA practice collections.",
    testingStrategy: "Perform unit tests comparing output arrays with built-in list operations.",
    gitHubBestPractices: "Document complexity on every method signature. Write a descriptive README explaining growth factors."
  },
  {
    projectId: "proj_day7_1",
    day: 7,
    title: "OOP Banking Ledger System",
    difficulty: "Beginner",
    estimatedTime: "4 Hours",
    prerequisites: "OOP principles (Encapsulation, Inheritance)",
    objective: "Create an object-oriented ledger application with BankAccount classes, Savings accounts with interest calculations, and transaction records.",
    requiredConcepts: ["Encapsulation", "Polymorphism", "Inheritance", "Getters/Setters"],
    folderStructure: "src/\n└── banking.py         # OOP Classes and driver code",
    architectureDiagram: "Base Class (BankAccount) -> Inherited Class (SavingsAccount) with override apply_interest() -> Ledger log entries",
    databaseDesign: "None. Stores transaction history in an internal array of Ledger entries.",
    uiMockup: "========================================\n   SECURE BANKING LEDGER ACCOUNT STATE  \n========================================\nAccount Holder: Alice | Balance: $1,250.00\n[Transaction History: +$1,000, +$300, -$50]",
    implementationGuide: [
      {
        title: "Define BankAccount Class",
        desc: "Develop base account class with private balance variables and protected transaction logs.",
        code: "class BankAccount:\n    def __init__(self, owner, balance=0.0):\n        self._owner = owner\n        self._balance = balance\n        self.transactions = []"
      },
      {
        title: "Polymorphic Inherited Subclasses",
        desc: "Create SavingsAccount overriding monthly transaction settlements.",
        code: "class SavingsAccount(BankAccount):\n    def __init__(self, owner, balance=0.0, interest_rate=0.02):\n        super().__init__(owner, balance)\n        self.rate = interest_rate"
      }
    ],
    extensionIdeas: ["Add checking accounts with transaction fee deductions", "Implement CSV transfer reports"],
    bonusFeatures: ["Secure PIN authentication layer", "PDF transaction statements"],
    commonMistakes: ["Directly modifying self._balance from outside the class (always route through getters/setters)."],
    deploymentGuide: "Can be run via CLI loop interface.",
    testingStrategy: "Simulate a sequence of withdrawals and interest updates, validating expected mathematical balances.",
    gitHubBestPractices: "Write comprehensive unit tests under a separate tests/ folder. Keep classes modular."
  },
  {
    projectId: "proj_day16_1",
    day: 16,
    title: "Concurrent Inventory Ledger",
    difficulty: "Advanced",
    estimatedTime: "8 Hours",
    prerequisites: "Multi-threading, Race condition simulations, Mutexes",
    objective: "Simulate an e-commerce stock checkout system where 10 concurrent threads attempt to purchase items from a limited inventory, utilizing Lock synchronization to avoid data race double-allocations.",
    requiredConcepts: ["Race Conditions", "Mutex Locks", "Thread Pool execution"],
    folderStructure: "src/\n└── inventory_sim.py   # Multi-threaded purchase checker",
    architectureDiagram: "Inventory DB -> Mutex Lock -> Thread Checkout workers check stock -> deduct count -> release Mutex",
    databaseDesign: "In-memory stock dictionaries: {'item_id': 100, 'stock': 5}",
    uiMockup: "Active Threads Check:\n[Thread 1] Purchasing item_101... SUCCESS!\n[Thread 2] Purchasing item_101... DENIED (Stock 0)",
    implementationGuide: [
      {
        title: "Model Race Condition without Locks",
        desc: "Write checkout workers that sleep briefly before modifying stock, demonstrating inventory over-selling.",
        code: "def purchase(item_id):\n    # Read stock, sleep, deduct\n    pass"
      },
      {
        title: "Introduce Threading Lock",
        desc: "Implement a threading lock context to synchronize access to the critical stock database dictionary.",
        code: "import threading\nlock = threading.Lock()\ndef secure_purchase(item_id):\n    with lock:\n        # Secure critical section\n        pass"
      }
    ],
    extensionIdeas: ["Implement read-write locks for higher concurrency", "Simulate distributed lock via SQLite transactional integrity"],
    bonusFeatures: ["Animated console progress logs", "Detailed deadlock simulator demonstration"],
    commonMistakes: ["Holding locks during long network/I/O requests causing low throughput.", "Not unlocking inside exception blocks (always use with lock context)."],
    deploymentGuide: "Run local thread worker loops in console.",
    testingStrategy: "Run with 100 threads on stock of 10. Verify final stock is exactly 0 and no double-checkout logs are emitted.",
    gitHubBestPractices: "Provide details on how lock contentions impact threading CPU scaling inside the documentation."
  },
  {
    projectId: "proj_day21_1",
    day: 21,
    title: "Raw HTTP Static Server",
    difficulty: "Intermediate",
    estimatedTime: "7 Hours",
    prerequisites: "Day 19-20 Sockets",
    objective: "Build a raw socket-based web server that listens for browser HTTP requests, parses headers, matches filesystem paths, and writes valid HTML responses.",
    requiredConcepts: ["TCP Sockets", "HTTP Status codes", "Header parsing", "MIME types"],
    folderStructure: "src/\n├── server.py          # Socket listener server\n└── public/\n    ├── index.html     # Web dashboard file\n    └── 404.html       # Fallback error page",
    architectureDiagram: "Browser GET -> TCP Socket port 8080 -> parse request bytes -> read file from public/ -> compose HTTP headers -> send bytes to socket",
    databaseDesign: "Local directory files are used as the database storage references.",
    uiMockup: "http://localhost:8080/\n----------------------------------------\n[ Welcome to Raw Server Web Page! ]\nServed file index.html safely in 3.4ms.",
    implementationGuide: [
      {
        title: "Create Listening Socket",
        desc: "Bind server socket on local interface and listen for incoming TCP descriptors.",
        code: "import socket\ns = socket.socket(socket.AF_INET, socket.SOCK_STREAM)\ns.bind(('localhost', 8080))\ns.listen(5)"
      },
      {
        title: "Header Router",
        desc: "Parse browser GET requests, extraction target file path, and prepare headers.",
        code: "def parse_req(raw_bytes):\n    # Extract path\n    return path"
      },
      {
        title: "Stream Response Output",
        desc: "Serve content with HTTP status envelopes. Handle missing paths with 404 response.",
        code: "response = 'HTTP/1.1 200 OK\\r\\nContent-Type: text/html\\r\\n\\r\\n' + file_data"
      }
    ],
    extensionIdeas: ["Add a keep-alive persistent connection handler", "Implement multi-threaded connection handling"],
    bonusFeatures: ["Supports static CSS assets", "Dynamic query parameters handling"],
    commonMistakes: ["Forgetting double carriage-return newline (\\r\\n\\r\\n) between HTTP headers and response body, resulting in blank pages."],
    deploymentGuide: "Run locally, then open browser at http://localhost:8080.",
    testingStrategy: "Use curl tool in console to evaluate raw response headers and status codes.",
    gitHubBestPractices: "Make public/ directory clean. Separate routing scripts from socket listener code."
  },
  {
    projectId: "proj_day30_1",
    day: 30,
    title: "APIs Rate Limiting Gateway",
    difficulty: "Advanced",
    estimatedTime: "10 Hours",
    prerequisites: "Systems Design, Caching, Date-time math",
    objective: "Create a fully functional Rate Limiter API middleware implementing the Token Bucket algorithm to protect backend resources from denial-of-service query flooding.",
    requiredConcepts: ["Token Bucket", "Traffic shaping", "API routing middlewares", "Thread-safe intervals"],
    folderStructure: "src/\n├── gateway.py         # Main rate limiting module\n└── test_gateway.py    # Test suite queries simulator",
    architectureDiagram: "API request -> check client IP -> fetch token bucket -> refill tokens based on elapsed time -> allow request (tokens - 1) or return 429 Too Many Requests",
    databaseDesign: "None. Keeps bucket states in-memory with client IP keys.",
    uiMockup: "Client IP: 192.168.1.10 | Limit Check:\nRequest 1..5: SUCCESS (200 OK)\nRequest 6: EXCEEDED (429 Too Many Requests)",
    implementationGuide: [
      {
        title: "Define TokenBucket class",
        desc: "Develop token bucket state tracker containing last refill time, capacity, and current tokens count.",
        code: "class TokenBucket:\n    def __init__(self, capacity, fill_rate):\n        self.capacity = capacity\n        self.fill_rate = fill_rate\n        self.tokens = capacity\n        self.last_update = time.time()"
      },
      {
        title: "Implement Check & Refill",
        desc: "Deduct tokens, fill bucket dynamically based on system time calculations.",
        code: "    def allow(self):\n        now = time.time()\n        elapsed = now - self.last_update\n        self.tokens = min(self.capacity, self.tokens + elapsed * self.fill_rate)\n        self.last_update = now\n        if self.tokens >= 1:\n            self.tokens -= 1\n            return True\n        return False"
      }
    ],
    extensionIdeas: ["Scale client database storage to local SQLite or Redis database.", "Support custom limits per routing endpoint."],
    bonusFeatures: ["Leaky Bucket algorithm implementation fallback", "IP Whitelist directories"],
    commonMistakes: ["Running refill updates on background thread timer loops, creating high memory overhead. Instead, calculate refill dynamically on request receipt (lazy evaluation)."],
    deploymentGuide: "Mount as middleware inside FastAPI or serve as a standalone CLI reverse-proxy wrapper.",
    testingStrategy: "Simulate 20 rapid calls from one IP address. Check that exactly 5 calls are permitted (capacity) and subsequent are rejected with rate limiting status.",
    gitHubBestPractices: "Keep algorithms decouple from routing controllers. Write extensive test configurations."
  }
];

export const getRecommendedProjectsForDay = (dayNum) => {
  const categories = [
    { title: "Foundations", path: "Programming Foundations" },
    { title: "OOP & DSA", path: "Object Oriented Programming & Data Structures" },
    { title: "OS & Systems", path: "Operating Systems" },
    { title: "Networks", path: "Computer Networks" },
    { title: "Databases", path: "Databases & Design" }
  ];
  
  const activeCategory = categories[Math.min(Math.floor((dayNum - 1) / 6), 4)];
  
  const beginnerProjects = [
    { title: `Local Concept Validator (Day ${dayNum})`, time: "2 Hours", xp: "100 XP" },
    { title: `Interactive CLI Sandbox (Day ${dayNum})`, time: "3 Hours", xp: "150 XP" },
    { title: `File Logger & Reporter (Day ${dayNum})`, time: "4 Hours", xp: "200 XP" }
  ];
  const intermediateProjects = [
    { title: `Module Controller System (Day ${dayNum})`, time: "6 Hours", xp: "300 XP" },
    { title: `Decoupled Logic Simulator (Day ${dayNum})`, time: "8 Hours", xp: "400 XP" },
    { title: `Raw System Interface (Day ${dayNum})`, time: "7 Hours", xp: "350 XP" }
  ];
  const advancedProjects = [
    { title: `Distributed Cloud Gateway (Day ${dayNum})`, time: "12 Hours", xp: "600 XP" },
    { title: `Scalable Micro-service Engine (Day ${dayNum})`, time: "15 Hours", xp: "800 XP" }
  ];
  
  const result = [];
  
  // 1. Beginner Projects
  beginnerProjects.forEach((proj, idx) => {
    result.push({
      projectId: `day_${dayNum}_beg_${idx + 1}`,
      day: dayNum,
      title: proj.title,
      difficulty: "Beginner",
      estimatedTime: proj.time,
      xp: proj.xp,
      prerequisites: `Basic Day ${dayNum} curriculum concepts, variables, and loops`,
      objective: `Create a standalone beginner module evaluating ${activeCategory.title} Day ${dayNum} logic.`,
      requiredConcepts: [`${activeCategory.title} basics`, "Formatting output", "Data structure instantiation"],
      folderStructure: "src/\n└── solver.py          # Code logic parser",
      architectureDiagram: "Console Input -> parser logic -> print formatted results in output log",
      databaseDesign: "None. In-memory data collections.",
      uiMockup: "========================================\n       CLI BEGINNER PROJECT WORKSPACE   \n========================================\nOutput: [Status Running...]\nComputation completed successfully.",
      implementationGuide: [
        { title: "Initialize variables", desc: "Define entry structures.", code: "# Day " + dayNum + " Beginner code starter" },
        { title: "Logic processor", desc: "Build loops matching concepts.", code: "def run_process(): pass" }
      ],
      extensionIdeas: ["Optimize memory footprint.", "Support CSV export logs."],
      bonusFeatures: ["Colorized console display"],
      commonMistakes: ["Incorrect type casting in user inputs."],
      deploymentGuide: "Execute directly in local Python/JS runtime environment.",
      testingStrategy: "Use assert expressions to evaluate expected outputs.",
      gitHubBestPractices: "Commit clean modular functions. Avoid large nested branches."
    });
  });
  
  // 2. Intermediate Projects
  intermediateProjects.forEach((proj, idx) => {
    result.push({
      projectId: `day_${dayNum}_int_${idx + 1}`,
      day: dayNum,
      title: proj.title,
      difficulty: "Intermediate",
      estimatedTime: proj.time,
      xp: proj.xp,
      prerequisites: `Day ${dayNum} core structures, basic file parsing, and error checks`,
      objective: `Develop a comprehensive intermediate modular system implementing ${activeCategory.title} logic.`,
      requiredConcepts: ["Object modeling", "Class separation", "Decoupled logic architecture"],
      folderStructure: "src/\n├── core_logic.py      # Main controller logic\n└── driver.py          # CLI runner and input validation",
      architectureDiagram: "Driver script -> instance calls on Core Logic module -> output streams",
      databaseDesign: "None. In-memory buffers.",
      uiMockup: "========================================\n       INTERMEDIATE MODULAR WORKSPACE    \n========================================\nLoading core_logic.py... DONE\nRunning system loop...\nStatus: Active.",
      implementationGuide: [
        { title: "Class Definition", desc: "Create classes modeling concepts.", code: "class CoreController:\n    def __init__(self): pass" },
        { title: "File Reader Wrapper", desc: "Add robust exception catching stream loaders.", code: "def load_file(path):\n    try: pass\n    except Exception: pass" }
      ],
      extensionIdeas: ["Implement multi-client session handling.", "Optimize algorithmic bottlenecks."],
      bonusFeatures: ["Save config configurations to JSON configuration files"],
      commonMistakes: ["Weak variable boundary checks causing index overflows."],
      deploymentGuide: "Mount inside parent workspace directory folder.",
      testingStrategy: "Write unit tests evaluating edge cases (Empty inputs, missing assets).",
      gitHubBestPractices: "Provide inline comments explaining non-trivial logic blocks."
    });
  });
  
  // 3. Advanced Projects
  advancedProjects.forEach((proj, idx) => {
    result.push({
      projectId: `day_${dayNum}_adv_${idx + 1}`,
      day: dayNum,
      title: proj.title,
      difficulty: "Advanced",
      estimatedTime: proj.time,
      xp: proj.xp,
      prerequisites: `Day ${dayNum} advanced curriculum, OOP layers, Sockets, and relational database joins`,
      objective: `Engineer a high-throughput, enterprise-ready systems architecture module demonstrating deep mastery of Day ${dayNum} curriculum.`,
      requiredConcepts: ["Distributed systems design", "Multi-threading / Async execution", "SQL schema modeling", "Resource isolation"],
      folderStructure: "src/\n├── models/            # Relational database models\n├── controllers/       # Main execution threads\n└── gateway.py         # Entrypoint micro-service router",
      architectureDiagram: "Gateway requests -> Router -> Spawns thread workers -> DB queries -> Transaction commits -> response streams",
      databaseDesign: "SQL schema: Tabular relationships linking logs with users, foreign key constraints.",
      uiMockup: "========================================\n        ADVANCED DISTRIBUTED GATEWAY    \n========================================\nThread Workers: [Pool Size 8] | Active: 2\nGateway Status: Running on port 9090...",
      implementationGuide: [
        { title: "Define Database Models", desc: "Build relational SQL structures.", code: "# Database ORM schema script" },
        { title: "Multi-threaded Worker Manager", desc: "Develop connection threads pools to allocate memory ranges safely.", code: "import concurrent.futures\ndef spawn_pool():\n    pass" }
      ],
      extensionIdeas: ["Integrate Redis container caching layers.", "Add secure authentication token checks."],
      bonusFeatures: ["Detailed telemetry metrics dashboards dashboard", "Fail-safe recovery fallback routines"],
      commonMistakes: ["Ignoring thread safety when modifying shared database connections.", "Holding transactional commits open too long."],
      deploymentGuide: "Deploy container image, mount volumes, configure local config environment parameters.",
      testingStrategy: "Simulate concurrent stress-test query clients to evaluate performance limits.",
      gitHubBestPractices: "Include strict linting checks. Provide database migration records in documentation files."
    });
  });
  
  return result;
};

// Merges buildable list with recommendations
export const getAllProjectsForDay = (dayNum) => {
  const buildables = BUILDABLE_PROJECTS.filter(p => p.day === dayNum);
  const recommendeds = getRecommendedProjectsForDay(dayNum);
  
  const result = [...buildables];
  
  recommendeds.forEach(rec => {
    if (!result.some(b => b.difficulty === rec.difficulty && b.title === rec.title)) {
      result.push(rec);
    }
  });
  
  return result.slice(0, 8); // Ensure exactly 3 Beg, 3 Int, 2 Adv (8 total)
};
