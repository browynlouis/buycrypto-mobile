import { zodResolver } from '@hookform/resolvers/zod';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useForm } from 'react-hook-form';

import { resetPassword } from '@/api/auth';
import { $api } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { Col } from '@/shared/components/ui/flex';
import { ControlledInput } from '@/shared/components/ui/input';
import { UnprocessableEntityException } from '@/shared/constants/exceptions';

import { AuthScreenTitle } from '../../components';
import { resetPasswwordSchema } from '../../schema';
import { FormError } from '../../types';

export function ResetPasswordScreen() {
  const { email } = useLocalSearchParams<{ email: string }>();

  if (!email) throw new Error('Email address not available in query');

  const router = useRouter();

  const {
    control,
    setError,
    handleSubmit,
    formState: { isValid },
    ...form
  } = useForm({
    mode: 'all',
    resolver: zodResolver(resetPasswwordSchema),
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  /** Reset password request */
  const { mutate, isPending, reset } = $api.useMutation(...resetPassword, {
    onSuccess() {
      reset();
      form.reset();

      router.replace('/(auth)/login');
    },

    onError(error) {
      toast().error(error.message);

      // If the error is a validation error, then set the input errors on react-hook-from
      if (error.name == UnprocessableEntityException) {
        mapServerErrorsToClient(setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  return (
    <>
      <Loader isLoading={isPending} />

      <Col gap={32}>
        <AuthScreenTitle
          title="Reset your password?"
          subText="Create a new password for your account below"
        />

        <ControlledInput
          hiddenField
          name="password"
          control={control}
          placeholder="Please enter your password"
        />

        <ControlledInput
          hiddenField
          control={control}
          name="confirmPassword"
          placeholder="Please confirm your password"
        />

        <Button
          disabled={!isValid}
          onPress={handleSubmit((values) =>
            mutate({
              params: {
                query: {
                  email,
                },
              },
              body: values,
            }),
          )}
        >
          Submit
        </Button>
      </Col>
    </>
  );
}
