"""
Day 20: Handling Multiple Clients (Sequential Loop)
Practical Task: Upgrade the Day 19 TCP Server to handle connections sequentially.

Requirements:
- Run a server connection loop that accepts and processes clients sequentially without crashing.
- Show how the socket server accepts a client, communicates, closes it, and loops back to accept another.
- We limit the loop to 3 connections for testing purposes so this script exits cleanly.
"""

import socket
import threading
import time

HOST = "127.0.0.1"
PORT = 65433

def start_sequential_server(max_clients: int = 3):
    """Echo server that handles clients one-by-one in a sequential loop."""
    server_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    server_socket.setsockopt(socket.SOL_SOCKET, socket.SO_REUSEADDR, 1)
    
    try:
        server_socket.bind((HOST, PORT))
        server_socket.listen(5)
        print(f"[Server] Sequential Server listening on {HOST}:{PORT}...")
        
        client_count = 0
        while client_count < max_clients:
            print("[Server] Waiting for next client in loop...")
            conn, addr = server_socket.accept()
            client_count += 1
            print(f"[Server] Connection accepted #{client_count} from {addr}")
            
            # Read and respond
            data = conn.recv(1024)
            if data:
                print(f"[Server] Received: '{data.decode()}' -> Echoing...")
                conn.sendall(f"Client #{client_count} Echo: {data.decode()}".encode())
                
            conn.close()
            print(f"[Server] Closed connection #{client_count}\n")
            
        print("[Server] Max test client limit reached. Shutting down server.")
    except Exception as e:
        print(f"[Server Error] {e}")
    finally:
        server_socket.close()

def run_client(client_num: int):
    """Client helper connection."""
    client_socket = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
    try:
        client_socket.connect((HOST, PORT))
        msg = f"Message from client A{client_num}"
        client_socket.sendall(msg.encode())
        response = client_socket.recv(1024)
        print(f"  [Client A{client_num} Received]: '{response.decode()}'")
    except Exception as e:
        print(f"  [Client A{client_num} Error]: {e}")
    finally:
        client_socket.close()

if __name__ == "__main__":
    print("--- Testing Day 20: Sequential Multi-Client Sockets ---")
    
    # Start server in background thread (limited to 3 test clients)
    server_thread = threading.Thread(target=start_sequential_server, args=(3,), daemon=True)
    server_thread.start()
    
    time.sleep(0.5)
    
    # Fire 3 client connections sequentially
    for i in range(1, 4):
        run_client(i)
        time.sleep(0.3)
        
    server_thread.join(timeout=3)
    print("[*] Completed sequential socket execution testing.")
