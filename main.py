import os
import sys

# Automatically set working directory to the 'Training' folder
training_dir = os.path.join(os.path.dirname(__file__), "Training")
if os.path.exists(training_dir):
    os.chdir(training_dir)
    sys.path.insert(0, training_dir)
else:
    print(f"[Error] Could not find the core 'Training' directory at: {training_dir}")
    sys.exit(1)

# Import the actual entrypoint
try:
    import main
except ImportError as e:
    print(f"[Error] Failed to load main launcher: {e}")
    sys.exit(1)

if __name__ == "__main__":
    main.main()
