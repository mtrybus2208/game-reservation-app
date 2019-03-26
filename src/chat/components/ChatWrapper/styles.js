import styled from 'styled-components';

export const ChatWrapper = styled.div`
  height: 100%;
  padding: 50px 0 35px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #1b1e22;
`;

export const MessageWrapper = styled.div`
  margin-top: 48px;

  &:first-child {
    margin-top: 0;
  }
`;

export const Message = styled.div`
  padding: 10px 15px 15px;
  width: 75%;
  max-width: 260px;
  background: #070707;
`;

export const MessageTime = styled.div`
  width: 100%;
  padding-bottom: 7px;
  border-bottom: 1px solid #252525;
  font-family: Roboto;
  font-size: 11px;
  font-weight: 300;
  line-height: 1.33;
  letter-spacing: .2px;
  text-align: left;
  color: #a5710f;
`;

export const MessageText = styled.div`
  width: 100%;
  margin-top: 8px;
  font-family: Roboto;
  font-size: 12px;
  font-weight: 300;
  font-style: normal;
  font-stretch: normal;
  line-height: 1.16;
  letter-spacing: .2px;
  text-align: left;
  color: #747a81;
`;

export const MessageAuthor = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 12px;
  width: 50px;
  height: 50px;
  opacity: .3;
  border-radius: 50%;
  box-shadow: 0 6px 15px 0 rgba(0, 0, 0, .54), inset 0 2px 4px 0 rgba(255, 255, 255, .1);
  background-color: #484f5a;
`;

export const MessageAuthorPicture = styled.div`
  width: 39px;
  height: 39px;
  border-radius: 50%;
  background-color: #fff;
`;