import { Suspense } from '@suspensive/react';
import { useRouter } from 'expo-router';
import React from 'react';
import { Controller } from 'react-hook-form';
import { View } from 'react-native';

import { $api } from '@/libs/api';
import { Loader } from '@/shared/components/loader';
import { Button } from '@/shared/components/ui/button';
import { Col } from '@/shared/components/ui/flex';
import { Icon } from '@/shared/components/ui/icon';
import { InputGroup, InputHelperText } from '@/shared/components/ui/input/input.styled';
import { SelectInput } from '@/shared/components/ui/select-input';
import { Text } from '@/shared/components/ui/text';

import { AuthScreenTitle } from '../../components';
import { useRegistration } from '../../hooks';

const CountrySelectionScreen = Suspense.with({ fallback: <Loader isLoading /> }, () => {
  const router = useRouter();
  const {
    form: { control, setValue },
  } = useRegistration();

  const {
    data: { data: countries },
  } = $api.useSuspenseQuery('get', '/metadata/config/countries');

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
              onPress={() => field.value && router.push('/(auth)/registration/credentials-form')}
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
