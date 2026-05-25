import os
import sys

def run_server():
    """
    Bootstraps the FastAPI application using Uvicorn ASGI server.
    This maintains complete backwards compatibility with root launchers and PyCharm configurations.
    """
    print("===========================================================")
    print("  [CS REVISION MODERNISED FASTAPI BACKEND SERVER ACTIVE]")
    print("  --> Starting Uvicorn server on port 8000...")
    print("  --> Open your browser to web UI: http://localhost:8000")
    print("  --> Open interactive Swagger docs: http://localhost:8000/docs")
    print("===========================================================")
    
    try:
        import uvicorn
    except ImportError:
        print("[Error] Uvicorn is not installed in the current environment.")
        print("Please run: pip install -r backend/requirements.txt")
        sys.exit(1)
        
    # Launch uvicorn pointing to our modular FastAPI app
    # Set reload=True during development for auto-restart on file modifications
    uvicorn.run(
        "backend.app.main:app",
        host="0.0.0.0",
        port=8000,
        reload=True
    )

if __name__ == "__main__":
    run_server()
