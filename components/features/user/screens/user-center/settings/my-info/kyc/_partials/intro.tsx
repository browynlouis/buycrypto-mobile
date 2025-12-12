import { UserResource } from '@/api/types';
import { Badge } from '@/components/shared/ui/badge';
import { Col } from '@/components/shared/ui/flex';
import { Text } from '@/components/shared/ui/text';
import { resolveKycLevel } from '@/libs/utils';

export function Intro({ kycLevel }: { kycLevel: UserResource['kycLevel'] }) {
  return (
    <Col gap={12}>
      <Text size="text-xl" weight={700}>
        Identity Status (KYC)
      </Text>
      <Badge status={!!kycLevel}>{resolveKycLevel(kycLevel)}</Badge>
    </Col>
  );
}
