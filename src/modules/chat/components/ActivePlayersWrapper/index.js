import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { WS_API_URL, API_URL } from '@/constants/api';
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
        players: [],
    }

    links = {
        globalChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
        playerSearchIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1569241158/magnifier.svg',
    }

    componentDidMount() {
        this.fetchAllPlayers();
    }

    componentDidUpdate() {

    }

    fetchAllPlayers = () => {
        const fetchAllPlayersUrl = `${API_URL}/players`;

        axios
            .get(fetchAllPlayersUrl)
            .then(response => 
                this.setState({
                    players: response.data,
                })
            )
            .catch(error => 
                console.log(error.response)
            );
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

                
                {this.state.players.map((value, index) => (
                    <S.Player key={index}>
                        <S.PlayerPictureWrapper>
                            <S.PlayerPicture src={value.photoUrl} />
                        </S.PlayerPictureWrapper>

                        <S.PlayerName>
                            {value.displayName}
                        </S.PlayerName>
                    </S.Player>
                ))}

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
