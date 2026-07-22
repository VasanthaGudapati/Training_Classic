"""
Day 25: Relational Databases & SQL Basics
Practical Task: Create a SQLite DB and run basic operations.

Requirements:
- Establish a database connection using SQLite (we use in-memory database for testing).
- Create a table named `students` with fields: `id` (integer, primary key), `name` (text), and `age` (integer).
- Write code to:
  - Insert 3 student records.
  - Select students where age > 20.
  - Update a student's age.
  - Print the results before and after operations.
"""

import sqlite3

def run_db_operations():
    # Use :memory: database to run all tests without writing static database files to disk
    conn = sqlite3.connect(":memory:")
    cursor = conn.cursor()
    
    # 1. Create table
    cursor.execute("""
        CREATE TABLE students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL,
            age INTEGER NOT NULL
        )
    """)
    print("[*] Table 'students' created successfully.")
    
    # 2. Insert records
    student_records = [
        ("Alice Smith", 22),
        ("Bob Johnson", 19),
        ("Charlie Brown", 24)
    ]
    cursor.executemany("INSERT INTO students (name, age) VALUES (?, ?)", student_records)
    conn.commit()
    print("[*] Inserted 3 student records.")
    
    # 3. Query all students
    print("\nAll students initially:")
    cursor.execute("SELECT * FROM students")
    for row in cursor.fetchall():
        print(f"  ID={row[0]}, Name={row[1]}, Age={row[2]}")
        
    # 4. Filter students where age > 20
    print("\nStudents older than 20:")
    cursor.execute("SELECT * FROM students WHERE age > 20")
    for row in cursor.fetchall():
        print(f"  ID={row[0]}, Name={row[1]}, Age={row[2]}")
        
    # 5. Update a student's age (e.g. Bob turns 20)
    print("\nUpdating Bob Johnson's age to 20...")
    cursor.execute("UPDATE students SET age = ? WHERE name = ?", (20, "Bob Johnson"))
    conn.commit()
    
    # Query final records
    print("\nFinal state of students table:")
    cursor.execute("SELECT * FROM students")
    for row in cursor.fetchall():
        print(f"  ID={row[0]}, Name={row[1]}, Age={row[2]}")
        
    conn.close()

if __name__ == "__main__":
    print("--- Testing Day 25: Relational SQL Basics ---")
    run_db_operations()
