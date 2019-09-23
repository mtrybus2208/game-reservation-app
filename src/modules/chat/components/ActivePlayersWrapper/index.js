import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromActions from '../../state/actions';
import * as S from './styles';

const propTypes = { 
    setGlobalChatMode: PropTypes.func,
    isActivePlayersListMode: PropTypes.bool,
};

const defaultProps = { };

class ActivePlayersWrapper extends Component {

    constructor(props) {
        super(props);
    }

    state = {

    }

    links = {
        globalChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
        playerSearchIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1569241158/magnifier.svg',
    }

    openGlobalChat = () => {
        this.props.setGlobalChatMode();
    }

    render() {
        return ( 
            <S.ActivePlayersWrapper
                isActivePlayersListMode={this.props.isActivePlayersListMode}
            >
                <S.GlobalChatReturn onClick={this.openGlobalChat}>
                    <S.GlobalChatIcon src={this.links.globalChatIcon} />
                    <S.GlobalChatInfo>Global chat</S.GlobalChatInfo>
                </S.GlobalChatReturn>

                <S.PlayerSearch>
                    <S.PlayerSearchInput type="text" />
                    <S.PlayerSearchButton>
                        <S.PlayerSearchIcon src={this.links.playerSearchIcon}/>
                    </S.PlayerSearchButton>
                </S.PlayerSearch>

            </S.ActivePlayersWrapper>
        )
    }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
        setGlobalChatMode: () => {
            dispatch(fromActions.setGlobalChatMode());
        },
    };
};
  
ActivePlayersWrapper.propTypes = propTypes;
ActivePlayersWrapper.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(ActivePlayersWrapper);
