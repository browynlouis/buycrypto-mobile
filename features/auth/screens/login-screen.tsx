import { Link } from 'expo-router';
import React from 'react';
import { View } from 'react-native';

import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { Input, InputGroup } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';

import { AuthScreenTitle } from '../components/auth-screen-title';

export function LoginScreen() {
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

      <Button size="md">Proceed to login</Button>

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
