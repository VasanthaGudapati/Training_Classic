"""
Day 30: System Design: A Basic Rate Limiter
Practical Task: Build a simple Token Bucket Rate Limiter class.

Requirements:
- Implement a SimpleRateLimiter class initialized with max tokens and a refill rate (e.g. tokens per second).
- Track bucket volume and the timestamp of the last request to calculate token recovery dynamically.
- Implement allow_request() which returns True if a request is allowed (and consumes a token), or False if blocked.
- Test limits by executing burst requests and printing limit status messages.
"""

import time

class SimpleRateLimiter:
    def __init__(self, max_tokens: int, refill_rate_per_sec: float):
        self.max_tokens = max_tokens
        self.refill_rate = refill_rate_per_sec
        self.tokens = float(max_tokens)
        self.last_refill_time = time.perf_counter()

    def _refill(self) -> None:
        """Helper to refill the token bucket based on elapsed time."""
        now = time.perf_counter()
        elapsed = now - self.last_refill_time
        
        # Calculate new tokens refilled
        refilled_tokens = elapsed * self.refill_rate
        if refilled_tokens > 0:
            self.tokens = min(self.max_tokens, self.tokens + refilled_tokens)
            self.last_refill_time = now

    def allow_request(self) -> bool:
        """Checks if request can pass. Consumes 1 token if allowed. Thread-unsafe."""
        self._refill()
        
        if self.tokens >= 1.0:
            self.tokens -= 1.0
            return True
        else:
            return False

if __name__ == "__main__":
    print("--- Testing Day 30: Token Bucket Rate Limiter ---")
    
    # Bucket capacity: 3 requests, refills at 1 token per second
    limiter = SimpleRateLimiter(max_tokens=3, refill_rate_per_sec=1.0)
    
    # Simulate a burst of 5 rapid requests
    print("\nBursting 5 rapid requests:")
    for i in range(1, 6):
        allowed = limiter.allow_request()
        status = "ALLOWED" if allowed else "BLOCKED (Rate Limit Exceeded)"
        print(f"  Request {i}: {status} (Remaining tokens: {limiter.tokens:.2f})")
        
    # Wait for 1.5 seconds to refill some tokens
    print("\nSleeping for 1.5 seconds...")
    time.sleep(1.5)
    
    # Try another 2 requests
    print("Checking recovery requests:")
    for i in range(6, 8):
        allowed = limiter.allow_request()
        status = "ALLOWED" if allowed else "BLOCKED"
        print(f"  Request {i}: {status} (Remaining tokens: {limiter.tokens:.2f})")
