"""
Day 7: Object-Oriented Programming (OOP) Basics
Practical Task: Design a simple Banking Account System.

Requirements:
- Create a base class BankAccount with protected/private attributes (_balance, _account_number).
- Implement deposit(amount) and withdraw(amount) methods on the base class.
- Create a subclass SavingsAccount that inherits from BankAccount and adds an apply_interest() method.
- Practice the pillars of OOP: encapsulation, inheritance, and abstraction.
"""

class BankAccount:
    def __init__(self, account_number: str, initial_balance: float = 0.0):
        self._account_number = account_number
        self._balance = initial_balance

    def deposit(self, amount: float) -> float:
        """Deposits a positive amount into the account."""
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self._balance += amount
        print(f"[*] Deposited ${amount:.2f}. New Balance: ${self._balance:.2f}")
        return self._balance

    def withdraw(self, amount: float) -> float:
        """Withdraws amount from the account, if funds are available."""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self._balance:
            print(f"[Error] Insufficient funds for withdrawal of ${amount:.2f} (Current: ${self._balance:.2f})")
            return self._balance
        self._balance -= amount
        print(f"[*] Withdrew ${amount:.2f}. New Balance: ${self._balance:.2f}")
        return self._balance

    def get_balance(self) -> float:
        """Encapsulation: balance is protected, accessed via this getter method."""
        return self._balance

    def get_account_number(self) -> str:
        """Encapsulation: account number getter."""
        return self._account_number

class SavingsAccount(BankAccount):
    def __init__(self, account_number: str, initial_balance: float = 0.0, interest_rate: float = 0.05):
        super().__init__(account_number, initial_balance)
        self.interest_rate = interest_rate

    def apply_interest(self) -> float:
        """Calculates and deposits interest based on current balance."""
        interest = self._balance * self.interest_rate
        print(f"[*] Applying interest at rate {self.interest_rate * 100}% (Interest earned: ${interest:.2f})")
        self.deposit(interest)
        return self._balance

if __name__ == "__main__":
    print("--- Testing Day 7: OOP Banking System ---")
    print("\nCreating standard Bank Account:")
    acc = BankAccount("101001", 100.0)
    acc.deposit(50.0)
    acc.withdraw(30.0)
    acc.withdraw(200.0) # Should fail
    print("Final Balance:", acc.get_balance())
    
    print("\nCreating Savings Account:")
    sav = SavingsAccount("202002", 1000.0, interest_rate=0.04)
    sav.deposit(500.0)
    sav.apply_interest()
    sav.withdraw(200.0)
    print("Final Savings Balance:", sav.get_balance())
