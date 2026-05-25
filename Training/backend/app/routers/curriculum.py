import os
import sys
import json
import subprocess
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import Optional, Dict
from ..database import get_db
from .. import models, schemas, auth

router = APIRouter(
    prefix="/api",
    tags=["Curriculum"]
)

# Standard Revision Curriculum Schema Definition (Backwards Compatible)
CURRICULUM = {
    0: {"title": "Preparation & CS Roadmap Warmup", "path": "src/dsa/day0_prep.py", "module": "1. Foundations & Basic Data Structures", "desc": "Day 0: Get a structured overview of all 5 modules. Read through the core CS concepts layer by layer, and open the sandbox code executor to run warm-up scripts."},
    1: {"title": "Variables, Flow Control & Functions", "path": "src/dsa/day1_basics.py", "module": "1. Foundations & Basic Data Structures", "desc": "Review memory allocation, logical branches, loop syntax, scope rules, and write an interactive CLI number guessing game that saves high scores to a file."},
    2: {"title": "Dynamic Arrays & Array Resizing", "path": "src/dsa/day2_dynamic_array.py", "module": "1. Foundations & Basic Data Structures", "desc": "Understand linear continuous memory, indexing speed ($O(1)$) vs. insertion ($O(N)$), and build a custom resizing DynamicArray class from scratch."},
    3: {"title": "Strings & Substring Searching", "path": "src/dsa/day3_strings.py", "module": "1. Foundations & Basic Data Structures", "desc": "Analyze string memory buffers, immutability, and implement custom functions for reversing strings, checking palindromes, and substring search without built-in libraries."},
    4: {"title": "Recursion & Complexity Basics (Big O)", "path": "src/dsa/day4_recursion.py", "module": "1. Foundations & Basic Data Structures", "desc": "Master base cases, recursive branches, stack growth, and construct recursive factorial/fibonacci models with runtime timing decorators to view growth differences."},
    5: {"title": "Singly Linked Lists", "path": "src/dsa/day5_linked_list.py", "module": "1. Foundations & Basic Data Structures", "desc": "Study pointer reference linking and implement a custom SinglyLinkedList class with head/tail insertions, deletion, and sequence display operations."},
    6: {"title": "Basic Search & Sorting", "path": "src/dsa/day6_sorting.py", "module": "1. Foundations & Basic Data Structures", "desc": "Explore basic bubble sort, selection sort, and recursive binary search on sorted lists, calculating real-world timing comparison metrics."},
    
    7: {"title": "Object-Oriented Programming (OOP) Basics", "path": "src/os/day7_oop_banking.py", "module": "2. OOP & Intermediate Data Structures", "desc": "Incorporate OOP principles (encapsulation, abstraction, inheritance, polymorphism) by modeling a robust Bank Account system with custom interest rates."},
    8: {"title": "Stacks & Queues (Linear Structures)", "path": "src/dsa/day8_stacks_queues.py", "module": "2. OOP & Intermediate Data Structures", "desc": "Write Stack and Queue data structures, then use the Stack to solve a parentheses matching/balancing validator puzzle."},
    9: {"title": "Custom Hash Tables", "path": "src/dsa/day9_hash_map.py", "module": "2. OOP & Intermediate Data Structures", "desc": "Implement a simple HashMap from first-principles featuring a custom polynomial hash calculation and basic linear probing/chaining collision resolution."},
    10: {"title": "Binary Trees & Recursive Traversals", "path": "src/dsa/day10_binary_tree.py", "module": "2. OOP & Intermediate Data Structures", "desc": "Model hierarchical tree nodes and implement recursive Depth-First search patterns: in-order, pre-order, and post-order traversals."},
    11: {"title": "Binary Search Trees (BST) Basics", "path": "src/dsa/day11_bst_basics.py", "module": "2. OOP & Intermediate Data Structures", "desc": "Learn the ordered sorting property of BST nodes and write an insert/search tree structure supporting $O(\\log N)$ average query speeds."},
    12: {"title": "Graph Representations & BFS Traversal", "path": "src/dsa/day12_graphs.py", "module": "2. OOP & Intermediate Data Structures", "desc": "Create a Graph structure represented by an Adjacency List. Implement an edge-connection graph builder and run a queue-based Breadth-First Search traversal."},
    
    13: {"title": "Robust File I/O & Error Log Analysis", "path": "src/os/day13_log_parser.py", "module": "3. OS Basics & Systems Programming", "desc": "Read files line-by-line using safe stream buffers, handle missing file exceptions gracefully, extract error log matches, and write custom reports to disk."},
    14: {"title": "Process CPU Scheduling Simulation", "path": "src/os/day14_scheduling_sim.py", "module": "3. OS Basics & Systems Programming", "desc": "Simulate CPU scheduling states. Write process simulator models executing First-Come First-Served (FCFS) and Round Robin scheduling strategies, analyzing average wait times."},
    15: {"title": "Introduction to Multi-threading", "path": "src/os/day15_basic_threads.py", "module": "3. OS Basics & Systems Programming", "desc": "Spawn concurrent tasks utilizing Python's threading system, examining context switching and thread sleep states through overlapping log output."},
    16: {"title": "Thread Synchronization & Locks", "path": "src/os/day16_locks.py", "module": "3. OS Basics & Systems Programming", "desc": "Simulate a multi-threaded data corruption race condition, then introduce a threading.Lock construct to establish safe mutual exclusion sections."},
    17: {"title": "Caching Strategy: The FIFO Cache Simulator", "path": "src/os/day17_fifo_cache.py", "module": "3. OS Basics & Systems Programming", "desc": "Write a cache manager working under the FIFO (First In First Out) replacement scheme, and measure hit/miss rates across dynamic resource queries."},
    18: {"title": "File Compression Basics (RLE)", "path": "src/os/day18_rle_compression.py", "module": "3. OS Basics & Systems Programming", "desc": "Analyze data redundancy and program a clean Run-Length Encoding utility to compress and reconstruct string content without loss."},
    
    19: {"title": "Low-Level Socket Programming Basics", "path": "src/networks/day19_sockets.py", "module": "4. Computer Networks & Web Communication", "desc": "Write a raw low-level TCP Socket Echo Server and matching Socket Echo Client to understand connection setup, bind states, and standard socket read/write streams."},
    20: {"title": "Handling Multiple Clients (Sequential Loop)", "path": "src/networks/day20_multi_client.py", "module": "4. Computer Networks & Web Communication", "desc": "Enhance your socket server using persistent accept connection loops, showing how client sessions are handled in sequence without system crashes."},
    21: {"title": "The HTTP Protocol & Raw Web Server", "path": "src/networks/day21_http_server.py", "module": "4. Computer Networks & Web Communication", "desc": "Intercept browser connections over TCP. Construct a raw HTTP/1.1 response string with valid status headers and serve a basic HTML page to the browser."},
    22: {"title": "REST APIs & JSON Serialization", "path": "src/networks/day22_rest_api.py", "module": "4. Computer Networks & Web Communication", "desc": "Understand modern backend APIs. Write RESTful GET and POST endpoints serving JSON payloads, incorporating simple payload validation logic."},
    23: {"title": "DNS Concept & IP Address Resolution", "path": "src/networks/day23_dns_lookup.py", "module": "4. Computer Networks & Web Communication", "desc": "Learn how hostnames map to network interfaces and build a hostname lookup tool utilizing socket.gethostbyname with strict error checks."},
    24: {"title": "Secure Communication: Hashing & Cryptography", "path": "src/networks/day24_security.py", "module": "4. Computer Networks & Web Communication", "desc": "Explore password security concepts. Build a tool utilizing SHA-256 with dynamic salt keys to safely secure and check customer passwords without flat-text storage."},
    
    25: {"title": "Relational Databases & SQL Basics", "path": "src/db/day25_sqlite_basics.py", "module": "5. Database Basics & Data Persistence", "desc": "Connect to SQLite. Construct a database table schema, write relational rows, and execute basic SQL SELECT filter queries."},
    26: {"title": "Database Relations & SQL Joins", "path": "src/db/day26_sqlite_joins.py", "module": "5. Database Basics & Data Persistence", "desc": "Establish Foreign Key relationships between multi-table relational layers and perform SQL INNER JOIN aggregations with average computations."},
    27: {"title": "Database Indexing: Theoretical Concept", "path": "src/db/day27_db_index.py", "module": "5. Database Basics & Data Persistence", "desc": "Examine how indexing keys optimize lookup speeds. Build a simulated dictionary index in memory and time differences between $O(N)$ linear scans and $O(1)$ indexed retrieval."},
    28: {"title": "Simple Key-Value Disk Store", "path": "src/db/day28_keyvalue_store.py", "module": "5. Database Basics & Data Persistence", "desc": "Implement a simple storage engine that writes dictionary state to flat files on database operations and reads persistent keys on startup."},
    29: {"title": "System Architecture: The MVC Pattern", "path": "src/design/day29_mvc_todo.py", "module": "5. Database Basics & Data Persistence", "desc": "Design a modular CLI application adhering strictly to the Model-View-Controller pattern to practice decoupled application state engineering."},
    30: {"title": "System Design: A Basic Rate Limiter", "path": "src/design/day30_rate_limiter.py", "module": "5. Database Basics & Data Persistence", "desc": "Review server request defense systems and write an active Token Bucket algorithm limits simulator checking API access counts."}
}


@router.get("/status")
def get_curriculum_status(
    db: Session = Depends(get_db),
    current_user: Optional[models.User] = Depends(auth.get_current_user)
):
    status_data = {}
    
    # Query database progress for the active user if logged in
    user_progress_map = {}
    if current_user:
        user_progress = db.query(models.DayProgress).filter(models.DayProgress.user_id == current_user.id).all()
        user_progress_map = {p.day: p.completed for p in user_progress}

    for day, item in CURRICULUM.items():
        file_path = item["path"]
        exists = os.path.exists(file_path) if file_path else False
        
        # Symmetrical database-disk merge completion logic
        completed = exists
        if current_user and day in user_progress_map:
            completed = user_progress_map[day]

        status_data[day] = {
            "title": item["title"],
            "path": file_path,
            "module": item["module"],
            "desc": item["desc"],
            "exists": exists,
            "completed": completed
        }
        
    return status_data


@router.get("/notes")
def get_notes(
    day: Optional[int] = None,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if day is not None:
        db_note = db.query(models.Note).filter(
            models.Note.user_id == current_user.id,
            models.Note.day == day
        ).first()
        return {"note": db_note.content if db_note else ""}
    else:
        # Load all notes as Key-Value
        notes = db.query(models.Note).filter(models.Note.user_id == current_user.id).all()
        return {str(n.day): n.content for n in notes}


@router.post("/notes")
def save_notes(
    payload: schemas.NoteCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    # Upsert note logic
    db_note = db.query(models.Note).filter(
        models.Note.user_id == current_user.id,
        models.Note.day == payload.day
    ).first()
    
    if db_note:
        db_note.content = payload.content
    else:
        db_note = models.Note(
            day=payload.day,
            content=payload.content,
            user_id=current_user.id
        )
        db.add(db_note)
        
    # Auto-save day progress completion when user takes revision comments notes!
    db_progress = db.query(models.DayProgress).filter(
        models.DayProgress.user_id == current_user.id,
        models.DayProgress.day == payload.day
    ).first()
    
    if db_progress:
        db_progress.completed = True
    else:
        db_progress = models.DayProgress(
            day=payload.day,
            completed=True,
            user_id=current_user.id
        )
        db.add(db_progress)

    db.commit()
    return {"success": True}


@router.post("/run_code", response_model=schemas.CodeRunResponse)
def execute_playground_sandbox(
    payload: schemas.CodeRunRequest,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    code_content = payload.code
    
    # Save sandbox script locally
    temp_file = "src/temp_playground.py"
    os.makedirs(os.path.dirname(temp_file), exist_ok=True)
    
    try:
        with open(temp_file, "w", encoding="utf-8") as f:
            f.write(code_content)
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Failed to create temporary sandbox runner script: {str(e)}"
        )
        
    # Launch subprocess compiler sandbox
    try:
        result = subprocess.run(
            [sys.executable, temp_file],
            capture_output=True,
            text=True,
            timeout=10
        )
        response_payload = {
            "exit_code": result.returncode,
            "stdout": result.stdout,
            "stderr": result.stderr
        }
    except subprocess.TimeoutExpired as te:
        response_payload = {
            "exit_code": -1,
            "stdout": te.stdout or "",
            "stderr": "Execution timed out (10s limit exceeded)."
        }
    except Exception as e:
        response_payload = {
            "exit_code": -99,
            "stdout": "",
            "stderr": f"Failed to execute script process: {str(e)}"
        }
    finally:
        # Clean up sandbox script file
        try:
            if os.path.exists(temp_file):
                os.remove(temp_file)
        except Exception:
            pass
            
    return response_payload


@router.post("/lint", response_model=schemas.CodeLintResponse)
def lint_code_sandbox(
    payload: schemas.CodeLintRequest
):
    errors = []
    if payload.lang == "python" and payload.code.strip():
        try:
            # Check syntax by compiling AST
            compile(payload.code, "<string>", "exec")
        except SyntaxError as se:
            errors.append({
                "line": se.lineno or 1,
                "offset": se.offset or 1,
                "text": se.text or "",
                "message": se.msg or "Syntax Error"
            })
        except Exception as e:
            errors.append({
                "line": 1,
                "offset": 1,
                "text": "",
                "message": str(e)
            })
            
    return {"errors": errors}
