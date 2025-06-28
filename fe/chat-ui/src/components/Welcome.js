import React from 'react';
import styled from 'styled-components';
import { Typography } from '@mui/material';

const WelcomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
`;

function Welcome() {
  return (
    <WelcomeContainer>
      <Typography variant="h4">Welcome to the Chat</Typography>
      <Typography variant="subtitle1">Start a conversation by typing a message below.</Typography>
    </WelcomeContainer>
  );
}

export default Welcome;
