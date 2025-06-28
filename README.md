# SecondBrain Project

This project is a foundational setup for a "SecondBrain" application, featuring a real-time chat interface designed to interact with a Language Model (LLM). The current implementation focuses on establishing a robust real-time communication channel between the frontend and the backend.

## Features

*   **Real-time Chat:** Bidirectional communication between the user interface and the backend using WebSockets.
*   **LLM Interaction:** The backend processes user messages and sends a response back.
*   **Modular Structure:** Separated frontend (React) and backend (FastAPI) components.

## Technologies Used

*   **Backend:**
    *   Python 3.11+
    *   FastAPI (for API and WebSocket handling)
    *   Uvicorn (ASGI server)
*   **Frontend:**
    *   React.js (for the chat user interface)
    *   Styled Components (for styling)
    *   Material UI (for UI components)
*   **Communication:**
    *   WebSockets

## Setup and Running

Follow these steps to get the project up and running on your local machine.

### Prerequisites

*   Python 3.11 or higher
*   Node.js and npm (Node Package Manager)

### 1. Backend Setup

Navigate to the `be` directory:

```bash
cd be
```

**Create and Activate Virtual Environment (if not already done):**

```bash
python3 -m venv .venv
source .venv/bin/activate
```

**Install Python Dependencies:**

```bash
pip install fastapi uvicorn websockets
```
*(Note: `websockets` was installed for the test script, but it's good to ensure it's there for general WebSocket client/server use if needed.)*

**Run the Backend Server:**

```bash
uvicorn main:app --reload --port 8000 --app-dir . &
```
This command starts the FastAPI server in the background on `http://localhost:8000`. The `--reload` flag enables auto-reloading on code changes.

### 2. Frontend Setup

Navigate to the `fe/chat-ui` directory:

```bash
cd ../fe/chat-ui
```

**Install Node.js Dependencies:**

```bash
npm install
```

**Run the Frontend Application:**

```bash
npm start
```
This command starts the React development server, usually on `http://localhost:3000`.

## How to Use

1.  Ensure both the backend and frontend servers are running.
2.  Open your web browser and navigate to `http://localhost:3000`.
3.  Type a message in the input field and press Enter or click "Send".
4.  Your message will appear in the chat history, and after a short delay, you will receive a response from the LLM.

## Project Structure

```
.
├───agents/             # Placeholder for agent-related code
├───be/                 # Backend (FastAPI)
│   ├───main.py         # Main FastAPI application with WebSocket endpoint
│   ├───test_ws.py      # Python script to test WebSocket connection
│   └───.venv/          # Python virtual environment
└───fe/                 # Frontend
    └───chat-ui/        # React chat application
        ├───src/        # React source code
        │   ├───App.js  # Main application component with WebSocket logic
        │   └───components/
        │       ├───ChatHistory.js # Displays chat messages
        │       └───ChatInput.js   # Handles user input
        └───node_modules/ # Node.js dependencies
```
