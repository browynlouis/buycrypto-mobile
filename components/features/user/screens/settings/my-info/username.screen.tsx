import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import React from 'react';
import { Controller } from 'react-hook-form';

import { getMeQueryOptions, useUsernameUpdate } from '@/api/queries/user';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { Input, InputGroup, InputHelperText } from '@/components/shared/ui/input';
import { Loader } from '@/components/shared/ui/loader';

const UsernameScreen = Suspense.with({}, () => {
  // Fetch current user data
  const {
    data: { data: user },
  } = useSuspenseQuery(getMeQueryOptions());

  const { form, submit, isSubmitting } = useUsernameUpdate({
    username: user.username,
  });

  const { handleSubmit, control } = form;

  return (
    <>
      {/* Loading Indicator */}
      <Loader isLoading={isSubmitting} />

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
    </>
  );
});

UsernameScreen.displayName = 'UsernameScreen';

export { UsernameScreen };
