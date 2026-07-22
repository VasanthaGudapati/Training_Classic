"""
Day 19: Low-Level Socket Programming Basics
Practical Task: Build a simple TCP Echo Server and Client.

Requirements:
- Set up a basic TCP server socket (bind, listen, accept).
- Server should read incoming bytes and echo them back to the client.
- Client socket should connect, transmit a message, read the response, and close.
- We run the server in a background thread to allow self-contained verification in one script.
"""

import socket
import threading
import time

HOST = "127.0.0.1"
PORT = 65432

def start_server():
    """Sets up a low-level TCP Socket Echo Server."""
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    try:
        server_socket.bind((HOST, PORT))
        server_socket.listen(1)
        print(f"[Server] Listening on {HOST}:{PORT}...")
        
        conn, addr = server_socket.accept()
        print(f"[Server] Client connected from {addr}")
        
        data = conn.recv(1024)
        if data:
            print(f"[Server] Received data: '{data.decode()}' -> Echoing back...")
            conn.sendall(data)
            
        conn.close()
    except Exception as e:
        print(f"[Server Error] {e}")
    finally:
        server_socket.close()
        print("[Server] Socket closed.")

def run_client():
    """Sets up a TCP Socket Client to send data and read the echo."""
    print("[Client] Connecting to echo server...")
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    
    try:
        client_socket.connect((HOST, PORT))
        msg = "Hello Low-Level Networks!"
        print(f"[Client] Sending: '{msg}'")
        client_socket.sendall(msg.encode())
        
        response = client_socket.recv(1024)
        print(f"[Client] Echo received: '{response.decode()}'")
    except Exception as e:
        print(f"[Client Error] {e}")
    finally:
        client_socket.close()

if __name__ == "__main__":
    print("--- Testing Day 19: TCP Sockets ---")
    # Start server in background thread so the client can connect within the same process
    server_thread = threading.Thread(target=start_server, daemon=True)
    server_thread.start()
    
    # Wait for server socket to initialize
    time.sleep(0.5)
    
    # Run the client in foreground
    run_client()
