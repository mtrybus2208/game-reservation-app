import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounced } from '@/helpers/index';
import { connect } from 'react-redux';
import * as fromActions from '../../state/actions';
import axios from 'axios';
import { WS_API_URL, API_URL } from '@/constants/api';
import * as S from './styles';

const propTypes = {
  authUser: PropTypes.object,
  globalChatMessages: PropTypes.array,
  globalChatWebsocket: PropTypes.object,
  setDirectChatMode: PropTypes.func,
  addGlobalChatMessage: PropTypes.func,
  setGlobalChatWebsocketConnection: PropTypes.func,
};

const defaultProps = { };

class GlobalChatWrapper extends Component {

  constructor(props) {
    super(props);
    this.messagesWrapper = React.createRef();
  }

  state = {
    typedMessage: '',
    isMessageWrapperScrolledDown: true,
    notifyAboutNewMessage: false,
  };

  links = {
    directChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg',
    emojiIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595074/smiling-emoticon.svg',
    sendMessageIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595060/send-button.svg',
    arrowIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1562304350/down-arrow.svg',
    socketConnectionApiUrl: `${WS_API_URL}/socket/chat/global`,
    getPlayerApiUrl: `${API_URL}/players`,
    sendMessageApiUrl: `${API_URL}/chat/global`,
  }

  debouncedOnClick = debounced(200, this.sendMessage.bind(this));

  componentDidMount() {
    if (this.isWebsocketNotConnected(this.props.globalChatWebsocket))  {
      const websocketConnection = new WebSocket(this.links.socketConnectionApiUrl);
      this.props.setGlobalChatWebsocketConnection(websocketConnection);
    }

    this.scrollToBottom();
  }

  componentDidUpdate() {
    if (this.isWebsocketFirstConnection(this.props.globalChatWebsocket)) {
      this.setWebsocketMessageReceiveHandler(this.props.globalChatWebsocket);
      this.setWebsocketConnectionSustain(this.props.globalChatWebsocket);
    }
  }

  isWebsocketNotConnected(websocket) {
    return websocket === null;
  }

  isWebsocketFirstConnection(websocket) {
    return websocket.onmessage === null;
  }

  sendMessage() {
    if (this.isNotAnonymousUser() && this.validateTypedMessage()) {

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
        );
    }
  }

  setWebsocketMessageReceiveHandler = (websocket) => {
    websocket.onmessage = (event) => {
      const websocketMessage = JSON.parse(event.data);

      if(this.isGlobalChatMessage(websocketMessage)) {
        const globalChatMessage = websocketMessage.responseBody;
        
        this.getMessageAuthorById(globalChatMessage.playerId)
          .then(author => {
            this.updateMessagesList(author, globalChatMessage);
            this.handleScrollToBottomOnMessageReceive(author);
          })
          .catch(() =>
            console.log('Couldn\'t update messages list')
          );
      }
    };
  }

  isGlobalChatMessage = (websocketMessage) => {
    return websocketMessage.responseType === 'GLOBAL_CHAT';
  }

  getMessageAuthorById = (playerId) => {
    return axios.get(`${this.links.getPlayerApiUrl}/${playerId}`);
  }

  updateMessagesList = (author, message) => {
    message.playerName = author.data.displayName;
    message.photoUrl = author.data.photoUrl;

    this.props.addGlobalChatMessage(message);
  }

  handleScrollToBottomOnMessageReceive = (author) => {
    const isMessageCreatedByCurrentLoggedUser = author.data.id === this.props.authUser.uid;

    if (isMessageCreatedByCurrentLoggedUser) {
      this.scrollToBottom();
    } else {
      if (this.isMessageWrapperScrolledDown()) {
        this.scrollToBottom();
      } else {
        this.setState({
          notifyAboutNewMessage: true,
        });
      }
    }
  }

  setWebsocketConnectionSustain = (websocket) => {
    const websocketRefreshInterval = setInterval(() => {
      const openState = 1;

      if (websocket.readyState === openState) {
        websocket.send('');
      } else {
        clearInterval(websocketRefreshInterval);
      }
    }, 60000);
  }

  handleEnterClick = (event) => {
    const enterButtonKeyCode = 13;

    if (event.charCode === enterButtonKeyCode) {
      event.preventDefault();
      this.sendMessageHandler();
    }
  }

  sendMessageHandler = () => {
    this.debouncedOnClick();
  }

  isNotAnonymousUser = () => {
    return this.props.authUser !== null;
  }

  validateTypedMessage = () => {
    return this.state.typedMessage.length >= 2 && this.state.typedMessage.length <= 250;
  }

  openDirectChat = (event) => {
    const playerId = event.currentTarget.id;
    this.props.setDirectChatMode(playerId);
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
  }

  handleWrapperScroll = () => {
    this.setState({
      isMessageWrapperScrolledDown: this.isMessageWrapperScrolledDown(),
    });

    if(this.isMessageWrapperScrolledDown()) {
      this.setState({
        notifyAboutNewMessage: false,
      });
    }
  }

  isMessageWrapperScrolledDown = () => {
    const messagesWrapper = this.messagesWrapper.current;

    return messagesWrapper.scrollTop >= (messagesWrapper.scrollHeight - messagesWrapper.clientHeight - 200);
  }

  render() {
    return (
      <S.GlobalChatWrapper>
        <S.MessagesScrollWrapper>
          <S.MessagesWrapper 
            ref={this.messagesWrapper}
            onScroll={this.handleWrapperScroll}
          >
            {this.props.globalChatMessages.map((value, index) => (
              <S.Message key={index}>
                <S.MessageHeader>
                  <S.PlayerName
                    isNotCurrentUser={this.props.authUser && value.playerId !== this.props.authUser.uid}
                  >
                    <S.PlayerNameText>
                      {value.playerName}
                    </S.PlayerNameText>
                  </S.PlayerName>

                  {
                    this.props.authUser && value.playerId !== this.props.authUser.uid && (
                      <S.PlayerDirectChat
                        id={value.playerId}
                        onClick={this.openDirectChat}
                      >
                        <S.PlayerDirectChatIcon src={this.links.directChatIcon} />
                      </S.PlayerDirectChat>
                    )
                  }
                  
                  <S.PlayerPictureWrapper>
                    <S.PlayerPicture src={value.photoUrl} />
                  </S.PlayerPictureWrapper>
                </S.MessageHeader>
                
                <S.MessageBody>
                  {value.message}
                </S.MessageBody>
              </S.Message>
            ))} 

            <div ref={(el) => { this.messagesEnd = el; }} />
          </S.MessagesWrapper>

          <S.ScrollToBottomArrow 
            onClick={this.scrollToBottom}
            isScrolledDown={this.state.isMessageWrapperScrolledDown}
          > 
            <S.ScrollArrowIcon src={this.links.arrowIcon} />
          </S.ScrollToBottomArrow>

          <S.NewMessageNotificationLabel notifyAboutNewMessage={this.state.notifyAboutNewMessage}>
            You have new message(s)
          </S.NewMessageNotificationLabel>
        </S.MessagesScrollWrapper>

        <S.MessageInputWrapper>
          <S.MessageInput 
            value={this.state.typedMessage}
            onChange={event => {
              this.setState({
                typedMessage: event.target.value,
              });
            }}
            onKeyPress={this.handleEnterClick}
            placeholder={this.isNotAnonymousUser() ? 'Type message (2-250 lettters)' : 'Please login to use chat'}
            minLength={2}
            maxLength={250}
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
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = dispatch => {
  return {
    setDirectChatMode: (playerId) => {
      dispatch(fromActions.setDirectChatMode(playerId));
    },
    addGlobalChatMessage: (message) => {
      dispatch(fromActions.addGlobalChatMessage(message));
    },
  };
};

GlobalChatWrapper.propTypes = propTypes;
GlobalChatWrapper.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(GlobalChatWrapper);
