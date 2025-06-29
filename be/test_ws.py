# To run the tests:
#
# Test the deployed remote server (default):
# python3 test_ws.py
# or
# python3 test_ws.py remote
#
# Test the local server:
# python3 test_ws.py local

import asyncio
import websockets
import ssl
import certifi
import sys

async def test_websocket_local():
    """Tests the WebSocket connection on the local server."""
    uri = "ws://localhost:8000/ws"
    print(f"--- Testing Local WebSocket at {uri} ---")
    try:
        async with websockets.connect(uri) as websocket:
            message_to_send = "Hello from local test!"
            print(f"Sending: {message_to_send}")
            await websocket.send(message_to_send)

            response = await websocket.recv()
            print(f"Received: {response}")
            print("--- Local test successful ---")

    except ConnectionRefusedError:
        print(f"Error: Connection refused. Is the FastAPI server running at {uri}?")
    except Exception as e:
        print(f"An error occurred during local test: {e}")

async def test_websocket_remote():
    """Tests the WebSocket connection on the deployed Render server."""
    uri = "wss://secondbrain-x7yr.onrender.com/ws"
    print(f"--- Testing Remote WebSocket at {uri} ---")
    
    # Create an SSL context that uses certifi's certificate bundle for verification
    ssl_context = ssl.create_default_context()
    ssl_context.load_verify_locations(certifi.where())

    try:
        async with websockets.connect(uri, ssl=ssl_context) as websocket:
            message_to_send = "Hello from remote test!"
            print(f"Sending: {message_to_send}")
            await websocket.send(message_to_send)

            response = await websocket.recv()
            print(f"Received: {response}")
            print("--- Remote test successful ---")

    except Exception as e:
        print(f"An error occurred during remote test: {e}")

if __name__ == "__main__":
    # Allows choosing the test via command-line argument, e.g., python test_ws.py remote
    if len(sys.argv) > 1 and sys.argv[1] == 'local':
        asyncio.run(test_websocket_local())
    else:
        # Defaults to remote test if no argument or an unknown argument is given
        asyncio.run(test_websocket_remote())