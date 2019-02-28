import styled from 'styled-components';

export const NewGameConfig = styled.div`
    background: #141619;
    transform:  translateY(${props => (props.isOpen ? '-250px' : '0')});
    transition: transform .3s ease-in-out;
    padding: 0;
    margin: 0;
    height: 250px;
    display: flex;
    flex-direction: column;
`;

export const Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ColTop = styled(Col)`
    background: #23272d;
    box-shadow: inset 0px 9px 24px -4px rgba(056,60,69,.6);
    height: 70px;
    display: flex;
    align-items: stretch;
`;

export const ColBottom = styled(Col)`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const StartField = styled.div`
  display: flex;
  align-items: stretch;
  font-size: 20px;
`; 

export const StartItem = styled.div`
  margin: 0;
  padding: 0 20px;
  display: flex; 
  justify-content: center;
  align-items: center;
  border-left: 1px solid black;
  border-right: 1px solid black;
  &:last-child {
    border-left: none;
  }
`;

export const ColItem = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin: 0 10px;
`;

export const ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`; 
export const ButtonsBox = styled.div`
 border-right: 1px solid black;
`; 