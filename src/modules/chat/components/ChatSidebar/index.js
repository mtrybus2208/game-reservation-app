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
        this.setGlobalChatMessagesWrapperReference = this.setGlobalChatMessagesWrapperReference.bind(this);
        this.setGlobalChatMessagesEndReference = this.setGlobalChatMessagesEndReference.bind(this);
        this.setDirectChatWebsocketConnection = this.setDirectChatWebsocketConnection.bind(this);
        this.setDirectChatMessagesWrapperReference = this.setDirectChatMessagesWrapperReference.bind(this);
        this.setDirectChatMessagesEndReference = this.setDirectChatMessagesEndReference.bind(this);
        this.saveOpenedDirectChatRoomId = this.saveOpenedDirectChatRoomId.bind(this);
        this.isDirectChatRoomNotSaved = this.isDirectChatRoomNotSaved.bind(this);
    }

    state = {
        globalChatWebsocket: null,
        directChatWebsocket: null,
        openedDirectChatRooms: [],
        globalChatMessagesWrapper: null,
        globalChatMessagesEnd: null,
        directChatMessagesWrapper: null,
        directChatMessagesEnd: null,
    };

    setGlobalChatWebsocketConnection(websocket) {
        this.setState({
            globalChatWebsocket: websocket,
        });
    }

    setGlobalChatMessagesWrapperReference(reference) {
        this.setState({
            globalChatMessagesWrapper: Object.assign({}, reference),
        });
    }

    setGlobalChatMessagesEndReference(reference) {
        this.setState({
            globalChatMessagesEnd: Object.assign({}, reference),
        });
    }

    setDirectChatWebsocketConnection(websocket) {
        this.setState({
            directChatWebsocket: websocket,
        });
    }

    setDirectChatMessagesWrapperReference(reference) {
        this.setState({
            directChatMessagesWrapper: Object.assign({}, reference),
        });
    }

    setDirectChatMessagesEndReference(reference) {
        this.setState({
            directChatMessagesEnd: Object.assign({}, reference),
        });
    }

    saveOpenedDirectChatRoomId(chatRoomId) {
        this.setState(prevState => ({
            openedDirectChatRooms: [...prevState.openedDirectChatRooms, chatRoomId]
        }));
    }

    isDirectChatRoomNotSaved(chatRoomId) {
        return !this.state.openedDirectChatRooms.includes(chatRoomId);
    }

    render() {
        return ( 
            <React.Fragment>
                {this.props.chat.chatMode !== 'GLOBAL' ? (
                    <DirectChatWrapper 
                        authUser={this.props.authUser} 
                        receiverId={this.props.chat.chatMode}
                        directChatWebsocket={this.state.directChatWebsocket}
                        directChatMessagesWrapper={this.state.directChatMessagesWrapper}
                        directChatMessagesEnd={this.state.directChatMessagesEnd}
                        setDirectChatWebsocketConnection={this.setDirectChatWebsocketConnection}
                        setDirectChatMessagesWrapperReference={this.setDirectChatMessagesWrapperReference}
                        setDirectChatMessagesEndReference={this.setDirectChatMessagesEndReference}
                        saveOpenedDirectChatRoomId={this.saveOpenedDirectChatRoomId}
                        isDirectChatRoomNotSaved={this.isDirectChatRoomNotSaved}
                        directChatMessages={this.props.chat.directChatMessages}
                    />
                    ) : (
                    <GlobalChatWrapper 
                        authUser={this.props.authUser} 
                        globalChatMessages={this.props.chat.globalChatMessages}
                        globalChatWebsocket={this.state.globalChatWebsocket}
                        globalChatMessagesWrapper={this.state.globalChatMessagesWrapper}
                        globalChatMessagesEnd={this.state.globalChatMessagesEnd}
                        setGlobalChatWebsocketConnection={this.setGlobalChatWebsocketConnection} 
                        setGlobalChatMessagesWrapperReference={this.setGlobalChatMessagesWrapperReference}
                        setGlobalChatMessagesEndReference={this.setGlobalChatMessagesEndReference}
                    />
                )}
            </React.Fragment>
        )
    }
}

ChatSidebar.propTypes = propTypes;
ChatSidebar.defaultProps = defaultProps;
export default ChatSidebar;

