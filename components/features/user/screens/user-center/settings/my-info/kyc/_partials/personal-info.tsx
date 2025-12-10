import React from 'react';
import styled from 'styled-components/native';

import { Card } from '@/components/shared/ui/card';
import { Col, Row } from '@/components/shared/ui/flex';
import { Text } from '@/components/shared/ui/text';

export function PersonalInfo() {
  return (
    <Col gap={12}>
      <Text weight={700} size="text-xl">
        Your Information
      </Text>

      <Card>
        <Col gap={18}>
          <Row justify="space-between">
            <InfoKeyText>First Name</InfoKeyText>

            <InfoValueText>Hey</InfoValueText>
          </Row>
          <Row justify="space-between">
            <InfoKeyText>Last Name</InfoKeyText>

            <InfoKeyText></InfoKeyText>
          </Row>
          <Row justify="space-between">
            <InfoKeyText>Other Name(s)</InfoKeyText>

            <InfoValueText>Hey</InfoValueText>
          </Row>
          <Row justify="space-between">
            <InfoKeyText>Country/Region</InfoKeyText>

            <InfoValueText>Hey</InfoValueText>
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
