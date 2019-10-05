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
        inactivePlayers: [],
        activePlayers: [],
        filteredPlayers: [],
        activePlayersWebsocket: null,
        isInitialFetchNotDone: true,
    }

    links = {
        globalChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
        playerSearchIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1569241158/magnifier.svg',
        fetchInactivePlayersUrl: `${API_URL}/players`,
        fetchActivePlayersUrl: `${API_URL}/players/active`,
    }

    componentDidMount() {
        this.openActivePlayersWebsocket();
        this.fetchInactivePlayers();
        this.fetchActivePlayers();
    }

    componentDidUpdate() {
        const isFirstFetch = this.state.isInitialFetchNotDone && this.state.inactivePlayers.length && this.state.activePlayers.length;

        if (isFirstFetch) {
            this.splitActiveAndInactivePlayers();
        }
    }

    openActivePlayersWebsocket = () => {
        const isWebsocketNotConnected = this.state.activePlayersWebsocket === null;

        if (isWebsocketNotConnected && this.props.authUser)  {
            const socketConnectionApiUrl = `${WS_API_URL}/socket/players/active?playerId=${this.props.authUser.uid}`;
            const websocketConnection = new WebSocket(socketConnectionApiUrl);

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
                    websocketMessage.responseType === 'ACTIVE_PLAYER_REGISTER' || websocketMessage.responseType === 'ACTIVE_PLAYER_UNREGISTER';

            if (isActivePlayersListChange && !this.state.isInitialFetchNotDone) {
                this.changeActivePlayersListState(websocketMessage.responseType, websocketMessage.responseBody);
            }
        };
    }

    changeActivePlayersListState = (action, playerId) => {
        if (action === 'ACTIVE_PLAYER_REGISTER') {
            let activatedPlayer = null;

            this.state.inactivePlayers.forEach(inactivePlayer => {
                if (inactivePlayer.id === playerId) {
                    activatedPlayer = inactivePlayer;
                    activatedPlayer.active = true;
                }
            })

            const inactivePlayersListWithRemovedPlayer = this.state.inactivePlayers.filter(inactivePlayer => 
                inactivePlayer.id !== playerId    
            );
            const activePlayersListWithNewPlayer = this.state.activePlayers;

            activePlayersListWithNewPlayer.push(activatedPlayer);
            activePlayersListWithNewPlayer.sort((first, second) => first.displayName.localeCompare(second.displayName));

            this.setState({
                inactivePlayers: inactivePlayersListWithRemovedPlayer,
                activePlayers: activePlayersListWithNewPlayer,
                filteredPlayers: [...activePlayersListWithNewPlayer, ...inactivePlayersListWithRemovedPlayer],
            });        
        } else {
            let inactivatedPlayer = null;

            this.state.activePlayers.forEach(activePlayer => {
                if (activePlayer.id === playerId) {
                    inactivatedPlayer = activePlayer;
                    inactivatedPlayer.active = false;
                }
            })

            const activePlayersListWithRemovedPlayer = this.state.activePlayers.filter(activePlayer => 
                activePlayer.id !== playerId    
            );
            const inactivePlayersListWithNewPlayer = this.state.inactivePlayers;

            inactivePlayersListWithNewPlayer.push(inactivatedPlayer);
            inactivePlayersListWithNewPlayer.sort((first, second) => first.displayName.localeCompare(second.displayName));

            this.setState({
                inactivePlayers: inactivePlayersListWithNewPlayer,
                activePlayers: activePlayersListWithRemovedPlayer,
                filteredPlayers: [...activePlayersListWithRemovedPlayer, ...inactivePlayersListWithNewPlayer],
            });   
        }
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

    fetchInactivePlayers = () => {
        axios
            .get(this.links.fetchInactivePlayersUrl)
            .then(response => 
                this.setState({
                    inactivePlayers: response.data,
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
            .then(response => {
                const activePlayerWithActiveStatusProperty = Array.from(response.data).map(activePlayer => {
                    activePlayer.active = true;
                    return activePlayer;
                });

                this.setState({
                    activePlayers: activePlayerWithActiveStatusProperty,
                });
            })
            .catch(error => 
                console.log(error)
            );
    }

    splitActiveAndInactivePlayers = () => {
        const inactivePlayers = 
            this.state.inactivePlayers.filter(player => 
                !this.state.activePlayers.some(activePlayer => 
                    activePlayer.id === player.id
                )
            );

        this.setState({
            isInitialFetchNotDone: false,
            inactivePlayers: inactivePlayers,
            filteredPlayers: [...this.state.activePlayers, ...inactivePlayers],
        });
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
            const filteredPlayers = this.state.inactivePlayers.filter(player =>
                player.displayName.toLowerCase().includes(searchedPlayerName)
            );

            this.setState({
                filteredPlayers: filteredPlayers,
            });
        } else {
            this.setState({
                filteredPlayers: this.state.inactivePlayers,
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

                {this.state.filteredPlayers.map((player, index) => (
                    this.props.authUser && player.id !== this.props.authUser.uid && (
                        <S.Player 
                            key={index}
                            id={player.id}
                            onClick={this.openDirectChat}
                        >
                            <S.PlayerPictureWrapper>
                                <S.PlayerPicture src={player.photoUrl} />
                                <S.ActivePlayerLight isActive={player.active} />
                            </S.PlayerPictureWrapper>

                            <S.PlayerName>
                                {player.displayName}
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
