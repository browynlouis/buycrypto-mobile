import { useContext } from 'react';

import { ConfirmationContext } from '../types';

export const useConfirmationContext = () => {
  const context = useContext(ConfirmationContext);

  if (!context) {
    throw new Error('useConfirmation must be used within a ConfirmationProvider');
  }

  return { ...context };
};
