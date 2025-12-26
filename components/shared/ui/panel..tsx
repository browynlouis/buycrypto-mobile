import styled from 'styled-components/native';

export const Panel = styled.View.attrs<{ rounded?: boolean }>(() => ({ rounded: true }))`
  padding: 12px;
  border-radius: ${(props) => (props.rounded ? '12px' : '0px')};
  background-color: ${(props) => props.theme.colors.Neutral[800]};
`;
