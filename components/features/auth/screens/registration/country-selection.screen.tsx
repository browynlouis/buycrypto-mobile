import { Suspense } from '@suspensive/react';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { useRegistrationAction } from '@/api/auth/actions';
import { Loader } from '@/components/shared/loader';
import { Button } from '@/components/shared/ui/button';
import { Col } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { InputGroup, InputHelperText } from '@/components/shared/ui/input';
import { SelectInput } from '@/components/shared/ui/select-input';
import { Text } from '@/components/shared/ui/text';
import { $api } from '@/libs/api';

import { AuthScreenTitle } from '../../_partials';

const CountrySelectionScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const {
    data: { data: countries },
  } = $api.useSuspenseQuery('get', '/metadata/config/countries');

  const router = useRouter();
  const {
    form: { control, setValue },
  } = useRegistrationAction();

  return (
    <Col gap={32}>
      <AuthScreenTitle
        title="What's your country?"
        subText="Please select your country to continue"
      />

      <Controller
        name="country"
        control={control}
        render={({ field, fieldState: { error } }) => (
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

              {error?.message && <InputHelperText variant="error">{error.message}</InputHelperText>}
            </InputGroup>

            <Button
              size="md"
              disabled={!field.value}
              onPress={() => field.value && router.push('/(auth)/registration/credentials')}
            >
              Proceed
            </Button>
          </>
        )}
      />
    </Col>
  );
});

CountrySelectionScreen.displayName = 'CountrySelectionScreen';

export { CountrySelectionScreen };
