import { useCallback } from 'react';
import { UseFormReturn, useFormContext, useFormState } from 'react-hook-form';

import { getAuth, register, resendEmailVerification, verifyEmailVerification } from '@/api/auth';
import { useAuthStore } from '@/features/auth/store';
import { Auth, FormError } from '@/features/auth/types';
import { $api } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { useVerificationContext } from '@/shared/components/providers/auth-provider/hooks';
import { queryClient } from '@/shared/components/providers/query-provider';
import { UnprocessableEntityException } from '@/shared/constants/exceptions';

import { RegistrationFormContext } from '../screens/registration/form-provider/registration-form-provider';

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

  const registerMutation = $api.useMutation(...register, {
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
    onError: (error: any) => {
      toast().error(error.message);

      if (error.name === UnprocessableEntityException) {
        mapServerErrorsToClient(form.setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  const sendEmailVerificationMutation = $api.useMutation(...resendEmailVerification, {
    onSuccess: () => {
      toast().success('Email verification resent');
    },
    onError: (error) => {
      toast().error(error.message);
    },
  });

  const verifyEmailVerificationMutation = $api.useMutation(...verifyEmailVerification, {
    onSuccess: async () => {
      form.reset();

      endVerification();

      // Reset all mutation
      registerMutation.reset();
      sendEmailVerificationMutation.reset();
      verifyEmailVerificationMutation.reset();

      try {
        /** Fetch auth user with the new tokens */
        const auth = await queryClient.fetchQuery<Auth>({
          queryKey: getAuth,
        });

        /** Set global auth state */
        setAuth(auth);
      } catch (error: any) {
        toast().error('An error occurred! Please try again later');
      }
    },
    onError: (error) => {
      toast().error(error.message);
    },
  });

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
