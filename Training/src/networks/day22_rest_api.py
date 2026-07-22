"""
Day 22: REST APIs & JSON Serialization
Practical Task: Build a micro web service managing a Todo list.

Requirements:
- Implement a JSON API with endpoints:
  - GET /todos (returns the current list of todo items in JSON format).
  - POST /todos (accepts a JSON payload to add a new todo item).
- Perform basic data validation on POST payloads.
- We utilize standard library `http.server` to make this script dependency-free.
"""

from http.server import BaseHTTPRequestHandler, HTTPServer
import json
import threading
import time
import urllib.request

HOST = "127.0.0.1"
PORT = 65435

# In-memory todo store
todos = [
    {"id": 1, "task": "Learn Dynamic Arrays", "done": True},
    {"id": 2, "task": "Implement a Graph", "done": False}
]

class TodoAPIHandler(BaseHTTPRequestHandler):
    def log_message(self, format, *args):
        # Override to suppress standard HTTP logging to console for cleaner test runs
        return

    def do_GET(self):
        if self.path == "/todos":
            self.send_response(200)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            
            response_payload = json.dumps(todos)
            self.wfile.write(response_payload.encode())
        else:
            self.send_error(404, "Endpoint not found")

    def do_POST(self):
        if self.path == "/todos":
            content_length = int(self.headers.get("Content-Length", 0))
            post_data = self.rfile.read(content_length)
            
            try:
                payload = json.loads(post_data.decode())
            except json.JSONDecodeError:
                self.send_response(400)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Invalid JSON format"}).encode())
                return

            # Basic validation
            if "task" not in payload:
                self.send_response(422)
                self.send_header("Content-Type", "application/json")
                self.end_headers()
                self.wfile.write(json.dumps({"error": "Missing 'task' field in request"}).encode())
                return
                
            new_id = len(todos) + 1
            new_todo = {
                "id": new_id,
                "task": payload["task"],
                "done": payload.get("done", False)
            }
            todos.append(new_todo)
            
            self.send_response(201)
            self.send_header("Content-Type", "application/json")
            self.end_headers()
            self.wfile.write(json.dumps(new_todo).encode())
        else:
            self.send_error(404, "Endpoint not found")

def start_api_server():
    server = HTTPServer((HOST, PORT), TodoAPIHandler)
    print(f"[REST API] Server running on http://{HOST}:{PORT}/todos")
    # Handle exactly 2 requests then shut down for safe execution testing
    server.handle_request() # Handles the GET
    server.handle_request() # Handles the POST
    server.server_close()
    print("[REST API] Server shut down.")

if __name__ == "__main__":
    print("--- Testing Day 22: REST API & JSON ---")
    server_thread = threading.Thread(target=start_api_server, daemon=True)
    server_thread.start()
    
    time.sleep(0.5)
    
    # 1. Test GET /todos
    try:
        url = f"http://{HOST}:{PORT}/todos"
        print(f"\n[Client] Sending GET {url}")
        with urllib.request.urlopen(url) as res:
            data = json.loads(res.read().decode())
            print("  Response:", data)
    except Exception as e:
        print("  GET Failed:", e)
        
    # 2. Test POST /todos
    try:
        url = f"http://{HOST}:{PORT}/todos"
        payload = json.dumps({"task": "Study process scheduling"}).encode()
        print(f"\n[Client] Sending POST {url} with task 'Study process scheduling'")
        
        req = urllib.request.Request(url, data=payload, headers={"Content-Type": "application/json"})
        with urllib.request.urlopen(req) as res:
            data = json.loads(res.read().decode())
            print("  Response (201 Created):", data)
    except Exception as e:
        print("  POST Failed:", e)
        
    server_thread.join(timeout=3)
