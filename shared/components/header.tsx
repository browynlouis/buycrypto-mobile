import { useRouter } from 'expo-router';
import React from 'react';
import { TextStyle } from 'react-native';
import styled from 'styled-components/native';

import { useTheme } from './providers/theme-provider/hooks';
import { Button } from './ui/button/button';
import { Icon } from './ui/icon';
import { Text } from './ui/text';

export function Header({
  title,
  titlePosition = 'center',
  showBackButton = true,
  rightElement,
  leftElement,
  onBack,
  backgroundColor,
  titleStyle,
}: {
  title?: string;
  onBack?: () => void;
  showBackButton?: boolean;
  rightElement?: React.ReactNode;
  leftElement?: React.ReactNode;
  titlePosition?: 'left' | 'center';
  backgroundColor?: string;
  titleStyle?: TextStyle;
}) {
  const theme = useTheme();
  const router = useRouter();

  return (
    <Wrapper backgroundColor={backgroundColor}>
      {/* Left */}
      <LeftSection>
        {showBackButton && (
          <BackButton
            variant="text"
            onPress={onBack ? onBack : router.back}
            hitSlop={{ top: 10, bottom: 10, left: 10, right: 10 }}
          >
            <Icon name="ArrowLeft" size={32} />
          </BackButton>
        )}
        {leftElement}
      </LeftSection>

      {/* Title */}
      <TitleSection titlePosition={titlePosition}>
        {title && (
          <StyledTitle size="text-md" weight={500} style={titleStyle}>
            {title}
          </StyledTitle>
        )}
      </TitleSection>

      {/* Right */}
      <RightSection>{rightElement}</RightSection>
    </Wrapper>
  );
}

const Wrapper = styled.View<{ backgroundColor?: string }>`
  width: 100%;
  height: 60px;
  padding: 0px 16px;
  flex-direction: row;
  align-items: center;
  background-color: ${(props) => props.backgroundColor ?? props.theme.colors.Neutral[900]};
`;

const LeftSection = styled.View`
  flex: 1;
  flex-direction: row;
  align-items: center;
`;

const TitleSection = styled.View<{ titlePosition: 'left' | 'center' }>`
  flex: ${(props) => (props.titlePosition === 'center' ? 1 : 2)};
  align-items: ${(props) => (props.titlePosition === 'center' ? 'center' : 'flex-start')};
`;

const RightSection = styled.View`
  flex: 1;
  padding-right: 2px;
  align-items: flex-end;
`;

const BackButton = styled(Button)`
  margin-right: 8px;
`;

const StyledTitle = styled(Text)``;
