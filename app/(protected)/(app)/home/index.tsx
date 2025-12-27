import { useRouter } from 'expo-router';
import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { Page } from '@/components/shared/layouts/page';
import { Button } from '@/components/shared/ui/button';
import { Col, Row } from '@/components/shared/ui/flex';
import { Icon } from '@/components/shared/ui/icon';
import { AppModal } from '@/components/shared/ui/modal';
import { Panel } from '@/components/shared/ui/panel.';
import { Text } from '@/components/shared/ui/text';

export default function HomePage() {
  return (
    <>
      <Page>
        <Deposit />
      </Page>
    </>
  );
}

function Deposit() {
  const router = useRouter();
  const [showDepositOptions, setShowDepositOptions] = useState<boolean>(false);

  return (
    <>
      <Button variant="plain" onPress={() => setShowDepositOptions(true)}>
        Deposit
      </Button>

      <AppModal
        modalTitle="Deposit"
        visible={showDepositOptions}
        handleClose={() => setShowDepositOptions(false)}
      >
        <Col gap={24}>
          {/* DEPOSIT VIA CRYPTO */}
          <Col gap={12}>
            <Text size="text-sm" faded>
              Deposit with Crypto
            </Text>
            {/* Deposit Onchain Crypto */}
            <TouchableOpacity
              onPress={() => {
                setShowDepositOptions(false);
                router.push('/(protected)/(deposit)/crypto');
              }}
            >
              <Panel>
                <Col gap={12}>
                  <Row gap={8}>
                    <Icon name="Wallet" size={'sm'} />
                    <Text size="text-md">Deposit Crypto?</Text>
                  </Row>

                  <Text size="text-xs" faded>
                    Deposit crypto on-chain with your wallet address
                  </Text>
                </Col>
              </Panel>
            </TouchableOpacity>

            {/* Deposit Internal Crypto */}
            <TouchableOpacity
              onPress={() => {
                setShowDepositOptions(false);
                router.push('/(protected)/(deposit)/buy-crypto-pay');
              }}
            >
              <Panel>
                <Col gap={12}>
                  <Row gap={8}>
                    <Icon name="MoneyRecive" size={'sm'} />
                    <Text size="text-md">Receive via BuyCrypto pay</Text>
                  </Row>
                  <Text size="text-xs" faded>
                    Receive crypto immediately from a BuyCrypto user
                  </Text>
                </Col>
              </Panel>
            </TouchableOpacity>
          </Col>

          {/* DEPOSIT VIA FIAT */}
          <Col gap={12}>
            <Text size="text-sm" faded>
              Buy Crypto with Fiat
            </Text>

            {/* Deposit with P2P */}
            <Panel>
              <Col gap={12}>
                <Row gap={8}>
                  <Icon name="Profile2User" size={'sm'} />
                  <Text size="text-md">P2P Trading</Text>
                </Row>
                <Text size="text-xs" faded>
                  Pay with your local currency to other users and receive crypto
                </Text>
              </Col>
            </Panel>
          </Col>
        </Col>
      </AppModal>
    </>
  );
}
