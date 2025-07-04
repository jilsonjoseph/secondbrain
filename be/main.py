from dotenv import load_dotenv

load_dotenv()

from typing import Union
from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
import asyncio
import os
import google.generativeai

app = FastAPI()

# Configure Google Gemini API
google.generativeai.configure(api_key=os.getenv("GEMINI_API_KEY"))

# Configure CORS
origins = [
    "http://localhost",
    "http://localhost:3000",  # Assuming your React frontend runs on port 3000
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Item(BaseModel):
    name: str
    price: float
    is_offer: Union[bool, None] = None

@app.get("/")
def read_root():
    return {"Hello": "World"}


@app.get("/health")
async def health_check():
    return {"status": "ok"}


@app.get("/items/{item_id}")
def read_item(item_id: int, q: Union[str, None] = None):
    return {"item_id": item_id, "q": q}

@app.put("/items/{item_id}")
def update_item(item_id: int, item: Item):
    return {"item_name": item.name, "item_id": item_id}

@app.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await websocket.accept()
    # Log all headers to debug CORS issue
    print(f"Incoming connection headers: {websocket.scope['headers']}")
    try:
        while True:
            data = await websocket.receive_text()
            print(f"Received from client: {data}")

            # Actual LLM processing with Google Gemini
            try:
                model = google.generativeai.GenerativeModel(os.getenv("GEMINI_MODEL_NAME", "gemini-pro")) # You can choose other models like 'gemini-pro-vision'
                response = await asyncio.to_thread(model.generate_content, data)
                llm_response = response.text
            except Exception as e:
                llm_response = f"Error communicating with LLM: {e}"
                print(f"LLM API Error: {e}") # Log the error for debugging

            await websocket.send_text(llm_response)
            print(f"Sent to client: {llm_response}")

    except WebSocketDisconnect:
        print("Client disconnected")
    except Exception as e:
        print(f"An error occurred: {e}")