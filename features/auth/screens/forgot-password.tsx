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

export function ForgotPasswordScreen() {
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const handleForgotPassword = () => {
    setToggleModal(true);
  };

  return (
    <View style={{ gap: 32 }}>
      <AuthScreenTitle
        title="Forgot your password?"
        subText="Provide the email associated with your account"
      />

      <View style={{ gap: 24 }}>
        <InputGroup>
          <Input placeholder="Your email address" startAdornment={<Icon name="User" />} />
        </InputGroup>
      </View>

      <Button size="md" onPress={handleForgotPassword}>
        Submit
      </Button>

      {/* Forgot Password Verification */}
      <AppModal
        visible={toggleModal}
        handleClose={() => setToggleModal(false)}
        modalTitle="Verify your request"
      >
        <VerificationForm types={['EMAIL']} />
      </AppModal>

      <Link href={'/(auth)/login'} style={{ alignSelf: 'center' }}>
        <Text color="link">Back to login?</Text>
      </Link>
    </View>
  );
}
