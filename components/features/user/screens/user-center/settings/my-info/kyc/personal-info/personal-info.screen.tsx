import { Button } from '@/components/shared/ui/button';
import { DescriptionHeader } from '@/components/shared/ui/description-header';
import { Col, Row } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { Input, InputGroup } from '@/components/shared/ui/input';

export function KycPersonalInfoScreen() {
  return (
    <>
      <Col gap={32}>
        <DescriptionHeader
          title="Tell us more about you"
          subText="Please provide your information as it is in your official documents"
        />

        <Col gap={24}>
          <Row gap={12}>
            <InputGroup style={{ flex: 1 }}>
              <Input />
            </InputGroup>
            <InputGroup style={{ flex: 1 }}>
              <Input />
            </InputGroup>
          </Row>

          <InputGroup>
            <Input />
          </InputGroup>

          <Row gap={12}>
            <InputGroup style={{ flex: 1 }}>
              <Input />
            </InputGroup>

            <InputGroup style={{ flex: 1 }}>
              <Input />
            </InputGroup>
          </Row>
        </Col>
      </Col>

      <Button
        size="md"
        variant="plain"
        style={{ marginTop: 'auto' }}
        endAdornment={<Icon name="ArrowRight2" />}
      >
        Continue
      </Button>
    </>
  );
}
