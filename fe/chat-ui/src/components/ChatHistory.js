import React from 'react';
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
  return (
    <HistoryContainer>
      {messages.map((msg, index) => (
        <MessageWrapper key={index} sender={msg.sender}>
          {msg.sender === 'bot' && <StyledAvatar>B</StyledAvatar>}
          <MessageContainer sender={msg.sender}>
            {msg.text}
          </MessageContainer>
          {msg.sender === 'user' && <StyledAvatar>U</StyledAvatar>}
        </MessageWrapper>
      ))}
    </HistoryContainer>
  );
}

export default ChatHistory;
