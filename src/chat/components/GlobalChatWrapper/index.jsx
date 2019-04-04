import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as S from './styles';

const propTypes = {
  directChatIcon: PropTypes.string,
  emojiIcon: PropTypes.string,
  directChatIcon: PropTypes.string,
  messages: PropTypes.array,
};

const defaultProps = {
  directChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg',
  emojiIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595074/smiling-emoticon.svg',
  sendMessageIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595060/send-button.svg',
  messages: [],
}; 

const GlobalChatWrapper = ({ directChatIcon, emojiIcon, sendMessageIcon, messages }) => {

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:9000/socket/chat/global');

    websocket.onmessage = (event) => {
      let message = JSON.parse(event.data);

      axios.get(`http://localhost:9000/players/${message.playerId}`, {
            headers: {
              'Content-Type': 'application/json'
            }
        })
        .then(response => { 
          message.playerName = response.data.displayName;
          messages.push(message);
        })
    };
  });

  return (
    <S.GlobalChatWrapper>
        <S.MessagesWrapper>
          {messages.map((value, index) => (
            <S.Message key={index}>
              <S.MessageHeader>
                <S.PlayerName>
                  <S.PlayerNameText>    
                    {value.playerName}
                  </S.PlayerNameText>
                </S.PlayerName>

                <S.PlayerDirectChat>
                  <S.PlayerDirectChatIcon id={value.playerId} src={directChatIcon} />
                </S.PlayerDirectChat>
                
                <S.PlayerPictureWrapper>
                  <S.PlayerPicture>
                  
                  </S.PlayerPicture>
                </S.PlayerPictureWrapper>
              </S.MessageHeader>
              
              <S.MessageBody>
                {value.message}
              </S.MessageBody>
            </S.Message>
          ))}
        </S.MessagesWrapper>

        <S.MessageInputWrapper>
          <S.MessageInput placeholder="Type message" maxLength={200}/>
        </S.MessageInputWrapper>

        <S.MessageButtonsWrapper>
          <S.MessageButton>
            <S.MessageButtonIcon src={emojiIcon} />
          </S.MessageButton>

          <S.MessageButton>
            <S.MessageButtonIcon src={sendMessageIcon} />
          </S.MessageButton>
        </S.MessageButtonsWrapper>
    </S.GlobalChatWrapper>
  );
};

GlobalChatWrapper.propTypes = propTypes;
GlobalChatWrapper.defaultProps = defaultProps;
export default GlobalChatWrapper;
