import React, { useState } from 'react';
import {
  Paper,
  Button,
  Typography,
  Box,
  Stack,
  IconButton,
  Alert,
} from '@mui/material';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import { TokenSelector } from './TokenSelector';
import { TokenInfo } from '../types/token';
import { useWallet } from '@solana/wallet-adapter-react';

const SwapCard: React.FC = () => {
  const [fromToken, setFromToken] = useState<TokenInfo | null>(null);
  const [toToken, setToToken] = useState<TokenInfo | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const { connected } = useWallet();

  const handleSwapTokens = () => {
    const temp = fromToken;
    setFromToken(toToken);
    setToToken(temp);
  };

  const handleSwap = async () => {
    if (!connected) {
      setError('Please connect your wallet first');
      return;
    }

    if (!fromToken || !toToken) {
      setError('Please select tokens to swap');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // TODO: Implement actual swap logic here
      
      // For now, just simulate a delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset selections after successful swap
      setFromToken(null);
      setToToken(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to swap tokens');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 4,
        width: '100%',
        bgcolor: 'background.paper',
        borderRadius: 4,
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: -2,
          left: -2,
          right: -2,
          bottom: -2,
          background: 'linear-gradient(45deg, #00F0FF, #FF00F0)',
          zIndex: -1,
          opacity: 0.5,
          filter: 'blur(8px)',
        },
      }}
    >
      <Stack spacing={3}>
        <Typography variant="h5" align="center" gutterBottom fontWeight="bold">
          Swap Tokens
        </Typography>

        {error && (
          <Alert severity="error" onClose={() => setError(null)}>
            {error}
          </Alert>
        )}

        <Stack spacing={2}>
          <TokenSelector
            selectedToken={fromToken}
            onSelect={setFromToken}
            label="Select token"
          />

          <Box position="relative" height={40} display="flex" alignItems="center" justifyContent="center">
            <IconButton
              onClick={handleSwapTokens}
              size="small"
              sx={{
                bgcolor: 'background.paper',
                '&:hover': {
                  bgcolor: 'action.hover',
                },
              }}
            >
              <SwapVertIcon />
            </IconButton>
          </Box>

          <TokenSelector
            selectedToken={toToken}
            onSelect={setToToken}
            label="Select token"
          />
        </Stack>

        <Button
          variant="contained"
          disabled={!connected || !fromToken || !toToken || loading}
          fullWidth
          size="large"
          onClick={handleSwap}
          sx={{
            height: 48,
            background: 'linear-gradient(45deg, #00F0FF, #FF00F0)',
            '&:hover': {
              background: 'linear-gradient(45deg, #FF00F0, #00F0FF)',
            },
            '&:disabled': {
              background: 'rgba(255, 255, 255, 0.12)',
            },
          }}
        >
          {loading ? 'Swapping...' : 'Swap'}
        </Button>

        {fromToken && toToken && (
          <Stack
            direction="row"
            justifyContent="space-between"
            sx={{ color: 'text.secondary', fontSize: 14 }}
          >
            <Typography variant="body2">Price Impact: ~0.05%</Typography>
            <Typography variant="body2">Minimum Received: 0.00</Typography>
          </Stack>
        )}
      </Stack>
    </Paper>
  );
};

export default SwapCard;
