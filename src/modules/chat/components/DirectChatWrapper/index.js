import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as S from './styles';
import * as fromActions from '../../state/actions';
import { debounced } from '@/helpers/index';
import axios from 'axios';
import moment from 'moment';

const propTypes = { 
  setGlobalChatMode: PropTypes.func,
  setDirectChatWebsocketConnection: PropTypes.func,
  fetchDirectChatMessages: PropTypes.func.isRequired,
  directChatWebsocket: PropTypes.object,
  authUser: PropTypes.object.isRequired,
  receiverId: PropTypes.string.isRequired,
  directChatMessages: PropTypes.object,
};

const defaultProps = { };

class DirectChatWrapper extends Component {

  state = {
    messages: [],
    typedMessage: '',
    receiver: {
      id: '',
      displayName: '',
      email: '',
      photoUrl: '',
    },
    isFirstMessagesScrollNotDone: true,
  };

  links = {
    globalChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
    getPlayerApiUrl: 'http://localhost/players',
    socketConnectionApiUrl: 'ws://localhost/socket/chat/direct',
    sendMessageApiUrl: 'http://localhost/chat/direct/messages',
    getMessagesForChatRoom: 'http://localhost/chat/direct/messages/chat-room/',
  }

  debouncedOnClick = debounced(200, this.sendMessage.bind(this)); 

  fetchDirectChatMessages = (directChatRoomId) => {
    this.props.fetchDirectChatMessages(directChatRoomId);
  }

  componentDidMount() {
    this.setupReceiverData(this.props.receiverId);

    if(this.isWebsocketNotConnected(this.props.directChatWebsocket)) {
      const directChatWebsocketConnectionUrl = `${this.links.socketConnectionApiUrl}?receiverId=${this.props.authUser.uid}`;
      const websocketConnection = new WebSocket(directChatWebsocketConnectionUrl);

      this.props.setDirectChatWebsocketConnection(websocketConnection);
    }
  }

  componentDidUpdate() {
    if(this.isEndOfMessagesDivReady() && this.state.isFirstMessagesScrollNotDone) {
      this.scrollToBottom();

      this.setState({
        isFirstMessagesScrollNotDone: false,
      })
    }

    if(this.isWebsocketFirstConnection(this.props.directChatWebsocket)) {
      this.setWebsocketMessageReceiveHandler(this.props.directChatWebsocket);
      this.setWebsocketConnectionSustain(this.props.directChatWebsocket);
    }

    if(this.isFirstChatRoomConnection()) {

      this.fetchDirectChatMessages(this.getDirectChatRoomId());

      this.fetchCurrentDirectChatMessages()
        .then(response => 
          this.setState({
            messages: response.data
          })
        )
        .catch(() => {
          console.log('Could not fetch messages for current room');
        });
    }
  }

  isEndOfMessagesDivReady = () => {
    return this.messagesEnd !== undefined;
  }

  scrollToBottom = () => {
    this.messagesEnd.scrollIntoView({ behavior: "auto" });
  }
  
  isFirstChatRoomConnection = () => {
    return this.state.messages === undefined || this.state.messages.length == 0;
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

  getReceiver = (receiverId) => {
    return axios.get(`${this.links.getPlayerApiUrl}/${receiverId}`)
  }

  isWebsocketNotConnected(websocket) {
    return websocket === null;
  }

  isWebsocketFirstConnection(websocket) {
    return websocket.onmessage === null;
  }

  fetchCurrentDirectChatMessages() {
    const chatRoomId = this.getDirectChatRoomId();

    return axios.get(`${this.links.sendMessageApiUrl}/chat-room/${chatRoomId}`);
  }
  
  getDirectChatRoomId() {
    const authUserId = this.props.authUser.uid;
    const receiverId = this.state.receiver.id;

    if(authUserId > receiverId) {
      return `${authUserId}_${receiverId}`;
    } else {
      return `${receiverId}_${authUserId}`;
    }
  }

  setWebsocketMessageReceiveHandler = (websocket) => {
    websocket.onmessage = (event) => {
      const websocketMessage = JSON.parse(event.data);

      if(this.isDirectChatMessage(websocketMessage)) {
        const directChatMessage = websocketMessage.responseBody;
        this.setState(state => ({
          messages: [...state.messages, directChatMessage]
        }))
      }
    };
  }

  isDirectChatMessage(message) {
    return message.responseType === 'DIRECT_CHAT';
  }

  openGlobalChat = () => {
    this.props.setGlobalChatMode();
  }

  setWebsocketConnectionSustain = (websocket) => {
    const websocketRefreshInterval = setInterval(() => {

      const openState = 1;

      if(websocket.readyState === openState) {
        websocket.send('');
      } else {
        clearInterval(websocketRefreshInterval);
      }
    }, 60000);
  }

  handleEnterClick = (event) => {
    const enterButtonKeyCode = 13;

    if(event.charCode === enterButtonKeyCode) {
      event.preventDefault();
      this.sendMessageHandler();
    }
  }

  sendMessageHandler = () => {
    this.debouncedOnClick();
  }

  sendMessage() {
    if(this.isNotAnonymousUser() && this.validateTypedMessage()) {

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

  isNotAnonymousUser = () => {
    return this.props.authUser !== null;
  }

  render() {
    return (
    <S.DirectChatWrapper> 
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

      <S.MessagesWrapper>
        {this.state.messages.map((value, index) => (
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
            <S.MessagesEnd ref={(el) => { this.messagesEnd = el; }} />
          </React.Fragment>
        ))}
      </S.MessagesWrapper>

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
  };
};

DirectChatWrapper.propTypes = propTypes;
DirectChatWrapper.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(DirectChatWrapper);
