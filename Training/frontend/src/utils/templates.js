// ==========================================================================
// 📝 DYNAMIC PLAYGROUND BOILERPLATE TEMPLATES FOR ALL 30 DAYS (PY/JS)
// ==========================================================================

export const TEMPLATES = {
  python: {
    0: `# Day 00: Preparation & CS Roadmap Warmup
print("Welcome to the 30-Day Computer Science revision program!")

# Let's warm up with a simple function that lists the 5 concept layers
def list_cs_layers():
    layers = [
        "1. Foundations & Basic Data Structures",
        "2. OOP & Intermediate Data Structures",
        "3. OS Basics & Systems Programming",
        "4. Computer Networks & Web Communication",
        "5. Database Basics & Data Persistence"
    ]
    for idx, layer in enumerate(layers, start=1):
        print(f"Layer {idx}: {layer}")

list_cs_layers()
`,
    
    1: `# Day 01: Variables, Flow Control & Functions
def guessing_game(target, guess):
    # TODO: Implement comparison rules and return high, low, or correct
    if guess < target:
        return "Too Low"
    elif guess > target:
        return "Too High"
    return "Correct!"

print("Guessing game test cases:")
print("Guess 30:", guessing_game(42, 30))
print("Guess 50:", guessing_game(42, 50))
print("Guess 42:", guessing_game(42, 42))

# --- Sample Test Cases ---
print("\n[Sample Tests] Running verification...")
try:
    assert guessing_game(100, 50) == "Too Low", "Failed with low guess"
    assert guessing_game(100, 150) == "Too High", "Failed with high guess"
    assert guessing_game(100, 100) == "Correct!", "Failed with correct guess"
    print("✅ All sample tests passed successfully!")
except AssertionError as e:
    print(f"❌ Test failed: {e}")
`,
    2: `# Day 02: Dynamic Arrays & Array Resizing
class SimpleDynamicArray:
    def __init__(self):
        self.capacity = 2
        self.size = 0
        self.data = [None] * self.capacity

    def append(self, element):
        # TODO: Implement resizing if size == capacity
        if self.size == self.capacity:
            self.capacity *= 2
            new_data = [None] * self.capacity
            for i in range(self.size):
                new_data[i] = self.data[i]
            self.data = new_data
        
        self.data[self.size] = element
        self.size += 1

arr = SimpleDynamicArray()
arr.append("Core")
arr.append("CS")
arr.append("Playground")
print("Size:", arr.size)
print("Capacity:", arr.capacity)
print("Data:", arr.data)

# --- Sample Test Cases ---
print("\n[Sample Tests] Running verification...")
try:
    assert arr.size == 3, f"Expected size 3, got {arr.size}"
    assert arr.capacity == 4, f"Expected capacity 4, got {arr.capacity}"
    assert arr.data[0] == "Core" and arr.data[2] == "Playground", "Elements not matching expectations"
    print("✅ All sample tests passed successfully!")
except AssertionError as e:
    print(f"❌ Test failed: {e}")
`,
    3: `# Day 03: Strings & Substring Searching
def is_palindrome(text):
    # TODO: Check symmetry from both ends
    clean = "".join(c.lower() for c in text if c.isalnum())
    left, right = 0, len(clean) - 1
    while left < right:
        if clean[left] != clean[right]:
            return False
        left += 1
        right -= 1
    return True

print("is 'radar' palindrome?", is_palindrome("radar"))
print("is 'hello' palindrome?", is_palindrome("hello"))

# --- Sample Test Cases ---
print("\n[Sample Tests] Running verification...")
try:
    assert is_palindrome("A man, a plan, a canal: Panama") is True, "Failed for phrase"
    assert is_palindrome("raceacar") is False, "Failed for non-palindrome"
    assert is_palindrome("") is True, "Failed for empty string"
    print("✅ All sample tests passed successfully!")
except AssertionError as e:
    print(f"❌ Test failed: {e}")
`,
    4: `# Day 04: Recursion & Complexity Basics (Big O)
import time

def recursive_fibonacci(n):
    # TODO: Implement base case and recursive calls
    if n <= 1:
        return n
    return recursive_fibonacci(n-1) + recursive_fibonacci(n-2)

start = time.time()
result = recursive_fibonacci(10)
end = time.time()
print(f"Fibonacci(10) = {result} (Took {(end-start)*1000:.4f} ms)")

# --- Sample Test Cases ---
print("\n[Sample Tests] Running verification...")
try:
    assert recursive_fibonacci(0) == 0, "Fib(0) should be 0"
    assert recursive_fibonacci(1) == 1, "Fib(1) should be 1"
    assert recursive_fibonacci(6) == 8, "Fib(6) should be 8"
    print("✅ All sample tests passed successfully!")
except AssertionError as e:
    print(f"❌ Test failed: {e}")
`,
    5: `# Day 05: Singly Linked Lists
class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

class SinglyLinkedList:
    def __init__(self):
        self.head = None

    def insert_head(self, value):
        new_node = Node(value)
        new_node.next = self.head
        self.head = new_node

    def display(self):
        curr = self.head
        elements = []
        while curr:
          elements.append(str(curr.value))
          curr = curr.next
        print(" -> ".join(elements) + " -> None")

    def to_list(self):
        curr = self.head
        res = []
        while curr:
            res.append(curr.value)
            curr = curr.next
        return res

sll = SinglyLinkedList()
sll.insert_head(30)
sll.insert_head(20)
sll.insert_head(10)
sll.display()

# --- Sample Test Cases ---
print("\n[Sample Tests] Running verification...")
try:
    assert sll.to_list() == [10, 20, 30], f"Expected [10, 20, 30], got {sll.to_list()}"
    print("✅ All sample tests passed successfully!")
except AssertionError as e:
    print(f"❌ Test failed: {e}")
`,
    6: `# Day 06: Basic Search & Sorting
def bubble_sort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(0, n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
    return arr

test = [64, 34, 25, 12, 22, 11, 90]
print("Sorted array:", bubble_sort(test))

# --- Sample Test Cases ---
print("\n[Sample Tests] Running verification...")
try:
    assert bubble_sort([5, 1, 4, 2, 8]) == [1, 2, 4, 5, 8], "Failed to sort list"
    assert bubble_sort([]) == [], "Failed empty list"
    assert bubble_sort([1]) == [1], "Failed single element list"
    print("✅ All sample tests passed successfully!")
except AssertionError as e:
    print(f"❌ Test failed: {e}")
`,
    7: `# Day 07: Object-Oriented Programming (OOP) Basics
class BankAccount:
    def __init__(self, owner, balance):
        self.owner = owner
        self._balance = balance # Protected field

    def deposit(self, amount):
        self._balance += amount
        print(f"Deposited {amount}. Balance: {self._balance}")

class SavingsAccount(BankAccount):
    def apply_interest(self, rate):
        self._balance += self._balance * rate
        print(f"Applied interest. New Balance: {self._balance}")

acc = SavingsAccount("Alice", 1000)
acc.deposit(200)
acc.apply_interest(0.05)
`,
    8: `# Day 08: Stacks & Queues (Linear Structures)
def validate_brackets(expression):
    stack = []
    mapping = {")": "(", "}": "{", "]": "["}
    for char in expression:
        if char in mapping.values():
            stack.append(char)
        elif char in mapping.keys():
            if not stack or stack.pop() != mapping[char]:
                return False
    return len(stack) == 0

print("is '()[]{}' valid?", validate_brackets("()[]{}"))
print("is '(]' valid?", validate_brackets("(]"))
`,
    9: `# Day 09: Custom Hash Tables
class SimpleHashMap:
    def __init__(self, capacity=10):
        self.capacity = capacity
        self.table = [[] for _ in range(self.capacity)]

    def _hash(self, key):
        return sum(ord(c) for c in str(key)) % self.capacity

    def put(self, key, value):
        h = self._hash(key)
        for idx, item in enumerate(self.table[h]):
            if item[0] == key:
                self.table[h][idx] = (key, value)
                return
        self.table[h].append((key, value))

    def get(self, key):
        h = self._hash(key)
        for item in self.table[h]:
            if item[0] == key:
                return item[1]
        return None

hm = SimpleHashMap()
hm.put("key", "revision")
print("Value:", hm.get("key"))
`,
    10: `# Day 10: Binary Trees & Recursive Traversals
class TreeNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

def in_order(node):
    if node:
        in_order(node.left)
        print(node.value, end=" ")
        in_order(node.right)

# Build:      1
#            / \\
#           2   3
root = TreeNode(1)
root.left = TreeNode(2)
root.right = TreeNode(3)

print("In-order Traversal:")
in_order(root)
print()
`,
    11: `# Day 11: Binary Search Trees (BST) Basics
class BSTNode:
    def __init__(self, value):
        self.value = value
        self.left = None
        self.right = None

class BST:
    def __init__(self):
        self.root = None

    def insert(self, value):
        if not self.root:
            self.root = BSTNode(value)
            return
        self._insert_recursive(self.root, value)

    def _insert_recursive(self, node, value):
        if value < node.value:
            if not node.left:
                node.left = BSTNode(value)
            else:
                self._insert_recursive(node.left, value)
        else:
            if not node.right:
                node.right = BSTNode(value)
            else:
                self._insert_recursive(node.right, value)

bst = BST()
bst.insert(5)
bst.insert(3)
bst.insert(7)
print("Root:", bst.root.value)
print("Left:", bst.root.left.value)
print("Right:", bst.root.right.value)
`,
    12: `# Day 12: Graph Representations & BFS Traversal
from collections import deque

class Graph:
    def __init__(self):
        self.adj_list = {}

    def add_edge(self, u, v):
        self.adj_list.setdefault(u, []).append(v)
        self.adj_list.setdefault(v, []).append(u)

    def bfs(self, start):
        visited = set()
        queue = deque([start])
        visited.add(start)
        
        while queue:
            node = queue.popleft()
            print(node, end=" ")
            for neighbor in self.adj_list.get(node, []):
                if neighbor not in visited:
                    visited.add(neighbor)
                    queue.append(neighbor)

g = Graph()
g.add_edge("A", "B")
g.add_edge("A", "C")
g.add_edge("B", "D")
print("BFS starting from A:")
g.bfs("A")
print()
`,
    13: `# Day 13: Robust File I/O & Error Log Analysis
# Mock robust log analysis file reading
logs = """INFO: 10:00:00 Started
ERROR: 10:05:00 Connection Timeout
INFO: 10:06:00 Retrying
ERROR: 10:06:05 Database Deadlock
"""

def parse_errors(log_text):
    errors = []
    for line in log_text.strip().split("\\n"):
        if "ERROR" in line:
            errors.append(line)
    return errors

print("Parsed Error Logs:")
for err in parse_errors(logs):
    print("-", err)
`,
    14: `# Day 14: Process CPU Scheduling Simulation
def simulate_fcfs(processes):
    print("FCFS CPU Scheduling Simulator")
    current_time = 0
    waiting_times = {}
    
    for pid, arrival, burst in sorted(processes, key=lambda x: x[1]):
        if current_time < arrival:
            current_time = arrival
        waiting_times[pid] = current_time - arrival
        print(f"Process {pid} runs from {current_time} to {current_time + burst} (Wait: {waiting_times[pid]})")
        current_time += burst
        
    avg_wait = sum(waiting_times.values()) / len(processes)
    print(f"Average Waiting Time: {avg_wait:.2f} time units")

# (PID, Arrival Time, Burst Time)
mock_procs = [("P1", 0, 5), ("P2", 2, 3), ("P3", 4, 1)]
simulate_fcfs(mock_procs)
`,
    15: `# Day 15: Introduction to Multi-threading
import threading
import time

def worker(num):
    print(f"Thread {num} starting")
    time.sleep(0.5)
    print(f"Thread {num} completed")

threads = []
for i in range(3):
    t = threading.Thread(target=worker, args=(i,))
    threads.append(t)
    t.start()

for t in threads:
    t.join()
print("All threads finished.")
`,
    16: `# Day 16: Thread Synchronization & Locks
import threading

shared_counter = 0
counter_lock = threading.Lock()

def increment():
    global shared_counter
    for _ in range(1000):
        with counter_lock:
            shared_counter += 1

threads = [threading.Thread(target=increment) for _ in range(5)]
for t in threads: t.start()
for t in threads: t.join()

print("Synchronized Counter:", shared_counter)
`,
    17: `# Day 17: Caching Strategy: The FIFO Cache Simulator
class FIFOCache:
    def __init__(self, capacity):
        self.capacity = capacity
        self.cache = {}
        self.order = []

    def get(self, key):
        return self.cache.get(key, -1)

    def put(self, key, value):
        if key in self.cache:
            self.cache[key] = value
            return
            
        if len(self.cache) >= self.capacity:
            oldest = self.order.pop(0)
            del self.cache[oldest]
            print(f"Cache full. Evicted: {oldest}")
            
        self.cache[key] = value
        self.order.append(key)

c = FIFOCache(2)
c.put(1, "A")
c.put(2, "B")
c.put(3, "C") # Evicts 1
print("Get 1:", c.get(1))
print("Get 2:", c.get(2))
`,
    18: `# Day 18: File Compression Basics (RLE)
def compress_rle(text):
    if not text: return ""
    compressed = []
    curr_char = text[0]
    count = 1
    
    for char in text[1:]:
        if char == curr_char:
            count += 1
        else:
            compressed.append(f"{count}{curr_char}")
            curr_char = char
            count = 1
    compressed.append(f"{count}{curr_char}")
    return "".join(compressed)

print("Compression: 'AAABBC' ->", compress_rle("AAABBC"))
`,
    19: `# Day 19: Low-Level Socket Programming Basics
# Mock client-server transaction setup
import socket
print("Standard sockets interface loaded.")
print("echo loop: Client -> Socket Send -> Server Echo -> Client Recv")
`,
    20: `# Day 20: Handling Multiple Clients (Sequential Loop)
print("Standard sequential multi-connection socket loops simulated.")
print("server loop: while True: accept() -> handle() -> close()")
`,
    21: `# Day 21: The HTTP Protocol & Raw Web Server
# Simple mock web server parser
http_request = """GET / HTTP/1.1
Host: localhost:8080
User-Agent: Chrome
"""

def parse_http(request_text):
    lines = request_text.strip().split("\\n")
    method, path, version = lines[0].split()
    print(f"Request Method: {method}")
    print(f"Request Path: {path}")
    print(f"Response: HTTP/1.1 200 OK\\nContent-Type: text/html\\n\\n<h1>Hello CS!</h1>")

parse_http(http_request)
`,
    22: `# Day 22: REST APIs & JSON Serialization
import json

def get_todos():
    todos = [
        {"id": 1, "task": "Learn OOP", "done": True},
        {"id": 2, "task": "Revise Sockets", "done": False}
    ]
    return json.dumps(todos, indent=2)

print("REST API JSON Response (GET /todos):")
print(get_todos())
`,
    23: `# Day 23: DNS Concept & IP Address Resolution
import socket

def resolve_domain(hostname):
    try:
        ip = socket.gethostbyname(hostname)
        return f"{hostname} -> {ip}"
    except Exception as e:
        return f"Failed to resolve {hostname}: {e}"

print(resolve_domain("google.com"))
`,
    24: `# Day 24: Secure Communication: Hashing & Cryptography
import hashlib

def secure_hash(password, salt="random_salt"):
    salted = password + salt
    return hashlib.sha256(salted.encode()).hexdigest()

print("Secure Hash (SHA-256):", secure_hash("Alice123"))
`,
    25: `# Day 25: Relational Databases & SQL Basics
import sqlite3

# Initialize in-memory database
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE students (id INTEGER PRIMARY KEY, name TEXT, age INTEGER)")
cur.execute("INSERT INTO students VALUES (1, 'Alice', 20), (2, 'Bob', 22)")

cur.execute("SELECT name FROM students WHERE age >= 20")
print("Selected Records:")
for row in cur.fetchall():
    print("-", row[0])
`,
    26: `# Day 26: Database Relations & SQL Joins
import sqlite3

con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE students (id INT PRIMARY KEY, name TEXT)")
cur.execute("CREATE TABLE grades (student_id INT, subject TEXT, score INT)")

cur.execute("INSERT INTO students VALUES (1, 'Alice'), (2, 'Bob')")
cur.execute("INSERT INTO grades VALUES (1, 'CS', 95), (2, 'CS', 88)")

query = """
SELECT students.name, grades.subject, grades.score 
FROM students 
INNER JOIN grades ON students.id = grades.student_id
"""
cur.execute(query)
print("Relational Inner Join Results:")
for row in cur.fetchall():
    print(f"Student: {row[0]}, Subject: {row[1]}, Score: {row[2]}")
`,
    27: `# Day 27: Database Indexing: Theoretical Concept
import time

# Create 1000 items
db_records = {i: f"User_{i}" for i in range(1000)}

start = time.perf_counter()
# O(N) list search simulation
found = None
for key, val in db_records.items():
    if key == 999:
        found = val
        break
end = time.perf_counter()
print(f"O(N) search took {(end-start)*1000000:.2f} ns")

start = time.perf_counter()
# O(1) indexed lookup simulation
found = db_records.get(999)
end = time.perf_counter()
print(f"O(1) index took {(end-start)*1000000:.2f} ns")
`,
    28: `# Day 28: Simple Key-Value Disk Store
import json
import os

class SimpleStore:
    def __init__(self, file):
        self.file = file
        self.memory = {}
        if os.path.exists(self.file):
            with open(self.file, "r") as f: self.memory = json.load(f)

    def put(self, key, value):
        self.memory[key] = value
        with open(self.file, "w") as f: json.dump(self.memory, f)

# Simulate persistent write
store = SimpleStore("playground_kv.json")
store.put("revision_status", "Active")
print("Memory Cache State:", store.memory)
if os.path.exists("playground_kv.json"):
    os.remove("playground_kv.json")
`,
    29: `# Day 29: System Architecture: The MVC Pattern
class Model:
    def __init__(self):
        self.todos = []

class View:
    def display(self, todos):
        print("Todo List MVC View Screen:")
        for idx, item in enumerate(todos):
            print(f"{idx + 1}. {item}")

class Controller:
    def __init__(self, model, view):
        self.model = model
        self.view = view

    def add_todo(self, item):
        self.model.todos.append(item)
        self.view.display(self.model.todos)

c = Controller(Model(), View())
c.add_todo("Revise CS Modules")
`,
    30: `# Day 30: System Design: A Basic Rate Limiter
import time

class TokenBucket:
    def __init__(self, capacity, rate):
        self.capacity = capacity
        self.rate = rate
        self.tokens = capacity
        self.last_update = time.time()

    def allow_request(self):
        now = time.time()
        # Add generated tokens
        elapsed = now - self.last_update
        self.tokens = min(self.capacity, self.tokens + elapsed * self.rate)
        self.last_update = now
        
        if self.tokens >= 1:
            self.tokens -= 1
            return True
        return False

limiter = TokenBucket(2, 0.5) # Max 2, generates 0.5 per second
print("Request 1 allowed?", limiter.allow_request())
print("Request 2 allowed?", limiter.allow_request())
print("Request 3 allowed?", limiter.allow_request()) # Blocked!
`,
  },
  javascript: {
    0: `// Day 00: Preparation & CS Roadmap Warmup
console.log("Welcome to the 30-Day Computer Science revision program!");

// Let's warm up with a simple function that lists the 5 concept layers
function listCsLayers() {
  const layers = [
    "1. Foundations & Basic Data Structures",
    "2. OOP & Intermediate Data Structures",
    "3. OS Basics & Systems Programming",
    "4. Computer Networks & Web Communication",
    "5. Database Basics & Data Persistence"
  ];
  layers.forEach((layer, idx) => {
    console.log(\`Layer \${idx + 1}: \${layer}\`);
  });
}

listCsLayers();
`,
    
    1: `// Day 01: Variables, Flow Control & Functions
function guessingGame(target, guess) {
  if (guess < target) return "Too Low";
  if (guess > target) return "Too High";
  return "Correct!";
}

console.log(guessingGame(42, 30));
console.log(guessingGame(42, 50));
console.log(guessingGame(42, 42));
`,
    2: `// Day 02: Dynamic Arrays & Array Resizing
class SimpleDynamicArray {
  constructor() {
    this.capacity = 2;
    this.size = 0;
    this.data = new Array(this.capacity);
  }

  append(element) {
    if (this.size === this.capacity) {
      this.capacity *= 2;
      const new_data = new Array(this.capacity);
      for (let i = 0; i < this.size; i++) {
        new_data[i] = this.data[i];
      }
      this.data = new_data;
    }
    this.data[this.size] = element;
    this.size++;
  }
}

const arr = new SimpleDynamicArray();
arr.append("Core");
arr.append("CS");
arr.append("Playground");
console.log("Size:", arr.size);
console.log("Capacity:", arr.capacity);
console.log("Data:", arr.data);
`,
    3: `// Day 03: Strings & Substring Searching
function isPalindrome(text) {
  const clean = text.toLowerCase().replace(/[^a-z0-9]/g, "");
  let left = 0;
  let right = clean.length - 1;
  while (left < right) {
    if (clean[left] !== clean[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log("is 'radar' palindrome?", isPalindrome("radar"));
console.log("is 'hello' palindrome?", isPalindrome("hello"));
`,
    4: `// Day 04: Recursion & Complexity Basics (Big O)
function recursiveFibonacci(n) {
  if (n <= 1) return n;
  return recursiveFibonacci(n-1) + recursiveFibonacci(n-2);
}

const start = performance.now();
const result = recursiveFibonacci(15);
const end = performance.now();
console.log("Fibonacci(15) =", result, "(Took", (end-start).toFixed(4), "ms)");
`,
    5: `// Day 05: Singly Linked Lists
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

class SinglyLinkedList {
  constructor() {
    this.head = null;
  }

  insertHead(value) {
    const new_node = new Node(value);
    new_node.next = this.head;
    this.head = new_node;
  }

  display() {
    let curr = this.head;
    const elements = [];
    while (curr) {
      elements.push(curr.value);
      curr = curr.next;
    }
    console.log(elements.join(" -> ") + " -> null");
  }
}

const sll = new SinglyLinkedList();
sll.insertHead(30);
sll.insertHead(20);
sll.insertHead(10);
sll.display();
`,
    6: `// Day 06: Basic Search & Sorting
function bubbleSort(arr) {
  const n = arr.length;
  for (let i = 0; i < n; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        const temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr;
}

const test = [64, 34, 25, 12, 22, 11, 90];
console.log("Sorted array:", bubbleSort(test));
`,
    7: `// Day 07: Object-Oriented Programming (OOP) Basics
class BankAccount {
  constructor(owner, balance) {
    this.owner = owner;
    this._balance = balance;
  }

  deposit(amount) {
    this._balance += amount;
    console.log("Deposited", amount, "Balance:", this._balance);
  }
}

class SavingsAccount extends BankAccount {
  applyInterest(rate) {
    this._balance += this._balance * rate;
    console.log("Applied interest. New Balance:", this._balance);
  }
}

const acc = new SavingsAccount("Alice", 1000);
acc.deposit(200);
acc.applyInterest(0.05);
`,
    8: `// Day 08: Stacks & Queues (Linear Structures)
function validateBrackets(expression) {
  const stack = [];
  const mapping = { ")": "(", "}": "{", "]": "[" };
  for (let char of expression) {
    if (Object.values(mapping).includes(char)) {
      stack.push(char);
    } else if (Object.keys(mapping).includes(char)) {
      if (stack.length === 0 || stack.pop() !== mapping[char]) {
        return false;
      }
    }
  }
  return stack.length === 0;
}

console.log("is '()[]{}' valid?", validateBrackets("()[]{}"));
console.log("is '(]' valid?", validateBrackets("(]"));
`,
    9: `// Day 09: Custom Hash Tables
class SimpleHashMap {
  constructor(capacity = 10) {
    this.capacity = capacity;
    this.table = Array.from({ length: this.capacity }, () => []);
  }

  _hash(key) {
    let sum = 0;
    for (let char of String(key)) {
      sum += char.charCodeAt(0);
    }
    return sum % this.capacity;
  }

  put(key, value) {
    const h = this._hash(key);
    for (let item of this.table[h]) {
      if (item[0] === key) {
        item[1] = value;
        return;
      }
    }
    this.table[h].push([key, value]);
  }

  get(key) {
    const h = this._hash(key);
    for (let item of this.table[h]) {
      if (item[0] === key) return item[1];
    }
    return null;
  }
}

const hm = new SimpleHashMap();
hm.put("key", "revision");
console.log("Value:", hm.get("key"));
`,
    10: `// Day 10: Binary Trees & Recursive Traversals
class TreeNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

function inOrder(node, output = []) {
  if (node) {
    inOrder(node.left, output);
    output.push(node.value);
    inOrder(node.right, output);
  }
  return output;
}

const root = new TreeNode(1);
root.left = new TreeNode(2);
root.right = new TreeNode(3);

console.log("In-order Traversal:", inOrder(root).join(" "));
`,
    11: `// Day 11: Binary Search Trees (BST) Basics
class BSTNode {
  constructor(value) {
    this.value = value;
    this.left = null;
    this.right = null;
  }
}

class BST {
  constructor() {
    this.root = null;
  }

  insert(value) {
    if (!this.root) {
      this.root = new BSTNode(value);
      return;
    }
    this._insertRecursive(this.root, value);
  }

  _insertRecursive(node, value) {
    if (value < node.value) {
      if (!node.left) node.left = new BSTNode(value);
      else this._insertRecursive(node.left, value);
    } else {
      if (!node.right) node.right = new BSTNode(value);
      else this._insertRecursive(node.right, value);
    }
  }
}

const bst = new BST();
bst.insert(5);
bst.insert(3);
bst.insert(7);
console.log("Root:", bst.root.value);
console.log("Left:", bst.root.left.value);
console.log("Right:", bst.root.right.value);
`,
    12: `// Day 12: Graph Representations & BFS Traversal
class Graph {
  constructor() {
    this.adjList = new Map();
  }

  addEdge(u, v) {
    if (!this.adjList.has(u)) this.adjList.set(u, []);
    if (!this.adjList.has(v)) this.adjList.set(v, []);
    this.adjList.get(u).push(v);
    this.adjList.get(v).push(u);
  }

  bfs(start) {
    const visited = new Set();
    const queue = [start];
    visited.add(start);
    const result = [];

    while (queue.length > 0) {
      const node = queue.shift();
      result.push(node);
      const neighbors = this.adjList.get(node) || [];
      for (let neighbor of neighbors) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
    console.log(result.join(" "));
  }
}

const g = new Graph();
g.addEdge("A", "B");
g.addEdge("A", "C");
g.addEdge("B", "D");
console.log("BFS starting from A:");
g.bfs("A");
`,
    13: `// Day 13: Robust File I/O & Error Log Analysis
const logs = \`INFO: 10:00:00 Started
ERROR: 10:05:00 Connection Timeout
INFO: 10:06:00 Retrying
ERROR: 10:06:05 Database Deadlock\`;

function parseErrors(logText) {
  return logText.trim().split("\\n").filter(line => line.includes("ERROR"));
}

console.log("Parsed Error Logs:");
parseErrors(logs).forEach(err => console.log("-", err));
`,
    14: `// Day 14: Process CPU Scheduling Simulation
function simulateFcfs(processes) {
  console.log("FCFS CPU Scheduling Simulator");
  let currentTime = 0;
  const waitingTimes = {};

  const sorted = [...processes].sort((a, b) => a[1] - b[1]);
  for (let [pid, arrival, burst] of sorted) {
    if (currentTime < arrival) currentTime = arrival;
    waitingTimes[pid] = currentTime - arrival;
    console.log(\`Process \${pid} runs from \${currentTime} to \${currentTime + burst} (Wait: \${waitingTimes[pid]})\`);
    currentTime += burst;
  }

  const values = Object.values(waitingTimes);
  const avgWait = values.reduce((a, b) => a + b, 0) / values.length;
  console.log("Average Waiting Time:", avgWait.toFixed(2), "time units");
}

const mockProcs = [["P1", 0, 5], ["P2", 2, 3], ["P3", 4, 1]];
simulateFcfs(mockProcs);
`,
    15: `// Day 15: Introduction to Multi-threading
console.log("In JavaScript, concurrency is managed asynchronously!");
console.log("We simulate concurrent threads using async task loops.");

function simulateWorker(id) {
  console.log(\`Worker \${id} starting\`);
  setTimeout(() => {
    console.log(\`Worker \${id} finished\`);
  }, 300);
}

simulateWorker(1);
simulateWorker(2);
`,
    16: `// Day 16: Thread Synchronization & Locks
console.log("JavaScript runs inside a single-threaded event loop.");
console.log("Race conditions with shared memory don't occur like in C or Python.");
console.log("We simulate async mutex operations using promises.");
`,
    17: `// Day 17: Caching Strategy: The FIFO Cache Simulator
class FIFOCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.cache = new Map();
  }

  get(key) {
    return this.cache.has(key) ? this.cache.get(key) : -1;
  }

  put(key, value) {
    if (this.cache.has(key)) {
      this.cache.set(key, value);
      return;
    }

    if (this.cache.size >= this.capacity) {
      const oldest = this.cache.keys().next().value;
      this.cache.delete(oldest);
      console.log("Cache full. Evicted:", oldest);
    }
    this.cache.set(key, value);
  }
}

const c = new FIFOCache(2);
c.put(1, "A");
c.put(2, "B");
c.put(3, "C"); // Evicts 1
console.log("Get 1:", c.get(1));
console.log("Get 2:", c.get(2));
`,
    18: `// Day 18: File Compression Basics (RLE)
function compressRle(text) {
  if (!text) return "";
  const compressed = [];
  let curr = text[0];
  let count = 1;

  for (let i = 1; i < text.length; i++) {
    if (text[i] === curr) count++;
    else {
      compressed.push(count + curr);
      curr = text[i];
      count = 1;
    }
  }
  compressed.push(count + curr);
  return compressed.join("");
}

console.log("Compression: 'AAABBC' ->", compressRle("AAABBC"));
`,
    19: `// Day 19: Low-Level Socket Programming Basics
console.log("NodeJS represents low level sockets using the 'net' module.");
console.log("const server = net.createServer(socket => { ... })");
`,
    20: `// Day 20: Handling Multiple Clients (Sequential Loop)
console.log("NodeJS handles thousands of concurrent clients out-of-the-box");
console.log("via the underlying non-blocking event-driven loop!");
`,
    21: `// Day 21: The HTTP Protocol & Raw Web Server
console.log("NodeJS native HTTP server example:");
console.log("http.createServer((req, res) => { res.end('Hello'); })");
`,
    22: `// Day 22: REST APIs & JSON Serialization
const mockTodos = [
  { id: 1, task: "Learn JS", done: true },
  { id: 2, task: "Practice MUI", done: false }
];

console.log("REST Response Payload (JSON stringified):");
console.log(JSON.stringify(mockTodos, null, 2));
`,
    23: `// Day 23: DNS Concept & IP Address Resolution
console.log("JavaScript Node library performs hostname lookups using dns.lookup():");
console.log("dns.lookup('google.com', (err, address) => { ... })");
`,
    24: `// Day 24: Secure Communication: Hashing & Cryptography
// Node crypto hashing mock
console.log("Hashed password (using standard SHA-256):");
const hash = "alice_salted_hash_9f83a21b3c9e";
console.log("Stored hash value:", hash);
`,
    25: `// Day 25: Relational Databases & SQL Basics
console.log("Relational tables logic modeled in Javascript:");
const students = [
  { id: 1, name: "Alice", age: 20 },
  { id: 2, name: "Bob", age: 22 }
];

console.log("Filter students age >= 20:");
console.log(students.filter(s => s.age >= 20));
`,
    26: `// Day 26: Database Relations & SQL Joins
console.log("SQL Inner Join simulation in JavaScript arrays:");
const students = [{ id: 1, name: "Alice" }];
const grades = [{ student_id: 1, subject: "CS", score: 95 }];

const result = students.map(s => {
  const grade = grades.find(g => g.student_id === s.id);
  return { name: s.name, subject: grade.subject, score: grade.score };
});
console.log(result);
`,
    27: `// Day 27: Database Indexing: Theoretical Concept
const records = Array.from({ length: 1000 }, (_, i) => ({ id: i, val: \`User_\${i}\` }));

console.time("O(N) List Lookup");
const foundN = records.find(r => r.id === 999);
console.timeEnd("O(N) List Lookup");

const index = new Map(records.map(r => [r.id, r]));
console.time("O(1) Map Lookup");
const found1 = index.get(999);
console.timeEnd("O(1) Map Lookup");
`,
    28: `// Day 28: Simple Key-Value Disk Store
console.log("Save key values to localStorage (in-browser persistent cache):");
console.log("localStorage.setItem('status', 'Completed');");
console.log("Get status:", "Completed");
`,
    29: `// Day 29: System Architecture: The MVC Pattern
class Model {
  constructor() { this.todos = []; }
}
class View {
  display(todos) { console.log("MVC View Screen:", todos.join(", ")); }
}
class Controller {
  constructor(model, view) {
    this.model = model;
    this.view = view;
  }
  add(todo) {
    this.model.todos.push(todo);
    this.view.display(this.model.todos);
  }
}

const c = new Controller(new Model(), new View());
c.add("MVC design");
`,
    30: `// Day 30: System Design: A Basic Rate Limiter
class TokenBucket {
  constructor(capacity, rate) {
    this.capacity = capacity;
    this.rate = rate;
    this.tokens = capacity;
    this.last = Date.now() / 1000;
  }

  allow() {
    const now = Date.now() / 1000;
    const elapsed = now - this.last;
    this.tokens = Math.min(this.capacity, this.tokens + elapsed * this.rate);
    this.last = now;

    if (this.tokens >= 1) {
      this.tokens--;
      return true;
    }
    return false;
  }
}

const limiter = new TokenBucket(2, 1);
console.log("Request 1:", limiter.allow());
console.log("Request 2:", limiter.allow());
console.log("Request 3:", limiter.allow()); // Blocked!
`,
  }
};
