import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse
from .database import engine, Base
from .routers import auth, curriculum

# Automatically create SQL tables on application startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Core CS Revision API",
    description="FastAPI & PostgreSQL Backend for CS revision progress tracking with JWT Auth Layer",
    version="1.0.0"
)

# Enable CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register endpoints routers
app.include_router(auth.router)
app.include_router(curriculum.router)

# Mount static React SPA assets if compiled
dist_dir = os.path.abspath(os.path.join(os.path.dirname(__file__), "..", "..", "frontend", "dist"))
if os.path.exists(dist_dir) and os.path.isdir(dist_dir):
    print(f"[Main] Serving production static React SPA assets from: {dist_dir}")
    
    # Mount assets folder
    assets_dir = os.path.join(dist_dir, "assets")
    if os.path.exists(assets_dir):
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")
        
    # Catch-all handler for Single Page Application dynamic routing fallback
    @app.get("/{fallback_path:path}")
    def serve_react_spa(fallback_path: str):
        # Exclude standard FastAPI endpoints from SPA catch-all
        if fallback_path.startswith("api/") or fallback_path.startswith("docs") or fallback_path.startswith("redoc") or fallback_path.startswith("openapi.json"):
            return None
        return FileResponse(os.path.join(dist_dir, "index.html"))
else:
    print(f"\n[Main WARNING] SPA distribution folder 'frontend/dist' not found at: {dist_dir}")
    print("[Main INFO] Please run 'npm run build' inside frontend/ to compile SPA web assets.\n")
    
    @app.get("/")
    def index():
        return {
            "message": "Core CS Revision FastAPI Active!",
            "status": "Ready",
            "database": str(engine.url),
            "docs": "/docs"
        }
