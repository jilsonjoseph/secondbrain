import React, { useState } from 'react';
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

  const handleSendMessage = (message) => {
    setMessages([...messages, { text: message, sender: 'user' }]);
    // Here you would typically send the message to the backend
    // and receive a response. For this example, we'll just echo it.
    setTimeout(() => {
      setMessages(prevMessages => [...prevMessages, { text: `Echo: ${message}`, sender: 'bot' }]);
    }, 1000);
  };

  return (
    <AppContainer>
      {messages.length === 0 ? (
        <Welcome />
      ) : (
        <ChatHistory messages={messages} />
      )}
      <ChatInput onSendMessage={handleSendMessage} />
    </AppContainer>
  );
}

export default App;