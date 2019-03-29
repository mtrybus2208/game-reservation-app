import styled from 'styled-components';

export const DirectChatWrapper = styled.div`
  height: 100%;
  display: flex;
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
  color: #747a81;
`;

export const DirectChatPlayerInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  background: #171a1d;
`;

export const PlayerPictureWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 33px;
  height: 33px;
  margin-left: 47px;
  border-radius: 50%;
  background: #484f5a;
  box-shadow: -1px 1px 30px -3px rgba(0, 0, 0, .61);
`;

export const PlayerPicture = styled.div`
  width: 25px;
  height: 25px;
  border-radius: 50%;
  background: #fff;
`;

export const PlayerNameInfo = styled.span`
  margin-left: 14px;
  font-size: 12px;
  font-weight: normal;
  line-height: 1;
  letter-spacing: .3px;
  text-align: left;
  text-transform: uppercase;
  color: #5e4213;
`;

export const MessagesWrapper = styled.div`
  width: 100%;
  height: calc(100% - 190px);  
  background: #16181b;
  overflow: auto;
`;

export const MessageInputWrapper = styled.div`
  width: 100%;
  height: 110px;
`;

export const MessageInput = styled.div`
  height: 100%;
  width: calc(100% - 50px);
  background: #111315;
`;

export const MessageButtonsWrapper = styled.div`
  display: flex;
  height: 100%;
  width: 50px;
`;

export const MessageButton = styled.div`

`;
