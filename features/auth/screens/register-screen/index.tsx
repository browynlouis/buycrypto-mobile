import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { $api } from '@/libs/api';
import { mapServerErrorsToClient } from '@/libs/utils/map-server-errors';
import { toast } from '@/libs/utils/toast';
import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';
import { UnprocessableEntityException } from '@/shared/constants/exceptions';

import { AuthScreenTitle } from '../../components/auth-screen-title';
import { registerSchema } from '../../schema/auth.schema';
import { FormError } from '../../types';
import { EmailVerification } from './email-verification';

export function RegisterScreen() {
  const router = useRouter();
  const [emailVerificationModal, setEmailVerificationModal] = useState<boolean>(false);

  const {
    control,
    setError,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(registerSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const { mutate, isPending, reset } = $api.useMutation('post', '/auth/register', {
    onSuccess() {
      reset();
      /**
       * We toggle the modal open on successful registration request
       * Since we expect email verification afterwards
       */
      setEmailVerificationModal(true);
    },
    onError(error) {
      toast().error(error.message);

      if (error.name == UnprocessableEntityException) {
        mapServerErrorsToClient(setError, error.details?.formErrors as FormError[]);
      }
    },
  });

  const handleRegister = () => {
    if (isValid && !isPending) {
      mutate({
        body: getValues(),
      });
    }
  };

  return (
    <>
      <Loader isLoading={isPending} />

      <View style={{ gap: 32 }}>
        <AuthScreenTitle title="Register an account!" subText="Welcome to BuyCrypto" />

        <View style={{ gap: 24 }}>
          <ControlledInput
            name="email"
            control={control}
            placeholder="e.g jon@doe.com"
            startAdornment={<Icon name="User" />}
          />

          <ControlledInput
            hiddenField
            name="password"
            control={control}
            placeholder="e.g Unau!@17"
            startAdornment={<Icon name="Lock" />}
          />

          <ControlledInput
            hiddenField
            control={control}
            name="confirmPassword"
            placeholder="Confirm Password"
            startAdornment={<Icon name="Lock" />}
          />
        </View>

        <Button size="md" onPress={handleRegister} disabled={!isValid || isPending}>
          Create account
        </Button>

        <View style={{ gap: 12 }}>
          <Text align="center">Already have an account?</Text>

          <Text color="link" onPress={() => router.back()} align="center">
            Proceed to login
          </Text>
        </View>
      </View>

      {/* EMAIL VERIFICATION FORM */}
      <EmailVerification
        emailVerificationModal={emailVerificationModal}
        setEmailVerificationModal={setEmailVerificationModal}
      />
    </>
  );
}
