import React, { useState } from 'react';
import styled from 'styled-components';
import { TextField, Button } from '@mui/material';

const InputContainer = styled.div`
  display: flex;
  padding: 20px;
  border-top: 1px solid #ddd;
`;

const StyledTextField = styled(TextField)`
  flex-grow: 1;
  margin-right: 10px;
`;

function ChatInput({ onSendMessage }) {
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
      onSendMessage(input);
      setInput('');
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleSend();
    }
  };

  return (
    <InputContainer>
      <StyledTextField
        variant="outlined"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="Type a message..."
      />
      <Button variant="contained" color="primary" onClick={handleSend}>
        Send
      </Button>
    </InputContainer>
  );
}

export default ChatInput;
