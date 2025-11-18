import { zodResolver } from '@hookform/resolvers/zod';
import { Link } from 'expo-router';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { View } from 'react-native';

import { $api } from '@/libs/api';
import { AppModal } from '@/shared/components/modal';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';

import { AuthScreenTitle } from '../components/auth-screen-title';
import { VerificationForm } from '../components/verification-form';
import { registerSchema } from '../schema/auth.schema';

export function RegisterScreen() {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const {
    control,
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

  const { mutate, isPending, error } = $api.useMutation('post', '/auth/register', {
    onSuccess(data) {
      setToggleModal(true);
    },
    onError(error) {
      console.log(error);
    },
  });

  const handleRegister = () => {
    mutate({
      body: getValues(),
    });
  };

  return (
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

      <Button size="md" onPress={isValid ? handleRegister : null} disabled={!isValid}>
        Create account
      </Button>

      <AppModal
        visible={toggleModal}
        handleClose={() => setToggleModal(false)}
        modalTitle="Verify Your Email"
      >
        <VerificationForm types={['EMAIL']} />
      </AppModal>

      <View style={{ gap: 12 }}>
        <Text align="center">Already have an account?</Text>
        <Link href={'/(auth)/login'}>
          <Text align="center" color="link">
            Proceed to login
          </Text>
        </Link>
      </View>
    </View>
  );
}
