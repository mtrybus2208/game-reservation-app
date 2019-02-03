import styled, { css } from 'styled-components';

const fontWeight = css`
  font-weight: 500;
`;

const baseHeadingStyle = css`
  text-align: ${props => props.textAlign || 'center'};
  color: ${props => props.theme.baseFontColor};
  ${fontWeight};
`;

export const H1 = styled.h1`
  font-size: 1.47em;
  ${baseHeadingStyle};
`
 
export const H2 = styled.h2`
  font-size: 1.17em;
  ${baseHeadingStyle};
`

export const H3 = styled.h3`
  font-size: 1.2em;
  ${baseHeadingStyle};
`