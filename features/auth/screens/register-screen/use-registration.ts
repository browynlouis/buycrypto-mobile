import { useCallback } from 'react';
import { UseFormReturn, useFormContext, useFormState } from 'react-hook-form';

import { $api } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { queryClient, useVerification } from '@/shared/components/providers';
import { UnprocessableEntityException } from '@/shared/constants/exceptions';

import { getAuth, register, resendEmailVerification, verifyEmailVerification } from '../../api';
import { useAuthStore } from '../../store';
import { AuthResource, FormError } from '../../types';
import { RegistrationFormContext } from './form-provider/registration-form-provider';

export type UseRegisterReturn = {
  isSubmitting: boolean;
  register: (values: any) => void;
  form: UseFormReturn<RegistrationFormContext>;
};

export function useRegistration(): UseRegisterReturn {
  const { setTokens, setAuth } = useAuthStore();

  const form = useFormContext<RegistrationFormContext>();
  const formState = useFormState({ control: form.control });

  const { startVerification, closeVerification } = useVerification();

  const registerMutation = $api.useMutation(...register, {
    onSuccess: (data) => {
      // Set auth tokens
      setTokens(data.data.accessToken, data.data.refreshToken);

      registerMutation.reset();

      // Start 2FA verification after successful registration
      startVerification({
        types: ['EMAIL'],
        onSend: {
          EMAIL: () => {
            sendEmailVerificationMutation.mutate({});
          },
        },
        onSubmit: (values) => {
          verifyEmailVerificationMutation.mutate({
            body: {
              token: values['EMAIL']!,
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

      closeVerification();

      registerMutation.reset();
      sendEmailVerificationMutation.reset();
      verifyEmailVerificationMutation.reset();

      try {
        const auth = await queryClient.fetchQuery<AuthResource>({
          queryKey: getAuth,
        });

        setAuth(auth);
      } catch (error: any) {
        toast().error(error.message);
      }
    },
    onError: (error) => {
      toast().error(error.message);
    },
  });

  const submit = useCallback(
    (values: RegistrationFormContext) => registerMutation.mutate({ body: values }),
    [registerMutation.mutate],
  );

  return {
    isSubmitting:
      registerMutation.isPending ||
      sendEmailVerificationMutation.isPending ||
      verifyEmailVerificationMutation.isPending,
    register: submit,
    form: {
      ...form,
      formState,
    },
  };
}
