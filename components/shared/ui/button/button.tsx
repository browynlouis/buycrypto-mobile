import React from 'react';
import { PressableProps, PressableStateCallbackType } from 'react-native';

import { AppTheme } from '@/styles';

import { useAppTheme } from '../../providers/theme-provider/hooks';
import { Text } from '../text';
import { StyledButton } from './button.styled';

export type ButtonSize = 'sm' | 'md' | 'lg';
export type ButtonVariant = 'default' | 'danger' | 'success' | 'plain' | 'text';

export interface ButtonProps extends PressableProps {
  size?: ButtonSize;
  variant?: ButtonVariant;
  endAdornment?: React.ReactNode;
  startAdornment?: React.ReactNode;
  children: React.ReactNode | ((state: PressableStateCallbackType) => React.ReactNode);
}

function Button({ children, style, startAdornment, endAdornment, variant, ...props }: ButtonProps) {
  const theme = useAppTheme();

  let textSize: keyof AppTheme['fontSizes'];

  switch (props.size) {
    case 'md':
      textSize = 'text-md';
      break;
    case 'lg':
      textSize = 'text-lg';
      break;
    case 'sm':
    default:
      textSize = 'text-sm';
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
      variant={variant}
      {...props}
    >
      {(state) => {
        return typeof children === 'function' ? (
          <>
            {startAdornment}
            <Text
              size={textSize}
              color={variant === 'default' || !variant ? theme.colors.Shades.White : undefined}
            >
              {children(state)}
            </Text>
            {endAdornment}
          </>
        ) : (
          <>
            {startAdornment}
            <Text
              size={textSize}
              color={variant === 'default' || !variant ? theme.colors.Shades.White : undefined}
            >
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
