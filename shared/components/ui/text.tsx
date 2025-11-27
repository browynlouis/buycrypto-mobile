import { TextStyle } from 'react-native';
import styled from 'styled-components/native';

import { AppTheme } from '@/styles';

export const Text = styled.Text.attrs<{
  weight?: number;
  color?: string | 'link';
  align?: TextStyle['textAlign'];
  size?: keyof AppTheme['fontSizes'];
}>((props) => ({
  color:
    props.color === 'link'
      ? props.theme.colors.Primary[400]
      : (props.color ?? props.theme.colors.Neutral[100]),
  weight: props.weight ?? 400,
}))`
  text-align: ${(props) => props.align};
  color: ${(props) => props.color};
  font-family: 'circular-std-medium';
  font-weight: ${(props) => props.weight};
  line-height: 18px;
  font-size: ${(props) => props.theme.fontSizes[props.size ?? 'text-md']}px;
`;
