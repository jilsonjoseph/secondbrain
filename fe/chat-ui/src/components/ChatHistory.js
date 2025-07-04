import ReactMarkdown from 'react-markdown';
import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Avatar, Paper } from '@mui/material';

const HistoryContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 20px;
`;

const MessageContainer = styled(Paper)`
  padding: 10px 20px;
  margin-bottom: 10px;
  max-width: 60%;
  align-self: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  background-color: ${props => props.sender === 'user' ? '#dcf8c6' : '#fff'};

  p {
    margin: 0;
  }
`;

const MessageWrapper = styled.div`
  display: flex;
  justify-content: ${props => props.sender === 'user' ? 'flex-end' : 'flex-start'};
  margin-bottom: 10px;
`;

const StyledAvatar = styled(Avatar)`
  margin: 0 10px;
`;

function ChatHistory({ messages }) {
  const messagesEndRef = useRef(null); // Ref for auto-scrolling

  // Effect to scroll to the bottom when messages change
  useEffect(() => {
      messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <HistoryContainer>
      {messages.map((msg, index) => (
        <MessageWrapper key={index} sender={msg.sender}>
          {msg.sender === 'llm' && <StyledAvatar>L</StyledAvatar>}
          <MessageContainer sender={msg.sender}>
            <ReactMarkdown>{msg.text}</ReactMarkdown>
          </MessageContainer>
          {msg.sender === 'user' && <StyledAvatar>U</StyledAvatar>}
        </MessageWrapper>
      ))}
      <div ref={messagesEndRef} /> {/* Invisible div to scroll to */}
    </HistoryContainer>
  );
}

export default ChatHistory;