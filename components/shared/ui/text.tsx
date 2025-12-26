import { TextStyle } from 'react-native';
import styled from 'styled-components/native';

import { AppTheme } from '@/styles';

export const Text = styled.Text.attrs<{
  weight?: number;
  color?: string | 'link';
  align?: TextStyle['textAlign'];
  size?: keyof AppTheme['fontSizes'];
  faded?: boolean;
}>((props) => ({
  color:
    props.color === 'link'
      ? props.theme.colors.Primary[400]
      : (props.color ?? props.theme.colors.Neutral[100]),
}))`
  text-align: ${(props) => props.align || 'left'};
  color: ${(props) => props.color};
  font-family: ${(props) => fontFamilyMap[props.weight ?? 400] || 'circular-std-medium'};
  font-size: ${(props) => props.theme.fontSizes[props.size ?? 'text-md']}px;
  opacity: ${(props) => (props.faded ? '0.5' : 1)};
  line-height: 30px;
`;

const fontFamilyMap: Record<number, string> = {
  400: 'circular-std-medium', // normal
  500: 'circular-std-medium', // optional, or same as 400
  600: 'circular-std-bold', // semi-bold
  700: 'circular-std-bold', // bold
  900: 'circular-std-black', // black / heavy
};
