import { createContext } from 'react';

import { VerificationType } from '@/features/auth/types';

export type VerificationFormProps = {
  types: VerificationType[];
  onSend?: { [key in VerificationType]?: () => void };
  onSubmit: (value: { [key in VerificationType]?: string }) => void;
};

interface VerificationContext {
  isSubmitting: boolean;
  closeVerification: () => void;
  setIsSubmitting: (value: boolean) => void;
  startVerification: (flow: VerificationFormProps) => void;
}

export const VerificationContext = createContext<VerificationContext | undefined>(undefined);
