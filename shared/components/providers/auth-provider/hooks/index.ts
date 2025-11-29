import { useContext } from 'react';

import { VerificationContext } from '@/shared/components/providers/auth-provider/types';

export const useVerification = () => {
  const context = useContext(VerificationContext);

  if (!context) {
    throw new Error('useVerificationFlow must be used within a VerificationProvider');
  }

  return { ...context };
};
