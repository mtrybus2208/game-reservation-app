import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GlobalChatWrapper from '../GlobalChatWrapper/index';
import DirectChatWrapper from '../DirectChatWrapper/index';
import { connect } from 'react-redux';
import * as fromActions from '../../state/actions';
import * as S from './styles';

const propTypes = { 
    chat: PropTypes.object.isRequired,
    authUser: PropTypes.object,
};

const defaultProps = { };

class ChatSidebar extends Component {

    constructor(props) {
        super(props)

        this.setGlobalChatWebsocketConnection = this.setGlobalChatWebsocketConnection.bind(this);
        this.addDirectChatWebsocketConnection = this.addDirectChatWebsocketConnection.bind(this);
    }

    state = {
        globalChatWebsocket: null,
        directChatWebsockets: [],
    };

    setGlobalChatWebsocketConnection(websocket) {
        this.setState({
            globalChatWebsocket: websocket,
        });
    }

    addDirectChatWebsocketConnection(receiverId, websocket) {

        const websocketWithReceiverId = new Map();
        map.set(receiverId, websocket);

        this.setState(prevState => ({
            directChatWebsockets: [...prevState.directChatWebsockets, websocketWithReceiverId],
        }));
    }

    render() {
        return ( 
            <React.Fragment>
                {this.props.chat.chatMode !== 'GLOBAL' ? (
                    <DirectChatWrapper 
                        authUser={this.props.authUser} 
                        receiverId={this.props.chat.chatMode}
                        addDirectChatWebsocketConnection={this.addDirectChatWebsocketConnection}
                    />
                    ) : (
                    <GlobalChatWrapper 
                        authUser={this.props.authUser} 
                        globalChatMessages={this.props.chat.globalChatMessages}
                        globalChatWebsocket={this.state.globalChatWebsocket}
                        setGlobalChatWebsocketConnection={this.setGlobalChatWebsocketConnection}
                    />
                )}
            </React.Fragment>
        )
    }
}

ChatSidebar.propTypes = propTypes;
ChatSidebar.defaultProps = defaultProps;
export default ChatSidebar;

