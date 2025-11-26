import React from 'react';
import styled from 'styled-components/native';

import { Avatar } from '@/shared/components/ui/avatar';
import { Button } from '@/shared/components/ui/button';
import { Icon } from '@/shared/components/ui/icon';
import { Text } from '@/shared/components/ui/text';

export function ProfileHeader() {
  return (
    <Container>
      <Content>
        <Avatar size={52} />

        <UserInfo>
          <Text size="text-xl">browynlouis</Text>

          <Text size="text-xs" style={{ opacity: 0.7 }}>
            browynlouis2@gmail.com
          </Text>

          <CopyButton
            size="sm"
            variant="text"
            onPress={async () => {}}
            endAdornment={<Icon name="Copy" size={16} />}
          >
            {`ID: orem&^*_ipsu`}
          </CopyButton>
        </UserInfo>
      </Content>
    </Container>
  );
}

/* ---------------------- Styled Components ---------------------- */

const Container = styled.View`
  gap: 24px;
  background-color: transparent;
`;

const Content = styled.View`
  gap: 12px;
  width: 100%;
  flex-direction: row;
  align-items: center;
`;

const UserInfo = styled.View`
  gap: 6px;
  align-items: flex-start;
`;

const CopyButton = styled(Button)`
  opacity: 0.5;
  padding-left: 0;
  padding-right: 0;
  padding-top: 0;
  padding-bottom: 0;
`;

const BadgeRow = styled.View`
  flex-direction: row;
  gap: 12px;
`;
