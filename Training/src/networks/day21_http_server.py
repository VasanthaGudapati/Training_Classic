"""
Day 21: The HTTP Protocol & Raw Web Server
Practical Task: Build a raw web server parsing HTTP.

Requirements:
- Intercept incoming connections using TCP sockets.
- Read the raw HTTP request string from the browser/client.
- Build a valid raw HTTP/1.1 response containing header data, Content-Type, Content-Length, and HTML body.
- Send the response back and close the socket.
"""

import socket
import threading
import time
import urllib.request

HOST = "127.0.0.1"
PORT = 65434

def start_raw_http_server():
    """Starts a raw TCP socket server that responds with valid HTTP/1.1 protocol strings."""
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    try:
        server_socket.bind((HOST, PORT))
        server_socket.listen(1)
        print(f"[HTTP Server] Running on http://{HOST}:{PORT} (Listening)...")
        
        conn, addr = server_socket.accept()
        print(f"[HTTP Server] Accepted connection from {addr}")
        
        # Read the raw request headers/request line
        request = conn.recv(2048).decode(errors="ignore")
        print("\n--- Received Raw HTTP Request ---")
        # Print the first line (Request Line) of incoming HTTP request
        first_line = request.split("\n")[0] if request else "Empty request"
        print(f"  {first_line}")
        print("---------------------------------")
        
        # Construct raw HTTP Response
        html_body = "<html><body><h1>Hello from Raw Python Web Server!</h1><p>Day 21 completed successfully.</p></body></html>"
        
        response = (
            "HTTP/1.1 200 OK\r\n"
            "Content-Type: text/html; charset=utf-8\r\n"
            f"Content-Length: {len(html_body.encode())}\r\n"
            "Connection: close\r\n"
            "\r\n"
            f"{html_body}"
        )
        
        conn.sendall(response.encode())
        conn.close()
        print("[HTTP Server] Sent HTTP response and closed client connection.")
    except Exception as e:
        print(f"[HTTP Server Error] {e}")
    finally:
        server_socket.close()

if __name__ == "__main__":
    print("--- Testing Day 21: Raw HTTP Web Server ---")
    
    # Run the server in a thread
    server_thread = threading.Thread(target=start_raw_http_server, daemon=True)
    server_thread.start()
    
    time.sleep(0.5)
    
    # Make a request using python's built-in urllib
    try:
        url = f"http://{HOST}:{PORT}/"
        print(f"[Client] Sending HTTP request to: {url}")
        with urllib.request.urlopen(url) as response:
            html = response.read().decode()
            print("\n[Client] Response status:", response.status)
            print("[Client] Response HTML body:\n ", html)
    except Exception as e:
        print(f"[Client Error] Failed to fetch: {e}")
        
    print("[*] Completed raw HTTP Server testing.")
