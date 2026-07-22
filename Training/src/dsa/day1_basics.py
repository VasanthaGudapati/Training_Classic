"""
Day 1: Variables, Flow Control & Functions
Practical Task: Interactive CLI Number Guessing Game with High Scores

Requirements:
- Generate a random number between 1 and 100.
- Accept user guesses and validate inputs (must be a valid integer).
- Provide "Too High" or "Too Low" feedback.
- Track guess counts.
- Read/write the user's high score to a local text file.
"""

import os
import random

HIGH_SCORE_FILE = "high_score.txt"

def load_high_score():
    """Reads the current high score from the local file."""
    if os.path.exists(HIGH_SCORE_FILE):
        try:
            with open(HIGH_SCORE_FILE, "r") as f:
                content = f.read().strip()
                if content.isdigit():
                    return int(content)
        except IOError:
            print("[Warning] Could not read high score file. Defaulting to None.")
    return None

def save_high_score(score):
    """Saves a new high score to the local file."""
    try:
        with open(HIGH_SCORE_FILE, "w") as f:
            f.write(str(score))
        print(f"[*] New high score of {score} guesses saved to disk!")
    except IOError:
        print("[Error] Failed to save high score to file.")

def play_game():
    print("=" * 60)
    print("  WELCOME TO THE DAY 1 NUMBER GUESSING GAME ")
    print("=" * 60)
    print("I have selected a secret number between 1 and 100.")
    print("Try to guess it in as few attempts as possible!\n")

    current_best = load_high_score()
    if current_best is not None:
        print(f"[Record] Current High Score (fewest guesses): {current_best} attempts")
    else:
        print("[Record] No high score recorded yet. You can be the first!")
    print("-" * 60)

    # Generate random secret number
    secret_number = random.randint(1, 100)
    attempts = 0

    while True:
        try:
            user_input = input("Enter your guess (1-100) or 'q' to quit: ").strip()
        except (KeyboardInterrupt, EOFError):
            print(f"\n[Quit] Quitting the game. The secret number was {secret_number}. See you next time!")
            break

        if user_input.lower() == 'q':
            print(f"\n[Quit] Quitting the game. The secret number was {secret_number}. See you next time!")
            break

        # Validate input
        if not user_input.isdigit():
            print("[Warning] Invalid input! Please enter a valid whole number between 1 and 100.")
            continue

        guess = int(user_input)
        if guess < 1 or guess > 100:
            print("[Warning] Out of range! Please enter a number between 1 and 100.")
            continue

        attempts += 1

        # Check guess
        if guess < secret_number:
            print("[-] Too Low! Try guessing a higher number.")
        elif guess > secret_number:
            print("[+] Too High! Try guessing a lower number.")
        else:
            print(f"\n[Success] Congratulations! You guessed the correct number {secret_number}!")
            print(f"[*] Total Attempts: {attempts}")

            # Check if this is a new high score
            if current_best is None or attempts < current_best:
                save_high_score(attempts)
            else:
                print(f"Great job! The record remains {current_best} attempts.")
            break

    print("=" * 60)

if __name__ == "__main__":
    play_game()
