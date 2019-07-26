import styled from 'styled-components';

export const NotAllowed = styled.div`
  border-radius: 100%;
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  width: 100%;
`;

export const Content = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

export const Info = styled.p`
  margin: 0;
  padding: 0;
  margin-top: 10px;
  font-size: ${({ size }) => size };
  color: ${({ fontColor }) => fontColor || 'inherit' }
`; 