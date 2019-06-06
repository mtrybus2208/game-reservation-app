import { getTimeLine } from './index';

export const getReservedGameEntieties = state => state.timeLine.reservedGames; 

export const getAllReservedGames = (state) => {
  const { players } = getTimeLine(state);
  const reservedGames = getReservedGameEntieties(state);

  return reservedGames && reservedGames.allIds.map(id => {
    const mergedWithPlayer = {
      ...reservedGames.byID[id],
      player: players && players.byID[reservedGames.byID[id].playerId]
    };

    return mergedWithPlayer;
  });
};
