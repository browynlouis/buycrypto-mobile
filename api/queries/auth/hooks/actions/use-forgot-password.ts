import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import { useCallback } from 'react';
import { UseFormReturn, useForm } from 'react-hook-form';
import z from 'zod';

import { $queryClient } from '@/api/clients/query-client';
import { forgotPasswordSchema } from '@/api/schemas/auth.schema';
import { ForgotPasswordDto, FormError } from '@/api/types';
import { useVerificationContext } from '@/components/shared/providers/auth-provider/hooks';
import { mapServerErrorsToClient, toast } from '@/lib/utils';

export type UseForgotPasswordReturn = {
  isSubmitting: boolean;
  submit: (values: any) => void;
  form: UseFormReturn<z.infer<typeof forgotPasswordSchema>>;
};

export function useForgotPassword(): UseForgotPasswordReturn {
  const router = useRouter();
  const { startVerification, endVerification, setIsSubmitting } = useVerificationContext();

  const form = useForm({
    mode: 'all',
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: '' },
  });

  /** -------------------------------
   *  FORGOT PASSWORD MUTATION
   * ------------------------------- */
  const forgotPasswordMutation = $queryClient.useMutation('post', '/auth/forgot-password', {
    onSuccess: (data, variables) => {
      startVerification({
        types: ['EMAIL'],
        purpose: 'PASSWORD_RESET',
        onSend: {
          EMAIL: () =>
            /** Recalls the forgot password mutation to resend email */
            forgotPasswordMutation.mutate({
              body: form.getValues(),
            }),
        },
        onSubmit: (values) => {
          const token = values.find((val) => val.key === 'EMAIL')!.value;

          verifyForgotPasswordMutation.mutate({
            params: {
              query: {
                email: variables.body.email,
              },
            },
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

  /** -------------------------------
   *  VERIFY FORGOT PASSWORD MUTATION
   * ------------------------------- */
  const verifyForgotPasswordMutation = $queryClient.useMutation(
    'post',
    '/auth/forgot-password/verify',
    {
      onSuccess: () => {
        endVerification();

        /** Get the email from the form */
        const email = form.getValues('email');

        form.reset(); // reset the form

        /** Attach email to the query params and send to the reset password screen */
        router.push(`/(auth)/password/reset?email=${email}`);
      },
      onError(error) {
        /** Stop loader for verification */
        setIsSubmitting(false);

        toast().error(error.message);
      },
    },
  );

  /** -------------------------------
   *  Forgot Password Handler
   * ------------------------------- */
  const submit = useCallback(
    (values: ForgotPasswordDto) => {
      return forgotPasswordMutation.mutate({ body: values });
    },
    [forgotPasswordMutation],
  );

  return {
    form,
    submit,
    isSubmitting: forgotPasswordMutation.isPending || verifyForgotPasswordMutation.isPending,
  };
}
