import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import * as S from './styles';

const propTypes = { 
  authUser: PropTypes.object,
};

const defaultProps = { };

class GlobalChatWrapper extends Component {

  state = {
    messages: [],
    typedMessage: '',
  };

  links = {
    directChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg',
    emojiIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595074/smiling-emoticon.svg',
    sendMessageIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595060/send-button.svg',
    socketConnectionApiUrl: 'ws://localhost:9000/socket/chat/global',
    getPlayerApiUrl: 'http://localhost:9000/players',
    sendMessageApiUrl: 'http://localhost:9000/chat/global',
  }

  componentDidMount() {
    const websocket = new WebSocket(this.links.socketConnectionApiUrl);
    this.setWebsocketMessageReceiveHandler(websocket);
  }

  setWebsocketMessageReceiveHandler = (websocket) => {
    websocket.onmessage = (event) => {
      let message = JSON.parse(event.data);

      this.getMessageAuthorById(message.playerId)
        .then(author => {
          this.updateMessagesList(author, message);
        })
        .catch(() =>
          console.log('Couldn\'t update messages list')
        )
    };
  }

  getMessageAuthorById = (playerId) => {
    return axios.get(`${this.links.getPlayerApiUrl}/${playerId}`);
  }

  updateMessagesList = (author, message) => {
    message.playerName = author.data.displayName;

    this.setState(oldState => ({
      messages: [...oldState.messages, message],
    }))
  }

  sendMessageHandler = () => {
    if(this.isNotAnonymousUser() && this.validateTypedMessage()) {

      const playerMessage = JSON.parse(
        `{ 
          "playerId": "${this.props.authUser.uid}",
          "message": "${this.state.typedMessage.trim()}" 
        }`
      );
  
      axios
        .post(this.links.sendMessageApiUrl, playerMessage)
        .then(() => 
          this.setState({
            typedMessage: '',
          })
        )
    }
  }

  isNotAnonymousUser = () => {
    return this.props.authUser !== null;
  }

  validateTypedMessage = () => {
    return this.state.typedMessage.length >= 3 && this.state.typedMessage.length <= 100;
  }

  render() {
    return (
      <S.GlobalChatWrapper>
          <S.MessagesWrapper>
            {this.state.messages.map((value, index) => (
              <S.Message key={index}>
                <S.MessageHeader>
                  <S.PlayerName>
                    <S.PlayerNameText>    
                      {value.playerName}
                    </S.PlayerNameText>
                  </S.PlayerName>
  
                  <S.PlayerDirectChat>
                    <S.PlayerDirectChatIcon id={value.playerId} src={this.links.directChatIcon} />
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
              value={this.state.typedMessage}
              onChange={event => {
                this.setState({
                  typedMessage: event.target.value,
                })
              }}
              placeholder={this.isNotAnonymousUser() ? "Type message" : "Please login to use chat"}
              minLength={2}
              maxLength={200}
              disabled={!this.isNotAnonymousUser()}
            />
          </S.MessageInputWrapper>
  
          <S.MessageButtonsWrapper>
            <S.MessageButton>
              <S.MessageButtonIcon src={this.links.emojiIcon} />
            </S.MessageButton>
  
            <S.MessageButton 
              isButtonActive={this.validateTypedMessage()} 
              onClick={this.sendMessageHandler} 
              disabled={!this.validateTypedMessage()}
            >
              <S.MessageButtonIcon src={this.links.sendMessageIcon} />
            </S.MessageButton>
          </S.MessageButtonsWrapper>
      </S.GlobalChatWrapper>
    );
  }
};

GlobalChatWrapper.propTypes = propTypes;
GlobalChatWrapper.defaultProps = defaultProps;
export default GlobalChatWrapper;
