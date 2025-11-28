import React, { ReactNode, useContext, useState } from 'react';

import { Loader } from '../../loader';
import { AppModal } from '../../modal';
import { VerificationContext, VerificationFormProps } from './types';
import { VerificationForm } from './verification-form';

export const useVerification = () => {
  const context = useContext(VerificationContext);

  if (!context) {
    throw new Error('useVerificationFlow must be used within a VerificationProvider');
  }

  return { ...context };
};

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentFlow, setCurrentFlow] = useState<VerificationFormProps | undefined>(undefined);

  const startVerification = (flow: VerificationFormProps) => {
    setCurrentFlow(flow);
  };

  const closeVerification = () => {
    setIsSubmitting(false);

    setCurrentFlow(undefined);
  };

  return (
    <VerificationContext.Provider
      value={{ startVerification, closeVerification, setIsSubmitting, isSubmitting }}
    >
      {children}

      <Loader isLoading={isSubmitting} />

      {currentFlow && (
        <AppModal visible={!!currentFlow} handleClose={closeVerification}>
          <VerificationForm
            types={currentFlow.types}
            onSubmit={(values) => {
              setIsSubmitting(true);
              currentFlow.onSubmit(values);
            }}
            onSend={currentFlow.onSend}
          />
        </AppModal>
      )}
    </VerificationContext.Provider>
  );
}
