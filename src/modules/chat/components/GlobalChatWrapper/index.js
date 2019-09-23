import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { debounced } from '@/helpers/index';
import { connect } from 'react-redux';
import * as fromActions from '../../state/actions';
import axios from 'axios';
import { WS_API_URL, API_URL } from '@/constants/api';
import * as S from './styles';

const propTypes = {
  isGlobalChatMode: PropTypes.bool,
  authUser: PropTypes.object,
  globalChatMessages: PropTypes.array,
  isInitialScrollToBottomNotDone: PropTypes.bool,
  setDirectChatMode: PropTypes.func,
  setActivePlayersMode: PropTypes.func,
  addGlobalChatMessage: PropTypes.func,
  setInitialScrollToBottomFlag: PropTypes.func,
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
    globalChatWebsocket: null,
  };

  links = {
    directChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg',
    multipleUsersIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1569238504/multiple-users.svg',
    emojiIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595074/smiling-emoticon.svg',
    sendMessageIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595060/send-button.svg',
    arrowIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1562587604/arrow.svg',
    newMessageNotificationIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1562587599/email.svg',
    socketConnectionApiUrl: `${WS_API_URL}/socket/chat/global`,
    getPlayerApiUrl: `${API_URL}/players`,
    sendMessageApiUrl: `${API_URL}/chat/global`,
  }

  debouncedOnClick = debounced(200, this.sendMessage.bind(this));

  componentDidMount() {
    const isWebsocketNotConnected = this.state.globalChatWebsocket === null;

    if (isWebsocketNotConnected)  {
      const websocketConnection = new WebSocket(this.links.socketConnectionApiUrl);
      this.setGlobalChatWebsocketConnection(websocketConnection);
    }

    this.scrollToBottom();
  }

  componentDidUpdate() {
    const isWebsocketFirstConnection = this.state.globalChatWebsocket.onmessage === null;

    if (isWebsocketFirstConnection) {
      this.setWebsocketMessageReceiveHandler(this.state.globalChatWebsocket);
      this.setWebsocketConnectionSustain(this.state.globalChatWebsocket);
    }
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

  setGlobalChatWebsocketConnection(websocket) {
    this.setState({
      globalChatWebsocket: websocket,
    });
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

  openActivePlayersMode = () => {
    this.props.setActivePlayersMode();
  }

  openDirectChat = (event) => {
    const playerId = event.currentTarget.id;
    
    this.props.setDirectChatMode(playerId);
    this.props.setInitialScrollToBottomFlag(true);
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
    const chatHeight = 200;

    return messagesWrapper.scrollTop >= (messagesWrapper.scrollHeight - messagesWrapper.clientHeight - chatHeight);
  }

  render() {
    return (
      <S.GlobalChatWrapper
        isGlobalChatMode={this.props.isGlobalChatMode}
      >
        <S.ActivePlayersOpen onClick={this.openActivePlayersMode}>
          <S.ActivePlayersIcon src={this.links.multipleUsersIcon} />
          <S.ActivePlayersInfo>Active players</S.ActivePlayersInfo>
        </S.ActivePlayersOpen>

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

          {!this.state.isMessageWrapperScrolledDown &&
            <S.ScrollToBottomArrow 
              onClick={this.scrollToBottom}
            > 
              <S.ScrollIcon src={this.state.notifyAboutNewMessage ? this.links.newMessageNotificationIcon : this.links.arrowIcon} />
              
              {this.state.notifyAboutNewMessage &&
                <S.NewMessageNotifitacion />
              }
            </S.ScrollToBottomArrow>
          }
         
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
    setActivePlayersMode: () => {
      dispatch(fromActions.setActivePlayersMode());
    },
    addGlobalChatMessage: (message) => {
      dispatch(fromActions.addGlobalChatMessage(message));
    },
  };
};

GlobalChatWrapper.propTypes = propTypes;
GlobalChatWrapper.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(GlobalChatWrapper);
