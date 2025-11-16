import styled from 'styled-components/native';

import { ButtonSize, ButtonVariant } from './button';

export const StyledButton = styled.Pressable.attrs<{ size?: ButtonSize; variant?: ButtonVariant }>(
  () => ({}),
)`
  gap: 8px;
  border-radius: 24px;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};

  /* Background based on variant */
  background-color: ${(props) => {
    switch (props.variant) {
      case 'danger':
        return props.theme.colors.Error[500];
      case 'success':
        return props.theme.colors.Success[500];
      case 'plain':
        return props.theme.colors.Neutral[800];
      case 'text':
        return 'transparent';
      case 'default':
      default:
        return props.theme.colors.Primary[500];
    }
  }};

  /* Padding based on size */
  padding: ${(props) => {
    switch (props.size) {
      case 'sm':
        return '12px 4px';
      case 'md':
        return '16px 8px';
      case 'lg':
      default:
        return '20px 12px';
    }
  }};
`;
