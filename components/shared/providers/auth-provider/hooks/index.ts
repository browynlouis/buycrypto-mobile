import { useContext } from 'react';

import { VerificationContext } from '@/components/shared/providers/auth-provider/types';

export const useVerificationContext = () => {
  const context = useContext(VerificationContext);

  if (!context) {
    throw new Error('useVerificationFlow must be used within a VerificationProvider');
  }

  return { ...context };
};
