import React, { useState } from 'react';
import {
  Box,
  Button,
  Popover,
  TextField,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
  Stack,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { TokenInfo } from '../types/token';

const mockTokens: TokenInfo[] = [
  {
    symbol: 'SOL',
    name: 'Solana',
    decimals: 9,
    address: 'So11111111111111111111111111111111111111112',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/So11111111111111111111111111111111111111112/logo.png',
  },
  {
    symbol: 'USDC',
    name: 'USD Coin',
    decimals: 6,
    address: 'EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v',
    logoURI: 'https://raw.githubusercontent.com/solana-labs/token-list/main/assets/mainnet/EPjFWdd5AufqSSqeM2qN1xzybapC8G4wEGGkZwyTDt1v/logo.png',
  },
];

interface TokenSelectorProps {
  selectedToken: TokenInfo | null;
  onSelect: (token: TokenInfo) => void;
  label: string;
}

export const TokenSelector: React.FC<TokenSelectorProps> = ({
  selectedToken,
  onSelect,
  label,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSelect = (token: TokenInfo) => {
    onSelect(token);
    handleClose();
  };

  const filteredTokens = mockTokens.filter(
    (token) =>
      token.symbol.toLowerCase().includes(searchQuery.toLowerCase()) ||
      token.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          sx: {
            width: '100%',
            maxWidth: 360,
            mt: 1,
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <TextField
            fullWidth
            size="small"
            placeholder="Search tokens"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ mb: 2 }}
          />
          <List sx={{ maxHeight: 300, overflow: 'auto' }}>
            {filteredTokens.map((token) => (
              <ListItem key={token.address} disablePadding>
                <ListItemButton onClick={() => handleSelect(token)}>
                  <ListItemAvatar>
                    <Avatar src={token.logoURI} alt={token.symbol}>
                      {token.symbol[0]}
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={token.symbol}
                    secondary={token.name}
                  />
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Box>
      </Popover>

      <Button
        onClick={handleClick}
        fullWidth
        sx={{
          height: 56,
          justifyContent: 'space-between',
          bgcolor: 'background.paper',
          border: '1px solid',
          borderColor: 'divider',
          '&:hover': {
            bgcolor: 'action.hover',
          },
        }}
        endIcon={<KeyboardArrowDownIcon />}
      >
        {selectedToken ? (
          <Stack direction="row" spacing={1} alignItems="center">
            <Avatar
              src={selectedToken.logoURI}
              alt={selectedToken.symbol}
              sx={{ width: 24, height: 24 }}
            >
              {selectedToken.symbol[0]}
            </Avatar>
            <Typography>{selectedToken.symbol}</Typography>
          </Stack>
        ) : (
          <Typography color="text.secondary">{label}</Typography>
        )}
      </Button>
    </Box>
  );
};
