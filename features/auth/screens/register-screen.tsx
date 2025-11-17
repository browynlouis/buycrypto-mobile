import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { Input, InputGroup } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';

import { AuthScreenTitle } from '../components/auth-screen-title';

export function RegisterScreen() {
  return (
    <View style={{ gap: 32 }}>
      <AuthScreenTitle title="Register an account!" subText="Welcome to BuyCrypto" />

      <View style={{ gap: 24 }}>
        <InputGroup>
          <Input placeholder="e.g jon@doe.com" startAdornment={<Icon name="User" />} />
        </InputGroup>

        <InputGroup>
          <Input hiddenField placeholder="e.g Unau!@17" startAdornment={<Icon name="Lock" />} />
        </InputGroup>

        <InputGroup>
          <Input hiddenField placeholder="Confirm Password" startAdornment={<Icon name="Lock" />} />
        </InputGroup>
      </View>

      <Button size="md">Create account</Button>

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
