import { createContext } from 'react';

export interface ConfirmationContext {
  isConfirming: boolean;
  setIsConfirming: (value: boolean) => void;
  endConfirmation: () => void;
  startConfirmation: (flow: ConfirmationFormProps) => void;
}

export type ConfirmationFormProps = {
  title?: string;
  subText?: string;
  onCancel?: () => void;
  onProceed?: () => void;
};

export const ConfirmationContext = createContext<ConfirmationContext | undefined>(undefined);
