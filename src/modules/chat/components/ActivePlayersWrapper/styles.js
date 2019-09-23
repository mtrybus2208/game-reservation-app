import styled from 'styled-components';

export const ActivePlayersWrapper = styled.div`
  height: 100%;
  display: ${props => (props.isActivePlayersListMode ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  background: #1b1e22;
`;

export const GlobalChatReturn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  border: none;
  background: #111315;
  cursor: pointer;

  &:hover {
    background: #141619;
  }
`;

export const GlobalChatIcon = styled.img`
  width: 16px;
`;

export const GlobalChatInfo = styled.span`
  margin-left: 12px;
  font-size: 10px;
  font-weight: 300;
  line-height: 1;
  letter-spacing: .3px;
  text-align: left;
  text-transform: uppercase;
  color: #858b92;
`;