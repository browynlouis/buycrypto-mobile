import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from '@suspensive/react';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { getMe, updateUsername } from '@/api/user';
import { usernameSchema } from '@/features/user/schema';
import { $api } from '@/libs/api';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Loader } from '@/shared/components/loader';
import { queryClient } from '@/shared/components/providers/query-provider';
import { Button } from '@/shared/components/ui/button';
import { Col } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { Input, InputGroup, InputHelperText } from '@/shared/components/ui/input';

type FormValues = z.infer<typeof usernameSchema>;

/**
 * Username Component
 *
 * Allows the user to view and update their username.
 *
 * Suspense:
 *  - Wrapped with `Suspense.with` to show a fallback loader during data fetching.
 */
const Username = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  // Fetch current user data
  const {
    data: { data: user },
  } = $api.useSuspenseQuery(...getMe, {}, { refetchOnMount: true });

  // Setup form with default values and validation
  const { control, getValues, handleSubmit, ...form } = useForm<FormValues>({
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
  const { mutate, isPending, reset } = $api.useMutation(...updateUsername, {
    onSuccess(data, variables) {
      // Reset mutation state and form values
      reset();
      form.reset(variables.body);

      // Set username of the user query
      queryClient.invalidateQueries({
        queryKey: getMe,
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

export default Username;
