import React from 'react';
import { ThemeProvider } from '@mui/material/styles';
import { CssBaseline, Container, Box, Stack } from '@mui/material';
import { theme } from './theme';
import SwapCard from './components/SwapCard';
import { WalletContextProvider } from './contexts/WalletContextProvider';
import { WalletButton } from './components/WalletButton';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <WalletContextProvider>
        <Box
          sx={{
            minHeight: '100vh',
            bgcolor: 'background.default',
            py: 8,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <Container maxWidth="sm">
            <Stack spacing={4} alignItems="center">
              <WalletButton />
              <SwapCard />
            </Stack>
          </Container>
        </Box>
      </WalletContextProvider>
    </ThemeProvider>
  );
}

export default App;
