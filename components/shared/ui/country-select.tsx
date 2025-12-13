import { Suspense } from '@suspensive/react';
import { Control, Controller } from 'react-hook-form';
import { View } from 'react-native';

import { $queryClient } from '@/api/clients/query-client';

import { useAppTheme } from '../providers/theme-provider/hooks';
import { Icon } from './icon';
import { InputGroup, InputHelperText, inputVariants } from './input';
import { Loader } from './loader';
import { SelectInput } from './select-input';
import { Text } from './text';

interface CountrySelectInputProps {
  disabled?: boolean;
  control: Control<any>;
  placeholder?: string;
}

const CountrySelectInput = Suspense.with(
  { fallback: <Loader isLoading /> },
  ({ control, placeholder = 'Select your country…', disabled }: CountrySelectInputProps) => {
    const theme = useAppTheme();

    const {
      data: { data: countries },
    } = $queryClient.useSuspenseQuery('get', '/app/metadata/supported-countries');

    return (
      <Controller
        name="country"
        control={control}
        render={({ field, fieldState: { error, invalid } }) => (
          <InputGroup style={{ flex: 1 }}>
            <SelectInput<(typeof countries)[0]>
              options={countries}
              disabled={disabled}
              placeholder={placeholder}
              startAdornment={<Icon name="Flag" />}
              endAdornment={<Icon name="ArrowDown2" />}
              value={countries.find((c) => c.code === field.value) ?? null}
              onSelect={(item) => {
                !disabled && field.onChange(item.code);
              }}
              wrapperStyle={invalid ? { borderColor: inputVariants(theme, 'danger') } : undefined}
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
