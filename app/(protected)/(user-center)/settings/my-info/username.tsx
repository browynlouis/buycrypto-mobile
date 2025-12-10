import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from '@suspensive/react';
import { useSuspenseQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';

import { $queryClient } from '@/api/clients/query-client';
import { getMeQueryOptions, userKeys } from '@/api/queries/user';
import { usernameSchema } from '@/api/schemas/user.schema';
import { Page } from '@/components/shared/layouts/page';
import { queryClient } from '@/components/shared/providers/query-provider';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Header } from '@/components/shared/ui/header';
import { Icon } from '@/components/shared/ui/icon';
import { Input, InputGroup, InputHelperText } from '@/components/shared/ui/input';
import { Loader } from '@/components/shared/ui/loader';
import { mapServerErrorsToClient, toast } from '@/libs/utils';

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

  // Setup form with default values and validation
  const { control, getValues, handleSubmit, ...form } = useForm({
    mode: 'all',
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: user.username ?? '',
    },
  });

  useEffect(() => {
    user.username && form.reset({ username: user.username });
  }, [user]);

  // Mutation to update username
  const { mutate, isPending, reset } = $queryClient.useMutation('post', '/users/me/username', {
    onSuccess(data, variables) {
      // Reset mutation state and form values
      reset();
      form.reset(variables.body);

      // Set username of the user query
      queryClient.invalidateQueries({
        queryKey: userKeys.me,
      });
    },
    onError(error) {
      toast().error(error.message);

      // Map server-side validation errors to form fields
      if (error.details?.formErrors) {
        mapServerErrorsToClient(form.setError, error.details?.formErrors);
      }
    },
  });

  return (
    <>
      {/* Loading Indicator */}
      <Loader isLoading={isPending} />

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
                    mutate({ body: values });
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
