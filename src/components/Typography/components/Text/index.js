import styled, { css } from 'styled-components';
 
const baseParStyles= css`
  text-align: ${props => props.textAlign || 'center'};
  color: ${props => props.theme.baseFontColor};
  font-weight: ${props => props.lead ? '500' : '400'};
`;

export const Par = styled.p`
  font-size: 1rem;
  ${baseParStyles};
`