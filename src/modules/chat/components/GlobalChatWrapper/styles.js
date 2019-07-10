import styled from 'styled-components';

export const GlobalChatWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1b1e22;
`;

export const MessagesWrapper = styled.div`
  width: 100%;
  height: 100%;
  overflow-y: auto;
  position: relative;

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

export const MessagesScrollWrapper = styled.div`
  height: calc(100% - 200px);
  width: 100%;
  position: relative;
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
  overflow-wrap: break-word;
  background: #111315;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 300;
  line-height: 1.05;
  letter-spacing: .3px;
  text-align: left;
  color: #858b92;
`;

export const PlayerName = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  height: 46px;
  width: ${props => (props.isNotCurrentUser ? 'calc(100% - 58px)' : '100%')};
  background: #181c1f;
  padding-right: ${props => (props.isNotCurrentUser ? '0' : '58px')};
  border-right: ${props => (props.isNotCurrentUser && '1.5px solid #111')};
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

  &:hover {
    background: #111315;
    cursor: pointer;
  }
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
  background: #23272d;
  box-shadow: 0 17px 24px 0 rgba(0, 0, 0, .33), inset 0 2px 3px 0 rgba(255, 255, 255, .1);
`;

export const PlayerPicture = styled.img`
  width: 48px;
  height: 48px;
  border-radius: 50%;
`;

export const ScrollToBottomArrow = styled.button`
  display: ${props => (props.isScrolledDown ? 'none' : 'block')};
  position: absolute;
  width: 40px;
  height: 40px;
  padding: 0;
  bottom: 15px;
  right: 15px;
  border: 1px solid #ce8d08;
  background: #111315;
  border-radius: 25px;
  cursor: pointer;
`;

export const ScrollIcon = styled.img`
  width: 25px;
  height: 25px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
`;

export const NewMessageNotifitacion = styled.div`
  width: 8px;
  height: 8px;
  border: none;
  border-radius: 5px;
  position: absolute;
  right: 0;
  top: 0;
  background-color: #F00;
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
  color: #858b92;
  resize: none;
`;

export const MessageButtonsWrapper = styled.div`
  width: 100%;
  height: 60px;
  background: #181c1f;
`;

export const MessageButton = styled.button`
  width: 50%;
  height: 60px;
  background: #181c1f;
  border: none;

  &:hover {
    background: ${props => (props.isButtonActive ? '#111315' : '#181c1f')};
    cursor:  ${props => (props.isButtonActive ? 'pointer' : 'default')};
  }

  &:first-child {
    border-right: 1.5px solid #111;
  }
`;

export const MessageButtonIcon = styled.img`
  width: 25px;
`;