"""
Day 23: DNS Concept & IP Address Resolution
Practical Task: Implement a domain name utility.

Requirements:
- Resolve a domain name (like "google.com") to its IPv4 address using Python's standard `socket.gethostbyname()`.
- Add error handling for invalid domain names (catching socket.gaierror).
- Allow user input in CLI mode, but provide a fallback domain for automated tests.
"""

import socket

def resolve_domain(domain_name: str) -> str:
    """Resolves a domain name to an IPv4 address. Returns IP, or raises ValueError on failure."""
    try:
        ip_address = socket.gethostbyname(domain_name)
        return ip_address
    except socket.gaierror as e:
        raise ValueError(f"Failed to resolve '{domain_name}': Name or service not known ({e})")

if __name__ == "__main__":
    print("--- Testing Day 23: DNS Lookup ---")
    
    test_domains = ["google.com", "github.com", "this-domain-does-not-exist-12345.xyz"]
    
    for domain in test_domains:
        print(f"\nResolving '{domain}':")
        try:
            ip = resolve_domain(domain)
            print(f"  IP Address: {ip}")
        except ValueError as err:
            print(f"  Error: {err}")
