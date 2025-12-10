import { Link } from 'expo-router';
import React from 'react';

import { useLogin } from '@/api/queries/auth';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { ControlledInput } from '@/components/shared/ui/input';
import { Loader } from '@/components/shared/ui/loader';
import { Text } from '@/components/shared/ui/text';

import { AuthScreenTitle } from '../../_partials';

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
