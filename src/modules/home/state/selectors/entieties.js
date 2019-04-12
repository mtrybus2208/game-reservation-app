import moment from 'moment';


export const getReservedGameEntieties = state => {
  return state.timeLine.entities;
};

export const getAllReservedGames = (state) => {
  const entities = getReservedGameEntieties(state);

  const reservedGames = entities && entities.reservedGames.allIds.map(id => {
    return entities.reservedGames.byId[id];
  });

  return reservedGames;
}