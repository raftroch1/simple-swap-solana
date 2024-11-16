import { FC } from 'react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { styled } from '@mui/material/styles';

const StyledWalletButton = styled(WalletMultiButton)(({ theme }) => ({
  backgroundColor: 'transparent',
  border: `1px solid ${theme.palette.primary.main}`,
  color: theme.palette.primary.main,
  '&:hover': {
    backgroundColor: 'rgba(0, 240, 255, 0.1)',
  },
  '&:not(:disabled)': {
    backgroundColor: 'transparent',
  },
  '& .wallet-adapter-button-start-icon': {
    marginRight: 8,
  },
}));

export const WalletButton: FC = () => {
  const { wallet } = useWallet();

  return <StyledWalletButton />;
};
