// ==========================================================================
// 📚 COMPREHENSIVE STUDY CURRICULUM: THEORY, EXAMPLES & EXERCISES (30 DAYS)
// ==========================================================================

export const THEORY_DATA = {
  0: {
    links: [{"name": "30-Day Syllabus Guide", "url": "https://github.com/vasan/CS-30-Day-Challenge"}, {"name": "Computer Science Roadmap (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/computer-science-projects/"}],
    concept: "Preparation involves understanding how foundations, data structures, OOP, operating systems, networks, and databases interconnect to build modern software systems. Reviewing the 5 layers equips you with a mental roadmap of the entire 30-day curriculum.",
    analogy: "Think of Day 0 as looking at a architectural master plan before laying the first brick. Understanding the layers makes the construction process intuitive.",
    complexity: "Preparation complexity: O(30 Days) learning trajectory. Dynamic outcomes: O(1) high-retention.",
    examples: {
      python: `print("Welcome to Day 0 Warm-up!")

# Simple greeting and structure check
layers = ["Foundations", "OOP", "Systems (OS)", "Networks", "Databases"]
for index, layer in enumerate(layers, start=1):
    print(f"Layer {index}: {layer}")`,
      javascript: `console.log("Welcome to Day 0 Warm-up!");

// Simple greeting and structure check
const layers = ["Foundations", "OOP", "Systems (OS)", "Networks", "Databases"];
layers.forEach((layer, index) => {
  console.log(\`Layer \${index + 1}: \${layer}\`);
});`
    },
    exercises: [
      "Write a script that prints a custom welcome message and calculates the remaining days (30) of the program.",
      "Modify the loop to display only the layers that deal with data storage or databases.",
      "Create a dynamic list of modules and print them along with their primary focus areas."
    ]
  },

  1: {
    links: [{"name": "Python Scope & LEGB Rules", "url": "https://realpython.com/python-scope-legb-rule/"}, {"name": "JS Event Loop & Stack Frames", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Event_loop"}, {"name": "Python Functions Tutorial (Real Python)", "url": "https://realpython.com/defining-your-own-python-function/"}],
    concept: "Variables represent named memory locations. Static typing allocates fixed size on the stack, while dynamic typing stores references on the heap. Flow control directs execution using branches (conditional statements) and loops (iterative constructs). Functions encapsulate reusable blocks of code, utilizing call stack frames to track parameters, local variables, and return addresses.",
    analogy: "Think of variables as named storage boxes, loops as automated assembly lines, and functions as reusable recipes.",
    complexity: "Time Complexity: O(1) for assignments, O(N) for linear loops. Space Complexity: O(1) auxiliary.",
    examples: {
      python: `def check_number(num):
    if num > 0:
        return "Positive"
    elif num < 0:
        return "Negative"
    return "Zero"

for i in range(-1, 2):
    print(f"{i} is {check_number(i)}")`,
      javascript: `function checkNumber(num) {
  if (num > 0) return "Positive";
  if (num < 0) return "Negative";
  return "Zero";
}

[-1, 0, 1].forEach(i => {
  console.log(\`\${i} is \${checkNumber(i)}\`);
});`
    },
    exercises: [
      "Write a function that returns the sum of all odd numbers up to N.",
      "Modify the Guessing Game to restrict the user to a maximum of 5 attempts, throwing a 'Game Over' message if exceeded.",
      "Create a basic calculator function that accepts two numbers and an operator (+, -, *, /) and returns the result."
    ]
  },
  2: {
    links: [{"name": "Amortized Analysis of Arrays", "url": "https://www.geeksforgeeks.org/analysis-algorithm-amortized-analysis-introduction/"}, {"name": "Dynamic Array Internals", "url": "https://en.wikipedia.org/wiki/Dynamic_array"}, {"name": "Dynamic Array Resizing (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/how-do-dynamic-arrays-work/"}],
    concept: "A dynamic array is a linear data structure that provides random access by storing elements in contiguous memory. When the allocated capacity is exceeded during an insertion, the array automatically resizes (typically doubling in size). This involves allocating a new larger memory block, copying all existing elements, and releasing the old block. This leads to O(1) amortized insertion but O(N) worst-case insertion.",
    analogy: "Like a concert hall that relocates to a building twice the size when tickets sell out, dynamic arrays double their capacity and copy all guests over.",
    complexity: "Lookup: O(1). Insert at End: O(1) amortized, O(N) worst-case (during resize). Space: O(N) allocation.",
    examples: {
      python: `# Python lists are dynamic arrays under the hood.
my_list = []
for i in range(5):
    my_list.append(i)
    # Internally, Python resizes the buffer as needed
print("Resized List:", my_list)`,
      javascript: `// JS Arrays are dynamic and sparse.
let arr = [];
for (let i = 0; i < 5; i++) {
  arr.push(i);
}
console.log("Resized Array:", arr);`
    },
    exercises: [
      "Implement a custom dynamic array method 'pop()' that removes the last element and returns it.",
      "Add a shrinking threshold: if the size falls below 25% of capacity, shrink the capacity by half to save memory.",
      "Write an insert_at(index, element) function that shifts elements to the right and inserts a new value."
    ]
  },
  3: {
    links: [{"name": "Knuth-Morris-Pratt Search", "url": "https://www.geeksforgeeks.org/kmp-algorithm-for-pattern-searching/"}, {"name": "Unicode & Character Encodings", "url": "https://realpython.com/python-encodings-guide/"}, {"name": "Naive Substring Search (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/naive-algorithm-for-pattern-searching/"}],
    concept: "Strings are sequential arrays of characters. In many languages (like Python and Java), strings are immutable—meaning modifications create entirely new strings in memory to optimize caching and safety. Substring searching involves finding the starting index of a pattern within a text. Algorithms range from naive sliding window (O(N*M)) to advanced linear-time pattern matching like Knuth-Morris-Pratt (O(N+M)) using prefix tables.",
    analogy: "Think of a string as a static, unchangeable row of letters. In Python, you can't swap a letter in place; you must build a new string from scratch.",
    complexity: "Reverse String: O(N) Time, O(N) Space. Substring Search: O(N*M) naive, O(N+M) KMP algorithm.",
    examples: {
      python: `# Palindrome Check
def is_palindrome(s):
    # Two pointer strategy
    left, right = 0, len(s) - 1
    while left < right:
        if s[left] != s[right]:
            return False
        left += 1
        right -= 1
    return True

print(is_palindrome("racecar"))`,
      javascript: `// Palindrome Check in JS
function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;
  while (left < right) {
    if (s[left] !== s[right]) return false;
    left++;
    right--;
  }
  return true;
}

console.log(isPalindrome("racecar"));`
    },
    exercises: [
      "Implement a function that counts occurrences of each character in a string, ignoring spaces and case.",
      "Write a custom 'split_string(text, delimiter)' function that returns an array of substrings without using built-in split.",
      "Build a function that checks if two strings are anagrams of each other (contain exactly the same letters in different order)."
    ]
  },
  4: {
    links: [{"name": "Call Stack & Stack Overflow", "url": "https://en.wikipedia.org/wiki/Call_stack"}, {"name": "Asymptotic Complexity Guide", "url": "https://www.geeksforgeeks.org/analysis-of-algorithms-set-1-asymptotic-analysis/"}, {"name": "Recursion in Python (Real Python)", "url": "https://realpython.com/python-recursion/"}],
    concept: "Recursion is a programming technique where a function calls itself directly or indirectly. Every recursive function requires: (1) a Base Case to stop the recursion and prevent stack overflow, and (2) a Recursive Case that reduces the problem size. Call stack frames track each recursive invocation. Big O notation measures asymptotic time and space complexity, representing how execution time scales with input size N.",
    analogy: "Recursion is like Russian nesting dolls—you open one to find a smaller one inside, until you hit the tiny solid doll (the base case) that stops the loop.",
    complexity: "Factorial: O(N) Time, O(N) Stack Space. Fibonacci: O(2^N) Naive, O(N) Memoized.",
    examples: {
      python: `# Recursive Factorial
def factorial(n):
    if n <= 1: # Base Case
        return 1
    return n * factorial(n - 1) # Recursive Step

print(factorial(5)) # Outputs 120`,
      javascript: `// Recursive Factorial in JS
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}

console.log(factorial(5));`
    },
    exercises: [
      "Write a recursive function that returns the sum of digits of a number (e.g. 123 -> 6).",
      "Implement a recursive function to reverse a string (e.g. 'abc' -> 'cba').",
      "Write a memoized recursive Fibonacci function that runs in O(N) time instead of O(2^N)."
    ]
  },
  5: {
    links: [{"name": "Singly Linked List Operations", "url": "https://www.geeksforgeeks.org/singly-linked-list-tutorial/"}, {"name": "Floyd's Cycle Finding Algorithm", "url": "https://www.geeksforgeeks.org/floyds-cycle-finding-algorithm/"}, {"name": "Singly Linked List Implementation (Real Python)", "url": "https://realpython.com/linked-lists-python/"}],
    concept: "A singly linked list is a linear data structure consisting of nodes, where each node contains a value and a pointer (reference) to the next node in the sequence. Unlike arrays, nodes are not stored contiguously in memory, allowing for dynamic insertion and deletion in O(1) time at the head, but requiring O(N) time to search or access arbitrary elements.",
    analogy: "Like a scavenger hunt, each node has a clue (value) and points to the location of the next clue (pointer). The chain ends when a clue points to nowhere (null).",
    complexity: "Access/Search: O(N). Insert/Delete at Head: O(1). Insert/Delete at Tail: O(N). Space: O(N).",
    examples: {
      python: `class Node:
    def __init__(self, value):
        self.value = value
        self.next = None

# Singly Linked List Node Linkage
head = Node("First")
head.next = Node("Second")
print(head.value, "->", head.next.value)`,
      javascript: `class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

const head = new Node("First");
head.next = new Node("Second");
console.log(head.value, "->", head.next.value);`
    },
    exercises: [
      "Implement a method 'delete_tail()' that removes the last node of a Singly Linked List in O(N) time.",
      "Write a function that reverses a linked list in-place by swapping the pointer directions.",
      "Implement a cycle detection function (Floyd's algorithm) that determines if a linked list contains a loop."
    ]
  },
  6: {
    links: [{"name": "Binary Search Detailed Guide", "url": "https://realpython.com/binary-search-python/"}, {"name": "Sorting Algorithms Visualizer", "url": "https://visualgo.net/en/sorting"}, {"name": "Selection & Bubble Sort (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/selection-sort-algorithm/"}],
    concept: "Sorting arranges elements in a specific order (e.g. ascending). Bubble and Selection Sort are naive algorithms running in O(N^2) time. Search algorithms locate elements: Linear Search scans sequentially in O(N) time, whereas Binary Search repeatedly divides a sorted search range in half, achieving highly efficient O(log N) lookup speed.",
    analogy: "Linear search is like flipping through pages of a book one by one. Binary search is like opening the dictionary exactly in the middle and narrowing down your search range.",
    complexity: "Linear Search: O(N). Binary Search: O(log N). Bubble Sort: O(N^2). Space: O(1) auxiliary.",
    examples: {
      python: `def binary_search(arr, target):
    low, high = 0, len(arr) - 1
    while low <= high:
        mid = (low + high) // 2
        if arr[mid] == target:
            return mid
        elif arr[mid] < target:
            low = mid + 1
          else:
            high = mid - 1
    return -1

print("Index of 5:", binary_search([1, 3, 5, 7, 9], 5))`,
      javascript: `function binarySearch(arr, target) {
  let low = 0, high = arr.length - 1;
  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    if (arr[mid] === target) return mid;
    else if (arr[mid] < target) low = mid + 1;
    else high = mid - 1;
  }
  return -1;
}

console.log("Index of 5:", binarySearch([1, 3, 5, 7, 9], 5));`
    },
    exercises: [
      "Implement Insertion Sort, which sorts elements like sorting a deck of cards in your hand.",
      "Write a function that searches for the first and last occurrence of a target element in a sorted array in O(log N) time.",
      "Implement a recursive binary search function that does not use while loops."
    ]
  },
  7: {
    links: [{"name": "4 Pillars of OOP in Python", "url": "https://realpython.com/python3-object-oriented-programming/"}, {"name": "Polymorphism in JS", "url": "https://developer.mozilla.org/en-US/docs/Web/JavaScript/Inheritance_and_the_prototype_chain"}, {"name": "4 Pillars of OOP Concepts (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/four-simple-principles-of-oop-object-oriented-programming-concepts/"}],
    concept: "Object-Oriented Programming (OOP) is a paradigm based on 'objects' containing data and methods. Its four pillars are: (1) Encapsulation (hiding internal state via private variables), (2) Abstraction (hiding complexity behind simple interfaces), (3) Inheritance (subclasses sharing parent traits), and (4) Polymorphism (allowing subclasses to override parent methods dynamically).",
    analogy: "Think of a class as a blue-print for a car, and an object as the actual physical car built from that blueprint. Inheritance allows you to build an ElectricCar subclass inheriting characteristics from the base Car class.",
    complexity: "Instantiation: O(1) in time and memory. Method Calls: O(1) invocation overhead.",
    examples: {
      python: `class Animal:
    def speak(self):
        return "Sound"

class Dog(Animal):
    def speak(self): # Polymorphism
        return "Woof!"

d = Dog()
print(d.speak())`,
      javascript: `class Animal {
  speak() { return "Sound"; }
}

class Dog extends Animal {
  speak() { return "Woof!"; }
}

const d = new Dog();
console.log(d.speak());`
    },
    exercises: [
      "Add input validation constraints: raise an ValueError if deposit or withdraw actions receive negative numbers.",
      "Create a 'CheckingAccount' subclass that imposes a transaction fee of $2 on every withdrawal.",
      "Implement an abstract base class 'Vehicle' that forces all subclasses (Car, Bike) to implement a 'start_engine()' method."
    ]
  },
  8: {
    links: [{"name": "LIFO Stacks & FIFO Queues", "url": "https://realpython.com/queue-in-python/"}, {"name": "Stack Brackets Matching", "url": "https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/"}, {"name": "Balanced Brackets Matcher (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/check-for-balanced-parentheses-in-an-expression/"}],
    concept: "Stacks and Queues are restricted linear structures. A Stack follows the Last-In, First-Out (LIFO) protocol, supporting push and pop operations at a single end. A Queue follows the First-In, First-Out (FIFO) protocol, supporting enqueue at the tail and dequeue at the head. Both can be built using dynamic arrays or linked lists.",
    analogy: "A stack is like a pile of cafeteria trays—you take from the top (LIFO). A queue is like a checkout line—the first customer who arrives is served first (FIFO).",
    complexity: "Push/Pop/Enqueue/Dequeue: O(1) time. Space: O(N) relative to elements.",
    examples: {
      python: `# Python lists can be used as Stacks
stack = []
stack.append("A") # Push
stack.append("B")
print(stack.pop()) # Pop -> B

# Queues are best implemented using deque
from collections import deque
queue = deque(["A", "B"])
print(queue.popleft()) # Dequeue -> A`,
      javascript: `// JS Arrays handle both stacks and queues.
let stack = [];
stack.push("A");
stack.push("B");
console.log(stack.pop()); // Pop -> B

let queue = [];
queue.push("A");
queue.push("B");
console.log(queue.shift()); // Dequeue -> A`
    },
    exercises: [
      "Implement a custom Queue class using two Stack instances underneath (amortized O(1)).",
      "Write a function that reverses the elements of a stack using only stack operations.",
      "Implement a circular queue using a fixed-size array to understand array wrap-arounds."
    ]
  },
  9: {
    links: [{"name": "Hash Functions & Collision resolution", "url": "https://en.wikipedia.org/wiki/Hash_table"}, {"name": "HashMap Chain probing", "url": "https://www.geeksforgeeks.org/open-addressing-collision-handling-technique-in-hashing/"}, {"name": "Custom Hash Table Design (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/hash-map-in-python/"}],
    concept: "A Hash Table maps keys to values using a Hash Function, which converts arbitrary keys into integer array indexes in O(1) average time. When two keys hash to the same index, a Collision occurs. Resolution strategies include Chaining (maintaining linked lists at each index) and Open Addressing (probing subsequent empty indexes linearly or quadratically).",
    analogy: "Think of a coat check counter. You give them your coat (key), they hand you a numbered ticket (hash value). When you want your coat, they use the number to instantly find the slot.",
    complexity: "Insert/Search/Delete: O(1) average-case, O(N) worst-case (during collision clusters). Space: O(N).",
    examples: {
      python: `# Python dicts are optimized Hash Tables
hash_table = {}
hash_table["username"] = "alice"
print(hash_table["username"])`,
      javascript: `// JS Objects/Maps are Hash Tables
let hashTable = new Map();
hashTable.set("username", "alice");
console.log(hashTable.get("username"));`
    },
    exercises: [
      "Implement Quadratic Probing collision resolution in your custom Hash Map to reduce clustering.",
      "Create a hash table resize function: when the load factor (elements / slots) exceeds 70%, double the slots and rehash all keys.",
      "Write a function that finds the first non-repeating character in a string using a hash map in O(N) time."
    ]
  },
  10: {
    links: [{"name": "Binary Tree Recursive Traversals", "url": "https://www.geeksforgeeks.org/tree-traversals-inorder-preorder-and-postorder/"}, {"name": "DF traversals vs BF traversals", "url": "https://www.geeksforgeeks.org/bfs-vs-dfs-binary-tree/"}, {"name": "Binary Tree Traversals (Real Python)", "url": "https://realpython.com/python-binary-tree/"}],
    concept: "A Binary Tree is a hierarchical structure where each node has at most two children (left and right). Recursive tree traversals visit all nodes systematically: (1) Pre-order (Parent, Left, Right), (2) In-order (Left, Parent, Right—which visits sorted elements in a BST), and (3) Post-order (Left, Right, Parent).",
    analogy: "A family tree is a classic binary tree—you have parents and children. Pre-order is like visiting the head of the household first, In-order is visiting siblings from left to right.",
    complexity: "Traversals: O(N) Time (visits every node), O(H) Stack Space (where H is the tree height).",
    examples: {
      python: `# Constructing and printing a Binary Tree
class Node:
    def __init__(self, val):
        self.val = val
        self.left = None
        self.right = None

root = Node(1)
root.left = Node(2)
print("Root:", root.val, "Left Child:", root.left.val)`,
      javascript: `class Node {
  constructor(val) {
    this.value = val;
    this.left = null;
    this.right = null;
  }
}

const root = new Node(1);
root.left = new Node(2);
console.log("Root:", root.value, "Left Child:", root.left.value);`
    },
    exercises: [
      "Write a function that calculates the total height/depth of a binary tree recursively.",
      "Implement a function that counts the total number of leaf nodes (nodes with no children) in a binary tree.",
      "Write a level-order (BFS) traversal of a binary tree that returns a list of values layer by layer."
    ]
  },
  11: {
    links: [{"name": "BST Insert and Search Guide", "url": "https://www.geeksforgeeks.org/binary-search-tree-data-structure/"}, {"name": "BST Validation checking", "url": "https://www.geeksforgeeks.org/a-program-to-check-if-a-binary-tree-is-bst-or-not/"}, {"name": "Binary Search Tree Basics (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/binary-search-tree-data-structure/"}],
    concept: "A Binary Search Tree (BST) is a binary tree with the ordering property: for any node, all keys in its left subtree are smaller, and all keys in its right subtree are larger. This structure enables O(log N) average search, insertion, and deletion. However, if keys are inserted in sorted order, the tree degenerates into a linear chain, degrading speeds to O(N).",
    analogy: "Like sorting files in a filing cabinet, a BST keeps all smaller files on the left and larger files on the right, allowing you to instantly throw out half the drawer on every search step.",
    complexity: "Insert/Search/Delete: O(log N) average, O(N) worst-case (in unbalanced, degenerate/skewed trees). Space: O(N).",
    examples: {
      python: `def search_bst(node, target):
    if not node or node.value == target:
        return node
    if target < node.value:
        return search_bst(node.left, target)
    return search_bst(node.right, target)`,
      javascript: `function searchBST(node, target) {
  if (!node || node.value === target) return node;
  if (target < node.value) return searchBST(node.left, target);
  return searchBST(node.right, target);
}`
    },
    exercises: [
      "Implement an iterative (non-recursive) search function for a BST to save call stack space.",
      "Write a function that finds the minimum and maximum values in a BST in O(log N) time.",
      "Write a validator function that checks if a given binary tree is a valid BST (i.e. satisfies left < parent < right for all nodes)."
    ]
  },
  12: {
    links: [{"name": "Graph Adjacency Lists representation", "url": "https://www.geeksforgeeks.org/graph-and-its-representations/"}, {"name": "Breadth First Search (BFS)", "url": "https://www.geeksforgeeks.org/breadth-first-search-or-bfs-for-a-graph/"}, {"name": "Breadth First Search (BFS) Visualisation", "url": "https://visualgo.net/en/dfsbfs"}],
    concept: "A Graph represents network structures consisting of Vertices (nodes) and Edges (connections). Graphs are represented using Adjacency Matrices (O(V^2) space) or Adjacency Lists (O(V+E) space). Breadth-First Search (BFS) is a level-order traversal using a queue to visit neighbors layer-by-layer, making it ideal for finding the shortest path in unweighted graphs.",
    analogy: "A graph is a social network—vertices are people and edges are friendships. BFS is like broadcasting news: first you tell your immediate friends, then they tell their friends, spreading outwards in waves.",
    complexity: "Representation: Adjacency List O(V + E) space. Traversal: O(V + E) time. V = Vertices, E = Edges.",
    examples: {
      python: `# Creating adjacency list
graph = {
    'A': ['B', 'C'],
    'B': ['A', 'D'],
    'C': ['A'],
    'D': ['B']
}
print("Neighbors of B:", graph['B'])`,
      javascript: `const graph = {
  A: ['B', 'C'],
  B: ['A', 'D'],
  C: ['A'],
  D: ['B']
};
console.log("Neighbors of B:", graph.B);`
    },
    exercises: [
      "Implement a Depth-First Search (DFS) traversal of a graph recursively.",
      "Write a function that determines if there is a path between two vertices in a graph using BFS.",
      "Write a function that counts the number of connected components in an undirected graph."
    ]
  },
  13: {
    links: [{"name": "Python File Stream Handling", "url": "https://realpython.com/read-write-files-python/"}, {"name": "Robust Exception Handling Guide", "url": "https://realpython.com/python-exceptions/"}, {"name": "Python Context Managers (Real Python)", "url": "https://realpython.com/python-with-statement/"}],
    concept: "File I/O operates on external disk storage. Robust systems utilize stream buffers to read files line-by-line rather than loading whole files into RAM, preventing memory exhaustion. Exception handling (try/except blocks) catches runtime failures (e.g., missing files, permission errors) gracefully to prevent application crashes.",
    analogy: "Think of checking passports at border control. You don't halt the whole line if one passport is invalid (crashing); you write down the issue (logging errors) and process the next person.",
    complexity: "Parsing: O(N) time where N is file character length, O(1) memory if processed as line streams.",
    examples: {
      python: `try:
    with open("missing_file.txt", "r") as f:
        content = f.read()
except FileNotFoundError as e:
    print("Caught Error Gracefully:", e)`,
      javascript: `try {
  throw new Error("Simulated File Stream Issue");
} catch (e) {
  console.log("Caught Error Gracefully:", e.message);
}`
    },
    exercises: [
      "Write a function that counts how many 'WARNING', 'INFO', and 'ERROR' log tags occur in a log file.",
      "Create a log cleaner function that strips out any sensitive data (like emails or IP addresses) using regular expressions.",
      "Implement a dynamic file creator that appends timestamped error messages to a 'system_errors.log' file."
    ]
  },
  14: {
    links: [{"name": "CPU Scheduling Algorithms Overview", "url": "https://www.geeksforgeeks.org/cpu-scheduling-in-operating-systems/"}, {"name": "Round Robin (RR) Scheduling", "url": "https://www.geeksforgeeks.org/program-round-robin-scheduling-set-1/"}, {"name": "First-Come First-Served Scheduling (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/program-for-fcfs-cpu-scheduling/"}],
    concept: "CPU Scheduling is the process by which the OS decides which process runs on the CPU. First-Come, First-Served (FCFS) schedules tasks in arrival order but suffers from the Convoy Effect (short jobs waiting behind long ones). Round Robin (RR) schedules tasks periodically using fixed time slices (quanta), ensuring fair time sharing.",
    analogy: "A scheduler is like a bank teller: FCFS serves whoever got in line first. Round Robin is like a busy card dealer giving one card (time slice) to each player in turn around the table.",
    complexity: "FCFS: O(N log N) sorting by arrival time, O(1) scheduling per process. Space: O(N).",
    examples: {
      python: `# Process scheduler models representation
processes = [{"id": "P1", "burst": 10}, {"id": "P2", "burst": 4}]
total_time = sum(p["burst"] for p in processes)
print("Total scheduling CPU burst times:", total_time)`,
      javascript: `const processes = [{id: "P1", burst: 10}, {id: "P2", burst: 4}];
const total = processes.reduce((acc, p) => acc + p.burst, 0);
console.log("Total scheduling CPU burst times:", total);`
    },
    exercises: [
      "Implement a Round Robin scheduler that outputs the exact order of execution given a list of processes and a time quantum of 2.",
      "Write a Shortest Job First (SJF) scheduler that sorts non-preemptive tasks based on their remaining burst times.",
      "Calculate the average Turnaround Time (Completion Time - Arrival Time) for a simulated list of processes."
    ]
  },
  15: {
    links: [{"name": "Python Threading Concurrency", "url": "https://realpython.com/intro-to-python-threading/"}, {"name": "Global Interpreter Lock (GIL)", "url": "https://realpython.com/python-gil/"}, {"name": "Python Multithreading Guide (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/multithreading-python/"}],
    concept: "Multi-threading allows a single process to execute multiple concurrent paths of execution inside the same shared memory space. This is lightweight compared to spawning separate processes but introduces concurrency complexities. Due to Python's Global Interpreter Lock (GIL), only one thread can execute bytecode at a time, making threading best for I/O-bound tasks.",
    analogy: "Threads are like multiple cooks in the same kitchen sharing the same ingredients (process memory). If they don't coordinate, they will bump into each other and spoil the soup.",
    complexity: "Thread creation: low-overhead. Execution: managed by the OS scheduler (non-deterministic order).",
    examples: {
      python: `import threading
# Simple thread worker function
def print_message():
    print("Executed inside a separate thread!")

thread = threading.Thread(target=print_message)
thread.start()
thread.join()`,
      javascript: `// JS Event loop async execution
console.log("Start");
setTimeout(() => {
  console.log("Executed asynchronously!");
}, 100);
console.log("End");`
    },
    exercises: [
      "Create 3 threads that compute squares of different lists of numbers concurrently and write to a shared dictionary.",
      "Write an asynchronous JavaScript loop using Promises and `Promise.all` to simulate concurrent task resolution.",
      "Simulate a simple HTTP crawler that spawns 5 threads fetching from a list of URLs concurrently."
    ]
  },
  16: {
    links: [{"name": "Thread Synchronization & Locks", "url": "https://realpython.com/intro-to-python-threading/#producer-consumer-threading"}, {"name": "Preventing Data Race Conditions", "url": "https://en.wikipedia.org/wiki/Race_condition"}, {"name": "Thread Locks in Python (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/use-locks-to-prevent-race-conditions-in-python-multithreading/"}],
    concept: "Thread Synchronization manages concurrent access to shared resources to prevent Data Races (where multiple threads modify a variable simultaneously, causing corrupt state). Mutual Exclusion (Mutex/Locks) ensures only one thread enters a Critical Section at a time, blocking other threads until the lock is released.",
    analogy: "Think of a single-occupancy restroom. The lock on the door (Mutex/Lock) guarantees that only one person (thread) can use it at a time, preventing awkward collisions.",
    complexity: "Lock Overhead: O(1) context check, but causes thread waiting/blocking if contention is high.",
    examples: {
      python: `import threading
lock = threading.Lock()
# Safely accessing shared resources
with lock:
    print("Inside critical section. Thread-safe execution.")`,
      javascript: `// Simulating async locks in JS
class Mutex {
  constructor() {
    this.queue = [];
    this.locked = false;
  }
  async lock() {
    if (this.locked) {
      await new Promise(r => this.queue.push(r));
    }
    this.locked = true;
  }
  unlock() {
    if (this.queue.length > 0) {
      const next = this.queue.shift();
      next();
    } else {
      this.locked = false;
    }
  }
}`
    },
    exercises: [
      "Implement a thread-safe ticket booking system where multiple threads attempt to book the last available ticket.",
      "Simulate a bank account transaction where a thread deposits $100 and another withdraws $100 concurrently, showing how locks protect the balance.",
      "Build a simple Semaphore class that allows a maximum of 3 concurrent threads to enter a critical section."
    ]
  },
  17: {
    links: [{"name": "Caching Strategies (FIFO vs LRU)", "url": "https://en.wikipedia.org/wiki/Cache_replacement_policies"}, {"name": "Python functools.lru_cache", "url": "https://realpython.com/lru-cache-python/"}, {"name": "FIFO Cache Replacement (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/fifo-first-in-first-out-cache-page-replacement-algorithm/"}],
    concept: "Caching stores copy of active data in high-speed memory to accelerate retrieval. Cache replacement schemes determine which resource to evict when capacity is full. First-In, First-Out (FIFO) evicts the oldest cached resource, while Least Recently Used (LRU) evicts the resource that hasn't been accessed for the longest time.",
    analogy: "Think of an inbox tray that can only hold 3 papers. When a 4th paper arrives, you throw away the very first paper that entered the tray, regardless of how often you read it.",
    complexity: "Cache Put/Get: O(1) using linked lists and dictionaries. Space: O(Capacity).",
    examples: {
      python: `cache = []
def access_page(page):
    if page not in cache:
        if len(cache) >= 3:
            evicted = cache.pop(0)
            print("Evicted page:", evicted)
        cache.append(page)
    print("Cache State:", cache)

access_page("Home")
access_page("Dashboard")
access_page("Settings")
access_page("Profile") # Evicts Home`,
      javascript: `let cache = [];
function accessPage(page) {
  if (!cache.includes(page)) {
    if (cache.length >= 3) {
      let evicted = cache.shift();
      console.log("Evicted page:", evicted);
    }
    cache.push(page);
  }
  console.log("Cache State:", cache);
}

accessPage("Home");
accessPage("Dashboard");
accessPage("Settings");
accessPage("Profile"); // Evicts Home`
    },
    exercises: [
      "Implement a Least Recently Used (LRU) Cache, which evicts the least recently accessed item instead of the oldest.",
      "Write a cache benchmark script that takes a sequence of requests and measures the hit rate of FCFS vs. LRU caches.",
      "Implement a Least Frequently Used (LFU) Cache, which tracks and evicts the item that has been accessed the fewest times."
    ]
  },
  18: {
    links: [{"name": "Lossless Run-Length Encoding (RLE)", "url": "https://en.wikipedia.org/wiki/Run-length_encoding"}, {"name": "Data Compression algorithms", "url": "https://www.geeksforgeeks.org/run-length-encoding/"}, {"name": "Run Length Encoding in Python (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/run-length-encoding-in-python/"}],
    concept: "File compression reduces storage requirements. Run-Length Encoding (RLE) is a lossless compression algorithm that replaces consecutive repeating data sequences (runs) with a single data value and its repeat count. It is highly efficient for data containing long runs of identical values but can increase file size for highly varied data.",
    analogy: "If you have a shopping list that says 'Apple, Apple, Apple, Banana', you compress it by saying '3 Apples, 1 Banana'. This is Run-Length Encoding.",
    complexity: "Compression/Decompression: O(N) Time. Space: O(N) worst-case (when no consecutive repeating characters exist).",
    examples: {
      python: `def rle_decompress(text):
    result = []
    i = 0
    while i < len(text):
        count = int(text[i])
        char = text[i+1]
        result.append(char * count)
        i += 2
    return "".join(result)

print(rle_decompress("3A2B1C")) # Outputs AAABBC`,
      javascript: `function rleDecompress(text) {
  const result = [];
  let i = 0;
  while (i < text.length) {
    let count = parseInt(text[i]);
    let char = text[i+1];
    result.push(char.repeat(count));
    i += 2;
  }
  return result.join("");
}

console.log(rleDecompress("3A2B1C"));`
    },
    exercises: [
      "Handle repeating sequences larger than 9: modify RLE to compress and decompress double-digit counts (e.g. '12A' -> 'AAAAAAAAAAAA').",
      "Write a function that calculates the exact compression ratio (compressed size / original size) for a text file.",
      "Implement a modified RLE that only compresses repeating sequences of 3 or more characters, leaving single/double letters raw."
    ]
  },
  19: {
    links: [{"name": "Socket Programming in Python", "url": "https://realpython.com/python-sockets/"}, {"name": "TCP vs UDP socket bindings", "url": "https://www.geeksforgeeks.org/differences-between-tcp-and-udp/"}, {"name": "TCP Client-Server Communication (Real Python)", "url": "https://realpython.com/python-sockets/"}],
    concept: "Sockets are endpoint interfaces for network communication over TCP/IP or UDP. A server socket binds to an IP and port, listens for incoming connection requests, and accepts sessions. A client socket connects to the server. Data is transmitted as raw byte streams, requiring explicit encoding (e.g., UTF-8) and protocol handling.",
    analogy: "Like a landline telephone system: binding is assigning a phone number to a wall jack, listening is waiting for the phone to ring, and accepting is picking up the receiver.",
    complexity: "Connection creation: O(1). Byte transfers: O(Bytes / Bandwidth). Network latency overhead applies.",
    examples: {
      python: `# Sockets represent host connection interfaces
import socket
print("Local Host Name:", socket.gethostname())`,
      javascript: `// Node sockets wrapper loading mock
console.log("Established raw TCP network communication ports.");`
    },
    exercises: [
      "Modify the TCP Echo client to automatically retry connection up to 3 times if the server is offline.",
      "Implement a UDP Echo Server, which transmits datagrams directly without establishing active connections (connectionless transport).",
      "Write a socket server that prints the client's IP address and port number on connection."
    ]
  },
  20: {
    links: [{"name": "Sequential vs Concurrent Sockets", "url": "https://www.geeksforgeeks.org/socket-programming-in-cc-handling-multiple-clients-on-server-without-multi-threading/"}, {"name": "Select/Epoll Socket Multiplexing", "url": "https://realpython.com/python-sockets/#handling-multiple-connections"}, {"name": "Handling Multiple Clients with Threads (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/socket-programming-multi-threading-python/"}],
    concept: "Standard single-threaded socket servers handle clients sequentially using a loop. When a client connects, the server blocks other incoming client connections until the current session is closed. To handle multiple concurrent client sessions without blocking, servers must utilize multi-threading, multi-processing, or asynchronous event loops.",
    analogy: "A small shop with one cashier: when a customer is checkout, others must wait outside. As soon as the customer leaves, the cashier serves the next person in line.",
    complexity: "Loop throughput: O(1) serving, but blocks other clients for indefinite periods.",
    examples: {
      python: `# Server accepting connection loops
print("server loop: while running: connection, addr = server.accept(); handle(connection); connection.close()")`,
      javascript: `// JS Event Loop client loops handling
console.log("Connection processed. Listening for next socket sequence...");`
    },
    exercises: [
      "Create a client script that spawns 5 sequential connections to verify the server processes them without crashing.",
      "Introduce a client handshake: force the client to send a specific code (e.g., 'SECRET') before the server echos data, dropping unauthorized clients.",
      "Add a server shutdown command: if a client sends the text 'SHUTDOWN', terminate the server accept loop."
    ]
  },
  21: {
    links: [{"name": "HTTP Request Response Spec", "url": "https://developer.mozilla.org/en-US/docs/Web/HTTP/Overview"}, {"name": "Raw Socket Web Servers", "url": "https://realpython.com/python-sockets/#web-servers-and-socket-programming"}, {"name": "Python http.server Library (Python Docs)", "url": "https://docs.python.org/3/library/http.server.html"}],
    concept: "The Hypertext Transfer Protocol (HTTP) is a stateless, text-based application protocol. An HTTP request consists of a request line (Method, Path, Version), headers, and an optional body. The server processes this request and returns an HTTP response starting with a status line (e.g., HTTP/1.1 200 OK) followed by headers and the page content.",
    analogy: "HTTP is like a restaurant order: the client (diner) sends a Request (menu selection), the server (kitchen) processes it and returns a Response (the food plate).",
    complexity: "Routing/Parsing: O(Request Size) time, O(Response Body) space.",
    examples: {
      python: `# Python HTTP response construction
status_line = "HTTP/1.1 200 OK\\r\\n"
headers = "Content-Type: text/html\\r\\nContent-Length: 18\\r\\n\\r\\n"
body = "<h1>Hello!</h1>"
response = status_line + headers + body
print(response)`,
      javascript: `// JS HTTP response construction
const status = "HTTP/1.1 200 OK\\r\\n";
const headers = "Content-Type: text/html\\r\\n\\r\\n";
const body = "<h1>Hello!</h1>";
console.log(status + headers + body);`
    },
    exercises: [
      "Add path routing: serve index.html when the path is '/', and a custom 'about.html' when the path is '/about'.",
      "Implement a request parser that extracts query string variables from the URL path (e.g., '/?name=Alice' parses out name).",
      "Serve correct MIME types: return Content-Type 'image/png' when serving a image file, and 'text/css' for css files."
    ]
  },
  22: {
    links: [{"name": "REST API Architecture Principles", "url": "https://restfulapi.net/"}, {"name": "JSON Serialization in Python", "url": "https://realpython.com/python-json/"}, {"name": "FastAPI APIs Tutorial (Real Python)", "url": "https://realpython.com/fastapi-python-web-apis/"}],
    concept: "REST (Representational State Transfer) is an architectural style for design APIs using standard HTTP methods: GET (read), POST (create), PUT (update), and DELETE (delete). REST APIs serialize payloads in JSON (JavaScript Object Notation), a lightweight, text-based data-interchange format easily parsed by modern web applications.",
    analogy: "Like a librarian at the desk: GET fetches a book from shelves, POST registers a new book, PUT updates its cover, and DELETE removes it from catalog.",
    complexity: "JSON Parse/Stringify: O(N) where N is string length. Router mapping: O(1) or O(Routes).",
    examples: {
      python: `import json
# JSON Encoding and decoding
data = {"status": "Revision", "day": 22}
json_string = json.dumps(data)
print("Encoded:", json_string)
print("Decoded:", json.loads(json_string)["status"])`,
      javascript: `// JS JSON native tools
const data = { status: "Revision", day: 22 };
const jsonString = JSON.stringify(data);
console.log("Encoded:", jsonString);
console.log("Decoded:", JSON.parse(jsonString).status);`
    },
    exercises: [
      "Add a PUT /todos/:id endpoint that lets the user toggle the 'done' state of a specific todo item.",
      "Implement a DELETE /todos/:id endpoint that deletes a todo item from the collection by ID.",
      "Add payload validation: reject the POST request with an HTTP 400 status if the 'task' string is empty or missing."
    ]
  },
  23: {
    links: [{"name": "DNS Name Resolution Mechanics", "url": "https://www.cloudflare.com/learning/dns/what-is-dns/"}, {"name": "Reverse DNS Lookup Guide", "url": "https://en.wikipedia.org/wiki/Reverse_DNS_lookup"}, {"name": "Host Name Resolution socket.gethostbyname (Python Docs)", "url": "https://docs.python.org/3/library/socket.html#socket.gethostbyname"}],
    concept: "The Domain Name System (DNS) is the phone book of the Internet, translating human-readable hostnames (e.g., google.com) into machine-readable IP addresses (e.g., 142.250.190.46). Lookups query a hierarchical tree of nameservers (Root, TLD, Authoritative) and utilize client-side caching to minimize latency.",
    analogy: "Like a phone book directory: you look up 'John Doe' (domain name) to find his phone number (IP address), since numbers are hard to remember but names are easy.",
    complexity: "Network lookup: O(1) if cached, otherwise depends on DNS server network hops latency.",
    examples: {
      python: `import socket
try:
    print("IP of python.org:", socket.gethostbyname("python.org"))
except socket.gaierror as e:
    print("Lookup Failed:", e)`,
      javascript: `// DNS hostname queries logic mock
console.log("DNS Host Lookup: resolved 'google.com' -> '142.250.190.46'");`
    },
    exercises: [
      "Write a script that takes a URL (like 'https://github.com/trending'), strips the protocol and paths, and resolves the clean domain IP.",
      "Create a bulk DNS resolver that accepts a list of hostnames and returns a dictionary mapping hostnames to IPs.",
      "Implement reverse lookup: resolve an IP address back to its hostname using `socket.gethostbyaddr(ip)`."
    ]
  },
  24: {
    links: [{"name": "Cryptographic SHA-256 Hash", "url": "https://en.wikipedia.org/wiki/SHA-2"}, {"name": "Password Salting Best Practices", "url": "https://auth0.com/blog/adding-salt-to-hashing-a-better-way-to-store-passwords/"}, {"name": "Password Hashing & Salting (Real Python)", "url": "https://realpython.com/python-hashlib/"}],
    concept: "Hashing algorithms (like SHA-256) generate a fixed-size cryptographic signature from arbitrary input data, working as a one-way function that cannot be reversed. To prevent rainbow table cracking, password security systems add a unique, random string (Salt) to the password before hashing, creating unique hashes for identical passwords.",
    analogy: "A hash is like a meat grinder: you can grind meat into sausage (hash), but you can't turn the sausage back into a cow. Salt is adding a secret spice to the meat before grinding, so no two sausages look alike.",
    complexity: "SHA-256 Hashing: O(Byte Length) execution speed. Decryption: O(Infinity) (mathematically impossible).",
    examples: {
      python: `import hashlib
hashed = hashlib.sha256(b"alice_password").hexdigest()
print("Alice Hash:", hashed)`,
      javascript: `// Mock hashing signature
const hashStr = "hashed_alice_password_value";
console.log("Alice Hash:", hashStr);`
    },
    exercises: [
      "Implement a simple brute-force password cracker that takes a SHA-256 hash and attempts to find a match from a list of 100 common passwords.",
      "Modify your password hashing function to generate a different, random salt key for each user, and store the salt along with the hash.",
      "Write a utility that verifies if a password meets complexity rules (contains number, upper/lower case, special character) before hashing it."
    ]
  },
  25: {
    links: [{"name": "Relational Databases & SQL syntax", "url": "https://www.w3schools.com/sql/"}, {"name": "ACID Database Transaction Rules", "url": "https://en.wikipedia.org/wiki/ACID"}, {"name": "sqlite3 Data Management (Real Python)", "url": "https://realpython.com/data-management-python-sqlite/"}],
    concept: "Relational Database Management Systems (RDBMS) organize data into structured tables consisting of rows and columns. They use Structured Query Language (SQL) to declare and manipulate data, providing robust ACID (Atomicity, Consistency, Isolation, Durability) guarantees that ensure reliable transaction processing.",
    analogy: "A relational database is like a collection of spreadsheets (tables) with columns (fields) and rows (records), where columns link spreadsheets together.",
    complexity: "Insertion: O(1). Selection without Index: O(N) scan. Selection with Index: O(log N) or O(1).",
    examples: {
      python: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
cur.execute("CREATE TABLE users (id INT, name TEXT)")
cur.execute("INSERT INTO users VALUES (1, 'Alice')")
cur.execute("SELECT * FROM users")
print("User Row:", cur.fetchone())`,
      javascript: `// In-memory data collections representation
const users = [{id: 1, name: "Alice"}];
console.log("User Row:", users[0]);`
    },
    exercises: [
      "Create a table 'products' with fields 'id', 'name', 'price', 'quantity'. Write code to insert 5 items and fetch items costing more than $50.",
      "Implement a SQL query that updates the price of a product by ID and verifies the change.",
      "Write code that deletes records from a database table where the quantity is zero."
    ]
  },
  26: {
    links: [{"name": "SQL INNER vs LEFT JOINs", "url": "https://www.w3schools.com/sql/sql_join.asp"}, {"name": "Foreign Key constraints guide", "url": "https://www.w3schools.com/sql/sql_foreignkey.asp"}, {"name": "SQL INNER JOIN Lesson (SQLBolt)", "url": "https://sqlbolt.com/lesson/select_queries_with_joins"}],
    concept: "Relational database tables are linked using Primary Keys (unique row identifiers) and Foreign Keys (references to columns in other tables). SQL JOIN operations dynamically combine rows from two or more tables based on matching key values, supporting INNER, LEFT, RIGHT, and FULL outer join types.",
    analogy: "A student table has students, and a grades table has grades. A join binds them by matching student ID columns, showing you student names alongside their test grades.",
    complexity: "Nested Loop Join: O(N*M). Index-based Hash Join: O(N + M). Space: O(Join Output).",
    examples: {
      python: `import sqlite3
con = sqlite3.connect(":memory:")
cur = con.cursor()
# Relations tables creation query
print("Executing INNER JOIN: SELECT * FROM primary INNER JOIN child ON primary.id = child.parent_id")`,
      javascript: `// Relational joins simulation
console.log("Relations joined via primary/foreign key connections.");`
    },
    exercises: [
      "Design a database schema representing 'authors' and 'books' (one-to-many relationship) and write a SQL query to list all books alongside their author's name.",
      "Implement a SQL query using `LEFT JOIN` to list all authors, even if they haven't written any books yet.",
      "Write a query that computes the total price of all books written by each author using `SUM()` and `GROUP BY`."
    ]
  },
  27: {
    links: [{"name": "Database B-Tree Indexing", "url": "https://en.wikipedia.org/wiki/Database_index"}, {"name": "B-Tree data structures visualization", "url": "https://www.geeksforgeeks.org/b-tree-set-1-introduction-2/"}, {"name": "Database Indexing Benefits (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/indexing-in-databases/"}],
    concept: "A database index is a auxiliary data structure (typically a B-Tree or Hash Index) that optimizes query performance by allowing the database engine to locate records without scanning the entire table (Sequential Scan). While indexing accelerates SELECT queries from O(N) to O(log N) or O(1), it incurs write overhead on INSERT/UPDATE/DELETE actions.",
    analogy: "Indexing is like the index at the back of a textbook: instead of reading all 500 pages (linear scan) to find 'DNS', you look at the index to find exactly page 123 (indexed lookup).",
    complexity: "Sequential Scan: O(N) time. Indexed Lookup: O(log N) for B-Trees, O(1) for Hash Indices.",
    examples: {
      python: `# Python dictionary hashing acts as an index lookup
lookup_index = {"Alice": 20, "Bob": 22}
print("Instant lookup for Bob:", lookup_index["Bob"])`,
      javascript: `// JS Maps act as indices
const lookupIndex = new Map([["Alice", 20], ["Bob", 22]]);
console.log("Instant lookup for Bob:", lookupIndex.get("Bob"));`
    },
    exercises: [
      "Implement a mock B-Tree node splitting simulation to show how indices adjust to insertions.",
      "Measure the execution time of linear searches vs. map-based indexed lookups as you scale list sizes from 10 to 100,000 items, printing a speed factor comparison.",
      "Add index columns: create a composite index mock that indexes records by both 'first_name' and 'last_name' for combined searches."
    ]
  },
  28: {
    links: [{"name": "Key-Value Append Log Engines", "url": "https://en.wikipedia.org/wiki/Key%E2%80%93value_database"}, {"name": "Log-Structured Merge (LSM) Trees", "url": "https://en.wikipedia.org/wiki/Log-structured_merge-tree"}, {"name": "Key-Value Stores (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/what-is-a-key-value-database/"}],
    concept: "A Key-Value store is a non-relational database engine that stores data as an associative array of keys and values. In high-performance systems, data is persisted to disk using an append-only transaction log (Write-Ahead Log) for durability, combined with in-memory indexes (like Hash Maps) to deliver extremely fast read and write throughput.",
    analogy: "A Key-Value store is like a locker room: each locker has a number (key) and holds your bag (value). You don't need tables or columns—just the locker number.",
    complexity: "Get/Put: O(1) memory lookup, O(1) file append/write duration. Space: O(Key Size).",
    examples: {
      python: `# Simulating in-memory caching mapping persistent files
kv_store = {"session_token": "92f3ac"}
print("Accessing Key:", kv_store["session_token"])`,
      javascript: `// In-memory key value map
const kvStore = { session_token: "92f3ac" };
console.log("Accessing Key:", kvStore.session_token);`
    },
    exercises: [
      "Implement database compression compaction: periodically parse your append log and remove obsolete duplicates to keep file sizes small.",
      "Add JSON structure recovery validation: if the log file gets corrupted, catch parsing exceptions and reset safely.",
      "Implement a TTL (Time-To-Live) cache on your keys: if a key is older than 5 seconds, delete it automatically on get requests."
    ]
  },
  29: {
    links: [{"name": "Model View Controller (MVC)", "url": "https://en.wikipedia.org/wiki/Model%E2%80%93view%E2%80%93controller"}, {"name": "Separation of Concerns Principle", "url": "https://en.wikipedia.org/wiki/Separation_of_concerns"}, {"name": "MVC Pattern Explained (FreeCodeCamp)", "url": "https://www.freecodecamp.org/news/the-mvc-pattern-explained/"}],
    concept: "The Model-View-Controller (MVC) is a software design pattern that decouples application concerns into three layers: (1) Model manages data state and business logic, (2) View renders the user interface presentation, and (3) Controller translates user inputs and coordinates updates between Model and View.",
    analogy: "A restaurant: Model is the pantry (data), View is the plate presentation (display), and Controller is the waiter (routes orders and coordinates details).",
    complexity: "MVC setup overhead: O(N) structural complexity, but simplifies modification time to O(1).",
    examples: {
      python: `# MVC architecture schema
print("Model: coordinates state database data structures")
print("View: prints console UI displays")
print("Controller: intercepts actions and updates models")`,
      javascript: `// MVC architectures logic mock
console.log("Separation established: View rendering inputs decoupled from Model state changes.");`
    },
    exercises: [
      "Expand the Todo MVC application to support editing a todo task text from the view controller.",
      "Add file persistence to the Todo MVC: make the Model load and save todo arrays to a JSON file on updates.",
      "Build a clear separation of concerns in a console Contacts book following MVC conventions."
    ]
  },
  30: {
    links: [{"name": "Token Bucket Rate Limiting", "url": "https://en.wikipedia.org/wiki/Token_bucket"}, {"name": "Leaky Bucket Traffic Shaping", "url": "https://en.wikipedia.org/wiki/Leaky_bucket"}, {"name": "Token Bucket Rate Limiting (GeeksforGeeks)", "url": "https://www.geeksforgeeks.org/token-bucket-algorithm/"}],
    concept: "Rate Limiting is a system security mechanism that controls the frequency of requests a client can make to a server, protecting resources from denial-of-service (DoS) attacks and brute-force API scraping. Common algorithms include the Token Bucket (allowing bursts) and the Leaky Bucket (smooth constant rate).",
    analogy: "A bucket holds a maximum of 5 water tokens. Water refills at 1 token per second. Every time you make an API request, you take 1 token. If the bucket is empty, you must wait for it to refill.",
    complexity: "Token verification check: O(1) time. Memory state overhead: O(User Size) index maps.",
    examples: {
      python: `# Token bucket tick calculator
bucket_tokens = 5
def check_limit():
    global bucket_tokens
    if bucket_tokens >= 1:
        bucket_tokens -= 1
        return "Allowed"
    return "Rate Limited"

print(check_limit())`,
      javascript: `// JS Token checks logic
let tokens = 5;
function checkLimit() {
  if (tokens >= 1) {
    tokens--;
    return "Allowed";
  }
  return "Rate Limited";
}
console.log(checkLimit());`
    },
    exercises: [
      "Implement the Sliding Window Log rate limiter algorithm, which tracks exact request timestamps for accuracy.",
      "Add client IP-based isolation: maintain a hash map of Token Buckets, one for each unique client IP, and rate limit them independently.",
      "Modify the Rate Limiter decorator to add standard HTTP response headers: 'X-RateLimit-Limit', 'X-RateLimit-Remaining', and 'Retry-After'."
    ]
  }
};
