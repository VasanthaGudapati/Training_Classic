"""
Day 01: Variables, Flow Control & Functions
Practical Task: Interactive CLI Number Guessing Game with High Score saving.
"""

import os
import random

HIGH_SCORE_FILE = os.path.join(os.path.dirname(__file__), "high_score.txt")

def load_high_score():
    """Reads the current high score from the local file."""
    if os.path.exists(HIGH_SCORE_FILE):
        try:
            with open(HIGH_SCORE_FILE, "r") as f:
                content = f.read().strip()
                if content.isdigit():
                    return int(content)
        except IOError:
            print("[Warning] Could not read high score file.")
    return None

def save_high_score(score):
    """Saves a new high score to disk."""
    try:
        with open(HIGH_SCORE_FILE, "w") as f:
            f.write(str(score))
        print(f"🎉 New high score of {score} attempt(s) saved!")
    except IOError:
        print("[Error] Failed to save high score.")

def play_game():
    print("=" * 60)
    print(" 🎯 DAY 01: CLI NUMBER GUESSING GAME")
    print("=" * 60)
    print("I have chosen a secret number between 1 and 100.")
    print("Try to guess it in as few attempts as possible!\n")

    current_best = load_high_score()
    if current_best is not None:
        print(f"🏆 Current Record: {current_best} attempts")
    else:
        print("🏆 No record set yet. Be the first!")
    print("-" * 60)

    secret_number = random.randint(1, 100)
    attempts = 0

    while True:
        try:
            user_input = input("Enter guess (1-100) or 'q' to quit: ").strip()
        except (KeyboardInterrupt, EOFError):
            print(f"\nGame quit. The secret number was {secret_number}.")
            break

        if user_input.lower() == 'q':
            print(f"\nGame quit. The secret number was {secret_number}.")
            break

        if not user_input.isdigit():
            print("⚠️ Invalid input! Please enter a number between 1 and 100.")
            continue

        guess = int(user_input)
        if guess < 1 or guess > 100:
            print("⚠️ Out of range! Enter a number between 1 and 100.")
            continue

        attempts += 1

        if guess < secret_number:
            print("⬇️ Too Low! Try higher.")
        elif guess > secret_number:
            print("⬆️ Too High! Try lower.")
        else:
            print(f"\n✨ Correct! The secret number was {secret_number}.")
            print(f"📊 Total Attempts: {attempts}")

            if current_best is None or attempts < current_best:
                save_high_score(attempts)
            else:
                print(f"Great effort! The record remains {current_best} attempts.")
            break

    print("=" * 60)

if __name__ == "__main__":
    play_game()
