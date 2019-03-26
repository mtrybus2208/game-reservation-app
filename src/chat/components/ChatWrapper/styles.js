import styled from 'styled-components';

export const ChatWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1b1e22;
`;

export const MessagesWrapper = styled.div`
  width: 100%;
  height: calc(100% - 200px);
  overflow-y: auto;

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

export const Message = styled.div`
  width: 100%;
  background: #111;
`;

export const MessageHeader = styled.div`
  height: 46px;
  display: flex;
  flex-direction: row;
  position: relative;
`;

export const MessageBody = styled.div`  
  padding: 40px 19px 13px;
  background: #111315;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: .3px;
  text-align: left;
  color: #747a81;
`;

export const PlayerName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 46px;
  width: calc(100% - 58px);
  background: #181c1f;
  border-right: 1.5px solid #111;
  text-align: left;
`;

export const PlayerNameText = styled.span`
  margin-left: 44%;
  box-shadow: inset 0 5px 20px -7px rgba(056, 60, 69, .6);
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  line-height: 1.4;
  letter-spacing: .3px;
  color: #ce8d08;

  @media ${({ theme }) => theme.media.tablet} {
    margin-left: 50%;
  }

  @media ${({ theme }) => theme.media.laptop} {
    margin-left: 44%;
  }
`;

export const PlayerDirectChat = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 46px;
  width: 58px;
  border: none;
  box-shadow: inset 0 5px 20px -7px rgba(056, 60, 69, .6);
  background: #181c1f;
`;

export const PlayerDirectChatIcon = styled.img`
  width: 17px;
`;

export const PlayerPictureWrapper = styled.div`
  position: absolute;
  top: 10px;
  left: 26px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: #484f5a;
  box-shadow: -1px 1px 30px -3px rgba(0, 0, 0, .61);
`;

export const PlayerPicture = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #fff;
`;

export const MessageInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 140px;
  margin-top: 40px;
  background: #111315;
`;

export const MessageInput = styled.textarea`
  width: 85%;
  height: 75px;
  background: #111315;
  border: none;
  font-family: Roboto;
  font-size: 11px;
  font-weight: 300;
  line-height: 1;
  letter-spacing: .3px;
  text-align: left;
  color: #747a81;
  resize: none;
`;

export const MessageButtonsWrapper = styled.div`
  width: 100%;
  height: 60px;
  background: #181c1f;
`;

export const MessageButton = styled.button`
  width: 49%;
  height: 60px;
  background: #181c1f;;
  border: none;

  &:first-child {
    border-right: 1.5px solid #111;
    margin-right: 1%;
  }
`;

export const MessageButtonIcon = styled.img`
  width: 25px;
`;
