import styled from 'styled-components';

export const ActivePlayersWrapper = styled.div`
  height: 100%;
  display: ${props => (props.isActivePlayersListMode ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  background: #1b1e22;
  overflow-y: scroll;

  scrollbar-color: #1b1e22 #111315;

  &::-webkit-scrollbar {
    width: 10px;
  }
  
  &::-webkit-scrollbar-track {
    background: #111315;
  }
  
  &::-webkit-scrollbar-thumb {
    background: #1b1e22;
  }
`;

export const GlobalChatReturn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 40px;
  min-height: 40px;
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

export const PlayerSearch = styled.div`
  display: flex;
  justify-content: space-between;
  height: 35px;
  min-height: 35px;
  width: 100%;
  background: #262d38;
`;

export const PlayerSearchInput = styled.input`
  height: 100%;
  width: calc(100% - 30px);
  padding: 0 10px;
  background: #262d38;
  border: none;
  color: #fff;
`;

export const PlayerSearchButton = styled.button`
  height: 100%;
  width: 35px;
  padding: 0;
  margin: 0;
  background: #373e49;
  border: none;

  &:hover {
    background: #262d38;
    cursor: pointer;
  }
`;

export const PlayerSearchIcon = styled.img`
  width: 20px;
  height: 20px;
`;

export const Player = styled.button`
  position: relative;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  min-height: 60px;
  padding: 0;
  background: #181c1f;
  border: 0;

  &:hover {
    cursor: pointer;
    background: #141619;
  }
`;

export const PlayerPictureWrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  margin: 0 20px;
  border-radius: 50%;
  background: #23272d;
`;

export const PlayerPicture = styled.img`
  width: 32px;
  height: 32px;
  border-radius: 50%;
`;

export const PlayerName = styled.div`
  width: calc(100% - 80px);
  margin: 10px 0;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: .3px;
  color: #ce8d08;
`;