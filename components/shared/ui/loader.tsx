import { Dimensions, Modal } from 'react-native';
import styled from 'styled-components/native';

import { Spinner } from './spinner';

interface LoaderProps {
  isLoading: boolean;
}

export function Loader({ isLoading = false, ...props }: LoaderProps) {
  return (
    <Modal visible={isLoading} transparent {...props}>
      <Overlay>
        <Container>
          <Spinner />
        </Container>
      </Overlay>
    </Modal>
  );
}

const { width, height } = Dimensions.get('window');

const Overlay = styled.View`
  display: flex;
  background-color: rgba(0, 0, 0, 0.2);
  width: 100%;
  flex: 1;
  height: 100%;
  align-items: center;
  justify-content: center;
  position: fixed;
  top: 0;
  bottom: 0;
  z-index: 100;
`;

const Container = styled.View`
  display: flex;
  width: 50px;
  height: 50px;
  border-radius: 12px;
  background-color: ${(props) => props.theme.colors.Neutral[100]};
  align-items: center;
  justify-content: center;
`;
