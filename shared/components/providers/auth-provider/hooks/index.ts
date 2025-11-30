import { useCallback, useContext } from 'react';

import { request2fa, verify2fa } from '@/api/auth';
import { VerificationPurpose, VerificationType } from '@/features/auth/types';
import { $api, components } from '@/libs/api';
import { toast } from '@/libs/utils';
import {
  VerificationCallbacks,
  VerificationContext,
} from '@/shared/components/providers/auth-provider/types';

export const useVerificationContext = () => {
  const context = useContext(VerificationContext);

  if (!context) {
    throw new Error('useVerificationFlow must be used within a VerificationProvider');
  }

  return { ...context };
};

export const useVerificationRequest = (
  purpose: VerificationPurpose,
  callbacks: VerificationCallbacks = {},
) => {
  const { onRequestSuccess, onRequestError, onVerifySuccess, onVerifyError } = callbacks;

  const verify = $api.useMutation(...verify2fa, {
    onSuccess: (data) => {
      verify.reset();
      onVerifySuccess?.();
    },
    onError: (err) => {
      toast().error('An error occurred! Please try again later');

      onVerifyError?.();
    },
  });

  const request = $api.useMutation(...request2fa, {
    onSuccess: (data) => {
      request.reset();
      toast().success('Verification request sent successfully');

      onRequestSuccess?.();
    },
    onError: (err) => {
      toast().error('Unable to send request! Please try again later');

      onRequestError?.();
    },
  });

  const handleSend = useCallback(
    (type: VerificationType) => {
      request.mutate({
        params: {
          query: { purpose, type },
        },
      });
    },
    [purpose],
  );

  const handleVerification = useCallback(
    (values: components['schemas']['InputDto'][]) => {
      verify.mutate({
        params: { query: { purpose } },
        body: {
          input: values,
        },
      });
    },
    [purpose],
  );

  return {
    handleSend,
    handleVerification,
  };
};
