import { Token } from '@/api/types';

export const blockchainKeys = {
  tokens: ['get', '/blockchain/tokens'] as const,
  token: (symbol: Token) => ['get', '/blockchain/tokens/{token}'] as const,
};
