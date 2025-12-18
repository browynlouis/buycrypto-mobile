import React from 'react';
import styled from 'styled-components/native';

import { UserProfileResource } from '@/api/types';
import { Card } from '@/components/shared/ui/card';
import { Col, Row } from '@/components/shared/ui/flex';
import { Text } from '@/components/shared/ui/text';

export function PersonalInfo({ profile }: { profile: UserProfileResource }) {
  return (
    <Col gap={12}>
      <Text weight={700} size="text-xl">
        Your Information
      </Text>

      <Card>
        <Col gap={18}>
          <Row justify="space-between">
            <InfoKeyText>First Name</InfoKeyText>

            <InfoValueText>{profile?.firstName ?? '--'}</InfoValueText>
          </Row>
          <Row justify="space-between">
            <InfoKeyText>Last Name</InfoKeyText>

            <InfoValueText>{profile?.lastName ?? '--'}</InfoValueText>
          </Row>
          <Row justify="space-between">
            <InfoKeyText>Other Name(s)</InfoKeyText>

            <InfoValueText>{profile?.middleName ?? '--'}</InfoValueText>
          </Row>
          <Row justify="space-between">
            <InfoKeyText>Country/Region</InfoKeyText>

            <InfoValueText>{profile?.country ?? '--'}</InfoValueText>
          </Row>
          <Row justify="space-between">
            <InfoKeyText>Date of Birth</InfoKeyText>

            <InfoValueText>
              {profile?.dob ? new Date(profile.dob).toDateString() : '--'}
            </InfoValueText>
          </Row>
        </Col>
      </Card>
    </Col>
  );
}

const InfoKeyText = styled(Text)`
  opacity: 0.5;
  font-size: ${(props) => props.theme.fontSizes['text-sm']}px;
`;

const InfoValueText = styled(Text)`
  opacity: 0.8;
  font-size: ${(props) => props.theme.fontSizes['text-xs']}px;
`;
