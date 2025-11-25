import React from 'react';
import { ImageSourcePropType, StyleProp, ViewStyle } from 'react-native';
import styled from 'styled-components/native';

import { Icon } from './icon';

export function Avatar({ imageSource, size = 48, style }: AvatarProps) {
  const radius = size / 2;

  return (
    <Container size={size} radius={radius} style={style}>
      {imageSource ? (
        <StyledImage source={imageSource} size={size} radius={radius} resizeMode="cover" />
      ) : (
        <Icon name="Happyemoji" size={size * 0.5} />
      )}
    </Container>
  );
}

type AvatarProps = {
  imageSource?: ImageSourcePropType;
  size?: number;
  style?: StyleProp<ViewStyle>;
};

const Container = styled.View<{ size: number; radius: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ radius }) => radius}px;
  background-color: ${(props) => props.theme.colors.Shades.White};
  justify-content: center;
  align-items: center;
  overflow: hidden;
`;

const StyledImage = styled.Image<{ size: number; radius: number }>`
  width: ${({ size }) => size}px;
  height: ${({ size }) => size}px;
  border-radius: ${({ radius }) => radius}px;
`;
