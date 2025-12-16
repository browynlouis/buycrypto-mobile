import React, { ReactNode, useState } from 'react';

import { AppModal } from '../../ui/modal';
import { VerificationForm } from './components/verification-form';
import { VerificationContext, VerificationFormProps } from './types';

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentFlow, setCurrentFlow] = useState<VerificationFormProps | undefined>();

  const startVerification = (flow: VerificationFormProps) => {
    setCurrentFlow(flow);
  };

  const endVerification = () => {
    setIsSubmitting(false);

    setCurrentFlow(undefined);
  };

  return (
    <VerificationContext.Provider
      value={{ startVerification, endVerification, setIsSubmitting, isSubmitting }}
    >
      {children}

      {currentFlow && (
        <AppModal visible={!!currentFlow} handleClose={endVerification} style={{ flex: 1 }}>
          <VerificationForm
            types={currentFlow.types}
            onSend={currentFlow.onSend}
            purpose={currentFlow.purpose}
            onSubmit={(values) => {
              setIsSubmitting(true);
              currentFlow.onSubmit && currentFlow.onSubmit(values);
            }}
          />
        </AppModal>
      )}
    </VerificationContext.Provider>
  );
}
