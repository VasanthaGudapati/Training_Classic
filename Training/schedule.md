# 📚 Core Computer Science: 30-Day Practical Revision Program (Beginner-Friendly)

Welcome to your daily CS revision program! This curriculum is tailored for beginners, easing you into core concepts step-by-step. Each day, you will review a fundamental concept and then **write a practical, isolated Python script** to implement it in your PyCharm workspace.

---

## 🗺️ Curriculum Roadmap

| Module | Days | Focus Area | Core Concepts |
| :--- | :--- | :--- | :--- |
| **Module 1** | Days 1–6 | **Foundations & Basic Data Structures** | Loops, Functions, Dynamic Arrays, Strings, Recursion, Basic Sorting |
| **Module 2** | Days 7–12 | **Intermediate DSA & OOP Basics** | Classes & Objects, Stacks/Queues, Hash Maps, Binary Trees, BFS |
| **Module 3** | Days 13–18 | **Operating Systems & Systems Basics** | Robust File I/O, Scheduling algorithms, Threads, Locks, FIFO Caching |
| **Module 4** | Days 19–24 | **Computer Networks & Web Basics** | Client-Server Sockets, Multi-client sockets, Raw HTTP server, REST APIs |
| **Module 5** | Days 25–30 | **Database Basics & Data Engines** | SQL Queries, Joins, Mock Indexing, Flat-file DB, MVC, Rate Limiter |

---

## 📂 Project Structure

Please place your daily implementations in the corresponding directory in `src/`:
```text
C:\Users\vasan\PycharmProjects\Training\
├── src/
│   ├── dsa/          # Days 1–6 and Days 8–12
│   ├── os/           # Days 7 (OOP) and Days 13–18
│   ├── networks/     # Days 19–24
│   ├── db/           # Days 25–28
│   └── design/       # Days 29–30
├── schedule.md       # This schedule
└── main.py           # Entrypoint / Runner script
```

---

## 🗓️ Day-by-Day Syllabus

### 🧩 Module 1: Foundations & Basic Data Structures (Days 1–6)

#### 🔹 Day 1: Variables, Flow Control & Functions
*   **Theory Focus:** Memory allocation for variables, evaluation of logical conditions, looping mechanics, call stack frames, and function scopes.
*   **Practical Task:** Build an interactive CLI Number Guessing Game.
*   **Requirements:** Generate a random number. Accept user guesses, validate inputs, provide "Too High" or "Too Low" feedback, track guess counts, and write the user's high score to a local text file.
*   **Path:** `src/dsa/day1_basics.py`

#### 🔹 Day 2: Dynamic Arrays & Array Resizing
*   **Theory Focus:** Continuous memory blocks, static vs. dynamic arrays, time complexity of index access ($O(1)$) vs. insertion ($O(N)$), and memory doubling algorithms.
*   **Practical Task:** Implement a custom `DynamicArray` class from scratch without using native Python lists for storage (use standard arrays or build a list wrapper simulating manual capacity growth).
*   **Requirements:** Create an array with a default capacity of 2. Implement `append(element)`, `get(index)`, `remove_at(index)`, and capacity doubling when full.
*   **Path:** `src/dsa/day2_dynamic_array.py`

#### 🔹 Day 3: Strings & Substring Searching
*   **Theory Focus:** Characters as bytes/unicode, string immutability, basic manipulation algorithms, and complexity of checking duplicates.
*   **Practical Task:** Write a String Utility toolkit.
*   **Requirements:** Implement custom functions for `reverse_string()`, `is_palindrome()`, and `find_substring(text, pattern)` from scratch using character iteration (do not use Python's built-in `[::-1]` or `.find()`).
*   **Path:** `src/dsa/day3_strings.py`

#### 🔹 Day 4: Recursion & Complexity Basics (Big O)
*   **Theory Focus:** Call stacks, stack overflow risk, base case vs. recursive step, and visual representation of linear vs. exponential growth.
*   **Practical Task:** Create recursive mathematical models and timing benchmarks.
*   **Requirements:** Write recursive implementations of `factorial(n)` and `fibonacci(n)`. Add timer decorators to measure runtime differences as input size grows.
*   **Path:** `src/dsa/day4_recursion.py`

#### 🔹 Day 5: Singly Linked Lists
*   **Theory Focus:** Linked data nodes, reference pointers, comparison of arrays vs. linked lists, and time complexity of dynamic changes.
*   **Practical Task:** Build a clean, simple `SinglyLinkedList`.
*   **Requirements:** Implement Node structure and a `LinkedList` class containing `insert_at_head(value)`, `insert_at_tail(value)`, `delete(value)`, and `display()` to print the list sequence nicely.
*   **Path:** `src/dsa/day5_linked_list.py`

#### 🔹 Day 6: Basic Search & Sorting
*   **Theory Focus:** Divide and conquer logic, linear search ($O(N)$), binary search ($O(\log N)$), and comparative complexities of basic bubble and selection sorting.
*   **Practical Task:** Build sorting and searching algorithms.
*   **Requirements:** Implement `bubble_sort(arr)`, `selection_sort(arr)`, and a recursive `binary_search(arr, target)`. Add code to verify binary search is running on a sorted array.
*   **Path:** `src/dsa/day6_sorting.py`

---

### 🏛️ Module 2: OOP & Intermediate Data Structures (Days 7–12)

#### 🔹 Day 7: Object-Oriented Programming (OOP) Basics
*   **Theory Focus:** The four pillars of OOP (Encapsulation, Abstraction, Inheritance, Polymorphism) and class schemas.
*   **Practical Task:** Design a simple Banking Account System.
*   **Requirements:** Create a base class `BankAccount` with protected attributes (`_balance`, `_account_number`), `deposit()`, and `withdraw()`. Create a subclass `SavingsAccount` that adds an `apply_interest()` method.
*   **Path:** `src/os/day7_oop_banking.py`

#### 🔹 Day 8: Stacks & Queues (Linear Structures)
*   **Theory Focus:** LIFO (Last In First Out) vs. FIFO (First In First Out) structures and practical usage cases.
*   **Practical Task:** Build Stack and Queue structures and solve a validation puzzle.
*   **Requirements:** Implement a `Stack` class (using day 2's dynamic array or standard list) and a `Queue` class. Use the stack to write a function `validate_brackets(expression)` that checks if parenthetical brackets `()`, `[]`, `{}` are matching and balanced.
*   **Path:** `src/dsa/day8_stacks_queues.py`

#### 🔹 Day 9: Custom Hash Tables
*   **Theory Focus:** Hash functions, mapping keys to indices, modulo operators, and collision resolution techniques.
*   **Practical Task:** Implement a simple `HashMap` from scratch.
*   **Requirements:** Write a class with a custom polynomial rolling hash function. Handle key collisions using basic linear probing (searching the next open slot) or chaining (storing list of tuples). Implement `put(key, value)` and `get(key)`.
*   **Path:** `src/dsa/day9_hash_map.py`

#### 🔹 Day 10: Binary Trees & Recursive Traversals
*   **Theory Focus:** Hierarchical data layouts, parents, left/right child pointers, and depth-first traversals.
*   **Practical Task:** Implement a binary tree layout.
*   **Requirements:** Create a `TreeNode` class. Build a hardcoded tree structure. Write recursive functions for three traversal strategies: `in_order(node)`, `pre_order(node)`, and `post_order(node)`, printing node values in sequence.
*   **Path:** `src/dsa/day10_binary_tree.py`

#### 🔹 Day 11: Binary Search Trees (BST) Basics
*   **Theory Focus:** Binary tree constraints (left child < parent < right child) and search performance optimization ($O(\log N)$ average).
*   **Practical Task:** Implement an active `BinarySearchTree` collection.
*   **Requirements:** Build a `BST` class supporting dynamic `insert(value)` and `search(value)` functions, returning True or False depending on whether the value exists in the tree.
*   **Path:** `src/dsa/day11_bst_basics.py`

#### 🔹 Day 12: Graph Representations & BFS Traversal
*   **Theory Focus:** Vertices/nodes, edges, directed vs. undirected graphs, adjacency lists, and level-order traversal.
*   **Practical Task:** Build a graph layout and traverse it.
*   **Requirements:** Write a `Graph` class represented by an Adjacency List (dictionary mapping vertices to lists of adjacent vertices). Implement `add_vertex()`, `add_edge()`, and `bfs(start_vertex)` to traverse the graph level-by-level using a queue.
*   **Path:** `src/dsa/day12_graphs.py`

---

### 💻 Module 3: OS Basics & Systems Programming (Days 13–18)

#### 🔹 Day 13: Robust File I/O & Error Log Analysis
*   **Theory Focus:** File descriptors, file streams (reading/writing), stream buffers, exception hierarchies, and clean resource management.
*   **Practical Task:** Write a robust Log Parser program.
*   **Requirements:** Open a text file, catch missing file exceptions gracefully, read logs line-by-line, parse out error patterns, and save sorted error summaries to a output report file. Ensure proper resource closing via context managers (`with` statement).
*   **Path:** `src/os/day13_log_parser.py`

#### 🔹 Day 14: Process CPU Scheduling Simulation
*   **Theory Focus:** The OS CPU Scheduler, state transitions (ready, running, blocked), arrival times, and waiting calculations.
*   **Practical Task:** Implement a scheduler simulator.
*   **Requirements:** Define a list of mock processes with arrival times and burst times. Write simulations for **First-Come, First-Served (FCFS)** and **Round Robin (RR)** scheduling, calculating the average waiting time for each process.
*   **Path:** `src/os/day14_scheduling_sim.py`

#### 🔹 Day 15: Introduction to Multi-threading
*   **Theory Focus:** Concurrency vs. Parallelism, shared process memory spaces, thread stacks, and execution interleaving.
*   **Practical Task:** Implement basic thread spawns.
*   **Requirements:** Write a script that launches 5 concurrent worker threads using Python's `threading` module. Each thread simulates work by printing starting/stopping messages and calling `time.sleep()`. Note the interleaved console output.
*   **Path:** `src/os/day15_basic_threads.py`

#### 🔹 Day 16: Thread Synchronization & Locks
*   **Theory Focus:** Critical sections, race conditions (concurrent writes to shared memory), mutual exclusion, and OS thread locking primitives.
*   **Practical Task:** Create a race condition and resolve it.
*   **Requirements:** Launch 10 threads concurrently updating a shared counter variable in a loop without synchronization, causing a corrupted final value. Then, introduce a `threading.Lock` to guarantee safe mutual exclusion, proving the final count matches expectation.
*   **Path:** `src/os/day16_locks.py`

#### 🔹 Day 17: Caching Strategy: The FIFO Cache Simulator
*   **Theory Focus:** High-speed cache memory systems, hit/miss ratios, capacity limits, and replacement protocols.
*   **Practical Task:** Build a **FIFO Cache** manager.
*   **Requirements:** Write a `FIFOCache(capacity)` class that holds key-value items. When the capacity is reached and a new item is added, discard the oldest inserted item first. Count cache hits and cache misses on stream requests.
*   **Path:** `src/os/day17_fifo_cache.py`

#### 🔹 Day 18: File Compression Basics (RLE)
*   **Theory Focus:** Data redundancy, lossy vs. lossless compression, and character sequencing algorithms.
*   **Practical Task:** Build a **Run-Length Encoding (RLE)** compression utility.
*   **Requirements:** Write functions `compress(text)` (transforms `AAABBC` to `3A2B1C`) and `decompress(encoded_text)` to restore the original string perfectly.
*   **Path:** `src/os/day18_rle_compression.py`

---

### 🌐 Module 4: Computer Networks & Web Communication (Days 19–24)

#### 🔹 Day 19: Low-Level Socket Programming Basics
*   **Theory Focus:** Client-server topology, IP addresses, ports, and basic socket life cycle (`socket`, `bind`, `listen`, `connect`).
*   **Practical Task:** Build a simple TCP Echo Server and Client.
*   **Requirements:** Write a server that opens a local port, accepts a single client connection, receives raw text bytes, and sends them back (echoes) to the client. Write a client script that connects, sends a message, reads the echo, and exits.
*   **Path:** `src/networks/day19_sockets.py`

#### 🔹 Day 20: Handling Multiple Clients (Sequential Loop)
*   **Theory Focus:** Network concurrency. Transitioning from serving a single static client to accepting subsequent client loops.
*   **Practical Task:** Upgrade the Day 19 TCP Server.
*   **Requirements:** Modify the socket server to accept client connections indefinitely inside a `while True` loop. Show how it accepts a client, communicates, closes the client connection, and immediately waits for the next incoming client.
*   **Path:** `src/networks/day20_multi_client.py`

#### 🔹 Day 21: The HTTP Protocol & Raw Web Server
*   **Theory Focus:** Anatomy of an HTTP Request (Request line, headers, CRLF delimiter) and HTTP Response layout.
*   **Practical Task:** Build a very simple Web Server.
*   **Requirements:** Create a raw TCP socket server. When a web browser connects (e.g. at `http://localhost:8080`), read the incoming request text, construct a basic raw `HTTP/1.1 200 OK` header, and send back a simple HTML webpage.
*   **Path:** `src/networks/day21_http_server.py`

#### 🔹 Day 22: REST APIs & JSON Serialization
*   **Theory Focus:** RESTful resource endpoints, GET/POST actions, and JSON standard data payload format.
*   **Practical Task:** Build a micro web service.
*   **Requirements:** Using a lightweight python library (e.g., `Flask` or standard library `http.server`), implement an API managing a todo list with `GET /todos` and `POST /todos` endpoints, processing data payloads in standard JSON.
*   **Path:/** `src/networks/day22_rest_api.py`

#### 🔹 Day 23: DNS Concept & IP Address Resolution
*   **Theory Focus:** Domain names, name servers, hierarchy of DNS records (A, AAAA, CNAME), and hostname queries.
*   **Practical Task:** Implement a domain name utility.
*   **Requirements:** Write a script that prompts the user for a domain name (like `google.com`), resolves it to its IPv4 address using Python's standard `socket.gethostbyname()`, and performs error handling if the domain is invalid.
*   **Path:** `src/networks/day23_dns_lookup.py`

#### 🔹 Day 24: Secure Communication: Hashing & Encryption Concepts
*   **Theory Focus:** One-way hash functions, salt addition for cryptographic security, dictionary attacks, and encryption basics.
*   **Practical Task:** Build a password secure hashing utility.
*   **Requirements:** Write functions to `hash_password(password)` using SHA-256 with a unique randomized salt and `verify_password(stored_hash, salt, input_password)`. Never store raw text passwords!
*   **Path:** `src/networks/day24_security.py`

---

### 💾 Module 5: Database Basics & Data Persistence (Days 25–30)

#### 🔹 Day 25: Relational Databases & SQL Basics
*   **Theory Focus:** Table structure, columns, primary keys, relationships, and basic SQL CRUD query statements.
*   **Practical Task:** Create a SQLite DB and run basic operations.
*   **Requirements:** Using Python's standard `sqlite3` library, create a database file. Build a table named `students` (`id`, `name`, `age`). Write python code to insert 3 rows, select rows where `age > 20`, update a student's age, and print the results.
*   **Path:** `src/db/day25_sqlite_basics.py`

#### 🔹 Day 26: Database Relations & SQL Joins
*   **Theory Focus:** Foreign Key references, database normalization, relational mapping (one-to-many), and table join algebra.
*   **Practical Task:** Run relational operations in SQLite.
*   **Requirements:** Create a related table `grades` (`id`, `student_id`, `subject`, `score`) linked via a Foreign Key to `students`. Write a SQL query using `INNER JOIN` to fetch and print the name of students alongside their scores, grouping results and computing average grades.
*   **Path:** `src/db/day26_sqlite_joins.py`

#### 🔹 Day 27: Database Indexing: Theoretical Concept
*   **Theory Focus:** Linear scanning ($O(N)$) vs. index lookups ($O(1)$ or $O(\log N)$) and index creation trade-offs.
*   **Practical Task:** Write a mock DB Index simulator.
*   **Requirements:** Write a program containing a list of 10,000 mock user dicts. Implement a search function that scans the list linearly (timing it). Then, build a separate dictionary mapping ID to student object (our index) and measure the $O(1)$ lookups, outputting runtime comparison stats.
*   **Path:** `src/db/day27_db_index.py`

#### 🔹 Day 28: Simple Key-Value Disk Store
*   **Theory Focus:** Flat-file storage, serialization/deserialization (JSON/CSV), and state recovery on startup.
*   **Practical Task:** Build a persistent key-value store.
*   **Requirements:** Write a class `SimpleDiskStore(filepath)`. When initialized, it reads database entries from a flat text file into a dictionary. Implement `put(key, value)` (updates the memory dict and writes all items back to disk) and `get(key)`.
*   **Path:** `src/db/day28_keyvalue_store.py`

#### 🔹 Day 29: System Architecture: The MVC Pattern
*   **Theory Focus:** Separation of concerns, Model (data state), View (user display), and Controller (application logic routing).
*   **Practical Task:** Build a modular Todo Application following strict **Model-View-Controller** structure.
*   **Requirements:** Create three distinct classes in one file: `TodoModel` (manages todo state array), `TodoView` (handles terminal prints and input prompt), and `TodoController` (orchestrates interactions between model and view).
*   **Path:** `src/design/day29_mvc_todo.py`

#### 🔹 Day 30: System Design: A Basic Rate Limiter
*   **Theory Focus:** Application security, system overload prevention, API request limits, and the Token Bucket algorithm concept.
*   **Practical Task:** Build a simple **Token Bucket Rate Limiter** class.
*   **Requirements:** Write a `SimpleRateLimiter(rate_per_minute)` class. It tracks token counts and the timestamp of the last request. Check if a request can proceed; if the user makes requests faster than the configured limit, block the call and print a warning message.
*   **Path:** `src/design/day30_rate_limiter.py`

---

## 🚀 How to Execute Your Daily Work

1.  **Start of the Day:** Open PyCharm. Create the day's source file in the `src/` subdirectories.
2.  **Review the Theory:** Spend 15-20 minutes reading standard resources on the day's topic (e.g. GeeksforGeeks, MDN, textbooks).
3.  **Implementation:** Write your clean code. Focus on readability, accurate naming, handling edge cases, and robust error checking.
4.  **Verification:** Add a `if __name__ == '__main__':` block at the bottom of your file to run a quick test execution suite verifying your class or functions work perfectly!
5.  **Track:** Update your master checklist to mark your daily goal as complete.

*Good luck on your learning journey! Consistently building these core CS systems from first principles will elevate your technical competence and design capabilities profoundly.*
