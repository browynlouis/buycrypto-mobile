import { zodResolver } from '@hookform/resolvers/zod';
import { Link, useRouter } from 'expo-router';
import React, { Dispatch, SetStateAction, useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { $api } from '@/libs/api';
import { mapServerErrorsToClient } from '@/libs/utils/map-server-errors';
import { toast } from '@/libs/utils/toast';
import { AppModal } from '@/shared/components/modal';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';
import { Spinner } from '@/shared/components/ui/spinner';
import { Text } from '@/shared/components/ui/text';

import { AuthScreenTitle } from '../components/auth-screen-title';
import { VerificationForm } from '../components/verification-form';
import { loginSchema } from '../schema/auth.schema';
import { useAuthStore } from '../store';
import { VerificationType } from '../types';

export function LoginScreen() {
  const router = useRouter();
  const [twoFaAuthModal, setTwoFaAuthModal] = useState<boolean>(false);

  const {
    control,
    setError,
    getValues,
    formState: { isValid },
  } = useForm({
    mode: 'all',
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending, variables, error } = $api.useMutation('post', '/auth/login', {
    onSuccess() {
      // We route the user to the app if login was successful
      router.navigate('/(auth)');
    },
    onError(error) {
      /** Meaning two fa is required */
      if (error.error === 'TwoFactorAuthRequiredException') {
        setTwoFaAuthModal(true);
      }

      toast().error(error.message);

      if (error.details?.formErrors) {
        mapServerErrorsToClient(setError, error.details?.formErrors);
      }
    },
  });

  const handleLogin = () => {
    if (isValid && !isPending) {
      mutate({
        body: getValues(),
      });
    }
  };

  return (
    <View style={{ gap: 32 }}>
      <AuthScreenTitle title="Hi, Welcome!" subText="Please login to your account" />

      <View style={{ gap: 24 }}>
        <ControlledInput
          name="email"
          control={control}
          placeholder="Your email"
          startAdornment={<Icon name="User" />}
        />

        <ControlledInput
          hiddenField
          name="password"
          control={control}
          placeholder="Your password"
          startAdornment={<Icon name="Lock" />}
        />

        <Link href={'/(auth)/forgot-password'}>
          <Text weight={500} size="text-md" align="left" color="link">
            Forgot password?
          </Text>
        </Link>
      </View>

      <Button size="md" onPress={handleLogin} disabled={isPending || !isValid}>
        {isPending ? <Spinner /> : 'Proceed to login'}
      </Button>

      {/* Two Factor Auth Verification */}

      <TwoFactorAuthentication
        twoFaAuthModal={twoFaAuthModal}
        setTwoFaAuthModal={setTwoFaAuthModal}
        types={error?.details?.['twoFaAuths']!}
      />

      <View style={{ gap: 12 }}>
        <Text align="center">Don't have an account yet?</Text>
        <Link href={'/(auth)/register'}>
          <Text align="center" color="link">
            Register an account
          </Text>
        </Link>
      </View>
    </View>
  );
}

function TwoFactorAuthentication({
  types,
  twoFaAuthModal,
  setTwoFaAuthModal,
}: {
  types: VerificationType[];
  twoFaAuthModal: boolean;
  setTwoFaAuthModal: Dispatch<SetStateAction<boolean>>;
}) {
  const router = useRouter();
  const { setTokens } = useAuthStore();

  return (
    <AppModal
      visible={twoFaAuthModal}
      modalTitle="Verify Your Email"
      handleClose={() => setTwoFaAuthModal(false)}
    >
      <VerificationForm
        types={types} // Verification type email
        resendRequest={(type) => {}}
        onSubmit={(values) => {}}
      />
    </AppModal>
  );
}
