import React, { Component } from 'react';
import PropTypes from 'prop-types';
import GlobalChatWrapper from '../GlobalChatWrapper/index';
import DirectChatWrapper from '../DirectChatWrapper/index';
import ActivePlayersWrapper from '../ActivePlayersWrapper/index';
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
        super(props);

        this.setInitialScrollToBottomFlag = this.setInitialScrollToBottomFlag.bind(this);
    }

    state = {
        isInitialScrollToBottomNotDone: true,
    }

    setInitialScrollToBottomFlag = (isDone) => {
        this.setState({
            isInitialScrollToBottomNotDone: isDone,
        });
    }

    render() {
        return ( 
            <React.Fragment>
                <DirectChatWrapper 
                    isDirectChatMode={this.props.chat.chatMode !== 'GLOBAL' && this.props.chat.chatMode !== 'ACTIVE_PLAYERS'}
                    authUser={this.props.authUser} 
                    receiverId={this.props.chat.chatMode}
                    directChatMessages={this.props.chat.directChatMessages}
                    isInitialScrollToBottomNotDone={this.state.isInitialScrollToBottomNotDone}
                    setInitialScrollToBottomFlag={this.setInitialScrollToBottomFlag}
                />
                
                <GlobalChatWrapper 
                    isGlobalChatMode={this.props.chat.chatMode === 'GLOBAL'}
                    authUser={this.props.authUser} 
                    globalChatMessages={this.props.chat.globalChatMessages}
                    isInitialScrollToBottomNotDone={this.state.isInitialScrollToBottomNotDone}
                    setInitialScrollToBottomFlag={this.setInitialScrollToBottomFlag}
                />

                <ActivePlayersWrapper
                    isActivePlayersListMode={this.props.chat.chatMode === 'ACTIVE_PLAYERS'}
                />
            </React.Fragment>
        )
    }
}

ChatSidebar.propTypes = propTypes;
ChatSidebar.defaultProps = defaultProps;
export default ChatSidebar;
