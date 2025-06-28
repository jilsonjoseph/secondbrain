import asyncio
import websockets

async def test_websocket():
    uri = "ws://localhost:8000/ws"
    try:
        async with websockets.connect(uri) as websocket:
            message_to_send = "Hello from Python client!"
            print(f"Sending: {message_to_send}")
            await websocket.send(message_to_send)

            response = await websocket.recv()
            print(f"Received: {response}")

    except ConnectionRefusedError:
        print(f"Error: Connection refused. Is the FastAPI server running at {uri}?")
    except Exception as e:
        print(f"An error occurred: {e}")

if __name__ == "__main__":
    asyncio.run(test_websocket())
