import styled from 'styled-components';

export const Modal = styled.div`
  background: #111315;
  min-height: 207px;
  display: flex;
  max-width: 400px;
  min-width: 350px;
  width: 100%;
  color: #111315;
  flex-direction: column;
  box-shadow: 0px 17px 24px 0 rgba(0, 0, 0, .33), inset 0px 0px 1px 0 rgba(255, 255, 255, .1);
  background-image: linear-gradient(to top,rgba(24, 25, 27, 0.1),rgba(32, 36, 41, .1));
`;

export const Header = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  text-align: center;
  box-shadow: 0px 17px 24px 0 rgba(0, 0, 0, .33), inset 0px 0px 1px 0 rgba(255, 255, 255, .1);
  flex: 0; 
  padding: 25px;
`;

export const Title = styled.div`
  color: #716b6b;
  text-transform: uppercase;
  font-size: 14px;
`;

export const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 15px;
  flex: 1 1 100%;
`;
 