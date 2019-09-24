import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import axios from 'axios';
import { WS_API_URL, API_URL } from '@/constants/api';
import * as fromActions from '../../state/actions';
import * as S from './styles';

const propTypes = { 
    setGlobalChatMode: PropTypes.func,
    setDirectChatMode: PropTypes.func,
    setInitialScrollToBottomFlag: PropTypes.func,
    authUser: PropTypes.object,
    isActivePlayersListMode: PropTypes.bool,
};

const defaultProps = { };

class ActivePlayersWrapper extends Component {

    constructor(props) {
        super(props);
    }

    state = {
        allPlayers: [],
        filteredPlayers: [],
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
                    allPlayers: response.data,
                    filteredPlayers: response.data,
                })
            )
            .catch(error => 
                console.log(error.response)
            );
    }

    openGlobalChat = () => {
        this.props.setGlobalChatMode();
    }

    openDirectChat = (event) => {   
        const playerId = event.currentTarget.id;

        this.props.setDirectChatMode(playerId);
        this.props.setInitialScrollToBottomFlag(true);
    }

    searchPlayersByGivenText = (event) => {
        const searchedPlayerName = event.target.value.toLowerCase();

        if (searchedPlayerName) {
            const filteredPlayers = this.state.allPlayers.filter(player =>
                player.displayName.toLowerCase().includes(searchedPlayerName)
            );

            this.setState({
                filteredPlayers: filteredPlayers,
            });
        } else {
            this.setState({
                filteredPlayers: this.state.allPlayers,
            });
        }
    }

    render() {
        return ( 
            <S.ActivePlayersWrapper isActivePlayersListMode={this.props.isActivePlayersListMode}>
                <S.GlobalChatReturn onClick={this.openGlobalChat}>
                    <S.GlobalChatIcon src={this.links.globalChatIcon} />
                    <S.GlobalChatInfo>Global chat</S.GlobalChatInfo>
                </S.GlobalChatReturn>

                <S.PlayerSearch>
                    <S.PlayerSearchInput 
                        type="text"
                        maxLength="60"
                        onChange={this.searchPlayersByGivenText}
                    />
                    <S.PlayerSearchIconWrapper>
                        <S.PlayerSearchIcon src={this.links.playerSearchIcon} />
                    </S.PlayerSearchIconWrapper>
                </S.PlayerSearch>

                {this.state.filteredPlayers.map((value, index) => (
                    this.props.authUser && value.id !== this.props.authUser.uid && (
                        <S.Player 
                            key={index}
                            id={value.id}
                            onClick={this.openDirectChat}
                        >
                            <S.PlayerPictureWrapper>
                                <S.PlayerPicture src={value.photoUrl} />
                            </S.PlayerPictureWrapper>

                            <S.PlayerName>
                                {value.displayName}
                            </S.PlayerName>
                        </S.Player>
                    )
                ))}  
            </S.ActivePlayersWrapper>
        )
    }
}

const mapStateToProps = () => ({

});

const mapDispatchToProps = (dispatch) => {
    return {
        setDirectChatMode: (playerId) => {
            dispatch(fromActions.setDirectChatMode(playerId));
        },
        setGlobalChatMode: () => {
            dispatch(fromActions.setGlobalChatMode());
        },
    };
};
  
ActivePlayersWrapper.propTypes = propTypes;
ActivePlayersWrapper.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(ActivePlayersWrapper);
