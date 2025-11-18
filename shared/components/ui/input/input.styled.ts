import { TextInput } from 'react-native';
import styled from 'styled-components/native';

import { Text } from '../text';

const InputLabel = styled(Text)`
  font-weight: 500;
  font-size: ${(props) => props.theme.fontSizes['text-sm']}px;
`;

const InputGroup = styled.View.attrs(() => ({}))`
  gap: 6px;
  width: '100%';
`;

const InputHelperText = styled(Text)`
  opacity: 0.8;
  font-size: ${(props) => props.theme.fontSizes['text-sm']}px;
`;

const InputWrapper = styled.View<{ borderColor?: string; bg?: string }>`
  flex-direction: row;
  align-items: center;
  border-radius: 12px;
  width: 100%;
  min-height: 42px;
  padding: 0px 4px;
  border-width: 1px;
  background-color: ${(p) => p.bg};
  border-color: ${(p) => p.borderColor};
`;

const InputContainer = styled.View`
  flex: 1;
  min-width: 0;
`;

const StyledInput = styled(TextInput)`
  flex: 1;
  font-family: circular-std-medium;
  padding-top: 8px;
  padding-bottom: 8px;
`;

const Adornment = styled.View`
  margin: 0 6px;
  flex-shrink: 0;
`;

export {
  Adornment,
  InputContainer,
  InputGroup,
  InputHelperText,
  InputLabel,
  InputWrapper,
  StyledInput,
};
