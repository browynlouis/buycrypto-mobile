import { useCallback } from 'react';
import { UseFormReturn, useFormContext, useFormState } from 'react-hook-form';

import { $queryClient } from '@/api/clients/query-client';
import { FormError } from '@/api/types';
import { useVerificationContext } from '@/components/shared/providers/auth-provider/hooks';
import { queryClient } from '@/components/shared/providers/query-provider';
import { mapServerErrorsToClient, toast } from '@/lib/utils';
import { useAuthStore } from '@/store';

import { RegistrationFormContext } from '../../../../../components/features/auth/screens/registration/form-provider/registration-form-provider';
import { getAuthQueryOptions } from '../../options';

export type UseRegisterReturn = {
  isSubmitting: boolean;
  submit: (values: any) => void;
  form: UseFormReturn<RegistrationFormContext>;
};

export function useRegistration(): UseRegisterReturn {
  const { setAuthTokens, setAuth } = useAuthStore();

  const form = useFormContext<RegistrationFormContext>();
  const formState = useFormState({ control: form.control });

  /** -------------------------------
   *  Registration MUTATION
   * ------------------------------- */
  const { startVerification, endVerification } = useVerificationContext();

  const registerMutation = $queryClient.useMutation('post', '/auth/register', {
    onSuccess: (data) => {
      // Set auth tokens -- authenticate after successful registration
      setAuthTokens(data.data.accessToken, data.data.refreshToken);

      // Reset mutation
      registerMutation.reset();

      // Start email verification after successful registration
      startVerification({
        types: ['EMAIL'],
        purpose: 'EMAIL_VERIFICATION',
        onSend: {
          EMAIL: () => {
            /** Requests for email verification */
            sendEmailVerificationMutation.mutate({});
          },
        },
        onSubmit: (values) => {
          const token = values.find((val) => val.key === 'EMAIL')!.value;

          // Verifies the provided verification
          verifyEmailVerificationMutation.mutate({
            body: {
              token,
            },
          });
        },
      });
    },
    onError: (error) => {
      toast().error(error.message);

      if (error.statusCode === 422) {
        mapServerErrorsToClient(form.setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  const sendEmailVerificationMutation = $queryClient.useMutation(
    'post',
    '/auth/email-verification/resend',
    {
      onSuccess: () => {
        toast().success('Email verification resent');
      },
      onError: (error) => {
        toast().error(error.message);
      },
    },
  );

  const verifyEmailVerificationMutation = $queryClient.useMutation(
    'post',
    '/auth/email-verification/verify',
    {
      onSuccess: async () => {
        form.reset();

        endVerification();

        // Reset all mutation
        registerMutation.reset();
        sendEmailVerificationMutation.reset();
        verifyEmailVerificationMutation.reset();

        try {
          /** Fetch auth user with the new tokens */
          await queryClient.invalidateQueries({
            refetchType: 'all',
            queryKey: getAuthQueryOptions().queryKey,
          });
        } catch (error: any) {
          toast().error('An error occurred! Please try again later');
        }
      },
      onError: (error) => {
        toast().error(error.message);
      },
    },
  );

  /** -------------------------------
   *  Submit Handler
   * ------------------------------- */
  const submit = useCallback(
    (values: RegistrationFormContext) => registerMutation.mutate({ body: values }),
    [registerMutation.mutate],
  );

  return {
    isSubmitting:
      registerMutation.isPending ||
      sendEmailVerificationMutation.isPending ||
      verifyEmailVerificationMutation.isPending,
    submit: submit,
    form: {
      ...form,
      formState,
    },
  };
}
