import { Suspense } from '@suspensive/react';
import { Control, Controller, UseFormSetValue } from 'react-hook-form';
import { View } from 'react-native';

import { $queryClient } from '@/api/clients/query-client';

import { Icon } from './icon';
import { InputGroup, InputHelperText } from './input';
import { Loader } from './loader';
import { SelectInput } from './select-input';
import { Text } from './text';

interface CountrySelectInputProps {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
}

const CountrySelectInput = Suspense.with(
  { fallback: <Loader isLoading /> },
  ({ control, setValue }: CountrySelectInputProps) => {
    const {
      data: { data: countries },
    } = $queryClient.useSuspenseQuery('get', '/app/metadata/supported-countries');

    return (
      <Controller
        name="country"
        control={control}
        render={({ field, fieldState: { error } }) => (
          <InputGroup>
            <SelectInput<(typeof countries)[0]>
              options={countries}
              placeholder="Select your country…"
              startAdornment={<Icon name="Flag" />}
              endAdornment={<Icon name="ArrowDown2" />}
              value={countries.find((c) => c.code === field.value) ?? null}
              onSelect={(item) => {
                field.onChange(item.code);
                setValue('country', item.code, {
                  shouldDirty: true,
                  shouldTouch: true,
                  shouldValidate: true,
                });
              }}
              renderValue={(item) => `${item?.name} - (${item?.callingCode})`}
              renderItem={(item) => (
                <View style={{ paddingVertical: 24 }}>
                  <Text>{item.name}</Text>
                </View>
              )}
            />
            {error?.message && <InputHelperText variant="error">{error.message}</InputHelperText>}
          </InputGroup>
        )}
      />
    );
  },
);

CountrySelectInput.displayName = 'CountrySelectInput';

export { CountrySelectInput };
