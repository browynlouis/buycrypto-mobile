import { Link } from 'expo-router';
import React, { useState } from 'react';
import { View } from 'react-native';

import { AppModal } from '@/shared/components/modal';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { Input, InputGroup } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';

import { AuthScreenTitle } from '../components/auth-screen-title';
import { VerificationForm } from '../components/verification-form';

export function LoginScreen() {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const handleLogin = () => {
    setToggleModal(true);
  };

  return (
    <View style={{ gap: 32 }}>
      <AuthScreenTitle title="Hi, Welcome!" subText="Please login to your account" />

      <View style={{ gap: 24 }}>
        <InputGroup>
          <Input placeholder="Email" startAdornment={<Icon name="User" />} />
        </InputGroup>

        <InputGroup>
          <Input hiddenField placeholder="Password" startAdornment={<Icon name="Lock" />} />
        </InputGroup>

        <Link href={'/(auth)/forgot-password'}>
          <Text weight={500} size="text-md" align="left" color="link">
            Forgot password?
          </Text>
        </Link>
      </View>

      <Button size="md" onPress={handleLogin}>
        Proceed to login
      </Button>

      {/* Two Factor Auth Verification */}
      <AppModal
        visible={toggleModal}
        handleClose={() => setToggleModal(false)}
        modalTitle="Two Factor Authentication"
      >
        <VerificationForm types={['EMAIL']} />
      </AppModal>

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
