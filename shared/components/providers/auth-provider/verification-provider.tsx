import React, { ReactNode, useState } from 'react';

import { Loader } from '../../loader';
import { AppModal } from '../../modal';
import { VerificationForm } from './components/verification-form';
import { VerificationContext, VerificationFormProps } from './types';

export function VerificationProvider({ children }: { children: ReactNode }) {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [currentFlow, setCurrentFlow] = useState<VerificationFormProps | undefined>(undefined);

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

      <Loader isLoading={isSubmitting} />

      {currentFlow && (
        <AppModal visible={!!currentFlow} handleClose={endVerification}>
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
