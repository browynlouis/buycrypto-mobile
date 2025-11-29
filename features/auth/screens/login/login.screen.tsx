import { Link } from 'expo-router';
import React from 'react';

import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { Col } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { ControlledInput } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';

import { AuthScreenTitle } from '../../components';
import { useLogin } from '../../hooks/use-login';

export function LoginScreen() {
  const { form, isSubmitting, submit } = useLogin();

  const {
    control,
    handleSubmit,
    formState: { isValid },
  } = form;

  return (
    <>
      <Loader isLoading={isSubmitting} />

      <Col gap={32}>
        <AuthScreenTitle title="Hi, Welcome!" subText="Please login to your account" />

        <Col gap={24}>
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
          <Link href="/(auth)/password">
            <Text weight={500} size="text-md" align="left" color="link">
              Forgot password?
            </Text>
          </Link>
        </Col>

        <Button size="md" onPress={handleSubmit(submit)} disabled={!isValid || isSubmitting}>
          Proceed to login
        </Button>
      </Col>
    </>
  );
}
