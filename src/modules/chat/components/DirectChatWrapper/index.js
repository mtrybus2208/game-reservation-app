import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as S from './styles';
import * as fromActions from '../../state/actions';
import { debounced } from '@/helpers/index';
import { WS_API_URL, API_URL } from '@/constants/api';
import axios from 'axios';
import moment from 'moment';

const propTypes = {
  isDirectChatMode: PropTypes.bool,
  setGlobalChatMode: PropTypes.func,
  fetchDirectChatMessages: PropTypes.func.isRequired,
  addDirectChatMessage: PropTypes.func.isRequired,
  authUser: PropTypes.object,
  receiverId: PropTypes.string.isRequired,
  directChatMessages: PropTypes.object,
  isInitialScrollToBottomNotDone: PropTypes.bool,
  setInitialScrollToBottomFlag: PropTypes.func,
};

const defaultProps = { };

class DirectChatWrapper extends Component {

  constructor(props) {
    super(props);
    this.messagesWrapper = React.createRef();
  }

  state = {
    typedMessage: '',
    receiver: {
      id: '',
      displayName: '',
      email: '',
      photoUrl: '',
    },
    directChatWebsocket: null,
    openedDirectChatRooms: [],
    isFirstMessagesScrollNotDone: true,
    isMessageWrapperScrolledDown: true,
    notifyAboutNewMessage: false,
  };

  links = {
    globalChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
    arrowIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1562587604/arrow.svg',
    newMessageNotificationIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1562587599/email.svg',
    getPlayerApiUrl: `${API_URL}/players`,
    socketConnectionApiUrl: `${WS_API_URL}/socket/chat/direct`,
    sendMessageApiUrl: `${API_URL}/chat/direct/messages`,
    getMessagesForChatRoom: `${API_URL}/chat/direct/messages/chat-room/`,
  }

  debouncedOnClick = debounced(200, this.sendMessage.bind(this)); 

  componentDidUpdate() {
    const isAnonymousUser = this.props.authUser === null;
    const isNotDefaultReceiver = this.props.receiverId !== 'GLOBAL';
    const isReceiverChange = this.state.receiver.id !== this.props.receiverId;
    const isWebsocketNotConnected = this.state.directChatWebsocket === null;
    const isWebsocketFirstConnection = this.state.directChatWebsocket && this.state.directChatWebsocket.onmessage === null;
    const areMessagesLoaded = this.messagesWrapper.current.childNodes.length > 1;

    if(isAnonymousUser) {
      return;
    }

    if (isNotDefaultReceiver && isReceiverChange) {
      this.setupReceiverData(this.props.receiverId);
    }

    if (this.isDirectChatRoomNotSaved(this.getDirectChatRoomId())) { 
      this.saveOpenedDirectChatRoomId(this.getDirectChatRoomId()); 
      this.fetchDirectChatMessages(this.getDirectChatRoomId());
    }

    if (isWebsocketNotConnected) {
      this.handleFirstWebsocketConnection();
    }

    if (isWebsocketFirstConnection) {
      this.setWebsocketMessageReceiveHandler(this.state.directChatWebsocket);
      this.setWebsocketConnectionSustain(this.state.directChatWebsocket);
    }

    if(this.props.isInitialScrollToBottomNotDone && areMessagesLoaded) {
      this.scrollToBottom();

      this.props.setInitialScrollToBottomFlag(false);
    }
  }

  handleFirstWebsocketConnection() {
    const directChatWebsocketConnectionUrl = `${this.links.socketConnectionApiUrl}?receiverId=${this.props.authUser.uid}`;
    const websocketConnection = new WebSocket(directChatWebsocketConnectionUrl);

    this.setDirectChatWebsocketConnection(websocketConnection);
  }

  setDirectChatWebsocketConnection(websocket) {
    this.setState({
      directChatWebsocket: websocket,
    });
  }
  
  isFirstChatRoomConnection = () => {
    return this.props.directChatMessages === null 
        || this.props.directChatMessages[this.getDirectChatRoomId()] === undefined;
  }

  fetchDirectChatMessages = (directChatRoomId) => {
    this.props.fetchDirectChatMessages(directChatRoomId);
  }

  setupReceiverData = (receiverId) => {
    this.getReceiver(receiverId)
      .then((playerResponse) => {
        this.setState({
          receiver: playerResponse.data,
        });
      })
      .catch((error) => {
        console.log(error);
      })
  }

  saveOpenedDirectChatRoomId(chatRoomId) {
    this.setState(prevState => ({
        openedDirectChatRooms: [...prevState.openedDirectChatRooms, chatRoomId]
    }));
  }

  isDirectChatRoomNotSaved(chatRoomId) {
    return !this.state.openedDirectChatRooms.includes(chatRoomId);
  }

  getReceiver = (receiverId) => {
    return axios.get(`${this.links.getPlayerApiUrl}/${receiverId}`)
  }

  setWebsocketMessageReceiveHandler = (websocket) => {
    websocket.onmessage = (event) => {
      const websocketMessage = JSON.parse(event.data);
      const isDirectChatMessage = websocketMessage.responseType === 'DIRECT_CHAT';

      if (isDirectChatMessage) {
        const directChatMessage = websocketMessage.responseBody;
        const messageAuthorId = directChatMessage.senderId;

        this.props.addDirectChatMessage(directChatMessage);
        this.handleScrollToBottomOnMessageReceive(messageAuthorId);
      }
    };
  }

  handleScrollToBottomOnMessageReceive = (messageAuthorId) => {
    const isMessageCreatedByCurrentLoggedUser = messageAuthorId === this.props.authUser.uid;

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

  openGlobalChat = () => {
    this.props.setGlobalChatMode();
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

  sendMessage() {
    const isNotAnonymousUser = this.props.authUser !== null;

    if (isNotAnonymousUser && this.validateTypedMessage()) {

      const playerMessage = JSON.parse(
        `{
          "senderId": "${this.props.authUser.uid}",
          "receiverId": "${this.state.receiver.id}",
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

  validateTypedMessage = () => {
    return this.state.typedMessage.length >= 2 && this.state.typedMessage.length <= 250;
  }

  isMessagesListFetched = () => {
    return this.props.directChatMessages && this.props.directChatMessages[this.getDirectChatRoomId()] !== undefined;
  }

  getDirectChatRoomId() {
    const authUserId = this.props.authUser.uid;
    const receiverId = this.props.receiverId;

    return authUserId > receiverId
      ? `${authUserId}_${receiverId}`
      : `${receiverId}_${authUserId}`;
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
    <S.DirectChatWrapper 
      isDirectChatMode={this.props.isDirectChatMode}
    > 
      <S.GlobalChatReturn onClick={this.openGlobalChat}>
        <S.GlobalChatIcon src={this.links.globalChatIcon} />
        <S.GlobalChatInfo>Global chat</S.GlobalChatInfo>
      </S.GlobalChatReturn>

      <S.DirectChatPlayerInfo>
        <S.PlayerPictureWrapper>
          <S.PlayerPicture src={this.state.receiver.photoUrl} />
        </S.PlayerPictureWrapper>
        <S.PlayerNameInfo>{this.state.receiver.displayName}</S.PlayerNameInfo>
      </S.DirectChatPlayerInfo>

      <S.MessagesScrollWrapper>
        <div 
          style={{height: '100%'}}
        >
          <S.MessagesWrapper
            ref={this.messagesWrapper}
            onScroll={this.handleWrapperScroll}
          >
            {this.isMessagesListFetched() && this.props.directChatMessages[this.getDirectChatRoomId()].map((value, index) => (
              <React.Fragment key={index}>
                {value.receiverId == this.props.authUser.uid ? (
                  <S.IncomingMessageWrapper key={index}>
                    <S.Message>
                      <S.MessageHeader>
                        <S.MessageAuthorName>
                          {this.state.receiver.displayName}
                        </S.MessageAuthorName>
                        <S.MessageTime>
                          {moment(value.messageSendDate).format('HH:mm')}
                        </S.MessageTime>
                      </S.MessageHeader>

                      <S.MessageText>
                        {value.message}
                      </S.MessageText>
                    </S.Message>
                  </S.IncomingMessageWrapper>
                ) : (
                  <S.OutgoingMessageWrapper> 
                    <S.Message>
                      <S.MessageHeader>
                        <S.MessageAuthorName>
                          {this.props.authUser.displayName}
                        </S.MessageAuthorName>
                        <S.MessageTime>
                          {moment(value.messageSendDate).format('HH:mm')}
                        </S.MessageTime>
                      </S.MessageHeader>

                      <S.MessageText>
                        {value.message}
                      </S.MessageText>
                    </S.Message>
                  </S.OutgoingMessageWrapper>
                )}
              </React.Fragment>
            ))}
            
            <div ref={(el) => { this.messagesEnd = el; }} />
          </S.MessagesWrapper>
        </div>
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

      <S.MessageInputSectionWrapper>
        <S.MessageInputWrapper>
          <S.MessageInput 
            value={this.state.typedMessage}
            onChange={event => {
              this.setState({
                typedMessage: event.target.value,
              })
            }}
            onKeyPress={this.handleEnterClick}
            placeholder={'Type message (2-250 letters)'}
            minLength={2}
            maxLength={250}
          />
        </S.MessageInputWrapper>

        <S.MessageButtonsWrapper>
          <S.MessageButton>
            <S.MessageButtonImage src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595074/smiling-emoticon.svg" />
          </S.MessageButton>

          <S.MessageButton
            isButtonActive={this.validateTypedMessage()} 
            onClick={this.sendMessageHandler} 
            disabled={!this.validateTypedMessage()}
          >
            <S.MessageButtonImage src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595060/send-button.svg" />  
          </S.MessageButton>
        </S.MessageButtonsWrapper>
      </S.MessageInputSectionWrapper>
    </S.DirectChatWrapper>
    );
  };
};

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => {
  return {
    fetchDirectChatMessages: (directChatRoomId) => {
      dispatch(fromActions.fetchDirectChatMessages(directChatRoomId));
    },
    setGlobalChatMode: () => {
      dispatch(fromActions.setGlobalChatMode());
    },
    addDirectChatMessage: (message) => {
      dispatch(fromActions.addDirectChatMessage(message));
    },
  };
};

DirectChatWrapper.propTypes = propTypes;
DirectChatWrapper.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(DirectChatWrapper);
