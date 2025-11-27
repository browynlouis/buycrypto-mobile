import { ErrorBoundary, Suspense } from '@suspensive/react';
import { SuspenseQuery } from '@suspensive/react-query';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller, useFormContext } from 'react-hook-form';
import { View } from 'react-native';

import { $fetchApi } from '@/libs/api';
import { toast } from '@/libs/utils';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { InputGroup, InputHelperText } from '@/shared/components/ui/input/input.styled';
import { SelectInput } from '@/shared/components/ui/select-input';
import { Skeleton } from '@/shared/components/ui/skeleton';
import { Text } from '@/shared/components/ui/text';

import { AuthScreenTitle } from '../../components';
import { RegistrationFormContext } from './form-provider/registration-form-provider';

export function CountrySelectionScreen() {
  return (
    <View style={{ gap: 32 }}>
      <AuthScreenTitle
        title="What's your country?"
        subText="Please select your country to continue"
      />

      {/* Error boundary should have a SIMPLE fallback */}
      <ErrorBoundary fallback={<></>} onError={(e) => toast().error(e.message)}>
        <Suspense
          fallback={
            <>
              <Skeleton width={'100%'} height={45} />
              <Skeleton width={'100%'} height={45} />
            </>
          }
        >
          <SuspenseQuery
            queryKey={['get', 'metadata/config/countries']}
            queryFn={() => $fetchApi.GET('/metadata/config/countries')}
          >
            {({ data: { data } }) => {
              const router = useRouter();
              const { setValue, control } = useFormContext<RegistrationFormContext>();

              const countries = data?.data!;

              return (
                <Controller
                  name="country"
                  control={control}
                  render={({ field, fieldState: { error, invalid } }) => (
                    <>
                      <InputGroup>
                        <SelectInput<(typeof countries)[0]>
                          options={countries}
                          placeholder="Select your country…"
                          startAdornment={<Icon name="Flag" />}
                          endAdornment={<Icon name="ArrowDown2" />}
                          onSelect={(item) =>
                            setValue('country', item.code, {
                              shouldDirty: true,
                              shouldTouch: true,
                              shouldValidate: true,
                            })
                          }
                          value={countries.find((c) => c.code === field.value) ?? null}
                          renderValue={(item) => `${item?.name} - (${item?.callingCode})`}
                          renderItem={(item) => (
                            <View style={{ paddingVertical: 24 }}>
                              <Text>{item.name}</Text>
                            </View>
                          )}
                        />

                        {error?.message && (
                          <InputHelperText variant="error">{error.message}</InputHelperText>
                        )}
                      </InputGroup>

                      <Button
                        size="md"
                        disabled={invalid}
                        onPress={() =>
                          !invalid && router.push('/(auth)/registration/credentials-form')
                        }
                      >
                        Proceed
                      </Button>
                    </>
                  )}
                />
              );
            }}
          </SuspenseQuery>
        </Suspense>
      </ErrorBoundary>
    </View>
  );
}
