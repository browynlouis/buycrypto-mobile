import styled from 'styled-components/native';

import { AppTheme } from '@/styles';

export const Text = styled.Text.attrs<{
  weight?: number;
  color?: string;
  size?: keyof AppTheme['fontSizes'];
}>((props) => ({
  color: props.color ?? props.theme.colors.Neutral[100],
  weight: props.weight ?? 400,
}))`
  color: ${(props) => props.color};
  font-family: 'circular-std-medium';
  font-weight: ${(props) => props.weight};
  font-size: ${(props) => props.theme.fontSizes[props.size ?? 'text-xl']}px;
`;
