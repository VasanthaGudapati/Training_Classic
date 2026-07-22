"""
Day 26: Database Relations & SQL Joins
Practical Task: Run relational operations in SQLite.

Requirements:
- Create a related table grades (id, student_id, subject, score) linked via a Foreign Key to students.
- Insert records linking students to multiple grades.
- Write a SQL query using INNER JOIN to fetch and print student names alongside their scores.
- Group the results to compute and display average grades per student.
"""

import sqlite3

def run_db_joins():
    conn = sqlite3.connect(":memory:")
    # Enable foreign keys support in SQLite
    conn.execute("PRAGMA foreign_keys = ON")
    cursor = conn.cursor()
    
    # Create tables
    cursor.execute("""
        CREATE TABLE students (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT NOT NULL
        )
    """)
    
    cursor.execute("""
        CREATE TABLE grades (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            student_id INTEGER NOT NULL,
            subject TEXT NOT NULL,
            score REAL NOT NULL,
            FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
        )
    """)
    
    # Insert students
    students = [("Alice",), ("Bob",), ("Charlie",)]
    cursor.executemany("INSERT INTO students (name) VALUES (?)", students)
    
    # Insert grades
    # Alice (id=1): Math=95, Science=88
    # Bob (id=2): Math=72, Science=80
    # Charlie (id=3): Math=85, Science=90
    grades = [
        (1, "Math", 95.0),
        (1, "Science", 88.0),
        (2, "Math", 72.0),
        (2, "Science", 80.0),
        (3, "Math", 85.0),
        (3, "Science", 90.0)
    ]
    cursor.executemany("INSERT INTO grades (student_id, subject, score) VALUES (?, ?, ?)", grades)
    conn.commit()
    
    # 1. Fetch raw scores with INNER JOIN
    print("Scores with INNER JOIN:")
    cursor.execute("""
        SELECT students.name, grades.subject, grades.score
        FROM students
        INNER JOIN grades ON students.id = grades.student_id
    """)
    for row in cursor.fetchall():
        print(f"  Student: {row[0]:<8} | Subject: {row[1]:<8} | Score: {row[2]}")
        
    # 2. Compute average score per student using GROUP BY
    print("\nAverage grades per student:")
    cursor.execute("""
        SELECT students.name, AVG(grades.score) as average_score
        FROM students
        INNER JOIN grades ON students.id = grades.student_id
        GROUP BY students.id
    """)
    for row in cursor.fetchall():
        print(f"  Student: {row[0]:<8} | Average Grade: {row[1]:.2f}")
        
    conn.close()

if __name__ == "__main__":
    print("--- Testing Day 26: SQL JOINs & Aggregations ---")
    run_db_joins()
