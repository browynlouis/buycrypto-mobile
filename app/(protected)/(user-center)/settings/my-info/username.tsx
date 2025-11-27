import { zodResolver } from '@hookform/resolvers/zod';
import { Suspense } from '@suspensive/react';
import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import z from 'zod';

import { getMe, updateUsername } from '@/features/user/api';
import { usernameSchema } from '@/features/user/schema';
import { $api } from '@/libs/api';
import { useTheme } from '@/libs/hooks';
import { mapServerErrorsToClient, toast } from '@/libs/utils';
import { Header } from '@/shared/components/header';
import { Page } from '@/shared/components/layouts/page';
import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { Col } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { Input, InputGroup, InputHelperText } from '@/shared/components/ui/input';
import { Text } from '@/shared/components/ui/text';

type FormValues = z.infer<typeof usernameSchema>;

const Username = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const theme = useTheme();

  const {
    data: { data: user },
  } = $api.useSuspenseQuery(...getMe, {}, { refetchOnMount: true });

  const { control, getValues, handleSubmit, ...form } = useForm<FormValues>({
    mode: 'all',
    resolver: zodResolver(usernameSchema),
    defaultValues: {
      username: user.username ?? '',
    },
  });

  const { mutate, isPending, reset } = $api.useMutation(...updateUsername, {
    onSuccess(data, variables) {
      reset();

      form.reset(variables.body);
    },

    onError(error) {
      toast().error(error.message);

      if (error.details?.formErrors) {
        mapServerErrorsToClient(form.setError, error.details?.formErrors);
      }
    },
  });

  return (
    <>
      <Loader isLoading={isPending} />

      <Header title="Username" />

      <Page>
        <Col gap={24}>
          <Col gap={8}>
            <Icon name="InfoCircle" size={12} color={theme.colors.Warning[500]} />
            <Col gap={6}>
              <Text size="text-sm" color={theme.colors.Warning[500]}>
                Username can only be updated once every 30 days
              </Text>

              <Text size="text-xs">
                Use 6–20 characters. Letters, numbers, underscores, and hyphens are allowed — but no
                starting, ending, or repeating special characters
              </Text>
            </Col>
          </Col>

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
                    <InputHelperText variant="error">{error?.message}</InputHelperText>
                  )}
                </InputGroup>

                <Button
                  disabled={invalid || !isDirty}
                  onPress={handleSubmit((values) => {
                    mutate({
                      body: values,
                    });
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
