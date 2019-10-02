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
        activePlayers: [],
        filteredPlayers: [],
        activePlayersWebsocket: null,
    }

    links = {
        globalChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
        playerSearchIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1569241158/magnifier.svg',
        fetchAllPlayersUrl: `${API_URL}/players`,
        fetchActivePlayersUrl: `${API_URL}/players/active`,
        socketConnectionApiUrl: `${WS_API_URL}/socket/players/active?playerId=${this.props.authUser.uid}`,
    }

    componentDidMount() {
        this.openActivePlayersWebsocket();
        this.fetchAllPlayers();
        this.fetchActivePlayers();
    }

    componentDidUpdate() {

    }

    openActivePlayersWebsocket = () => {
        const isWebsocketNotConnected = this.state.activePlayersWebsocket === null;

        if (isWebsocketNotConnected)  {
            const websocketConnection = new WebSocket(this.links.socketConnectionApiUrl);

            this.setWebsocketMessageReceiveHandler(websocketConnection);
            this.setWebsocketConnectionSustain(websocketConnection);
            
            this.setState({
                activePlayersWebsocket: websocketConnection,
            });
        }
    }

    setWebsocketMessageReceiveHandler = (websocket) => {
        websocket.onmessage = (event) => {
            const websocketMessage = JSON.parse(event.data);
            const isActivePlayersListChange = 
                    websocketMessage.responseType === 'ACTIVE_USER_REGISTER' || websocketMessage.responseType === 'ACTIVE_USER_UNREGISTER';

            if(isActivePlayersListChange) {
                changeActivePlayersListState(websocketMessage.responseType, websocketMessage.responseBody);
            }
        };
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

    fetchAllPlayers = () => {
        axios
            .get(this.links.fetchAllPlayersUrl)
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

    fetchActivePlayers = () => {
        axios
            .get(this.links.fetchActivePlayersUrl)
            .then(response => 
                this.setState({
                    activePlayers: response.data,
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
