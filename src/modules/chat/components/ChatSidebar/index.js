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
    }

    state = {
        globalChatWebsocket: null,
    };

    setGlobalChatWebsocketConnection(websocket) {
        this.setState({
            globalChatWebsocket: websocket,
        });
    }

    render() {
        return ( 
            <React.Fragment>
                <DirectChatWrapper 
                    isDirectChatMode={this.props.chat.chatMode !== 'GLOBAL'}
                    authUser={this.props.authUser} 
                    receiverId={this.props.chat.chatMode}
                    directChatMessages={this.props.chat.directChatMessages}
                />
                
                <GlobalChatWrapper 
                    isGlobalChatMode={this.props.chat.chatMode === 'GLOBAL'}
                    authUser={this.props.authUser} 
                    globalChatMessages={this.props.chat.globalChatMessages}
                    globalChatWebsocket={this.state.globalChatWebsocket}
                    setGlobalChatWebsocketConnection={this.setGlobalChatWebsocketConnection}
                />
            </React.Fragment>
        )
    }
}

ChatSidebar.propTypes = propTypes;
ChatSidebar.defaultProps = defaultProps;
export default ChatSidebar;

