import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { Input, InputGroup } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';

import { AuthScreenTitle } from '../components/auth-screen-title';

export function ForgotPasswordScreen() {
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

      <Button size="md">Submit</Button>

      <Link href={'/(auth)/login'} style={{ alignSelf: 'center' }}>
        <Text color="link">Back to login?</Text>
      </Link>
    </View>
  );
}
