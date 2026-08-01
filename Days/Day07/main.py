"""
Day 07: Object-Oriented Programming (OOP) & Banking System
Practical Task: Interactive CLI Banking System Simulator demonstrating Encapsulation, Inheritance, & Polymorphism.
"""

from abc import ABC, abstractmethod
from datetime import datetime
from typing import List, Optional


class Transaction:
    """Represents an individual financial transaction."""

    def __init__(self, tx_type: str, amount: float, balance_after: float):
        self.timestamp: str = datetime.now().strftime("%Y-%m-%d %H:%M:%S")
        self.tx_type: str = tx_type
        self.amount: float = amount
        self.balance_after: float = balance_after

    def __str__(self) -> str:
        return f"[{self.timestamp}] {self.tx_type:<22} | Amount: ${self.amount:>8.2f} | Balance: ${self.balance_after:>8.2f}"


class AbstractAccount(ABC):
    """Abstract Base Class defining the account interface (Abstraction)."""

    @abstractmethod
    def deposit(self, amount: float) -> float:
        pass

    @abstractmethod
    def withdraw(self, amount: float) -> float:
        pass

    @abstractmethod
    def get_balance(self) -> float:
        pass


class BankAccount(AbstractAccount):
    """
    Base class representing a standard Bank Account.
    Demonstrates Encapsulation via protected instance variables (_account_number, _balance).
    """

    def __init__(self, account_number: str, owner_name: str, initial_balance: float = 0.0):
        if initial_balance < 0:
            raise ValueError("Initial balance cannot be negative.")
        self._account_number: str = account_number
        self._owner_name: str = owner_name
        self._balance: float = initial_balance
        self._transactions: List[Transaction] = []
        
        # Log initial deposit if balance > 0
        if initial_balance > 0:
            self._record_transaction("INITIAL DEPOSIT", initial_balance)

    def deposit(self, amount: float) -> float:
        """Deposits a positive amount into the account."""
        if amount <= 0:
            raise ValueError("Deposit amount must be positive.")
        self._balance += amount
        self._record_transaction("DEPOSIT", amount)
        print(f"[*] [DEPOSIT] Successfully deposited ${amount:.2f}. New Balance: ${self._balance:.2f}")
        return self._balance

    def withdraw(self, amount: float) -> float:
        """Withdraws amount from account if funds are available."""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        if amount > self._balance:
            print(f"[Error] Insufficient funds! Current balance is ${self._balance:.2f}")
            return self._balance

        self._balance -= amount
        self._record_transaction("WITHDRAWAL", amount)
        print(f"[*] [WITHDRAWAL] Successfully withdrew ${amount:.2f}. New Balance: ${self._balance:.2f}")
        return self._balance

    def transfer(self, target_account: "BankAccount", amount: float) -> bool:
        """Transfers funds from this account to target_account."""
        if amount <= 0 or amount > self._balance:
            print(f"[Error] [TRANSFER FAILED] Invalid amount or insufficient balance (${self._balance:.2f}).")
            return False

        self._balance -= amount
        self._record_transaction(f"TRANSFER TO #{target_account.get_account_number()}", amount)
        
        target_account._balance += amount
        target_account._record_transaction(f"TRANSFER FROM #{self._account_number}", amount)
        
        print(f"[*] [TRANSFER] Transferred ${amount:.2f} to Account #{target_account.get_account_number()}")
        return True

    def get_balance(self) -> float:
        """Encapsulated balance getter."""
        return self._balance

    def get_account_number(self) -> str:
        """Encapsulated account number getter."""
        return self._account_number

    def get_owner_name(self) -> str:
        """Encapsulated owner name getter."""
        return self._owner_name

    def get_transaction_history(self) -> List[Transaction]:
        """Returns transaction history list."""
        return list(self._transactions)

    def _record_transaction(self, tx_type: str, amount: float) -> None:
        """Private helper to record transaction logs."""
        self._transactions.append(Transaction(tx_type, amount, self._balance))

    def __str__(self) -> str:
        return f"Account #{self._account_number} ({self._owner_name}) - Balance: ${self._balance:.2f}"


class SavingsAccount(BankAccount):
    """
    Savings Account subclass inheriting from BankAccount.
    Adds interest rate calculations.
    """

    def __init__(self, account_number: str, owner_name: str, initial_balance: float = 0.0, interest_rate: float = 0.05):
        super().__init__(account_number, owner_name, initial_balance)
        self.interest_rate: float = interest_rate

    def apply_interest(self) -> float:
        """Calculates and deposits interest based on current balance."""
        interest = self._balance * self.interest_rate
        self._balance += interest
        self._record_transaction(f"INTEREST ({self.interest_rate*100:.1f}%)", interest)
        print(f"[*] [INTEREST APPLIED] Earned ${interest:.2f} at {self.interest_rate*100:.1f}% rate. Balance: ${self._balance:.2f}")
        return self._balance


class CheckingAccount(BankAccount):
    """
    Checking Account subclass overriding withdraw to support Overdraft limit (Polymorphism).
    """

    def __init__(self, account_number: str, owner_name: str, initial_balance: float = 0.0, overdraft_limit: float = 200.0):
        super().__init__(account_number, owner_name, initial_balance)
        self.overdraft_limit: float = overdraft_limit

    def withdraw(self, amount: float) -> float:
        """Polymorphic withdraw implementation allowing overdraft up to overdraft_limit."""
        if amount <= 0:
            raise ValueError("Withdrawal amount must be positive.")
        
        if amount > self._balance + self.overdraft_limit:
            print(f"[Error] [OVERDRAFT EXCEEDED] Max withdrawal limit is ${self._balance + self.overdraft_limit:.2f}")
            return self._balance

        self._balance -= amount
        self._record_transaction("WITHDRAWAL (OVERDRAFT)", amount)
        print(f"[*] [WITHDRAWAL] Withdrew ${amount:.2f}. New Balance: ${self._balance:.2f}")
        return self._balance


def run_unit_tests():
    """Runs automated verification tests for Day 07 OOP Banking classes."""
    print("\n" + "=" * 60)
    print(" [TEST] RUNNING AUTOMATED UNIT TESTS FOR DAY 07")
    print("=" * 60)

    # Test BankAccount
    acc1 = BankAccount("101", "Alice", 100.0)
    assert acc1.get_balance() == 100.0, "Test 1 Failed: Initial balance"
    
    acc1.deposit(50.0)
    assert acc1.get_balance() == 150.0, "Test 2 Failed: Deposit"

    acc1.withdraw(30.0)
    assert acc1.get_balance() == 120.0, "Test 3 Failed: Withdraw"

    # Test Transfer
    acc2 = BankAccount("102", "Bob", 50.0)
    acc1.transfer(acc2, 40.0)
    assert acc1.get_balance() == 80.0 and acc2.get_balance() == 90.0, "Test 4 Failed: Transfer"

    # Test SavingsAccount
    sav = SavingsAccount("201", "Charlie", 1000.0, interest_rate=0.05)
    sav.apply_interest()
    assert sav.get_balance() == 1050.0, "Test 5 Failed: Savings Interest"

    # Test CheckingAccount Overdraft
    chk = CheckingAccount("301", "David", 50.0, overdraft_limit=100.0)
    chk.withdraw(120.0)
    assert chk.get_balance() == -70.0, "Test 6 Failed: Checking Overdraft"

    print("[PASS] All Unit Tests Passed Successfully!")
    print("=" * 60 + "\n")


def interactive_cli():
    """Main interactive terminal CLI menu for Day 07 Banking Simulator."""
    accounts = {
        "101": BankAccount("101", "Alice Smith", 500.0),
        "201": SavingsAccount("201", "Bob Jones", 1500.0, interest_rate=0.04),
        "301": CheckingAccount("301", "Carol White", 200.0, overdraft_limit=300.0),
    }

    current_acc_num = "101"

    while True:
        curr_acc = accounts[current_acc_num]
        print("\n" + "=" * 60)
        print(" [DAY 07] OOP BANKING SYSTEM SIMULATOR")
        print("=" * 60)
        print(f" Active Account : {curr_acc}")
        print("-" * 60)
        print(" [1] Deposit Funds")
        print(" [2] Withdraw Funds")
        print(" [3] Transfer Funds to Another Account")
        print(" [4] Apply Interest (Savings Account)")
        print(" [5] View Transaction History")
        print(" [6] Switch Active Account")
        print(" [7] Create New Account")
        print(" [8] Run Automated Unit Tests")
        print(" [0] Exit")
        print("=" * 60)

        try:
            choice = input("Select an option (0-8): ").strip()
        except (KeyboardInterrupt, EOFError):
            print("\n[EXIT] Exiting Day 07 Banking Simulator.")
            break

        if choice == "1":
            amt_str = input("Enter deposit amount: ").strip()
            try:
                amt = float(amt_str)
                curr_acc.deposit(amt)
            except ValueError as e:
                print(f"[Warning] Invalid amount: {e}")

        elif choice == "2":
            amt_str = input("Enter withdrawal amount: ").strip()
            try:
                amt = float(amt_str)
                curr_acc.withdraw(amt)
            except ValueError as e:
                print(f"[Warning] Invalid amount: {e}")

        elif choice == "3":
            target_num = input("Enter target account number (101, 201, 301...): ").strip()
            if target_num not in accounts:
                print("[Warning] Target account not found.")
            elif target_num == current_acc_num:
                print("[Warning] Cannot transfer to the same account.")
            else:
                amt_str = input("Enter transfer amount: ").strip()
                try:
                    amt = float(amt_str)
                    curr_acc.transfer(accounts[target_num], amt)
                except ValueError as e:
                    print(f"[Warning] Invalid amount: {e}")

        elif choice == "4":
            if isinstance(curr_acc, SavingsAccount):
                curr_acc.apply_interest()
            else:
                print("[Warning] Interest can only be applied to SavingsAccounts!")

        elif choice == "5":
            print(f"\nTransaction History for Account #{curr_acc.get_account_number()}:")
            history = curr_acc.get_transaction_history()
            for tx in history:
                print(f"  {tx}")

        elif choice == "6":
            print("\nAvailable Accounts:")
            for acc_num, acc_obj in accounts.items():
                print(f"  [{acc_num}] {acc_obj}")
            sel = input("Enter account number to activate: ").strip()
            if sel in accounts:
                current_acc_num = sel
                print(f"[Success] Switched to account #{sel}")
            else:
                print("[Warning] Invalid account selection.")

        elif choice == "7":
            acc_num = str(len(accounts) + 101)
            name = input("Enter owner name: ").strip() or "New User"
            print("Select Account Type:")
            print(" [1] Standard BankAccount")
            print(" [2] SavingsAccount (4% Interest)")
            print(" [3] CheckingAccount ($200 Overdraft)")
            acc_type = input("Choice (1-3): ").strip()

            if acc_type == "2":
                accounts[acc_num] = SavingsAccount(acc_num, name, 0.0, 0.04)
            elif acc_type == "3":
                accounts[acc_num] = CheckingAccount(acc_num, name, 0.0, 200.0)
            else:
                accounts[acc_num] = BankAccount(acc_num, name, 0.0)

            current_acc_num = acc_num
            print(f"[Success] Created Account #{acc_num} for {name}!")

        elif choice == "8":
            run_unit_tests()

        elif choice == "0":
            print("\n[EXIT] Exiting Day 07 Banking Simulator. Happy Coding!")
            break

        else:
            print("[WARNING] Invalid choice. Please enter a number between 0 and 8.")


if __name__ == "__main__":
    interactive_cli()
