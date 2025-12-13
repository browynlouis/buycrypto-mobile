import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { Controller } from 'react-hook-form';

import { getMeQueryOptions, useUsernameUpdateAction } from '@/api/queries/user';
import { Page } from '@/components/shared/layouts/page';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Header } from '@/components/shared/ui/header';
import { Icon } from '@/components/shared/ui/icon';
import { Input, InputGroup, InputHelperText } from '@/components/shared/ui/input';
import { Loader } from '@/components/shared/ui/loader';

/**
 * UsernamePage Component
 *
 * Allows the user to view and update their username.
 *
 * Suspense:
 *  - Wrapped with `Suspense.with` to show a fallback loader during data fetching.
 */
const UsernamePage = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  // Fetch current user data
  const {
    data: { data: user },
  } = useSuspenseQuery(getMeQueryOptions({ refetchOnMount: true }));

  const { form, submit, isSubmitting } = useUsernameUpdateAction({
    username: user.username,
  });

  const { handleSubmit, control } = form;

  return (
    <>
      {/* Loading Indicator */}
      <Loader isLoading={isSubmitting} />

      {/* Page Header */}
      <Header title="Username" />

      {/* Main Content */}
      <Page>
        <Col gap={24}>
          <Controller
            name="username"
            control={control}
            render={({ field, fieldState: { error, invalid, isDirty } }) => (
              <>
                <InputGroup>
                  <Input
                    value={field.value}
                    onEndEditing={field.onBlur}
                    onChangeText={field.onChange}
                    placeholder="Please provide a username"
                    startAdornment={<Icon name="User" size={18} />}
                  />
                  {error?.message && (
                    <InputHelperText variant="error">{error.message}</InputHelperText>
                  )}
                </InputGroup>

                <Button
                  disabled={invalid || !isDirty}
                  onPress={handleSubmit((values) => {
                    submit(values);
                  })}
                >
                  Update
                </Button>
              </>
            )}
          />
        </Col>
      </Page>
    </>
  );
});

UsernamePage.displayName = 'UsernamePage';

export default UsernamePage;
