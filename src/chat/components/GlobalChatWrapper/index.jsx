import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import * as S from './styles';

const propTypes = {
  directChatIcon: PropTypes.string,
  emojiIcon: PropTypes.string,
  directChatIcon: PropTypes.string,
  socketConnectionApiUrl: PropTypes.string,
  getPlayerApiUrl: PropTypes.string,
  sendMessageApiUrl: PropTypes.string
};

const defaultProps = {
  directChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg',
  emojiIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595074/smiling-emoticon.svg',
  sendMessageIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595060/send-button.svg',
  socketConnectionApiUrl: 'ws://localhost:9000/socket/chat/global',
  getPlayerApiUrl: 'http://localhost:9000/players',
  sendMessageApiUrl: 'http://localhost:9000/chat/global',
}; 

const GlobalChatWrapper = ({ 
    directChatIcon, emojiIcon, sendMessageIcon, socketConnectionApiUrl, getPlayerApiUrl, sendMessageApiUrl 
  }) => {

  const [messages, updateMessages] = useState([]);
  const [typedMessage, updateTypedMessage] = useState('');

  useEffect(() => {
    const websocket = new WebSocket(socketConnectionApiUrl);

    setWebsocketMessageReceiveHandler(websocket);
  });

  const setWebsocketMessageReceiveHandler = (websocket) => {
    websocket.onmessage = (event) => {
      let message = JSON.parse(event.data);

      getMessageAuthorById(message.playerId)
      .then(author => { 
        updateMessagesList(author, message);
      })
    };
  }

  const getMessageAuthorById = (playerId) => {
    return axios.get(`${getPlayerApiUrl}/${playerId}`);
  }

  const updateMessagesList = (author, message) => {
    message.playerName = author.data.displayName;
          
    updateMessages([...messages, message]);
  }

  const sendMessageHandler = () => {
    const playerMessage = JSON.parse(
      `{ 
        "playerId": "2",
        "message": "${typedMessage}" 
      }`
    );

    axios
      .post(sendMessageApiUrl, playerMessage)
      .then(() => 
        updateTypedMessage('')
      );
  }

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
          <S.MessageInput 
            value={typedMessage}
            onChange={event => updateTypedMessage(event.target.value)}
            placeholder="Type message"
            minLength={2}
            maxLength={200}
          />
        </S.MessageInputWrapper>

        <S.MessageButtonsWrapper>
          <S.MessageButton>
            <S.MessageButtonIcon src={emojiIcon} />
          </S.MessageButton>

          <S.MessageButton onClick={sendMessageHandler}>
            <S.MessageButtonIcon src={sendMessageIcon} />
          </S.MessageButton>
        </S.MessageButtonsWrapper>
    </S.GlobalChatWrapper>
  );
};

GlobalChatWrapper.propTypes = propTypes;
GlobalChatWrapper.defaultProps = defaultProps;
export default GlobalChatWrapper;
