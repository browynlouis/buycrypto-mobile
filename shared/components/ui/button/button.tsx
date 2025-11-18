import React from 'react';
import { PressableProps, PressableStateCallbackType } from 'react-native';

import { useTheme } from '@/libs/hooks';
import { AppTheme } from '@/styles';

import { Text } from '../text';
import { StyledButton } from './button.styled';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'default' | 'danger' | 'success' | 'plain' | 'text';

interface ButtonProps extends PressableProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode);
}

function Button({ children, style, startAdornment, endAdornment, ...props }: ButtonProps) {
  const theme = useTheme();

  let textSize: keyof AppTheme['fontSizes'];

  switch (props.size) {
    case 'md':
      textSize = 'text-lg';
      break;
    case 'lg':
      textSize = 'text-xl';
    case 'sm':
      textSize = 'text-md';
      break;
    default:
  }

  return (
    <StyledButton
      style={(state) => {
        const pressedStyle = {
          opacity: props.disabled ? 0.5 : state.pressed ? 0.9 : 1,
        };

        let mergedStyle;

        if (typeof style === 'function') {
          mergedStyle = [pressedStyle, style(state)];
        } else {
          mergedStyle = [pressedStyle, style];
        }

        return mergedStyle;
      }}
      {...props}
    >
      {}
      {(state) => {
        return typeof children === 'function' ? (
          <>
            {startAdornment}
            <Text color={theme.colors.Shades.White} size={textSize}>
              {children(state)}
            </Text>
            {endAdornment}
          </>
        ) : (
          <>
            {startAdornment}
            <Text color={theme.colors.Shades.White} size={textSize}>
              {children}
            </Text>
            {endAdornment}
          </>
        );
      }}
    </StyledButton>
  );
}

export { Button };
