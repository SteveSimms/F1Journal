from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional
from ai_service import search_career_info, generate_career_path

app = FastAPI(title="GridPath API", description="AI-driven backend for F1 Career Search")

class SearchQuery(BaseModel):
    query: str
    budget: Optional[int] = None
    location: Optional[str] = None

class CareerPathRequest(BaseModel):
    age: int
    budget: int
    location: str
    experience: Optional[str] = None

@app.get("/health")
async def health_check():
    return {"status": "healthy", "service": "GridPath API"}

@app.post("/api/search")
async def search(request: SearchQuery):
    """
    Semantic search for career information using AI.
    """
    try:
        results = await search_career_info(request.query)
        return {"results": results}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/generate-path")
async def generate_path(request: CareerPathRequest):
    """
    Generate a personalized career path based on user profile.
    """
    try:
        path = await generate_career_path(request.dict())
        return {"path": path}
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)
