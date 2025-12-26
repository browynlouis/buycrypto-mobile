export const userKeys = {
  me: ['get', '/users/me'] as const,
  userWalletAddress: ['get', '/users/me/wallet-address/{network}'] as const,
};
