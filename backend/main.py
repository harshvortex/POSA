from fastapi import FastAPI, Depends, HTTPException, status
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import jwt
import time
import httpx
from github import Github
import os
from typing import List, Optional
import json

app = FastAPI(title="PoSA - Python AI Engine")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

SECRET_KEY = "posa_secret_key"
ALGORITHM = "HS256"

# Mock HF Token - User should replace
HF_TOKEN = "hf_xxxxxxxxxxxxxxxxxxxx" 
HF_MODEL = "meta-llama/Meta-Llama-3-70B-Instruct"

class LoginRequest(BaseModel):
    email: str
    password: str

class RegisterRequest(BaseModel):
    name: str
    email: str
    password: str
    role: str
    company: Optional[str] = None

@app.post("/api/auth/login")
async def login(req: LoginRequest):
    # Mock Auth for Demo
    token = jwt.encode({"sub": req.email, "role": "CANDIDATE", "exp": time.time() + 3600}, SECRET_KEY, algorithm=ALGORITHM)
    return {
        "token": token,
        "user": {"name": "Demo User", "email": req.email, "role": "CANDIDATE"}
    }

@app.post("/api/auth/register")
async def register(req: RegisterRequest):
    return {"message": "Protocol node registered"}

@app.get("/api/candidate/dashboard")
async def get_dashboard():
    return {
        "user": {"name": "Python Developer", "email": "python@posa.ai"},
        "profile": {
            "githubUsername": "python-dev",
            "totalRepos": 42,
            "totalStars": 156,
            "skillScore": 92.4,
            "jobFitScore": 88,
            "growthScore": 94,
            "skillDna": json.dumps({ "Python": 95, "FastAPI": 92, "Llama-3": 88, "PostgreSQL": 82 }),
            "techStack": json.dumps(["Python", "React", "AI", "Cloud"]),
            "summary": "Expert AI engineer specialized in Python-based high-intelligence systems."
        },
        "vivaSessions": [
            {"id": 1, "topic": "Python Internals", "score": 94, "status": "COMPLETED", "createdAt": "2026-03-20T10:00:00Z"}
        ]
    }

@app.post("/api/candidate/github/connect")
async def connect_github(req: dict):
    # This would call the HF API to analyze the repo
    # For now, it returns success for the demo
    return {"message": "GitHub node connected and analyzed"}

@app.post("/api/candidate/viva/start")
async def start_viva(req: dict):
    return {
        "sessionId": 1234,
        "topic": req.get("topic", "General Engineering"),
        "questions": [
            "Explain Python's Global Interpreter Lock (GIL).",
            "How does FastAPI handle asynchronous requests?",
            "Discuss the architecture of a Llama-3 based agent."
        ]
    }

@app.post("/api/candidate/viva/{session_id}/submit")
async def submit_viva(session_id: int, req: dict):
    return {
        "evaluation": {
            "score": 92,
            "strengths": ["Asynchronous Logic", "AI Integration", "Performance Tuning"],
            "feedback": "Exceptional depth in Python-based systemic architecture."
        }
    }

@app.get("/api/recruiter/dashboard")
async def get_recruiter_dashboard():
    return {"totalCandidates": 124, "verifiedCandidates": 98, "activeJobs": 10}

@app.get("/api/recruiter/candidates")
async def get_candidates():
    return {
        "candidates": [
            {"id": 1, "user": {"name": "Alex Python"}, "githubUsername": "apython", "skillScore": 91, "jobFitScore": 88, "isVerified": True, "techStack": json.dumps(["Python", "PyTorch", "Rust"])},
            {"id": 2, "user": {"name": "Jordan AI"}, "githubUsername": "jai", "skillScore": 85, "jobFitScore": 94, "isVerified": True, "techStack": json.dumps(["Llama-3", "FastAPI", "Next.js"])}
        ]
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
