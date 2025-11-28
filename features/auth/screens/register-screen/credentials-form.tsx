import React from 'react';
import { View } from 'react-native';

import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';

import { AuthScreenTitle } from '../../components';
import { useRegistration } from './use-registration';

export function CredentialsFormScreen() {
  const { form, register, isSubmitting } = useRegistration();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  return (
    <>
      <Loader isLoading={isSubmitting} />

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
        </View>

        <Button size="md" disabled={!isValid || isSubmitting} onPress={handleSubmit(register)}>
          Create account
        </Button>
      </View>
    </>
  );
}
