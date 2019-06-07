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
  cursor: pointer;
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

export const DirectChatPlayerInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  width: 100%;
  height: 40px;
  background: #181c1f;
`;

export const PlayerPictureWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 31px;
  height: 31px;
  margin-left: 47px;
  border-radius: 50%;
  background: #484f5a;
  box-shadow: -1px 1px 30px -3px rgba(0, 0, 0, .61);
`;

export const PlayerPicture = styled.img`
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
  color: #a5710f;
`;

export const MessagesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 35px;
  width: 100%;
  height: calc(100% - 190px);
  background: #16181b;
  overflow: auto;
  
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

export const IncomingMessageWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: 25px;
  width: 80%;
  height: auto;

  &:first-child {
    margin-top: 50px;
  }

  @media ${({ theme }) => theme.media.laptop} {
    width: 90%;
  }
`;

export const OutgoingMessageWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 25px;
  width: 80%;
  height: auto;

  &:first-child {
    margin-top: 50px;
  }

  @media ${({ theme }) => theme.media.laptop} {
    width: 90%;
  }
`;

export const Message = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 90%;
  max-width: 250px;
  height: auto;
  background: #111315;

  @media ${({ theme }) => theme.media.laptop} {
    width: 100%;
  }
`;

export const MessageHeader = styled.div`
  width: 85%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #252525;
  font-family: Roboto;
  font-size: 9px;
  font-weight: 500;
  line-height: 23px;
  letter-spacing: .2px;
  text-align: left;
  color: #a5710f;
`;

export const MessageTime = styled.div`

`;

export const MessageAuthorName = styled.div`
  
`;

export const MessageText = styled.div`
  width: 85%;
  margin: 8px auto 15px;
  overflow-wrap: word-break;
  font-family: Roboto;
  font-size: 11px;
  font-weight: 300;
  line-height: 1.16;
  letter-spacing: .2px;
  text-align: left;
  color: #858b92;
`;

export const MessageAuthorPictureWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 50px;
  margin-top: 16px;
  border-radius: 50%;
  background: #484f5a;
  box-shadow: -1px 1px 30px -3px rgba(0, 0, 0, .61);
`;

export const MessageAuthorPicture = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #fff;
`;

export const MessageInputSectionWrapper = styled.div`
  display: flex;
  width: 100%;
  height: 110px;
`;

export const MessageInputWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: calc(100% - 50px);
  background: #111315;
`;

export const MessageInput = styled.textarea`
  height: 70px;
  width: calc(100% - 30px);
  background: #111315;
  border: none;
  font-family: Roboto;
  font-size: 11px;
  font-weight: 300;
  line-height: 1.16;
  letter-spacing: .2px;
  text-align: left;
  color: #858b92;
  resize: none;
`;

export const MessageButtonsWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 50px;
`;

export const MessageButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 55px;
  background: #181c1f;
  border: none;

  &:first-child {
    border-bottom: 1px solid #111315;
  }

  &:hover {
    background: #16181b;
    cursor: pointer;
  }
`;

export const MessageButtonImage = styled.img`
  height: 23px;
  width: 23px;
`;
