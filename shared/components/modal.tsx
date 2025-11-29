import { Keyboard, Modal, TouchableWithoutFeedback } from 'react-native';
import Toast from 'react-native-toast-message';
import styled from 'styled-components/native';

import { toastConfig } from '../../libs/config';
import { useTheme } from './providers/theme-provider/hooks';
import { Button } from './ui/button';
import { Icon } from './ui/icon';
import { Text } from './ui/text';

export interface AppModalProps
  extends Omit<React.ComponentProps<typeof Modal>, 'onDismiss' | 'onRequestClose'> {
  handleClose?: (visible?: boolean) => void;
  modalTitle?: string;
  fullHeight?: boolean;
}

const Backdrop = styled.View`
  flex: 1;
  background-color: #0f1111cc;
  justify-content: flex-end;
`;

const Wrapper = styled.Pressable<{ fullHeight?: boolean }>`
  background-color: ${({ theme }) => theme.colors.Neutral[900]};
  border-top-left-radius: 32px;
  border-top-right-radius: 32px;
  height: ${(props) => (props.fullHeight ? '100%' : '80%')};
`;

const Header = styled.View`
  flex-direction: row;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  padding: 8px 24px;
`;

const Content = styled.View<{ fullHeight?: boolean }>`
  padding: 8px 24px;
`;

export function AppModal({
  children,
  visible,
  handleClose,
  modalTitle,
  fullHeight,
  ...props
}: AppModalProps) {
  const theme = useTheme();

  return (
    <Modal
      transparent
      animationType="slide"
      statusBarTranslucent
      navigationBarTranslucent
      onDismiss={() => handleClose?.()}
      onRequestClose={() => handleClose?.()}
      visible={visible}
      {...props}
    >
      <TouchableWithoutFeedback onPress={() => handleClose?.()}>
        <Backdrop>
          <Wrapper
            onPress={Keyboard.dismiss}
            accessible={false}
            android_disableSound
            fullHeight={fullHeight}
            style={{
              boxShadow: theme.shadows['outline'],
            }}
            onStartShouldSetResponder={() => true}
            onTouchEnd={(e) => e.stopPropagation()}
          >
            <Header>
              {modalTitle && (
                <Text weight={500} size="text-lg">
                  {modalTitle}
                </Text>
              )}
              <Button variant="text" onPress={() => handleClose?.()} style={{ marginLeft: 'auto' }}>
                <Icon name="close" family="AntDesign" size="sm" color={theme.colors.Neutral[300]} />
              </Button>
            </Header>

            <Content fullHeight={fullHeight}>{children}</Content>
          </Wrapper>
        </Backdrop>
      </TouchableWithoutFeedback>

      <Toast config={toastConfig(theme)} />
    </Modal>
  );
}
