import os
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import httpx

# Load environment variables
load_dotenv()

app = FastAPI(title="NASA APOD API")

# Configure CORS for the frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust this in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

NASA_API_KEY = os.getenv("NASA_API_KEY")
NASA_API_URL = "https://api.nasa.gov/planetary/apod"

if not NASA_API_KEY or NASA_API_KEY == "your_key_here":
    print("WARNING: NASA_API_KEY is not set or is set to a placeholder in .env file.")

@app.get("/apod")
async def get_apod(date: str):
    """
    Fetch the Astronomy Picture of the Day for a given date.
    Date format: YYYY-MM-DD
    """
    if not NASA_API_KEY or NASA_API_KEY == "your_key_here":
        raise HTTPException(status_code=500, detail="NASA API key is missing or invalid on the backend.")

    params = {
        "api_key": NASA_API_KEY,
        "date": date
    }

    async with httpx.AsyncClient(verify=False) as client:
        try:
            response = await client.get(NASA_API_URL, params=params)
            response.raise_for_status()
            data = response.json()
            return data
        except httpx.HTTPStatusError as e:
            # Pass along the NASA API error if available
            try:
                error_data = e.response.json()
                detail = error_data.get("msg", str(e))
            except:
                detail = str(e)
            raise HTTPException(status_code=e.response.status_code, detail=detail)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Failed to fetch data from NASA API: {str(e)}")

@app.get("/health")
def health_check():
    return {"status": "ok"}
