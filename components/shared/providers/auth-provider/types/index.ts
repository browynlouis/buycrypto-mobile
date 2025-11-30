import { createContext } from 'react';

import { VerificationPurpose, VerificationType } from '@/components/features/auth/types';

export type VerificationFormProps = {
  types: VerificationType[];
  purpose: VerificationPurpose;
  onSend?: { [key in VerificationType]?: () => void };
  onSubmit?: (values: { key: VerificationType; value: string }[]) => void;
};

export interface VerificationContext {
  isSubmitting: boolean;
  endVerification: () => void;
  setIsSubmitting: (value: boolean) => void;
  startVerification: (flow: VerificationFormProps) => void;
}

export interface VerificationCallbacks {
  onRequestSuccess?: () => void;
  onRequestError?: () => void;

  onVerifySuccess?: () => void;
  onVerifyError?: () => void;
}

export const VerificationContext = createContext<VerificationContext | undefined>(undefined);
