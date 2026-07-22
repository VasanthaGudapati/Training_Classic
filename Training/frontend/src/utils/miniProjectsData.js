// Mini Projects and Hands-on Assignments Database for Learning Paths
// Mapped by subject: Strings, OOP, and DBMS.

export const MINI_PROJECTS = [
  // ==================== STRINGS PROJECTS ====================
  {
    id: "mini_str_1",
    title: "Password Strength Validator",
    category: "Strings",
    problemStatement: "Build a robust string parser that evaluates a password input and returns its strength classification (Strong, Medium, Weak) along with suggestions for improvement.",
    requirements: [
      "Minimum length of 8 characters.",
      "Must contain at least one uppercase letter and one lowercase letter.",
      "Must contain at least one digit (0-9).",
      "Must contain at least one special character (e.g. !, @, #, $, %, etc.)."
    ],
    expectedOutput: "Enter password: userpass\nStrength: WEAK\nSuggestions:\n- Password must be at least 8 characters\n- Add an uppercase letter\n- Add a digit\n- Add a special character",
    folderStructure: "password_validator/\n├── main.py        # CLI input loop\n└── validator.py   # Validation logic checks",
    steps: [
      "Define a function validate_password(pwd) returning a list of failed criteria.",
      "Use loop structures or regex to inspect characters of the string.",
      "Calculate strength classification based on the number of passed tests.",
      "Render output report showing failed rules and suggestions."
    ]
  },
  {
    id: "mini_str_2",
    title: "Text Auto-Formatter & Cleaner",
    category: "Strings",
    problemStatement: "Create a text processing pipeline that sanitizes raw inputs, removes duplicate whitespaces, normalizes capitalization (sentence case), and redacts sensitive information like phone numbers or email addresses.",
    requirements: [
      "Strip trailing and leading whitespaces, and reduce inner multiple spaces to a single space.",
      "Capitalize the first letter of each sentence correctly.",
      "Replace phone numbers matching 'xxx-xxx-xxxx' with '[REDACTED]'.",
      "Return the normalized text and count of modifications made."
    ],
    expectedOutput: "Original: '  hello   world. call me at 123-456-7890.  '\nFormatted: 'Hello world. Call me at [REDACTED].'\nModifications: 4",
    folderStructure: "text_formatter/\n├── main.py        # Entrypoint script\n└── cleaner.py     # String parsing and regex redactions",
    steps: [
      "Implement space stripping and replacement using string functions.",
      "Parse text by punctuation delimiters (. ! ?) to identify sentence boundaries for capitalization.",
      "Write a regex match pattern looking for phone numbers and replace matching substrings.",
      "Track edits count and return results."
    ]
  },
  {
    id: "mini_str_3",
    title: "Autocomplete Prefix Search Engine",
    category: "Strings",
    problemStatement: "Build an autocomplete engine that searches a list of terms and returns all matching words that start with a given query prefix.",
    requirements: [
      "Load a list of 100 search keywords.",
      "Support case-insensitive prefix matching.",
      "Sort matching results alphabetically.",
      "Match query string with start of words in O(N) time."
    ],
    expectedOutput: "Query prefix: 'al'\nMatches found:\n1. algorithm\n2. allocation\n3. alphabet",
    folderStructure: "autocomplete/\n├── main.py        # Console query loop\n└── search.py      # Prefix match and sorting routines",
    steps: [
      "Declare list of vocabulary strings.",
      "Implement function find_matches(prefix, vocab) returning filtered items.",
      "Ensure query check uses startswith() string matching.",
      "Sort output array and display top matches."
    ]
  },
  {
    id: "mini_str_4",
    title: "Dictionary Index Searcher",
    category: "Strings",
    problemStatement: "Create a local dictionary search tool that allows users to lookup word definitions, check synonyms, and locate entries using substring matches.",
    requirements: [
      "Store dictionary terms as key-value pairs in a JSON file.",
      "Support full word matching and substring search (finding words containing the query).",
      "Display error message if word is not found in database."
    ],
    expectedOutput: "Search: 'compile'\nFound: 'compile' (verb)\nDefinition: To translate source code into machine code.",
    folderStructure: "dictionary/\n├── dictionary.json   # Word definitions database\n└── search_engine.py  # Read and lookup logic",
    steps: [
      "Create JSON file with 20 programming definitions.",
      "Load JSON content into a dictionary variable on startup.",
      "Implement key lookup and fallback substring scanner loop.",
      "Format output layout in console."
    ]
  },

  // ==================== OOP PROJECTS ====================
  {
    id: "mini_oop_1",
    title: "Secure ATM & Banking System",
    category: "OOP",
    problemStatement: "Design an object-oriented ATM ledger simulating bank accounts, deposits, withdrawals, and balance inquiries with private variables to enforce state security.",
    requirements: [
      "Keep account balance private; only allow updates via withdraw() and deposit() methods.",
      "Enforce overdraft protection: reject withdrawals exceeding current balance.",
      "Record transaction timestamps in a private ledger array.",
      "Implement basic authentication PIN checks."
    ],
    expectedOutput: "ATM Account: Alice | PIN: Valid\nDeposit $200: Success (Balance: $500)\nWithdraw $600: Error (Insufficient Funds)",
    folderStructure: "banking_system/\n├── main.py        # ATM CLI flow\n└── account.py     # BankAccount class definition",
    steps: [
      "Create BankAccount class with constructor checking owner, pin, and balance.",
      "Set _balance as private variable.",
      "Implement deposit() and withdraw() methods with validation guard conditions.",
      "Add a transaction log accumulator."
    ]
  },
  {
    id: "mini_oop_2",
    title: "Interactive Library Catalog System",
    category: "OOP",
    problemStatement: "Create an OOP system cataloging library books, managing borrow logs for patrons, and computing late return fine limits.",
    requirements: [
      "Create a Book class with attributes: title, author, isbn, checked_out.",
      "Create a Member class tracking borrowed book references.",
      "Implement class inheritance for Journals (fixed short borrow terms) and Reference Books (cannot be borrowed).",
      "Calculate late fine at $1.00 per day."
    ],
    expectedOutput: "Checking out: 'Clean Code' by Robert Martin\nStatus: Checked Out to Member 101\nReturn book: 5 Days Overdue | Fine: $5.00",
    folderStructure: "library/\n├── main.py        # Library shell execution\n├── catalog.py     # Catalog search manager\n└── items.py       # OOP book and media classes",
    steps: [
      "Develop Book base class and implement checkout methods.",
      "Inherit Journal and ReferenceBook classes, overriding borrow rules.",
      "Implement Member class containing books arrays.",
      "Develop library menu checking returns and calculating overdue fines."
    ]
  },
  {
    id: "mini_oop_3",
    title: "E-Commerce Stock Inventory Ledger",
    category: "OOP",
    problemStatement: "Build an inventory management system modeling store items, pricing, and stock, with methods to process sales, restock, and print inventory reports.",
    requirements: [
      "Create Product class tracking product_id, name, price, and stock_count.",
      "Create Inventory class holding list of products.",
      "Process orders: decrease stock counts and return total transaction values. Reject orders exceeding stock levels."
    ],
    expectedOutput: "Product: Laptop | Price: $1,200 | Stock: 5\nOrder 2 Laptops: Success (Total: $2,400 | Remaining Stock: 3)\nOrder 4 Laptops: Denied (Out of stock)",
    folderStructure: "inventory/\n├── main.py        # Sales manager console\n└── inventory.py   # Product and Inventory classes",
    steps: [
      "Define Product class with getters and setters checking valid pricing.",
      "Define Inventory class managing product collections.",
      "Write add_product(), sell_product(), and restock_product() functions.",
      "Write inventory report summarizing stock totals."
    ]
  },

  // ==================== DBMS PROJECTS ====================
  {
    id: "mini_db_1",
    title: "Student Enrollment Database Explorer",
    category: "DBMS",
    problemStatement: "Design a relational SQLite database schema tracking students, courses, and class enrollments, and write SQL queries returning GPA and major breakdowns.",
    requirements: [
      "Create three relational tables: students, courses, and enrollments (junction table).",
      "Use Foreign Key constraints to maintain referential integrity.",
      "Write SQL JOIN query compiling students records with grades."
    ],
    expectedOutput: "SQL Query: SELECT students.name, courses.title, enrollments.grade FROM students...\nResult:\n- John Doe | CS 101 | A (4.0)\n- Alice Smith | Math 201 | B (3.0)",
    folderStructure: "student_db/\n├── db_manager.py  # SQLite transaction connector\n└── schema.sql     # Database structure script",
    steps: [
      "Write schema.sql file creating student, course, and enrollment tables.",
      "Implement db_manager.py script building SQLite database files.",
      "Seed test values using INSERT statements.",
      "Write INNER JOIN queries returning student report cards."
    ]
  },
  {
    id: "mini_db_2",
    title: "Hospital Patients Records Manager",
    category: "DBMS",
    problemStatement: "Build a database CLI application managing hospital records, linking patients, doctors, and appointment visits.",
    requirements: [
      "Define tables: patients (id, name, birthdate), doctors (id, name, specialization), and appointments (id, patient_id, doctor_id, date, diagnosis).",
      "Ensure appointments enforce patient and doctor existences.",
      "Write queries listing patient diagnostic histories."
    ],
    expectedOutput: "Patient: Bob | Doctor: Dr. House | Date: 2026-05-12\nDiagnosis: Common Cold | Prescriptions: Rest",
    folderStructure: "hospital_db/\n├── app.py         # Clinic CLI menu\n└── database.py    # SQL query executors",
    steps: [
      "Define SQLite tables with constraints.",
      "Write appointment scheduler checking doctor availability.",
      "Write query joining tables to compile doctor patient charts.",
      "Handle null fields (e.g. missing follow-up dates) gracefully."
    ]
  },
  {
    id: "mini_db_3",
    title: "Movie Review & Rating Engine",
    category: "DBMS",
    problemStatement: "Create a database engine storing movies, directors, and user reviews, returning average movie ratings and lists by genre.",
    requirements: [
      "Define tables: movies, directors, and reviews (rating scale 1 to 5).",
      "Write SQL aggregation queries (AVG, COUNT) grouping reviews by movie.",
      "Support deleting reviews: ensure statistics update dynamically."
    ],
    expectedOutput: "Movie: Inception | Director: Nolan | Genre: Sci-Fi\nAverage Rating: 4.8 / 5.0 (Based on 120 reviews)",
    folderStructure: "movie_db/\n├── main.py        # Movie explorer CLI\n└── engine.py      # SQL query runners",
    steps: [
      "Draft SQLite movie tables schema.",
      "Implement review insertion methods validating ratings limits (1-5).",
      "Write queries utilizing AVG() and GROUP BY to compute movie statistics.",
      "Display top rated films in terminal tables."
    ]
  }
];
