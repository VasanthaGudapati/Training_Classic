"""
Day 24: Secure Communication: Hashing & Cryptography Concepts
Practical Task: Build a password secure hashing utility.

Requirements:
- Implement hash_password(password) using SHA-256 and a random salt value.
- Implement verify_password(stored_hash, salt, input_password) returning True if passwords match.
- Use Python's built-in hashlib and secrets/os modules.
"""

import hashlib
import secrets

def hash_password(password: str) -> tuple:
    """Generates a secure SHA-256 hash using a randomized salt. Returns (hex_hash, hex_salt)."""
    # Generate 16 bytes of secure random salt
    salt = secrets.token_bytes(16)
    
    # Hash password combined with salt
    hash_obj = hashlib.sha256()
    hash_obj.update(salt + password.encode())
    
    return hash_obj.hexdigest(), salt.hex()

def verify_password(stored_hash: str, salt_hex: str, input_password: str) -> bool:
    """Verifies input_password matches stored_hash + salt."""
    salt = bytes.fromhex(salt_hex)
    hash_obj = hashlib.sha256()
    hash_obj.update(salt + input_password.encode())
    
    return hash_obj.hexdigest() == stored_hash

if __name__ == "__main__":
    print("--- Testing Day 24: Secure Password Hashing ---")
    password = "MySecurePassword123!"
    print("Original Password:   ", password)
    
    pwd_hash, pwd_salt = hash_password(password)
    print("Derived Hash:        ", pwd_hash)
    print("Derived Salt (Hex):  ", pwd_salt)
    
    print("\nVerifying correct password:")
    match_correct = verify_password(pwd_hash, pwd_salt, password)
    print("  Matches?:", match_correct)
    
    print("\nVerifying incorrect password:")
    match_wrong = verify_password(pwd_hash, pwd_salt, "WrongPassword!")
    print("  Matches?:", match_wrong)
