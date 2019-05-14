import moment from 'moment';

export const getReservedGameEntieties = state => state.timeLine.reservedGames;

export const getAllReservedGames = (state) => {
  const reservedGames = getReservedGameEntieties(state);
  return reservedGames && reservedGames.allIds.map(id => reservedGames.byID[id]); 
}