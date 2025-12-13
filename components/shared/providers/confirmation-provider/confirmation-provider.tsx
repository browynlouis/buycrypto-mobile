import { ReactNode, useState } from 'react';
import { Modal, TouchableWithoutFeedback } from 'react-native';
import styled from 'styled-components/native';

import { Button } from '../../ui/button';
import { Col, Row } from '../../ui/flex';
import { Icon } from '../../ui/icon';
import { Backdrop } from '../../ui/modal';
import { Text } from '../../ui/text';
import { ConfirmationContext, ConfirmationFormProps } from './types';

export function ConfirmationProvider({ children }: { children: ReactNode }) {
  const [isConfirming, setIsConfirming] = useState<boolean>(false);
  const [currentFlow, setCurrentFlow] = useState<ConfirmationFormProps | undefined>();

  const startConfirmation = (flow: ConfirmationFormProps) => {
    setCurrentFlow(flow);
  };

  const endConfirmation = () => {
    setIsConfirming(false);

    setCurrentFlow(undefined);
  };

  return (
    <ConfirmationContext.Provider
      value={{
        startConfirmation,
        endConfirmation,
        isConfirming,
        setIsConfirming,
      }}
    >
      {children}

      <Modal
        visible={!!currentFlow}
        onRequestClose={endConfirmation}
        onDismiss={endConfirmation}
        animationType="fade"
        transparent
        statusBarTranslucent
        navigationBarTranslucent
        focusable
      >
        <TouchableWithoutFeedback>
          <Backdrop style={{ padding: 20 }}>
            <Content>
              <Col gap={24}>
                <Col gap={12}>
                  <Text size="display-md" weight={700}>
                    {currentFlow?.title ?? 'Are you sure?'}
                  </Text>
                  <Text style={{ lineHeight: 22 }}>
                    {currentFlow?.subText ??
                      'This action cannot be undone! Are you sure you want to proceed to perform action'}
                  </Text>
                </Col>

                <Row gap={12}>
                  <Button
                    size="md"
                    variant="plain"
                    startAdornment={<Icon name="ArrowLeft2" />}
                    style={{ paddingRight: 24 }}
                    onPress={() => {
                      endConfirmation();
                    }}
                  >
                    Cancel
                  </Button>
                  <Button
                    size="md"
                    style={{ flex: 1 }}
                    endAdornment={<Icon name="ArrowRight2" />}
                    onPress={() => {
                      setIsConfirming(true);
                      currentFlow?.onProceed && currentFlow.onProceed();
                    }}
                  >
                    Proceed
                  </Button>
                </Row>
              </Col>
            </Content>
          </Backdrop>
        </TouchableWithoutFeedback>
      </Modal>
    </ConfirmationContext.Provider>
  );
}

const Content = styled.View`
  border-radius: 24px;
  width: 100%;
  height: auto;
  padding: 24px;
  background-color: ${(props) => props.theme.colors.Neutral[800]};
`;
