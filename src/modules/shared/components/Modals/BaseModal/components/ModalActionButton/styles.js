import styled from 'styled-components';
import { rgba } from 'polished';

export const ModalActionButton = styled.button`
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  border: none;
  padding: 15px;
  flex-grow: 1;
  height: 100%;
  outline-color: ${props => rgba(props.theme.accent, .2)};
`;
