import { snakeCase } from 'lodash';

import { Card } from '@/components/shared/ui/card';
import { Col } from '@/components/shared/ui/flex';
import { TabbedView } from '@/components/shared/ui/tabbed-view';
import { Text } from '@/components/shared/ui/text';

const kycLevels = ['Not Verified', 'Identity Verified'];

const routes: { key: string; title: string }[] = kycLevels.map((level) => ({
  key: snakeCase(level),
  title: level,
}));

export function KycLimits() {
  return (
    <Col gap={12}>
      <Text weight={700} size="text-xl">
        Your KYC limits
      </Text>

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
