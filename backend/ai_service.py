import httpx
import json
from typing import List, Dict, Any

OLLAMA_URL = "http://localhost:11434/api/generate"
MODEL = "llama3"

async def query_ollama(prompt: str) -> str:
    """
    Helper to query the local Ollama instance.
    """
    async with httpx.AsyncClient() as client:
        try:
            response = await client.post(
                OLLAMA_URL,
                json={
                    "model": MODEL,
                    "prompt": prompt,
                    "stream": False
                },
                timeout=30.0
            )
            response.raise_for_status()
            return response.json().get("response", "")
        except httpx.RequestError:
            print("Ollama not reachable. Using mock data.")
            return None

async def search_career_info(query: str) -> List[Dict[str, Any]]:
    """
    Semantic search using Ollama to generate insights.
    """
    prompt = f"""
    You are an expert F1 career consultant. 
    User Query: "{query}"
    
    Provide 2 distinct, factual insights related to the query for an aspiring driver.
    Format the output as a JSON list of objects with keys: "title", "description", "relevance" (float 0-1).
    Do not include any markdown formatting or extra text. Just the JSON.
    """
    
    response_text = await query_ollama(prompt)
    
    if response_text:
        try:
            # Clean up potential markdown code blocks
            cleaned_text = response_text.replace("```json", "").replace("```", "").strip()
            return json.loads(cleaned_text)
        except json.JSONDecodeError:
            print("Failed to parse AI response")
            pass

    # Fallback Mock Data
    return [
        {
            "title": "AI Insight (Fallback)",
            "description": f"We couldn't connect to the AI, but here is a general tip: {query} is important for your career.",
            "relevance": 0.9
        },
        {
            "title": "Karting Basics",
            "description": "Start with Bambino (age 5-8) or Cadet (age 8-12) karting classes.",
            "relevance": 0.85
        }
    ]

async def generate_career_path(profile: Dict[str, Any]) -> Dict[str, Any]:
    """
    Generate a personalized career path using Ollama.
    """
    age = profile.get("age")
    budget = profile.get("budget")
    location = profile.get("location")
    
    prompt = f"""
    Create a personalized racing career path for a driver with this profile:
    - Age: {age}
    - Budget: ${budget}/year
    - Location: {location}
    
    Return a JSON object with:
    1. "suggested_path": List of steps (e.g., "Karting", "F4"). Each step has "step" (name) and "cost" (string).
    2. "ai_insight": A specific piece of advice based on their budget and location.
    
    Do not include markdown. Just JSON.
    """
    
    response_text = await query_ollama(prompt)
    
    if response_text:
        try:
            cleaned_text = response_text.replace("```json", "").replace("```", "").strip()
            ai_data = json.loads(cleaned_text)
            return {
                "profile": profile,
                **ai_data
            }
        except json.JSONDecodeError:
            pass

    # Fallback Logic
    steps = []
    if age < 8:
        steps.append({"step": "Bambino Karting", "cost": "$5,000/yr"})
    elif age < 12:
        steps.append({"step": "Cadet Karting", "cost": "$15,000/yr"})
    else:
        steps.append({"step": "Junior Karting", "cost": "$30,000/yr"})
        
    if budget < 20000:
        steps.append({"step": "Club Racing", "cost": "Varies"})
    else:
        steps.append({"step": "National Series", "cost": "$50k+"})

    return {
        "profile": profile,
        "suggested_path": steps,
        "ai_insight": "Ollama is offline. Showing default path based on age/budget logic."
    }
