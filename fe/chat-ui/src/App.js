import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import ChatHistory from './components/ChatHistory';
import ChatInput from './components/ChatInput';
import Welcome from './components/Welcome';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f5f5f5;
`;

function App() {
  const [messages, setMessages] = useState([]);
  const ws = useRef(null);

  useEffect(() => {
    ws.current = new WebSocket("ws://localhost:8000/ws");

    ws.current.onopen = () => {
      console.log("WebSocket connection opened");
    };

    ws.current.onmessage = (event) => {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: event.data, sender: 'llm' },
      ]);
    };

    ws.current.onclose = () => {
      console.log("WebSocket connection closed");
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      if (ws.current) {
        ws.current.close();
      }
    };
  }, []);

  const sendMessage = (message) => {
    if (ws.current && ws.current.readyState === WebSocket.OPEN) {
      setMessages((prevMessages) => [
        ...prevMessages,
        { text: message, sender: 'user' },
      ]);
      ws.current.send(message);
    } else {
      console.warn("WebSocket not open. Message not sent.");
    }
  };

  return (
    <AppContainer>
      {messages.length === 0 ? (
        <Welcome />
      ) : (
        <ChatHistory messages={messages} />
      )}
      <ChatInput sendMessage={sendMessage} />
    </AppContainer>
  );
}

export default App;
