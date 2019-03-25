import styled from 'styled-components';

export const ChatWrapper = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1b1e22;
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
  margin: 40px 19px 13px;
  background-color: #111;
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
  background-color: #181c1f;
  border-right: 1.5px solid #111;
  text-align: left;
`;

export const PlayerNameText = styled.span`
  margin-left: 44%;
  box-shadow: inset 0 5px 20px -7px rgba(056, 60, 69, .6);
  font-family: Roboto;
  font-size: 12px;
  font-weight: 500;
  line-height: .88;
  letter-spacing: .3px;
  color: #ce8d08;
`;

export const PlayerDirectChat = styled.div`
  height: 46px;
  width: 58px;
  box-shadow: inset 0 5px 20px -7px rgba(056, 60, 69, .6);
  background-color: #181c1f;
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
  box-shadow: 0 6px 15px 0 rgba(0, 0, 0, .54), inset 0 2px 4px 0 rgba(255, 255, 255, .1);
  background-color: #484f5a;
`;

export const PlayerPicture = styled.div`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background-color: #fff;
`;
