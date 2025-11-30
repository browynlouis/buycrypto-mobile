import { ViewProps } from 'react-native';
import styled from 'styled-components/native';

type FlexProps = ViewProps & {
  justify?:
    | 'flex-start'
    | 'center'
    | 'flex-end'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
  align?: 'flex-start' | 'center' | 'flex-end' | 'stretch' | 'baseline';
  gap?: number; // native gap
  padding?: number;
  margin?: number;
};

export const Row = styled.View<FlexProps>`
  flex-direction: row;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'center'};
  gap: ${({ gap }) => (gap !== undefined ? `${gap}px` : '0px')};
  padding: ${({ padding }) => (padding !== undefined ? `${padding}px` : '0px')};
  margin: ${({ margin }) => (margin !== undefined ? `${margin}px` : '0px')};
`;

export const Col = styled.View<FlexProps>`
  flex-direction: column;
  justify-content: ${({ justify }) => justify || 'flex-start'};
  align-items: ${({ align }) => align || 'stretch'};
  gap: ${({ gap }) => (gap !== undefined ? `${gap}px` : '0px')};
  padding: ${({ padding }) => (padding !== undefined ? `${padding}px` : '0px')};
  margin: ${({ margin }) => (margin !== undefined ? `${margin}px` : '0px')};
`;
