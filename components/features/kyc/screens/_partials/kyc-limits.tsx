import { snakeCase } from 'lodash';

import { Badge } from '@/components/shared/ui/badge';
import { Card } from '@/components/shared/ui/card';
import { Col, Row } from '@/components/shared/ui/flex';
import { TabbedView } from '@/components/shared/ui/tabbed-view';
import { Text } from '@/components/shared/ui/text';

const kycLevels = ['Not Verified', 'Identity Verified'];

const routes: { key: string; title: string }[] = kycLevels.map((level) => ({
  key: snakeCase(level),
  title: level,
}));

export function KycLimits({ kycLevel }: { kycLevel: number }) {
  return (
    <Col gap={12}>
      <Row gap={12} justify="space-between">
        <Text weight={700} size="text-xl">
          KYC limits
        </Text>
        <Badge status={!!kycLevel}>You're {kycLevels[kycLevel]}</Badge>
      </Row>

      <Card>
        <TabbedView
          routes={routes}
          renderScene={({ route: { key } }) => {
            switch (key) {
              case snakeCase(kycLevels[0]):
                return <></>;
              case snakeCase(kycLevels[1]):
                return <></>;
              default:
                return <></>;
            }
          }}
        />
      </Card>
    </Col>
  );
}
