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
  directChatWebsocket: PropTypes.object,
  authUser: PropTypes.object.isRequired,
  receiverId: PropTypes.string.isRequired,
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
  };

  links = {
    globalChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
    getPlayerApiUrl: 'http://localhost/players',
    socketConnectionApiUrl: 'ws://localhost/socket/chat/direct',
    sendMessageApiUrl: 'http://localhost/chat/direct/messages',
    getMessagesForChatRoom: 'http://localhost/chat/direct/messages/chat-room/',
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
    if(this.isWebsocketFirstConnection(this.props.directChatWebsocket)) {
      this.setWebsocketMessageReceiveHandler(this.props.directChatWebsocket);
      this.setWebsocketConnectionSustain(this.props.directChatWebsocket);
    }

    if(this.isFirstChatRoomConnection()) {
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

  isFirstChatRoomConnection() {
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
    const chatRoomId = this.getDirectChatRoomId()

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

      console.log(1)
      if(this.isDirectChatMessage(websocketMessage)) {
        const directChatMessage = websocketMessage.responseBody;

        console.log(2)
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
                      {moment(value.messageSendDate).format("HH:mm")}
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
                      {moment(value.messageSendDate).format("HH:mm")}
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
      </S.MessagesWrapper>

      <S.MessageInputSectionWrapper>
        <S.MessageInputWrapper>
          <S.MessageInput max={200} />
        </S.MessageInputWrapper>

        <S.MessageButtonsWrapper>
          <S.MessageButton>
            <S.MessageButtonImage src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595074/smiling-emoticon.svg" />
          </S.MessageButton>


          <S.MessageButton>
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
    setGlobalChatMode: () => {
      dispatch(fromActions.setGlobalChatMode());
    },
  };
};

DirectChatWrapper.propTypes = propTypes;
DirectChatWrapper.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(DirectChatWrapper);
