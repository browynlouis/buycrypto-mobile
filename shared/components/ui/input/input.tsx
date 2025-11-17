import React, { LegacyRef, ReactNode, useState } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { KeyboardType, TextInputProps, TouchableOpacity } from 'react-native';
import { useTheme } from 'styled-components/native';

import { AppTheme } from '@/styles';

import { Icon } from '../icon';
import {
  Adornment,
  InputContainer,
  InputGroup,
  InputHelperText,
  InputLabel,
  InputWrapper,
  StyledInput,
} from './input.styled';

type InputVariants = 'default' | 'danger' | 'success';

interface InputProps extends Omit<TextInputProps, 'style'> {
  type?: KeyboardType;
  startAdornment?: ReactNode;
  endAdornment?: ReactNode;
  wrapperStyle?: any;
  inputFieldStyle?: any;
  inputRef?: LegacyRef<any>;
  hiddenField?: boolean;
  variant?: InputVariants;
}

interface ControlledInputProps<T extends FieldValues> extends InputProps {
  label?: React.ReactNode;
  control: Control<T>;
  name: Path<T>;
  helperText?: React.ReactNode;
}

const inputVariants = (theme: AppTheme, variants: InputVariants) => {
  const styles = {
    default: theme.colors.Neutral[500],
    danger: theme.colors.Error[400],
    success: theme.colors.Success[400],
  };

  return styles[variants];
};

function Input({
  type = 'default',
  startAdornment,
  endAdornment,
  wrapperStyle,
  inputRef,
  onFocus,
  onBlur,
  inputFieldStyle,
  hiddenField = false,
  variant = 'default',
  placeholder,
  ...props
}: InputProps) {
  const [focus, setFocus] = useState(false);
  const [secure, setSecure] = useState(hiddenField);

  const theme = useTheme();

  const borderColor = focus ? theme.colors.Primary[500] : inputVariants(theme, variant);

  return (
    <InputWrapper style={wrapperStyle} borderColor={borderColor} bg={theme.colors.Neutral[700]}>
      {startAdornment && <Adornment>{startAdornment}</Adornment>}

      <InputContainer>
        <StyledInput
          ref={inputRef}
          keyboardType={type}
          cursorColor={theme.colors.Neutral[400]}
          style={[
            {
              color: theme.colors.Neutral[100],
              fontSize: theme.fontSizes['text-md'],
            },
            inputFieldStyle,
          ]}
          placeholder={placeholder}
          secureTextEntry={secure}
          onFocus={(e) => {
            setFocus(true);
            onFocus?.(e);
          }}
          onBlur={(e) => {
            setFocus(false);
            onBlur?.(e);
          }}
          placeholderTextColor={theme.colors.Neutral[400]}
          {...props}
        />
      </InputContainer>

      <Adornment>
        {hiddenField ? (
          <TouchableOpacity onPress={() => setSecure(!secure)}>
            {secure ? <Icon name="Eye" /> : <Icon name="EyeSlash" />}
          </TouchableOpacity>
        ) : (
          endAdornment
        )}
      </Adornment>
    </InputWrapper>
  );
}

const numericField = ['number-pad', 'decimal-pad', 'numeric'];

function ControlledInput<T extends FieldValues>({
  name,
  control,
  label,
  helperText,
  placeholder,
  ...inputProps
}: ControlledInputProps<T>) {
  const theme = useTheme();

  return (
    <Controller
      name={name}
      control={control}
      render={({
        field: { onChange, value, onBlur, ...field },
        fieldState: { error, invalid },
      }) => {
        return (
          <InputWrapper>
            {label && <InputLabel weight={500}>{label}</InputLabel>}
            <Input
              value={value}
              onBlur={onBlur}
              editable={field.disabled}
              placeholder={placeholder}
              defaultValue={value?.toString()}
              onChangeText={(text: string) => {
                if (numericField.includes((inputProps.type ?? '') as string)) {
                  onChange(text.replace(/[^0-9]/g, ''));

                  return;
                }
                onChange(text);
              }}
              wrapperStyle={invalid ? inputVariants(theme, 'danger') : null}
              {...inputProps}
            />
            {(invalid || helperText) && (
              <InputHelperText style={[invalid ? { color: theme.colors.Error[400] } : null]}>
                {error?.message ?? helperText}
              </InputHelperText>
            )}
          </InputWrapper>
        );
      }}
    />
  );
}

export { ControlledInput, Input, InputGroup, InputHelperText, InputLabel };
