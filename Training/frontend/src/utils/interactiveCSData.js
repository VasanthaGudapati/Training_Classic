// ==========================================================================
// 🎓 CSFORGE INTERACTIVE LEARNING COMPONENT DATA (DAYS 1 - 30)
// QUIZZES, FLASHCARDS, VISUAL SIMULATOR TRACES, FAANG PREP & LINE-EXPLAINERS
// ==========================================================================

export const INTERACTIVE_CS_DATA = {
  1: {
    objectives: {
      skills: ["Scope resolution", "Control flow optimization", "Stack frame trace"],
      prereqs: "None. Perfect for absolute beginners.",
      goals: [
        "Understand LEGB scope rules (Local, Enclosing, Global, Built-in).",
        "Trace execution call stack frames during function execution.",
        "Implement basic validation and input looping patterns."
      ]
    },
    realWorld: {
      description: "Google uses basic conditional branching in search query preprocessing to route queries. Amazon uses scope variables in serverless functions (AWS Lambda) to maintain isolation between requests.",
      examples: ["AWS Lambda context states", "Search query routing layers", "Input verification filters"]
    },
    comparison: {
      title: "Static vs. Dynamic Typing",
      headers: ["Feature", "Static Typing (C++/Java)", "Dynamic Typing (Python/JS)"],
      rows: [
        ["Memory Allocation", "Allocated at compile-time", "Allocated at run-time"],
        ["Type Check", "Strict type enforcement", "Weak/dynamic binding"],
        ["Performance", "Slightly faster (no runtime overhead)", "Slightly slower (requires type checks)"]
      ]
    },
    quizzes: [
      {
        question: "Where are local function variables allocated during execution?",
        options: ["On the Global Heap", "In the CPU Cache", "Within a Stack Frame", "On the Disk Buffer"],
        answer: 2,
        explanation: "Every time a function is called, a new execution stack frame is pushed onto the call stack. This frame holds parameters, return address, and local variables."
      },
      {
        question: "Which scope is checked last under LEGB rules?",
        options: ["Enclosing", "Built-in", "Global", "Local"],
        answer: 1,
        explanation: "Python resolves scope names in LEGB order: Local -> Enclosing -> Global -> Built-in. If not found in Built-in, a NameError is thrown."
      }
    ],
    flashcards: [
      { q: "What is a Stack Frame?", a: "A frame allocated on the call stack that stores a function's local variables, arguments, and return address during execution." },
      { q: "What is the difference between = and ==?", a: "= is the assignment operator (stores a value in memory), whereas == is the comparison operator (checks equality)." }
    ],
    cheatsheet: {
      summary: "Variables store data. Functions encapsulate logic. Stack frames manage scopes.",
      tips: ["Avoid global variables inside local function scopes.", "Always validate user input to prevent infinite loops."],
      syntax: "def func(param):\n    if param:\n        return True\n    return False"
    },
    dryRun: [
      { step: 1, desc: "Generate secret number = 42. Attempts initialized to 0." },
      { step: 2, desc: "User inputs guess = 30. Check validity: True. Increment attempts = 1." },
      { step: 3, desc: "Compare 30 < 42 -> Too Low. Print feedback." },
      { step: 4, desc: "User inputs guess = 50. Increment attempts = 2." },
      { step: 5, desc: "Compare 50 > 42 -> Too High. Print feedback." }
    ],
    interview: [
      {
        q: "What is a Stack Overflow error and how does it relate to the call stack?",
        a: "A stack overflow occurs when the call stack runs out of memory, usually because a recursive function lacks a base case, leading to infinite nested stack frame allocations.",
        difficulty: "Easy"
      }
    ],
    practice: [
      {
        title: "Limited Attempt Guessing Game",
        difficulty: "Easy",
        problem: "Modify the guessing game to limit guesses to 5 attempts.",
        hints: ["Keep a counter variable.", "Break the loop if counter reaches 5."],
        company: ["Amazon", "Meta"]
      }
    ],
    lineExplanations: {
      "secret_number = random.randint(1, 100)": "Uses cryptographically pseudo-random generation to reserve a number block.",
      "attempts += 1": "Increments the frame's execution tracker to evaluate efficiency.",
      "guess = int(user_input)": "Casts the string reference to a numerical stack variable."
    }
  },
  2: {
    objectives: {
      skills: ["Dynamic reallocation", "Amortized complexity calculation", "Shift insertions"],
      prereqs: "Day 1 Loops & Variables.",
      goals: [
        "Understand contiguous memory arrays.",
        "Implement capacity doubling resizing patterns.",
        "Calculate the amortized cost of insertions."
      ]
    },
    realWorld: {
      description: "Database engines like PostgreSQL use dynamic memory buffers to load query results. Web browsers use dynamic arrays to store the backward/forward navigation history.",
      examples: ["Java ArrayList", "Python List buffers", "C++ std::vector"]
    },
    comparison: {
      title: "Static vs. Dynamic Arrays",
      headers: ["Feature", "Static Array", "Dynamic Array"],
      rows: [
        ["Size", "Fixed on declaration", "Grows dynamically"],
        ["Memory Layout", "Contiguous block", "Contiguous block (reallocated)"],
        ["Insertion Time", "O(1) if space, else impossible", "O(1) amortized, O(N) during resize"]
      ]
    },
    quizzes: [
      {
        question: "What is the worst-case time complexity of inserting into a dynamic array?",
        options: ["O(1)", "O(log N)", "O(N)", "O(N^2)"],
        answer: 2,
        explanation: "In the worst case, the array is full and must double its capacity. This involves allocating new memory and copying all N elements, taking O(N) time."
      },
      {
        question: "What is amortized analysis in dynamic arrays?",
        options: ["Average cost per operation over a sequence of insertions", "The maximum space allocated", "Post-compilation optimization", "Reducing pointer counts"],
        answer: 0,
        explanation: "Amortized analysis measures the average performance of an operation over a long sequence, showing that rare O(N) resizes do not prevent average O(1) append speeds."
      }
    ],
    flashcards: [
      { q: "What is contiguous memory?", a: "Memory layout where elements are stored next to each other in index order, allowing constant-time O(1) lookups via offset calculation." },
      { q: "Why double array size on resize?", a: "Doubling guarantees that resizing is rare enough that the average (amortized) cost of insertions remains O(1)." }
    ],
    cheatsheet: {
      summary: "Dynamic arrays double capacity when full to provide amortized O(1) appends.",
      tips: ["Pre-allocate capacity if the final size is known.", "Be careful with insertions at indices, as they shift elements O(N)."],
      syntax: "capacity *= 2\nnew_data = [None] * capacity\ncopy(old_data, new_data)"
    },
    dryRun: [
      { step: 1, desc: "Capacity=2, Size=0, Data=[None, None]." },
      { step: 2, desc: "Append 10 -> Size=1, Data=[10, None]." },
      { step: 3, desc: "Append 20 -> Size=2, Data=[10, 20]." },
      { step: 4, desc: "Append 30 -> Array is Full! Resize capacity to 4. Copy [10, 20] to new block. Data=[10, 20, 30, None]." }
    ],
    interview: [
      {
        q: "Why is lookup in an array O(1) while searching is O(N)?",
        a: "Lookup uses the index to calculate the memory address directly (Base Address + Index * Element Size). Searching requires examining each element sequentially until the target is found.",
        difficulty: "Medium"
      }
    ],
    practice: [
      {
        title: "Dynamic Array Shrinking",
        difficulty: "Medium",
        problem: "Shrink array capacity by half when size falls below 25% of capacity to save memory.",
        hints: ["Check size/capacity ratio in remove operations.", "Ensure capacity doesn't drop below default threshold."],
        company: ["Google", "Microsoft"]
      }
    ],
    lineExplanations: {
      "self.capacity *= 2": "Doubles the internal pointer allocation size to avoid frequent updates.",
      "new_data[i] = self.data[i]": "Copies references to the newly allocated block in memory.",
      "self.size += 1": "Updates active indices in the linear structure."
    }
  },
  3: {
    objectives: {
      skills: ["String manipulation", "Sub-pattern matching", "Unicode decoding"],
      prereqs: "Day 2 Arrays.",
      goals: [
        "Understand string immutability in memory.",
        "Implement naive sliding window pattern matching.",
        "Solve palindrome and anagram puzzles."
      ]
    },
    realWorld: {
      description: "Search engines use string matching to search for terms. Bioinformaticians use pattern searching to identify sequence matches in long DNA sequence strings.",
      examples: ["DNA Sequence mapping", "Ctrl+F search logic", "HTML parsing tags"]
    },
    comparison: {
      title: "Naive Search vs. KMP",
      headers: ["Algorithm", "Time Complexity (Worst)", "Space Complexity"],
      rows: [
        ["Naive Search", "O(N * M)", "O(1)"],
        ["KMP Search", "O(N + M)", "O(M) for Pi table"]
      ]
    },
    quizzes: [
      {
        question: "Why are strings immutable in Python and Java?",
        options: ["To prevent compilation warnings", "For memory security, thread safety, and hash table key caching", "To decrease character encoding sizes", "Because characters have fixed bits"],
        answer: 1,
        explanation: "Immutability allows strings to be cached in the string pool safely, guarantees they will not change when used as Hash keys, and makes them naturally thread-safe."
      }
    ],
    flashcards: [
      { q: "What is String Immutability?", a: "The property where a string object's content cannot be changed after creation. Any modification creates a new string." },
      { q: "What is Naive Substring Search?", a: "A sliding window check testing every character index i of text to see if the subsequent characters match pattern." }
    ],
    cheatsheet: {
      summary: "Strings are character arrays. Immutability increases security but makes concatenation expensive.",
      tips: ["Use string join lists instead of repeated '+' concatenation.", "Two-pointer checks work in O(N) time for palindromes."],
      syntax: "left, right = 0, len(s)-1\nwhile left < right:"
    },
    dryRun: [
      { step: 1, desc: "Text = 'abac', Pattern = 'ac'. Length of text = 4, pattern = 2." },
      { step: 2, desc: "Index i = 0: compare 'ab' with 'ac' -> mismatch at index 1." },
      { step: 3, desc: "Index i = 1: compare 'ba' with 'ac' -> mismatch at index 0." },
      { step: 4, desc: "Index i = 2: compare 'ac' with 'ac' -> match found! Return index 2." }
    ],
    interview: [
      {
        q: "What is the runtime of checking if a string of length N is a palindrome?",
        a: "O(N) time because we compare characters from outside-in using two pointers. Space is O(1) as no new arrays are created.",
        difficulty: "Easy"
      }
    ],
    practice: [
      {
        title: "Valid Anagram Check",
        difficulty: "Easy",
        problem: "Given two strings s and t, return true if t is an anagram of s, and false otherwise.",
        hints: ["Count character occurrences using a frequency array or hash map.", "Compare the frequency counts."],
        company: ["Google", "Meta", "Amazon"]
      }
    ],
    lineExplanations: {
      "if text[i + j] != pattern[j]:": "Checks index match offset to terminate inner loops early."
    }
  },
  4: {
    objectives: {
      skills: ["Call stack execution", "Base case identification", "State recurrence mapping"],
      prereqs: "Day 1 Programming Foundations.",
      goals: [
        "Define what recursive base cases prevent infinite call loops.",
        "Trace variable values during stack winding and unwinding phases.",
        "Calculate complexity bounds for basic linear recursions."
      ]
    },
    realWorld: {
      description: "Compilers use recursive descent parsers to process source code files. Serialization tools like JSON.stringify use recursion to traverse nested objects.",
      examples: ["Folder directories size scanner", "JSON serializer objects", "XML document parsing DOM"]
    },
    comparison: {
      title: "Recursion vs. Iteration",
      headers: ["Metric", "Recursion", "Iteration (Loops)"],
      rows: [
        ["Space Cost", "O(N) stack frames for call trace", "O(1) memory overhead"],
        ["Code Readability", "High (expresses mathematical definitions)", "Medium (requires index variables)"],
        ["Time Speed", "Slightly slower (call stack push overhead)", "Slightly faster"]
      ]
    },
    quizzes: [
      {
        question: "What happens if a recursive function misses a base case?",
        options: ["The code executes faster", "The compiler fixes it automatically", "It triggers a StackOverflow error", "It switches to a loop"],
        answer: 2,
        explanation: "Without a base case, recursion continues infinitely, filling the call stack memory until it overflows and crashes."
      }
    ],
    flashcards: [
      { q: "What is Winding?", a: "The phase where recursive calls are made and stack frames are pushed onto the call stack." },
      { q: "What is Unwinding?", a: "The phase where the base case is hit and return values are computed back up the stack." }
    ],
    cheatsheet: {
      summary: "Recursion calls a function within itself. Every recursive call must move closer to a base case.",
      tips: ["Identify base cases first.", "Use recursion when the problem has self-similar subproblems (like trees)."],
      syntax: "def recursive_func(n):\n    if n <= 1: return 1\n    return n * recursive_func(n-1)"
    },
    dryRun: [
      { step: 1, desc: "Call factorial(3). Not base case -> Recurse 3 * factorial(2)." },
      { step: 2, desc: "Call factorial(2). Recurse 2 * factorial(1)." },
      { step: 3, desc: "Call factorial(1). Base case hit! Return 1." },
      { step: 4, desc: "Unwind factorial(2) -> 2 * 1 = 2. Unwind factorial(3) -> 3 * 2 = 6." }
    ],
    interview: [
      {
        q: "What is Tail Recursion and why is it useful?",
        a: "Tail recursion is when the recursive call is the last statement in the function. Some compilers optimize this to reuse the current stack frame, avoiding O(N) space costs.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Recursive String Reversal",
        difficulty: "Easy",
        problem: "Write a recursive function to reverse a string.",
        hints: ["Base case: empty string or length 1.", "Recurse on substring minus first character, then append first character."],
        company: ["Microsoft", "Adobe"]
      }
    ],
    lineExplanations: {
      "return n * factorial(n - 1)": "Executes recursive call, multiplying stack states during unwinding."
    }
  },
  5: {
    objectives: {
      skills: ["Pointer link swapping", "Dynamic pointer redirection", "Traversal optimization"],
      prereqs: "Day 2 Arrays & Day 4 Recursion.",
      goals: [
        "Construct node chains in memory.",
        "Implement O(1) head insertions and O(N) search traversals.",
        "Reverse node directions in-place."
      ]
    },
    realWorld: {
      description: "Music players use doubly linked lists to implement next/previous track play queues. Image viewers use list pointers to cycle forward and backward through folder images.",
      examples: ["Spotify playlist queues", "Web browser history back/forward", "Memory allocation page block lists"]
    },
    comparison: {
      title: "Linked Lists vs. Arrays",
      headers: ["Operation", "Linked List (Pointers)", "Array (Contiguous Slots)"],
      rows: [
        ["Access Index", "O(N) traversal search", "O(1) offset calculation"],
        ["Insert at Head", "O(1) pointer swap", "O(N) element shifts"],
        ["Memory Cache Friendliness", "Poor (scattered nodes)", "Excellent (sequential cache lines)"]
      ]
    },
    quizzes: [
      {
        question: "What is the space complexity to reverse a linked list in-place?",
        options: ["O(N)", "O(log N)", "O(1)", "O(N^2)"],
        answer: 2,
        explanation: "Reversing a list in-place only requires updating node pointers using three temporary pointer variables, resulting in O(1) auxiliary space."
      }
    ],
    flashcards: [
      { q: "What is a Node?", a: "A memory object containing a data value and a pointer (or reference) to the next node." },
      { q: "What is the Head of a list?", a: "A reference pointer to the first node of the linked list." }
    ],
    cheatsheet: {
      summary: "Linked lists links nodes dynamically via pointer addresses. Ideal for fast insertions.",
      tips: ["Always guard against NullPointerExceptions (checking if current node is null).", "Use a dummy head node to simplify node insertions/deletions."],
      syntax: "next_node = curr.next\ncurr.next = prev\nprev = curr\ncurr = next_node"
    },
    dryRun: [
      { step: 1, desc: "List: 1 -> 2 -> 3. Pointers initialized: prev=None, curr=1, next=None." },
      { step: 2, desc: "Node 1: next=curr.next (2). Redirect curr.next=prev (None). Move prev=curr (1), curr=next (2)." },
      { step: 3, desc: "Node 2: next=curr.next (3). Redirect curr.next=prev (1). Move prev=curr (2), curr=next (3)." },
      { step: 4, desc: "Node 3: next=curr.next (None). Redirect curr.next=prev (2). Move prev=curr (3), curr=next (None). Returns prev." }
    ],
    interview: [
      {
        q: "How do you detect a cycle/loop inside a linked list?",
        a: "Use Floyd's Cycle-Finding algorithm (Two Pointers). Run a fast pointer (moves 2 steps) and a slow pointer (moves 1 step). If they meet, a cycle exists.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Find Middle of List",
        difficulty: "Easy",
        problem: "Return the middle node of a singly linked list in a single traversal.",
        hints: ["Use fast and slow pointers.", "When fast pointer reaches the end, slow pointer will be at the middle."],
        company: ["Google", "Meta"]
      }
    ],
    lineExplanations: {
      "curr.next = prev": "Redirects the pointer of the current node to point backwards."
    }
  },
  6: {
    objectives: {
      skills: ["Divide & conquer sorting", "Midpoint binary indexes", "Pivot partitioning"],
      prereqs: "Day 2 Arrays.",
      goals: [
        "Trace binary search target scopes.",
        "Implement bubble sort and insertion sort swaps.",
        "Calculate partition steps in quicksort."
      ]
    },
    realWorld: {
      description: "E-commerce websites use sorting algorithms to order products by price or ratings. Search engines use binary search to locate terms in sorted database tables.",
      examples: ["Price rating sorting filters", "Auto-complete dictionary checks", "Database index key lookups"]
    },
    comparison: {
      title: "Binary Search vs. Linear Search",
      headers: ["Metric", "Linear Search", "Binary Search (Sorted Arrays)"],
      rows: [
        ["Time Complexity", "O(N) scans", "O(log N) splits"],
        ["Prerequisites", "None (works on unsorted data)", "Array must be sorted in order"],
        ["Implementation", "Sequential loop scan", "Midpoint index bounds check"]
      ]
    },
    quizzes: [
      {
        question: "What is the worst-case sorting time of Quicksort?",
        options: ["O(N log N)", "O(N)", "O(N^2)", "O(log N)"],
        answer: 2,
        explanation: "If the pivot chosen is consistently the smallest or largest element (e.g., array already sorted), Quicksort degrades to O(N^2) time."
      }
    ],
    flashcards: [
      { q: "What is Binary Search?", a: "An O(log N) search algorithm that repeatedly halves the search range in a sorted array to locate a target." },
      { q: "What is a Stable Sort?", a: "A sorting algorithm that preserves the relative order of duplicate keys." }
    ],
    cheatsheet: {
      summary: "Search scans for elements. Sorting orders elements. Binary search requires sorted bounds.",
      tips: ["Avoid overflow in binary search using: mid = low + (high - low) // 2.", "Merge sort is stable and guarantees O(N log N) but uses O(N) extra space."],
      syntax: "mid = (low + high) // 2\nif arr[mid] == target: return mid"
    },
    dryRun: [
      { step: 1, desc: "Sorted Array: [10, 20, 30, 40, 50], Target = 40. Pointers: low=0, high=4." },
      { step: 2, desc: "Calculate mid = (0+4)//2 = 2. Value arr[2] = 30." },
      { step: 3, desc: "Compare 30 < 40 -> Target lies in right half. Move low = mid + 1 = 3." },
      { step: 4, desc: "Recalculate mid = (3+4)//2 = 3. Value arr[3] = 40. Target found at index 3!" }
    ],
    interview: [
      {
        q: "What is the time and space complexity of Merge Sort?",
        a: "Time is O(N log N) in all cases (best, average, worst) because it divides the array in half and merges. Space is O(N) to store temporary sub-arrays during merging.",
        difficulty: "Medium"
      }
    ],
    practice: [
      {
        title: "Search Insert Position",
        difficulty: "Easy",
        problem: "Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.",
        hints: ["Use standard binary search bounds.", "Return the low pointer index if target is not found."],
        company: ["Google", "Meta", "Amazon"]
      }
    ],
    lineExplanations: {
      "high = mid - 1": "Shifts search range to left partition blocks."
    }
  },
  7: {
    objectives: {
      skills: ["Encapsulation variables", "Polymorphism inheritance", "Interfaces design"],
      prereqs: "Day 1 Programming Foundations.",
      goals: [
        "Design classes with private states and variables.",
        "Implement constructor parameters initialization.",
        "Demonstrate subclass inheritance overrides."
      ]
    },
    realWorld: {
      description: "GUI libraries (like Android SDK or iOS UIKit) use inheritance to build custom UI widgets from base View components. Banking backends use OOP classes to model accounts, security checks, and credit logs.",
      examples: ["UI Widget base classes", "Game player model classes", "Database connection abstract classes"]
    },
    comparison: {
      title: "Composition vs. Inheritance",
      headers: ["Design Pattern", "Definition", "Flexibility"],
      rows: [
        ["Inheritance", "Is-A relationship (subclass extends parent class)", "Tight coupling (changes in parent affect child)"],
        ["Composition", "Has-A relationship (class contains instances of others)", "Loose coupling (components can be swapped dynamically)"]
      ]
    },
    quizzes: [
      {
        question: "Which OOP pillar hides the internal state details of an object?",
        options: ["Inheritance", "Polymorphism", "Encapsulation", "Abstraction"],
        answer: 2,
        explanation: "Encapsulation restricts direct access to object variables and states, exposing them only via secure getter and setter methods."
      }
    ],
    flashcards: [
      { q: "What is Polymorphism?", a: "The ability for different classes to respond to the same method call in their own specific way (e.g., method overriding)." },
      { q: "What is an Interface?", a: "A contract defining a set of methods that a class must implement, decoupling definition from execution." }
    ],
    cheatsheet: {
      summary: "OOP uses classes to package variables and methods into objects.",
      tips: ["Favor composition over inheritance to make code flexible.", "Keep class variables private unless subclass access is explicitly required."],
      syntax: "class Account:\n    def __init__(self, owner):\n        self.__balance = 0 # Private"
    },
    dryRun: [
      { step: 1, desc: "Create BankAccount with owner='Alice', balance=100." },
      { step: 2, desc: "Call Alice.withdraw(40). Check validation: 40 <= 100 -> balance becomes 60." },
      { step: 3, desc: "Call Alice.withdraw(100). Check validation: 100 > 60 -> Insufficient funds. Transaction blocked." }
    ],
    interview: [
      {
        q: "What is the difference between Abstract Classes and Interfaces?",
        a: "An abstract class can contain concrete methods (with logic) and state variables, whereas an interface historically defines only method signatures without state or logic.",
        difficulty: "Medium"
      }
    ],
    practice: [
      {
        title: "Credit Card Account Subclass",
        difficulty: "Medium",
        problem: "Inherit BankAccount to create a CreditCardAccount that allows overdrawing up to a specific limit, charging a fee on overdraft transactions.",
        hints: ["Override the withdraw method.", "Add logic to check if (balance - amount) >= limit."],
        company: ["Goldman Sachs", "J.P. Morgan"]
      }
    ],
    lineExplanations: {
      "self.__balance = balance": "Declares private variable not accessible outside class boundaries."
    }
  },
  8: {
    objectives: {
      skills: ["LIFO stack evaluations", "FIFO queue round-robins", "Array-based buffering"],
      prereqs: "Day 5 Linked Lists.",
      goals: [
        "Implement LIFO stack structures.",
        "Implement FIFO queue structures.",
        "Evaluate parentheses matching syntax patterns."
      ]
    },
    realWorld: {
      description: "Compilers use stacks to parse syntax brackets. Operating Systems use queues to queue CPU threads or network packets.",
      examples: ["Browser back undo history (Stack)", "Print jobs document buffers (Queue)", "CPU scheduler queues (Queue)"]
    },
    comparison: {
      title: "Stack (LIFO) vs. Queue (FIFO)",
      headers: ["Operation", "Stack (LIFO)", "Queue (FIFO)"],
      rows: [
        ["Push / Enqueue", "O(1) at top of array/list", "O(1) at tail of list"],
        ["Pop / Dequeue", "O(1) from top of array/list", "O(1) from head of list"],
        ["Order Traversal", "Last In First Out", "First In First Out"]
      ]
    },
    quizzes: [
      {
        question: "Which data structure is ideal for depth-first searches?",
        options: ["Queue", "Hash Table", "Stack", "Binary Tree"],
        answer: 2,
        explanation: "Stacks are LIFO structures, which align perfectly with DFS where we explore deeply, backtracking by popping states from the call stack."
      }
    ],
    flashcards: [
      { q: "What is LIFO?", a: "Last-In, First-Out. The most recently added element is the first one removed (e.g. stack of plates)." },
      { q: "What is FIFO?", a: "First-In, First-Out. The oldest element in the collection is the first one removed (e.g. queue line)." }
    ],
    cheatsheet: {
      summary: "Stacks match scopes. Queues schedule tasks. Both have O(1) insertion and deletion.",
      tips: ["Use stacks for nested operations like parentheses or mathematical expressions.", "Implement queues using linked lists or circular arrays to avoid O(N) element shifts on dequeue."],
      syntax: "stack.append(x) # Push\nstack.pop() # Pop"
    },
    dryRun: [
      { step: 1, desc: "Input string: '()[]'. Empty stack = []." },
      { step: 2, desc: "Character '(': push to stack -> stack = ['(']." },
      { step: 3, desc: "Character ')': matches top '(' -> pop stack -> stack = []." },
      { step: 4, desc: "Character '[': push to stack -> stack = ['[']." },
      { step: 5, desc: "Character ']': matches top '[' -> pop stack -> stack = []. Returns True." }
    ],
    interview: [
      {
        q: "How do you implement a queue using two stacks?",
        a: "Use Stack1 for enqueuing. For dequeuing, if Stack2 is empty, pop all elements from Stack1 and push them into Stack2 (reversing their order). Pop from Stack2.",
        difficulty: "Medium"
      }
    ],
    practice: [
      {
        title: "Min Stack Design",
        difficulty: "Medium",
        problem: "Design a stack that retrieves the minimum element in O(1) time.",
        hints: ["Maintain a second helper stack.", "Push current min to helper stack on insertions."],
        company: ["Microsoft", "Uber", "Amazon"]
      }
    ],
    lineExplanations: {
      "stack.push(char)": "Saves matching opening parenthesis into stack frame memory.",
      "self.items.pop(0)": "Dequeues the front queue element, shifting references in O(N)."
    }
  },
  9: {
    objectives: {
      skills: ["Polynomial hash mapping", "Collision chaining resolution", "O(1) map access"],
      prereqs: "Day 2 Arrays & Day 8 Lists.",
      goals: [
        "Implement a custom hash map.",
        "Write a polynomial rolling hash function.",
        "Resolve collisions using bucket lists (chaining)."
      ]
    },
    realWorld: {
      description: "Compilers use Hash tables to lookup symbol names and variables. Caching services like Redis use distributed hash rings to cache server responses.",
      examples: ["Redis cache servers", "Java HashMaps", "DNS server routing tables"]
    },
    comparison: {
      title: "Chaining vs. Linear Probing",
      headers: ["Collision Type", "Chaining (Lists)", "Linear Probing (Array Slots)"],
      rows: [
        ["Memory Cost", "Higher (requires node pointer allocation)", "Lower (uses open array slots)"],
        ["Clustering Risk", "No clustering", "High risk of primary/secondary clustering"]
      ]
    },
    quizzes: [
      {
        question: "What is a hash collision in a HashMap?",
        options: ["An array index out of bounds", "Two different keys mapping to the same bucket index", "Database socket disconnect", "Variables garbage collected"],
        answer: 1,
        explanation: "Collisions occur when two distinct keys yield the same hash value, mapping them to the same bucket index."
      }
    ],
    flashcards: [
      { q: "What is a Polynomial Hash?", a: "A hash calculation that multiplies character codes by powers of a prime number (like 31) to distribute values evenly." },
      { q: "What is Load Factor?", a: "The ratio of elements to bucket size (N/B). When load factor > 0.75, maps resize to maintain O(1) speeds." }
    ],
    cheatsheet: {
      summary: "Hash Maps map keys to indices. Prime multiples reduce collisions.",
      tips: ["Always use prime numbers as hash multipliers.", "Keep the capacity dynamic to prevent linear degradation O(N)."],
      syntax: "bucket_idx = hash(key) % num_buckets"
    },
    dryRun: [
      { step: 1, desc: "HashMap capacity = 5. Buckets = [[], [], [], [], []]." },
      { step: 2, desc: "Put('apple', 1.2) -> Hash('apple') = 2. Buckets[2] = [('apple', 1.2)]." },
      { step: 3, desc: "Put('banana', 0.5) -> Hash('banana') = 2. Collision! Chaining: Buckets[2] = [('apple', 1.2), ('banana', 0.5)]." }
    ],
    interview: [
      {
        q: "What is the worst-case time complexity of HashMap lookup and how do we prevent it?",
        a: "Worst-case is O(N) when all keys collide into the same bucket. We prevent it with a good hash function, resizing, and converting chains to balanced BSTs (Java 8+).",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Dynamic HashMap Resizing",
        difficulty: "Hard",
        problem: "Resize HashMap buckets when load factor (items/buckets) exceeds 0.75.",
        hints: ["Double the bucket count.", "Rehash all existing keys into new buckets."],
        company: ["Google", "Atlassian", "Meta"]
      }
    ],
    lineExplanations: {
      "hash_val = (hash_val * prime + ord(char)) % ...": "Polynomial rolling code to scatter ASCII values evenly.",
      "for k, v in bucket:": "Scans chained bucket elements to resolve collisions sequentially."
    }
  }
};

// ==========================================================================
// 🗺️ DYNAMIC CS DATA GENERATOR FOR DAYS 10 TO 30
// GUARANTEES ZERO EMPTY FIELDS OR PLACEHOLDERS THROUGHOUT THE PLATFORM
// ==========================================================================

const topicsMap = {
  10: {
    title: "Binary Trees",
    skills: ["Tree Traversal", "Recursive Node Traversal", "Binary Tree Properties"],
    prereqs: "Day 5 Linked Lists & Day 4 Recursion.",
    goals: ["Understand parent-child hierarchical memory.", "Implement pre-order, in-order, and post-order depth-first traversals.", "Calculate height and depth metrics of node trees."],
    realWorldDesc: "DOM rendering trees in browsers, JSON nested parsing structures, and Abstract Syntax Trees in compiler optimization layers.",
    realWorldEx: ["DOM trees", "AST compiler syntax", "Directory folder indexes"],
    compTitle: "DFS Traversal Orders",
    compHeaders: ["Traversal Type", "Visit Node Order", "Primary Application"],
    compRows: [
      ["Pre-Order", "Root -> Left -> Right", "Copying trees, evaluating prefix expressions"],
      ["In-Order", "Left -> Root -> Right", "Sorted prints for BSTs, validation checks"],
      ["Post-Order", "Left -> Right -> Root", "Node deletion, directory size calculation"]
    ],
    quizzes: [
      {
        question: "What is the maximum number of nodes at level L in a binary tree?",
        options: ["2 * L", "L^2", "2^L", "2^(L-1)"],
        answer: 2,
        explanation: "At the root (level 0), there is 1 node (2^0). At level 1, there are 2 nodes (2^1). In general, level L can have up to 2^L nodes."
      },
      {
        question: "Which traversal visits the root node last?",
        options: ["Pre-Order", "In-Order", "Post-Order", "Level-Order"],
        answer: 2,
        explanation: "Post-Order traversal recursively visits the left subtree, then the right subtree, and finally visits the root node."
      }
    ],
    flashcards: [
      { q: "What is a Leaf Node?", a: "A node in a tree structure that has no children (both left and right pointers are null)." },
      { q: "What is the Height of a Binary Tree?", a: "The number of edges on the longest path from the root to a leaf node." }
    ],
    cheatsheet: {
      summary: "Trees store hierarchical data. Recursive DFS traversals use call stack frames.",
      tips: ["Always check if the root is null as the recursive base case.", "Post-order is ideal for bottom-up calculations like tree height."],
      syntax: "def inorder(root):\n    if root:\n        inorder(root.left)\n        print(root.val)\n        inorder(root.right)"
    },
    dryRun: [
      { step: 1, desc: "Call inorder(root) with root node 1. Node 1 is not null." },
      { step: 2, desc: "Recurse inorder(1.left) -> node 2. Recurse inorder(2.left) -> null. Print 2." },
      { step: 3, desc: "Recurse inorder(2.right) -> null. Returns to node 1. Print 1." },
      { step: 4, desc: "Recurse inorder(1.right) -> node 3. Print 3. Traversal complete." }
    ],
    interview: [
      {
        q: "How do you calculate the maximum depth of a binary tree?",
        a: "Recursively find the max depth of the left subtree and right subtree, then return the maximum of the two plus one for the root: 1 + max(depth(left), depth(right)).",
        difficulty: "Medium"
      }
    ],
    practice: [
      {
        title: "Balanced Binary Tree Check",
        difficulty: "Medium",
        problem: "Check if a binary tree is height-balanced (height difference between left and right subtrees of any node is at most 1).",
        hints: ["Write a helper function to calculate height.", "Return -1 from the helper if any subtree is unbalanced."],
        company: ["Amazon", "Meta", "Google"]
      }
    ],
    lineExplanations: {
      "self.left = None": "Initializes the left child reference pointer to null.",
      "return 1 + max(self.left_height, self.right_height)": "Aggregates heights bottom-up plus the root level."
    }
  },
  11: {
    title: "Binary Search Trees",
    skills: ["BST Order Invariant", "BST Search", "BST Node Insertion"],
    prereqs: "Day 10 Binary Trees.",
    goals: ["Understand sorted property preservation rules.", "Perform efficient O(log N) searches and node inserts.", "Verify tree invariants."],
    realWorldDesc: "Database engines use B-Tree indexes (variants of BSTs) to index large tables on disk. Routers use trie BSTs for routing prefixes lookup.",
    realWorldEx: ["Database Indexes", "Prefix lookups", "Heap sorting nodes"],
    compTitle: "BST vs. Array Search",
    compHeaders: ["Data Structure", "Search Time (Average)", "Insert Time (Average)"],
    compRows: [
      ["Balanced BST", "O(log N)", "O(log N)"],
      ["Unsorted Array", "O(N)", "O(1) (append)"],
      ["Sorted Array", "O(log N)", "O(N) (shifting)"]
    ],
    quizzes: [
      {
        question: "In-order traversal of a BST yields elements in which order?",
        options: ["Unsorted", "Reversed sorted", "Sorted ascending", "Level order"],
        answer: 2,
        explanation: "Since BST properties state left < root < right, traversing Left -> Root -> Right yields keys in sorted order."
      }
    ],
    flashcards: [
      { q: "What is BST Invariant?", a: "For any node N, all keys in N's left subtree are smaller than N's key, and all keys in N's right subtree are larger." }
    ],
    cheatsheet: {
      summary: "BST preserves sorted invariants. Offers O(log N) searches in balanced configurations.",
      tips: ["Degenerate trees act like linked lists with O(N) operations.", "Verify BST by passing min/max constraints recursively."],
      syntax: "if val < root.val: return search(root.left, val)"
    },
    dryRun: [
      { step: 1, desc: "Search 25 in BST with Root=20. Compare 25 > 20 -> recurse right." },
      { step: 2, desc: "Node=30. Compare 25 < 30 -> recurse left." },
      { step: 3, desc: "Node=25. Compare 25 == 25 -> target node matched! Return True." }
    ],
    interview: [
      {
        q: "How do you validate if a binary tree is a valid BST?",
        a: "Recursively check nodes keeping track of valid min and max limits. Left child must be in (min, parent.val) and right child must be in (parent.val, max).",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Kth Smallest Element in BST",
        difficulty: "Medium",
        problem: "Find the kth smallest element in a binary search tree.",
        hints: ["Perform in-order traversal which visits elements in sorted order.", "Keep a counter and return when counter reaches k."],
        company: ["Google", "Microsoft", "Uber"]
      }
    ],
    lineExplanations: {
      "if val < self.val:": "Routes search traversal leftward in accordance with sorted boundaries."
    }
  },
  12: {
    title: "Graphs",
    skills: ["Adjacency List representation", "BFS Search", "DFS recursion"],
    prereqs: "Day 8 Stacks & Queues.",
    goals: ["Model networks using adjacency list mappings.", "Traverse graphs using queues for Breadth-First Search.", "Determine connected nodes."],
    realWorldDesc: "LinkedIn uses graphs to map connections. Google Maps uses pathfinding algorithms like Dijkstra to calculate directions.",
    realWorldEx: ["Social graphs", "GPS Path routing", "Garbage collection reference graphs"],
    compTitle: "BFS vs. DFS",
    compHeaders: ["Metric", "BFS (Breadth-First)", "DFS (Depth-First)"],
    compRows: [
      ["Queue/Stack", "Queue (FIFO)", "Stack / Call Stack (LIFO)"],
      ["Shortest Path", "Guaranteed for unweighted graphs", "Not guaranteed"],
      ["Memory Cost", "O(W) wide frontier queues", "O(D) deep recursive stacks"]
    ],
    quizzes: [
      {
        question: "Which data structure is used to track visited nodes in graph traversals to prevent cycles?",
        options: ["Array", "Linked List", "Set / Hash Set", "Binary Tree"],
        answer: 2,
        explanation: "Sets provide O(1) average lookups to verify if a node has already been visited, preventing infinite loops."
      }
    ],
    flashcards: [
      { q: "What is an Adjacency List?", a: "A collection of lists where each node tracks its list of neighboring nodes." }
    ],
    cheatsheet: {
      summary: "Graphs map vertices and edges. BFS uses queues. DFS uses recursion.",
      tips: ["Always keep track of visited nodes to avoid cyclic loops.", "Use BFS when searching for shortest path distances."],
      syntax: "queue.append(start)\nvisited.add(start)"
    },
    dryRun: [
      { step: 1, desc: "BFS from Node A. Queue=[A], Visited={A}." },
      { step: 2, desc: "Dequeue A. Neighbors of A are B and C. Add to Queue=[B, C], Visited={A, B, C}." },
      { step: 3, desc: "Dequeue B. Neighbors of B are already visited. Queue=[C]." },
      { step: 4, desc: "Dequeue C. Queue is empty. BFS complete." }
    ],
    interview: [
      {
        q: "What is a topological sort and when can it be used?",
        a: "Topological sorting orders vertices in a directed acyclic graph (DAG) such that edge u -> v implies u comes before v. Used for task schedules and compiling packages.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Find Path in Graph",
        difficulty: "Easy",
        problem: "Determine if a valid path exists between a source node and a destination node in an undirected graph.",
        hints: ["Perform standard BFS or DFS traversal starting from source.", "Check if destination is visited during traversal."],
        company: ["Facebook", "Amazon"]
      }
    ],
    lineExplanations: {
      "visited.add(curr)": "Marks node visited to avoid processing cycles."
    }
  },
  13: {
    title: "File I/O & Log Parser",
    skills: ["Disk buffer streaming", "Regex pattern parsing", "Log indexing"],
    prereqs: "Day 3 Strings.",
    goals: ["Read large files line-by-line without high RAM usage.", "Parse records using regex filters.", "Calculate occurrence totals."],
    realWorldDesc: "Datadog and Splunk parse server output logs in real-time. Cloud service providers parse request outputs to detect network anomalies.",
    realWorldEx: ["Log collectors", "CSV exporters", "Data importing streams"],
    compTitle: "Full Read vs. Line Streaming",
    compHeaders: ["Metric", "read() (Full file in RAM)", "readline() (Buffered streaming)"],
    compRows: [
      ["Memory usage", "O(File Size) - High risk of crashing", "O(Line Size) - Constant low RAM footprint"],
      ["Speed", "Slightly faster for tiny files", "Stable for gigabyte data files"]
    ],
    quizzes: [
      {
        question: "Why should we stream files line-by-line instead of loading them with read()?",
        options: ["To format line breaks", "To avoid Out-Of-Memory system crashes on large data files", "To enable write locks", "Because Python demands it"],
        answer: 1,
        explanation: "Loading multi-gigabyte logs into memory at once crashes the process. Streaming processes lines sequentially within a small buffer."
      }
    ],
    flashcards: [
      { q: "What is buffered reading?", a: "Reading data in small blocks into memory, reducing the overhead of repeated direct system calls to the hard drive." }
    ],
    cheatsheet: {
      summary: "Open files safely. Read buffered lines. Use regex to extract details.",
      tips: ["Always use context managers (with open) to auto-close files.", "Strip trailing whitespaces and line breaks after reading."],
      syntax: "with open('file.txt') as f:\n    for line in f:\n        process(line)"
    },
    dryRun: [
      { step: 1, desc: "Open 'sys.log'. Initialize error count = 0." },
      { step: 2, desc: "Read Line 1: 'INFO User logged in' -> No match." },
      { step: 3, desc: "Read Line 2: 'ERROR Out of memory' -> Matches regex! error count becomes 1." },
      { step: 4, desc: "Reach EOF. Close file stream. Return errors = 1." }
    ],
    interview: [
      {
        q: "What does the 'with' statement do in Python file operations?",
        a: "It establishes a context manager that guarantees resources are cleaned up and the file descriptor is closed, even if exceptions are raised during execution.",
        difficulty: "Easy"
      }
    ],
    practice: [
      {
        title: "Log Error Aggregator",
        difficulty: "Medium",
        problem: "Parse a server log file and write all ERROR lines to a separate file 'errors.log', prepending timestamps.",
        hints: ["Open input file in read mode and output file in write mode.", "Iterate over lines, match 'ERROR' string, write to output."],
        company: ["Uber", "Stripe"]
      }
    ],
    lineExplanations: {
      "with open(path, 'r') as file:": "Leverages context boundaries to auto-release system resource descriptors."
    }
  },
  14: {
    title: "CPU Scheduling",
    skills: ["First-Come-First-Served (FCFS)", "Round-Robin scheduling", "Process latency math"],
    prereqs: "Day 8 Queues.",
    goals: ["Compute wait times.", "Simulate time-slice Round Robin execution loops.", "Compare average turnaround efficiency."],
    realWorldDesc: "OS Kernels coordinate multi-tasking across processes. Load balancers schedule web requests to nodes using round-robin routing.",
    realWorldEx: ["Linux scheduler", "Nginx round-robin", "Job queues"],
    compTitle: "FCFS vs. Round Robin",
    compHeaders: ["Scheduling Algorithm", "Turnaround Efficiency", "Starvation risk"],
    compRows: [
      ["First-Come-First-Served", "Poor (high average wait if large task blocks)", "None"],
      ["Round-Robin", "Excellent for interactive tasks", "Low (guarantees CPU time share)"]
    ],
    quizzes: [
      {
        question: "What is the convoy effect in scheduling?",
        options: ["CPU cache thrashing", "Short processes waiting behind a long-running process", "Overlapping thread executions", "Memory leakage"],
        answer: 1,
        explanation: "The Convoy Effect occurs when short processes wait a long time for a single long process to finish executing (like in FCFS)."
      }
    ],
    flashcards: [
      { q: "What is Turnaround Time?", a: "Total duration from process submission to its complete termination (Wait Time + Execution Time)." }
    ],
    cheatsheet: {
      summary: "Round Robin uses time slices and FIFO queues to schedule processes fairly.",
      tips: ["Short time slices increase context-switching overhead.", "Round robin minimizes average response latency."],
      syntax: "while queue:\n    job = queue.pop(0)\n    run(job, time_slice)"
    },
    dryRun: [
      { step: 1, desc: "Jobs: P1(time=5), P2(time=2). Time slice = 3. Queue=[P1, P2]." },
      { step: 2, desc: "Run P1 for 3 units -> remaining = 2. Push P1 back. Queue=[P2, P1]." },
      { step: 3, desc: "Run P2 for 2 units -> P2 finished. Queue=[P1]." },
      { step: 4, desc: "Run P1 for remaining 2 units -> P1 finished. Queue is empty." }
    ],
    interview: [
      {
        q: "What is Context Switching in OS scheduling?",
        a: "The process of storing the state (registers, program counter) of a running thread so it can be resumed later, and loading the state of a new thread to run.",
        difficulty: "Medium"
      }
    ],
    practice: [
      {
        title: "Shortest Job First Simulator",
        difficulty: "Hard",
        problem: "Simulate Shortest Job First (SJF) scheduling where the job with the shortest execution time is scheduled next.",
        hints: ["Sort pending jobs by execution time.", "Pick the shortest job, increment total time, compute waiting stats."],
        company: ["Intel", "Microsoft"]
      }
    ],
    lineExplanations: {
      "curr_time += min(burst, time_slice)": "Tracks logical clock ticks by executing jobs in slices."
    }
  },
  15: {
    title: "Basic Threads",
    skills: ["Thread creation APIs", "Shared address spacing", "Concurrency contexts"],
    prereqs: "Day 14 CPU Scheduling.",
    goals: ["Spawn system threads concurrently.", "Explain the shared memory space.", "Observe interleaving print logs."],
    realWorldDesc: "Web servers (Apache/Tomcat) spawn threads to process multiple client requests simultaneously. Browsers download image resources using background worker threads.",
    realWorldEx: ["Multi-threaded download apps", "Web server connection thread pools", "Image rendering backgrounds"],
    compTitle: "Process vs. Thread",
    compHeaders: ["Metric", "Process", "Thread"],
    compRows: [
      ["Memory Space", "Isolated virtual space (requires IPC)", "Shared parent address space"],
      ["Creation Cost", "Heavy resource allocation", "Light overhead"],
      ["Crash Impact", "Crashes only itself", "Can crash parent process and sibling threads"]
    ],
    quizzes: [
      {
        question: "Which component is shared among sibling threads belonging to the same process?",
        options: ["CPU Register states", "Thread Stack memory", "Global variables and code segments", "Program counter offsets"],
        answer: 2,
        explanation: "Threads share the process memory heap, code base, open files, and global variables, but have their own registers and execution stacks."
      }
    ],
    flashcards: [
      { q: "What is concurrency?", a: "The ability to run multiple tasks in overlapping periods (interleaved on a single core or parallel on multi-cores)." }
    ],
    cheatsheet: {
      summary: "Threads are lightweight execution units inside a process. They share the same address space.",
      tips: ["Shared memory makes threads fast, but requires synchronization.", "Always join threads to ensure the main parent thread waits for their termination."],
      syntax: "t = Thread(target=worker)\nt.start()\nt.join()"
    },
    dryRun: [
      { step: 1, desc: "Main starts thread A and thread B. Shared counter = 0." },
      { step: 2, desc: "Thread A reads counter = 0. Thread B reads counter = 0." },
      { step: 3, desc: "Thread A increments and writes counter = 1." },
      { step: 4, desc: "Thread B increments and writes counter = 1 (lost update due to race!)." }
    ],
    interview: [
      {
        q: "What is the Python GIL (Global Interpreter Lock)?",
        a: "A mutex lock that restricts Python bytecodes execution to a single thread at a time on CPython, making standard threads ineffective for CPU-bound tasks.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Concurrent Image Downloader",
        difficulty: "Medium",
        problem: "Simulate downloading 5 image assets concurrently using thread workers, reporting download completion.",
        hints: ["Create threads in a loop.", "Store thread objects in a list, then loop and call join()."],
        company: ["Netflix", "Meta"]
      }
    ],
    lineExplanations: {
      "thread.start()": "Instructs the operating system to schedule thread execution frames."
    }
  },
  16: {
    title: "Locks & Synchronization",
    skills: ["Mutex locking", "Shared resource thread safety", "Race condition prevention"],
    prereqs: "Day 15 Basic Threads.",
    goals: ["Guarding variables using Mutex blocks.", "Prevent lost updates caused by concurrent race conditions.", "Identify deadlock conditions."],
    realWorldDesc: "Banking databases lock accounts during simultaneous cash withdrawals. E-commerce sites lock inventory tickets during payment checkouts.",
    realWorldEx: ["Ticket booking seat locks", "Bank transaction serializations", "Concurrent log file writers"],
    compTitle: "Race vs. Synced State",
    compHeaders: ["Metric", "Unsynchronized threads", "Synchronized (Locked) threads"],
    compRows: [
      ["Execution Speed", "Faster (no waiting for lock flags)", "Slightly slower (wait locks queue)"],
      ["Data Integrity", "Corrupted (lost updates, inconsistent counts)", "Consistent (guarantees correct mathematical totals)"]
    ],
    quizzes: [
      {
        question: "What is a race condition?",
        options: ["A compilation benchmark test", "Multiple threads modifying shared memory concurrently with outputs depending on execution order", "CPU clock speed differences", "Network packets arriving out of order"],
        answer: 1,
        explanation: "Race conditions happen when concurrent reads/writes overlap, causing calculations to depend on thread execution timing."
      }
    ],
    flashcards: [
      { q: "What is a Mutex?", a: "Mutual Exclusion. A lock variable used to restrict access to a critical section to one thread at a time." }
    ],
    cheatsheet: {
      summary: "Critical sections must be locked. Locks enforce thread serialization.",
      tips: ["Lock early, release immediately to minimize wait blocks.", "Deadlocks occur when threads hold locks while waiting for locks held by others."],
      syntax: "lock.acquire()\ntry:\n    critical_section()\nfinally:\n    lock.release()"
    },
    dryRun: [
      { step: 1, desc: "Thread A acquires lock. Enters critical section." },
      { step: 2, desc: "Thread B attempts to acquire lock -> Blocked! Thread B enters waiting queue." },
      { step: 3, desc: "Thread A increments counter from 10 to 11. Thread A releases lock." },
      { step: 4, desc: "Thread B is woke up, acquires lock, enters critical section, increments to 12. Releases lock." }
    ],
    interview: [
      {
        q: "What are the 4 Coffman conditions required for a deadlock to occur?",
        a: "1. Mutual Exclusion, 2. Hold and Wait, 3. No Preemption, 4. Circular Wait.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Thread-Safe Queue",
        difficulty: "Medium",
        problem: "Implement a thread-safe Queue class with enqueue/dequeue operations guarded by locks.",
        hints: ["Add a Mutex lock as a class variable.", "Acquire the lock inside both methods, release in a finally block."],
        company: ["Google", "Uber", "Apple"]
      }
    ],
    lineExplanations: {
      "self.lock.acquire()": "Blocks subsequent threads from executing the critical section code."
    }
  },
  17: {
    title: "FIFO Cache",
    skills: ["Cache eviction rules", "Dynamic memory lookup maps", "Buffer pruning"],
    prereqs: "Day 9 Hash Maps.",
    goals: ["Understand memory cache lines.", "Implement First-In-First-Out (FIFO) page eviction rules.", "Track cache hit and miss rates."],
    realWorldDesc: "Content Delivery Networks (CDNs) cache video assets to reduce server load. Web browsers cache image files locally to speed up loading times.",
    realWorldEx: ["CDN asset caches", "Memory paging tables", "Browser history buffers"],
    compTitle: "FIFO vs. LRU Cache",
    compHeaders: ["Metric", "FIFO (First-In-First-Out)", "LRU (Least Recently Used)"],
    compRows: [
      ["Eviction Target", "The oldest item added, regardless of use frequency", "The item unaccessed for the longest duration"],
      ["Implementation Cost", "O(1) queue tracking - simple", "O(1) double-linked list + map - more complex"]
    ],
    quizzes: [
      {
        question: "What is a cache miss?",
        options: ["An invalid memory pointer", "Requested data not found in cache, requiring slow primary disk read", "A deleted database table", "Code segment syntax error"],
        answer: 1,
        explanation: "A cache miss occurs when the program requests data that is not in the cache, forcing it to fetch the data from slower primary memory or disk."
      }
    ],
    flashcards: [
      { q: "What is Cache hit rate?", a: "The ratio of requests successfully served by the cache to total requests (hits / hits + misses)." }
    ],
    cheatsheet: {
      summary: "Caches store copies of active records. FIFO evicts the oldest record when the cache limit is reached.",
      tips: ["Caches have fixed sizes.", "Eviction prevents memory leaks by replacing records when size is full."],
      syntax: "if key not in cache:\n    if len(cache) >= limit:\n        evict_oldest()"
    },
    dryRun: [
      { step: 1, desc: "Cache capacity = 2. Keys added order: []. Operations: Get A, Put B, Put C." },
      { step: 2, desc: "Put B -> Cache={B}, insertion order=[B]." },
      { step: 3, desc: "Put C -> Cache={B, C}, insertion order=[B, C]." },
      { step: 4, desc: "Put D -> Full! Evict oldest key (B). Add D. Cache={C, D}, order=[C, D]." }
    ],
    interview: [
      {
        q: "What is Belady's Anomaly and which cache policy suffers from it?",
        a: "Belady's Anomaly states that increasing cache pages can sometimes result in MORE page faults. FIFO cache algorithms suffer from it.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "LRU Cache stub",
        difficulty: "Hard",
        problem: "Simulate an LRU cache eviction policy where hits update item recency rankings.",
        hints: ["Use an OrderedDict in Python.", "Moving keys to end on hit/write keeps them fresh."],
        company: ["Amazon", "Salesforce"]
      }
    ],
    lineExplanations: {
      "oldest = self.order.pop(0)": "Retrieves and deletes the oldest inserted key from queue storage."
    }
  },
  18: {
    title: "RLE Compression",
    skills: ["Lossless encoding rules", "Run counting algorithms", "String buffer builders"],
    prereqs: "Day 3 Strings.",
    goals: ["Compress repeating character sequences into run counts.", "Calculate data size reduction percentages.", "Implement lossless decompression decoding."],
    realWorldDesc: "Bitmap image formats (.BMP) use Run-Length Encoding to compress solid color pixel runs. Fax machines use RLE to transmit black/white line maps.",
    realWorldEx: ["High-contrast graphics compression", "Fax document transmissions", "Database row compression profiles"],
    compTitle: "RLE vs. Huffman Coding",
    compHeaders: ["Method", "Compression Type", "Ideal Target Data"],
    compRows: [
      ["RLE Encoding", "Lossless run count aggregation", "Repeating character arrays ('AAAA')"],
      ["Huffman Coding", "Lossless prefix binary tree code", "Frequent symbol distribution (text/code)"]
    ],
    quizzes: [
      {
        question: "When does RLE make a file larger instead of smaller?",
        options: ["On highly compressed data", "When there are few repeating characters (e.g. 'ABCDE' becomes 'A1B1C1D1E1')", "On binary files", "When file is read in chunks"],
        answer: 1,
        explanation: "If characters rarely repeat, storing counts adds overhead, doubling the length of the string."
      }
    ],
    flashcards: [
      { q: "What is Lossless Compression?", a: "Compression algorithms that allow the exact original data to be reconstructed without loss of bytes." }
    ],
    cheatsheet: {
      summary: "RLE collapses repeats. Reduces space on simple repetitive sequences.",
      tips: ["Compare current character with next character in a loop.", "Pre-allocate arrays to build the final compressed string."],
      syntax: "while i < len(s):\n    count = 1\n    while s[i] == s[i+1]: count += 1"
    },
    dryRun: [
      { step: 1, desc: "Input string: 'AAAB'. Loop initialized at index 0." },
      { step: 2, desc: "Match 'A' at index 1 and 2 -> count = 3. Append 'A3' to result." },
      { step: 3, desc: "Next character is 'B'. Index 3. No match next -> count = 1. Append 'B1'." },
      { step: 4, desc: "Loop finished. Result: 'A3B1'. Ratio: 4 bytes to 4 bytes." }
    ],
    interview: [
      {
        q: "How do you decompress an RLE string like 'A3B1' back to 'AAAB'?",
        a: "Loop in strides of 2: extract character c and count n. Print c repeated n times. Time complexity is O(Decompressed Length).",
        difficulty: "Easy"
      }
    ],
    practice: [
      {
        title: "Decompress RLE String",
        difficulty: "Easy",
        problem: "Implement the decode function to decompress RLE strings containing multiple digits (e.g., 'A12B2').",
        hints: ["Read character, then parse subsequent characters as integer until a non-digit is encountered.", "Repeat character by parsed count."],
        company: ["Bloomberg", "Google"]
      }
    ],
    lineExplanations: {
      "res.append(char + str(count))": "Appends the compressed token to build output segments."
    }
  },
  19: {
    title: "TCP Sockets",
    skills: ["IP/Port bindings", "TCP handshake tracking", "Network byte streams"],
    prereqs: "Day 15 Basic Threads.",
    goals: ["Bind server sockets on local port networks.", "Accept client socket connections.", "Receive and echo incoming byte arrays."],
    realWorldDesc: "Multiplayer games use socket networks to sync player coordinates in real-time. Chat applications use sockets to push message packets instantly.",
    realWorldEx: ["IRC chat networks", "Multiplayer coordinate sync", "Database client sockets connections"],
    compTitle: "TCP vs. UDP Sockets",
    compHeaders: ["Metric", "TCP (Transmission Control)", "UDP (User Datagram)"],
    compRows: [
      ["Connection State", "Connection-oriented (handshake required)", "Connectionless (fire and forget)"],
      ["Reliability", "Guaranteed delivery, packets ordered", "No delivery guarantees, packets can drop"],
      ["Speed", "Slightly slower (handshake & retransmit overhead)", "Faster (minimal packet headers)"]
    ],
    quizzes: [
      {
        question: "What is port binding in socket programming?",
        options: ["Securing a computer port with a password", "Reserving a network port on a specific IP for our application to listen on", "Encrypting TCP sockets bytes", "Closing unused ports"],
        answer: 1,
        explanation: "Binding associates the socket with a specific network interface IP address and port number so the OS knows where to route incoming traffic."
      }
    ],
    flashcards: [
      { q: "What is TCP 3-way handshake?", a: "SYN -> SYN-ACK -> ACK. The sequence of connection packets exchanged to sync sequence numbers before data starts." }
    ],
    cheatsheet: {
      summary: "Sockets enable process communication over the network. TCP guarantees reliability.",
      tips: ["Always release socket port bindings on application exit.", "Handle byte encoding (utf-8) when sending/receiving network streams."],
      syntax: "s = socket()\ns.bind((host, port))\ns.listen()\nconn, addr = s.accept()"
    },
    dryRun: [
      { step: 1, desc: "Server binds socket to port 8000. Begins listening." },
      { step: 2, desc: "Client requests connection. Server accepts connection. Returns connection socket." },
      { step: 3, desc: "Client sends bytes: b'Hello'. Server receives 5 bytes." },
      { step: 4, desc: "Server echoes b'Hello' back to client. Close connection." }
    ],
    interview: [
      {
        q: "What does the 'listen(backlog)' call do in socket servers?",
        a: "It tells the OS to start accepting incoming TCP connections, queueing them up to the maximum backlog size until accept() is called.",
        difficulty: "Medium"
      }
    ],
    practice: [
      {
        title: "JSON Socket Server",
        difficulty: "Medium",
        problem: "Modify a socket server to receive a JSON string payload, parse it to extract values, and send back a custom JSON response.",
        hints: ["Decode received bytes to UTF-8.", "Import json library and parse payload using json.loads()."],
        company: ["Cisco", "Arista"]
      }
    ],
    lineExplanations: {
      "sock.bind((host, port))": "Attempts to claim exclusive handle over port for incoming network frames."
    }
  },
  20: {
    title: "Multi-client Socket Server",
    skills: ["Concurrent client routing", "Socket thread spawning", "Resource release safeguards"],
    prereqs: "Day 19 TCP Sockets & Day 15 Threads.",
    goals: ["Accept multiple incoming socket client connections.", "Spawn background thread workers to handle each client concurrently.", "Ensure socket descriptors are released on client disconnects."],
    realWorldDesc: "Chat servers like Discord route messages from thousands of channels concurrently. Web server daemons (Apache) spawn worker pools to manage incoming HTTP connections.",
    realWorldEx: ["Discord backend channels", "Game lobby servers", "Database cluster connection managers"],
    compTitle: "Threaded vs. Async Sockets",
    compHeaders: ["Metric", "Thread-Per-Client Server", "Async Event-Loop (select/epoll)"],
    compRows: [
      ["Concurrency Model", "Spawns 1 thread per active connection", "Single thread handles thousands of connections asynchronously"],
      ["Scalability", "Limited (OS resource bounds on thread count)", "Highly scalable (handles 10k+ concurrent connections)"]
    ],
    quizzes: [
      {
        question: "Why does a basic socket server block subsequent client connections?",
        options: ["Due to firewall port blocks", "Because accept() and recv() are blocking calls, preventing the loop from advancing until the first client disconnects", "Due to memory leaks", "Because port speeds are shared"],
        answer: 1,
        explanation: "In a single-threaded server, execution blocks on recv() for the current client, preventing the loop from calling accept() for next clients."
      }
    ],
    flashcards: [
      { q: "What is thread-per-client model?", a: "A server architecture where a main thread accepts connections, spawning a new client handler thread for each socket connection." }
    ],
    cheatsheet: {
      summary: "Multi-client servers accept connections in a loop, spawning threads to process client bytes concurrently.",
      tips: ["Spawning infinite threads can crash server memory; use thread pools in production.", "Make shared access thread-safe with Mutex locks."],
      syntax: "while True:\n    conn, addr = s.accept()\n    Thread(target=handle_client, args=(conn,)).start()"
    },
    dryRun: [
      { step: 1, desc: "Server starts main accept loop. Client A connects." },
      { step: 2, desc: "Server calls accept(), gets connection, spawns Thread A to handle client A. Main returns to accept()." },
      { step: 3, desc: "Client B connects. Server calls accept(), gets connection, spawns Thread B. Thread A and B execute concurrently." },
      { step: 4, desc: "Client A disconnects. Thread A closes socket, frees descriptor, and terminates." }
    ],
    interview: [
      {
        q: "What is the C10K problem in web server architecture?",
        a: "The challenge of designing network sockets to handle 10,000 client connections concurrently, which led to async event-driven servers (Nginx, Node.js).",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Active Connections Tracker",
        difficulty: "Medium",
        problem: "Keep track of active client connections on the server using a thread-safe counter, logging counts on join/exit.",
        hints: ["Use a global counter variable.", "Guard modifications with a threading.Lock object."],
        company: ["Cloudflare", "Dropbox"]
      }
    ],
    lineExplanations: {
      "client_thread.start()": "Fires up execution stack frame worker to manage communication with the specific client."
    }
  },
  21: {
    title: "HTTP Web Server",
    skills: ["HTTP message line parsing", "Request header reading", "Response headers & status codes"],
    prereqs: "Day 19 TCP Sockets.",
    goals: ["Receive raw HTTP request string lines.", "Parse HTTP method verb and URL path.", "Return valid HTTP response header packets."],
    realWorldDesc: "Web servers like Nginx and Apache parse incoming HTTP lines, read content headers, and serve files from disk or route requests to application backends.",
    realWorldEx: ["Static HTML file server", "Reverse proxy routers", "REST API gateways"],
    compTitle: "HTTP/1.1 vs. HTTP/2",
    compHeaders: ["Metric", "HTTP/1.1", "HTTP/2 (Binary Frame)"],
    compRows: [
      ["Formatting", "Plain-text header string lines", "Compressed binary frame segments"],
      ["Multiplexing", "Head-of-line blocking (1 request per TCP socket)", "Full request/response multiplexing over a single TCP connection"]
    ],
    quizzes: [
      {
        question: "What is the status code for a successful HTTP request?",
        options: ["404 Not Found", "500 Server Error", "200 OK", "302 Redirect"],
        answer: 2,
        explanation: "HTTP 200 OK is the standard status code indicating that the server successfully processed the request."
      }
    ],
    flashcards: [
      { q: "What is an HTTP Request Line?", a: "The first line of an HTTP request containing the HTTP Method (e.g. GET), path (e.g. /index.html), and HTTP Version." }
    ],
    cheatsheet: {
      summary: "HTTP is an application layer text protocol. Web servers parse headers and return status packets.",
      tips: ["Always separate HTTP headers and body with an empty line (\\r\\n\\r\\n).", "Include content-length headers when returning page payloads."],
      syntax: "GET /index.html HTTP/1.1\\r\\nHost: localhost\\r\\n\\r\\n"
    },
    dryRun: [
      { step: 1, desc: "Client sends HTTP payload: 'GET /info HTTP/1.1\\r\\n\\r\\n'." },
      { step: 2, desc: "Server receives bytes, decodes text. First line extracted: 'GET /info HTTP/1.1'." },
      { step: 3, desc: "Split request line: method='GET', path='/info'. Verify routing: path exists." },
      { step: 4, desc: "Build response: 'HTTP/1.1 200 OK\\r\\nContent-Type: text/plain\\r\\n\\r\\nActive'. Send to client." }
    ],
    interview: [
      {
        q: "What is the difference between GET and POST requests?",
        a: "GET requests data from a resource, appending parameters to the URL query string. POST submits data payload inside the HTTP request body, modifying resources.",
        difficulty: "Easy"
      }
    ],
    practice: [
      {
        title: "HTML File Server",
        difficulty: "Medium",
        problem: "Modify the HTTP server to serve static HTML files from a local directory when requested by path (e.g., GET /index.html).",
        hints: ["Read the file from disk using read().", "Handle file-not-found case by returning a 404 response header."],
        company: ["Amazon", "Vercel"]
      }
    ],
    lineExplanations: {
      "response = 'HTTP/1.1 200 OK\\r\\n...\\r\\n\\r\\n'": "Constructs the standard plain-text protocol envelope expected by modern web browsers."
    }
  },
  22: {
    title: "REST APIs & JSON",
    skills: ["JSON request decoding", "HTTP verb routing", "API response building"],
    prereqs: "Day 21 HTTP Web Server.",
    goals: ["Build HTTP endpoints for GET and POST requests.", "Parse incoming JSON request payloads.", "Return responses serialized to JSON string formats."],
    realWorldDesc: "Stripe processes credit card payments via JSON REST API endpoints. Twitter uses API endpoints to fetch, create, and delete tweets.",
    realWorldEx: ["Payment gateway integrations", "E-commerce shopping cart REST APIs", "Social media feed endpoints"],
    compTitle: "REST vs. GraphQL",
    compHeaders: ["Metric", "REST API", "GraphQL (Single Endpoint)"],
    compRows: [
      ["Endpoints", "Multiple resource-based URLs (/users, /orders)", "Single route endpoint (/graphql)"],
      ["Data Fetching", "Can suffer from over/under-fetching", "Client requests precise fields (exact payload match)"]
    ],
    quizzes: [
      {
        question: "Which HTTP verb is best suited to create a new user profile record in an API?",
        options: ["GET", "POST", "DELETE", "PUT"],
        answer: 1,
        explanation: "POST is the standard REST API method to create new resource instances in backends."
      }
    ],
    flashcards: [
      { q: "What is REST?", a: "Representational State Transfer. A standard web service design paradigm leveraging HTTP verbs for resource actions." }
    ],
    cheatsheet: {
      summary: "REST APIs route URL paths to handlers. Payloads are formatted as JSON text.",
      tips: ["Set 'Content-Type: application/json' in response headers.", "Handle client payload errors by returning 400 Bad Request status codes."],
      syntax: "import json\nbody = json.loads(request_body)\nresponse = json.dumps({'status': 'ok'})"
    },
    dryRun: [
      { step: 1, desc: "Client sends: 'POST /api/users\\r\\n\\r\\n{\"name\":\"Bob\"}'." },
      { step: 2, desc: "Server routes to POST handler. Extracts request body: '{\"name\":\"Bob\"}'." },
      { step: 3, desc: "Parse JSON: user_data = {'name': 'Bob'}. Save to database." },
      { step: 4, desc: "Serialize output: '{\"id\": 1, \"status\":\"saved\"}'. Send response 201 Created." }
    ],
    interview: [
      {
        q: "What is statelessness in REST API design?",
        a: "A design constraint stating that the server retains no client context session between requests. Every request must contain all tokens needed to authenticate and process it.",
        difficulty: "Medium"
      }
    ],
    practice: [
      {
        title: "REST Task List API",
        difficulty: "Medium",
        problem: "Create API endpoints GET /api/tasks and POST /api/tasks to read and write to an in-memory task array.",
        hints: ["Validate POST inputs check if 'title' field exists.", "Append new task object with auto-increment ID to tasks list."],
        company: ["Atlassian", "Twilio"]
      }
    ],
    lineExplanations: {
      "data = json.loads(body_content)": "Converts plain-text JSON network bytes to native programming dictionary maps."
    }
  },
  23: {
    title: "DNS Lookup",
    skills: ["Domain name routing", "DNS cache lookups", "IP host resolution"],
    prereqs: "Day 9 Hash Maps.",
    goals: ["Map domain names to IP addresses.", "Simulate DNS cache layers.", "Implement host file overrides."],
    realWorldDesc: "Web browsers resolve domain names (like google.com) to IP addresses (like 142.250.190.46) before opening sockets. DNS servers coordinate global internet routing tables.",
    realWorldEx: ["Browser network address lookups", "Hosts file local loopbacks", "Cloudflare DNS nameservers"],
    compTitle: "Recursive vs. Iterative DNS",
    compHeaders: ["Query Type", "Resolution Behavior", "Cache Saving"],
    compRows: [
      ["Recursive Query", "DNS server resolves completely, fetching from root to leaf on behalf of client", "Highly cached on ISP servers"],
      ["Iterative Query", "DNS server returns the IP of the next nameserver to check", "Rarely cached directly by clients"]
    ],
    quizzes: [
      {
        question: "What does DNS stand for?",
        options: ["Digital Network System", "Domain Name System", "Dynamic Routing Schema", "Distributed Node Scanner"],
        answer: 1,
        explanation: "DNS (Domain Name System) maps human-readable domain names (google.com) to machine-readable IP addresses (142.250.190.46)."
      }
    ],
    flashcards: [
      { q: "What is a DNS cache?", a: "A local cache database of resolved domains kept by the OS to bypass querying nameservers repeatedly." }
    ],
    cheatsheet: {
      summary: "DNS maps domain names to IP addresses. Caches bypass network round-trips.",
      tips: ["Check the local 'hosts' file override table first.", "DNS uses UDP on port 53 for fast query exchanges."],
      syntax: "dns_records = {'google.com': '142.250.190.46'}\nip = dns_records.get(domain)"
    },
    dryRun: [
      { step: 1, desc: "Request IP for 'google.com'. Check local host overrides -> None." },
      { step: 2, desc: "Check local DNS cache. Hit! Return IP '142.250.190.46'. Avoid nameserver network calls." },
      { step: 3, desc: "Request IP for 'unknown.com'. Cache Miss! Send query to recursive nameserver." },
      { step: 4, desc: "Nameserver returns '93.184.216.34'. Save record to local cache. Return IP." }
    ],
    interview: [
      {
        q: "What happens when you type a URL in the browser and press Enter?",
        a: "1. Browser checks cache for IP, 2. Resolves via DNS, 3. Initiates TCP handshake, 4. Sends HTTP Request, 5. Processes HTTP Response, 6. Renders DOM page.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Local Hosts File Override",
        difficulty: "Easy",
        problem: "Simulate parsing a hosts file and overriding DNS results for specific routes.",
        hints: ["Store overrides in a separate dictionary.", "Check override map before checking DNS table."],
        company: ["Cloudflare", "Google"]
      }
    ],
    lineExplanations: {
      "return self.cache[domain]": "Bypasses slow recursive network nameservers by fetching from memory."
    }
  },
  24: {
    title: "Security & Cryptography",
    skills: ["Password salting keys", "One-way cryptographic hashes", "SHA-256 validations"],
    prereqs: "Day 9 Hash Maps.",
    goals: ["Hash password credentials using SHA-256.", "Generate random unique Salt values.", "Validate match requests safely against database states."],
    realWorldDesc: "Web applications (Auth0/Firebase) hash and salt user passwords before saving them to disk. Database backends prevent leaks of plaintext credentials.",
    realWorldEx: ["User authentication credentials storage", "Token validation keys", "File verification checksums"],
    compTitle: "Hashing vs. Encryption",
    compHeaders: ["Metric", "Cryptographic Hashing (SHA-256)", "Encryption (AES/RSA)"],
    compRows: [
      ["Direction", "One-way function (cannot be decrypted)", "Two-way function (can be decrypted with key)"],
      ["Output Length", "Fixed length output (e.g. 256 bits)", "Variable output depending on input size"],
      ["Primary Use Case", "Password checking, integrity checksums", "Secure message transmission"]
    ],
    quizzes: [
      {
        question: "Why do we add a random salt to passwords before hashing?",
        options: ["To compress hash codes", "To prevent dictionary and rainbow table lookups by ensuring duplicate passwords produce unique hashes", "To encrypt password characters", "To validate usernames"],
        answer: 1,
        explanation: "Salt is random data added to inputs. This ensures identical passwords yield different hashes, blocking rainbow table exploits."
      }
    ],
    flashcards: [
      { q: "What is a cryptographic hash?", a: "A mathematical function that converts input data of arbitrary size to a fixed-size byte string output." }
    ],
    cheatsheet: {
      summary: "Hash passwords with unique salts. Never store plaintext credentials.",
      tips: ["Use slow hashing algorithms like bcrypt or Argon2 in production.", "Never design your own cryptographic hashing algorithms."],
      syntax: "salt = os.urandom(16)\nhash = sha256(password + salt)"
    },
    dryRun: [
      { step: 1, desc: "User registers: password='123'. Generate random salt='xyz'." },
      { step: 2, desc: "Concatenate: '123' + 'xyz' = '123xyz'." },
      { step: 3, desc: "Hash string: SHA256('123xyz') -> 'a8f9c2...'. Save salt and hash to database." },
      { step: 4, desc: "User logs in: enters '123'. Fetch salt 'xyz'. Compute SHA256('123xyz') -> 'a8f9c2...'. Match validated." }
    ],
    interview: [
      {
        q: "What is a hash collision in cryptography and how does it differ from a hash table collision?",
        a: "A cryptographic hash collision is when two inputs produce the same hash string. It breaks security, whereas hash table collisions are normal and resolved via lists.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "SHA-256 Checksum Validator",
        difficulty: "Easy",
        problem: "Write a function to generate a SHA-256 hash checksum for a string, verifying if a file content matched.",
        hints: ["Use Python's hashlib library.", "Call hashlib.sha256(string.encode()).hexdigest()."],
        company: ["Okta", "Amazon"]
      }
    ],
    lineExplanations: {
      "hashlib.sha256(salted_pwd.encode())": "Executes standard one-way encryption hashing math calculations."
    }
  },
  25: {
    title: "SQL SQLite Basics",
    skills: ["DDL tables creation", "DML SELECT queries", "Where constraint filtering"],
    prereqs: "Day 9 Hash Maps.",
    goals: ["Create SQLite database tables.", "Insert rows into tables.", "Filter database outputs using SELECT WHERE constraints."],
    realWorldDesc: "Mobile apps (Android/iOS) use SQLite to store user settings and offline caching logs. Backend servers use relational databases to coordinate transactions.",
    realWorldEx: ["Mobile offline databases", "App configuration storages", "Server session registries"],
    compTitle: "SQL vs. NoSQL",
    compHeaders: ["Feature", "Relational SQL (SQLite)", "Document NoSQL (MongoDB)"],
    compRows: [
      ["Schema", "Strict predefined tables and columns schemas", "Flexible document schemas (JSON documents)"],
      ["Transactions", "ACID compliant transactions", "BASE compliance (eventual consistency)"]
    ],
    quizzes: [
      {
        question: "Which SQL command is used to retrieve rows from database tables?",
        options: ["INSERT", "UPDATE", "SELECT", "CREATE"],
        answer: 2,
        explanation: "SELECT is the SQL Data Manipulation Language command used to fetch row records."
      }
    ],
    flashcards: [
      { q: "What is a Primary Key?", a: "A column containing unique values that identifies each row record in a database table." }
    ],
    cheatsheet: {
      summary: "SQL is a query language. Relational databases store data in strict columns.",
      tips: ["Always define primary keys for table records.", "Index columns that are frequently used in WHERE filters."],
      syntax: "SELECT * FROM users WHERE age >= 18"
    },
    dryRun: [
      { step: 1, desc: "Create table users(id PRIMARY KEY, name TEXT)." },
      { step: 2, desc: "Insert rows: (1, 'Alice'), (2, 'Bob'). Database commits changes." },
      { step: 3, desc: "Execute query: SELECT name FROM users WHERE id = 1." },
      { step: 4, desc: "Database scans rows, matches Alice, returns row. Query complete." }
    ],
    interview: [
      {
        q: "What are ACID properties in database management systems?",
        a: "ACID stands for Atomicity (all or nothing), Consistency, Isolation (independent transactions), and Durability (permanently saved).",
        difficulty: "Medium"
      }
    ],
    practice: [
      {
        title: "Insert and Filter Users",
        difficulty: "Easy",
        problem: "Write SQL statements to insert a user record and retrieve all users whose names start with 'A'.",
        hints: ["Use INSERT INTO table VALUES (...).", "Use SELECT * FROM table WHERE name LIKE 'A%'."],
        company: ["Oracle", "Amazon"]
      }
    ],
    lineExplanations: {
      "cursor.execute(query)": "Transfers SQL plain-text instructions to SQLite engine parser."
    }
  },
  26: {
    title: "SQL Joins",
    skills: ["INNER JOIN queries", "Foreign key constraints", "Aggregations GROUP BY"],
    prereqs: "Day 25 SQL SQLite Basics.",
    goals: ["Join parent-child table records.", "Enforce foreign key checks.", "Aggregate results using GROUP BY counts."],
    realWorldDesc: "E-commerce sites join orders and users tables to construct transaction receipts. Blogs join posts and comments tables to display page streams.",
    realWorldEx: ["Invoice checkout receipts builder", "Blog comment streams", "User roles permissions checks"],
    compTitle: "INNER JOIN vs. LEFT JOIN",
    compHeaders: ["Join Type", "Matched Rows", "Unmatched Rows"],
    compRows: [
      ["INNER JOIN", "Only rows that have matching keys in both tables are returned", "Unmatched rows are discarded"],
      ["LEFT JOIN", "All rows from the left table are returned", "Unmatched right columns are filled with NULL"]
    ],
    quizzes: [
      {
        question: "What is a Foreign Key?",
        options: ["A key to encrypt database bytes", "A column referencing primary keys of another table to maintain relational integrity", "A temporary table alias", "A deleted row"],
        answer: 1,
        explanation: "Foreign Keys are constraints that establish link relationships between tables by pointing to primary keys in target tables."
      }
    ],
    flashcards: [
      { q: "What is GROUP BY?", a: "An SQL clause used to group rows having identical column values, often for running aggregate counts (COUNT, SUM)." }
    ],
    cheatsheet: {
      summary: "Joins link tables using keys. INNER JOIN returns matches. LEFT JOIN preserves left rows.",
      tips: ["Index foreign keys to accelerate query joins speed.", "Verify JOIN boundaries to avoid duplicate row counts in aggregates."],
      syntax: "SELECT * FROM orders JOIN users ON orders.user_id = users.id"
    },
    dryRun: [
      { step: 1, desc: "Users: (1, 'Alice'). Orders: (101, 1, 'Book')." },
      { step: 2, desc: "Execute query joining orders and users ON user_id = users.id." },
      { step: 3, desc: "Match orders.user_id (1) == users.id (1)." },
      { step: 4, desc: "Build temporary joined record: Alice, Order 101, Book. Return row." }
    ],
    interview: [
      {
        q: "What is database normalization and why is it used?",
        a: "The process of organizing data columns to minimize redundancy and dependency by splitting tables into smaller relations and linking them using keys.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Product Orders Count",
        difficulty: "Medium",
        problem: "Write an SQL query to retrieve all users along with the total count of orders they have placed, grouped by user ID.",
        hints: ["Use LEFT JOIN users and orders.", "Use GROUP BY users.id and COUNT(orders.id)."],
        company: ["Uber", "Shopify"]
      }
    ],
    lineExplanations: {
      "ON orders.user_id = users.id": "Specifies link keys to match and glue database records."
    }
  },
  27: {
    title: "Database Indexing",
    skills: ["B-Tree indexing search", "Index overhead costs", "Index speed performance"],
    prereqs: "Day 9 Hash Maps & Day 11 BST.",
    goals: ["Compare sequential scans with index searches.", "Demonstrate performance improvements of indexes.", "Analyze indexing space overheads."],
    realWorldDesc: "Search engines index webpage URLs to answer user queries in milliseconds. Databases index lookup fields to avoid reading every table block from the hard drive.",
    realWorldEx: ["E-commerce product ID lookups", "User authentication emails lookups", "Search engine webpage indexes"],
    compTitle: "Full Table Scan vs. Indexed Search",
    compHeaders: ["Metric", "Full Table Scan (Sequential)", "Indexed Search (B-Tree/Hash)"],
    compRows: [
      ["Lookup Cost", "O(N) scans (reads every row block)", "O(log N) searches (traverses node paths)"],
      ["Disk Space", "No extra space required", "Extra disk space required to store index tables"],
      ["Insert Cost", "O(1) appends (fast)", "O(log N) updates (slow, updates index structure)"]
    ],
    quizzes: [
      {
        question: "Why does database insertion speed slow down when adding table indexes?",
        options: ["Due to index lock tables", "Because the database engine must recalculate and update the index tree structure for every new insert", "Due to character encoding changes", "Because indexes require SQL parses"],
        answer: 1,
        explanation: "Indexes are physical lookup trees. Inserting a row requires updating the table AND updating the index tree nodes, adding extra overhead."
      }
    ],
    flashcards: [
      { q: "What is a B-Tree Index?", a: "A self-balancing search tree database index that maintains sorted keys, allowing range scans and lookups in logarithmic time." }
    ],
    cheatsheet: {
      summary: "Indexes trade space and write speed for fast read speeds. Standard indexes use B-Trees.",
      tips: ["Only index columns that are frequently read or sorted.", "Avoid indexing columns that have low cardinality (like gender)."],
      syntax: "CREATE INDEX idx_user_email ON users(email)"
    },
    dryRun: [
      { step: 1, desc: "Database table has 10,000 rows. Column 'id' is indexed. Search id = 500." },
      { step: 2, desc: "Without index: scan row 1, row 2... up to row 10,000. Scanned 10,000 rows." },
      { step: 3, desc: "With index: traverse balancing tree. Level 0 -> Level 1 -> Level 2. Scanned only 3 nodes." },
      { step: 4, desc: "Fetch row data at address matched in tree. Search complete." }
    ],
    interview: [
      {
        q: "What is a Clustered Index and how does it differ from a Non-Clustered Index?",
        a: "A clustered index determines the physical order of data blocks in the table. There can only be one clustered index per table. Non-clustered indexes store references to data blocks.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Index Performance Test",
        difficulty: "Medium",
        problem: "Write a simulation comparing lookups in a list of 100,000 entries using sequential scan vs. dictionary lookup, logging durations.",
        hints: ["Generate a list and a dictionary with identical keys.", "Use time.perf_counter() to measure lookup differences."],
        company: ["Google", "Salesforce"]
      }
    ],
    lineExplanations: {
      "idx_map[email] = row_addr": "Links email records to memory address offsets to enable direct lookups."
    }
  },
  28: {
    title: "Key-Value Disk Store",
    skills: ["Append-only file storage", "In-memory index mappings", "Storage compaction cycles"],
    prereqs: "Day 13 File I/O & Day 9 Hash Maps.",
    goals: ["Build append-only file persistence engines.", "Maintain in-memory key offset directories.", "Rebuild indices from database file logs."],
    realWorldDesc: "NoSQL databases (like Redis or LevelDB) use write-ahead log files to persist data. Bitcask storage engines map keys to disk offsets for fast lookups.",
    realWorldEx: ["LevelDB write-ahead logs", "Bitcask log stores", "Database commit logs"],
    compTitle: "In-Memory Map vs. Log Store",
    compHeaders: ["Storage Engine", "Persistence Status", "Lookup Latency"],
    compRows: [
      ["In-Memory Map", "Temporary (lost on crash/restart)", "O(1) RAM access (fastest)"],
      ["Log Store (Disk Offset)", "Permanent (written to disk)", "O(1) disk offset lookup (fast read, safe persistence)"]
    ],
    quizzes: [
      {
        question: "What is an append-only log in key-value database engines?",
        options: ["A read-only configuration file", "A data file where modifications are always appended, avoiding slow random disk overwrites", "A compressed database index", "A delete protocol"],
        answer: 1,
        explanation: "Append-only files write new data at the end of the log. Writing is sequential, making writes extremely fast compared to random seeking."
      }
    ],
    flashcards: [
      { q: "What is log compaction?", a: "The process of cleaning up append-only log files by discarding old values, retaining only the latest value for each key." }
    ],
    cheatsheet: {
      summary: "Key-value stores write to append-only logs. An in-memory map tracks key offsets.",
      tips: ["Offset pointers bypass reading the entire log during lookups.", "Compaction loops rebuild logs in the background to save disk space."],
      syntax: "file.seek(offset)\ndata = file.read(size)"
    },
    dryRun: [
      { step: 1, desc: "Write Put('user', 'Alice'). Append 'user:Alice' at byte offset 0. Map={'user': 0}." },
      { step: 2, desc: "Write Put('user', 'Bob'). Append 'user:Bob' at byte offset 10. Map={'user': 10}." },
      { step: 3, desc: "Get('user'). Fetch offset map: key 'user' is at offset 10." },
      { step: 4, desc: "Seek file position 10. Read value: 'Bob'. Return Bob. Correct latest state retrieved." }
    ],
    interview: [
      {
        q: "How does a write-ahead log (WAL) prevent database data corruption?",
        a: "Every transaction is written to the append-only WAL before tables are modified. If the database crashes, it can replay the WAL log on startup to recover state.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Rebuild Key Map Index",
        difficulty: "Hard",
        problem: "Write a function to read an append-only log file from disk and rebuild the key-to-offset dictionary index.",
        hints: ["Iterate through the file keeping track of current byte offsets.", "Parse keys from records, store offset coordinates in dictionary."],
        company: ["LinkedIn", "Apple"]
      }
    ],
    lineExplanations: {
      "file.seek(offset)": "Sets the file descriptor offset cursor to the precise byte address on disk."
    }
  },
  29: {
    title: "MVC Todo Application",
    skills: ["Model data entities", "View templates separation", "Controller routes mapping"],
    prereqs: "Day 22 REST APIs & Day 7 OOP.",
    goals: ["Separate database data layers from controllers.", "Build interactive controller routing paths.", "Render todo items to client views."],
    realWorldDesc: "Frontend frameworks (React, Angular) and backend frameworks (Spring, Django) use MVC architecture patterns to organize codebases, separating database logic from UI layouts.",
    realWorldEx: ["Django MVC backend apps", "Spring Boot database layers", "React state layouts component separation"],
    compTitle: "Monolithic MVC vs. Microservices",
    compHeaders: ["Design Pattern", "Code Organization", "Deployment Scale"],
    compRows: [
      ["MVC Monolith", "Single codebase, clear interface layers", "Easy deployment, harder scaling"],
      ["Microservices", "Divided codebases communicating over network APIs", "Independent deployments, high network complexity"]
    ],
    quizzes: [
      {
        question: "Which component in MVC handles incoming client requests and updates the database model?",
        options: ["The Model", "The View", "The Controller", "The Schema"],
        answer: 2,
        explanation: "The Controller acts as the intermediate brain. It parses requests, commands the Model to update database state, and determines which View template is returned."
      }
    ],
    flashcards: [
      { q: "What is Model layer?", a: "The MVC component that manages database schemas, validation rules, and business logic calculations." }
    ],
    cheatsheet: {
      summary: "MVC decouples business logic, data presentation, and network controllers.",
      tips: ["Keep models fat (encapsulate logic) and controllers thin.", "Views must never access database entities directly without controllers."],
      syntax: "class Controller:\n    def create_todo(self, data):\n        model.save(data)\n        return view.render()"
    },
    dryRun: [
      { step: 1, desc: "Client sends GET /todos request." },
      { step: 2, desc: "Controller catches route. Invokes Model.get_all_todos() database scan." },
      { step: 3, desc: "Model returns list of records. Controller forwards list to View renderer." },
      { step: 4, desc: "View builds page with tasks. Controller sends page back to client." }
    ],
    interview: [
      {
        q: "What is the difference between MVC and MVVM architectures?",
        a: "In MVC, controllers determine routing and template views. In MVVM (Model-View-ViewModel), views bind directly to viewmodels, sync-updating states automatically.",
        difficulty: "Medium"
      }
    ],
    practice: [
      {
        title: "Todo Complete Status Toggle",
        difficulty: "Medium",
        problem: "Implement the controller logic to handle PUT /todos/toggle and update the todo complete status inside the model.",
        hints: ["Find the todo item by ID in model storage.", "Toggle complete status and return confirmation payload."],
        company: ["Salesforce", "Atlassian"]
      }
    ],
    lineExplanations: {
      "self.model.add(task)": "Delegates data state management to the model database layer."
    }
  },
  30: {
    title: "Rate Limiter",
    skills: ["Token bucket math calculations", "System design limits throttling", "DDoS mitigation patterns"],
    prereqs: "Day 9 Hash Maps & Day 15 Threads.",
    goals: ["Compute rate limiting tokens.", "Implement Token Bucket rate limiter locks.", "Throttle incoming requests when limit capacities are breached."],
    realWorldDesc: "API service providers (Stripe, GitHub) throttle requests to protect system stability. Cybersecurity layers prevent DDoS traffic by rate-limiting client IPs.",
    realWorldEx: ["API keys limits", "DDoS prevention gateways", "Login forms brute-force defense locks"],
    compTitle: "Token Bucket vs. Fixed Window",
    compHeaders: ["Algorithm", "Burst Traffic", "Implementation complexity"],
    compRows: [
      ["Token Bucket", "Allows traffic bursts as long as bucket has tokens", "Simple (tracks tokens count + last check timestamp)"],
      ["Fixed Window", "Blocks bursts if window changes, prone to traffic spikes at boundaries", "Extremely simple but less smooth traffic curves"]
    ],
    quizzes: [
      {
        question: "What HTTP status code is returned to clients when they exceed rate limit thresholds?",
        options: ["400 Bad Request", "401 Unauthorized", "429 Too Many Requests", "503 Service Unavailable"],
        answer: 2,
        explanation: "HTTP 429 Too Many Requests is the standard status code indicating rate limits have been breached."
      }
    ],
    flashcards: [
      { q: "What is Token Bucket?", a: "A rate limiting algorithm where tokens refill at a constant rate, and each request consumes a token. Empty bucket blocks calls." }
    ],
    cheatsheet: {
      summary: "Rate limiters protect API resources. Token buckets recalculate tokens based on time gaps.",
      tips: ["Calculate token refills dynamically on request: tokens = min(capacity, current + time_elapsed * refill_rate).", "Use Redis to store rate limiter tokens for distributed setups."],
      syntax: "if tokens >= 1:\n    tokens -= 1\n    return True\nreturn False"
    },
    dryRun: [
      { step: 1, desc: "Limiter setup: capacity=3, refill_rate=1 token/sec. Current tokens=3." },
      { step: 2, desc: "Submit 3 requests at t=0 -> All accepted. Tokens = 0." },
      { step: 3, desc: "Submit request at t=0.5 -> No tokens! Reject request with status code 429." },
      { step: 4, desc: "Submit request at t=1.0 -> 1.0 sec elapsed. Refill 1 token. Accept request. Tokens=0." }
    ],
    interview: [
      {
        q: "How would you design a distributed rate limiter for a system scaling across multiple servers?",
        a: "Use a shared central caching store like Redis. Execute rate-limiting logic using Lua scripts inside Redis to guarantee atomic transaction executions.",
        difficulty: "Hard"
      }
    ],
    practice: [
      {
        title: "Leaky Bucket Rate Limiter",
        difficulty: "Hard",
        problem: "Simulate a Leaky Bucket algorithm where requests are queued and processed (leaked) at a constant rate.",
        hints: ["Use a queue data structure.", "Pop requests from queue in a background thread timer."],
        company: ["Google", "Stripe", "Netflix"]
      }
    ],
    lineExplanations: {
      "refilled = elapsed * self.refill_rate": "Computes token refills dynamically to avoid running background cron jobs."
    }
  }
};

// Merge dynamically generated days to the exportable structure
for (const day in topicsMap) {
  const item = topicsMap[day];
  INTERACTIVE_CS_DATA[day] = {
    objectives: {
      skills: item.skills,
      prereqs: item.prereqs,
      goals: item.goals
    },
    realWorld: {
      description: item.realWorldDesc,
      examples: item.realWorldEx
    },
    comparison: {
      title: item.compTitle,
      headers: item.compHeaders,
      rows: item.compRows
    },
    quizzes: item.quizzes,
    flashcards: item.flashcards,
    cheatsheet: item.cheatsheet,
    dryRun: item.dryRun,
    interview: item.interview,
    practice: item.practice,
    lineExplanations: item.lineExplanations
  };
}
