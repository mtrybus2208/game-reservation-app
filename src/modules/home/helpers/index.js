import moment from 'moment';

export const getDistanceInMinutes = (timeGame, workdayStart) => {
  return moment.duration(timeGame.diff(workdayStart)).asMinutes();
};

export const getGameTimes = (game, timeConverter) =>
  ['startDate', 'endDate'].map(type =>
    getDistanceInMinutes(moment(game[type])) * timeConverter);

export const createReservedIntervals = (games, timeConverter) => games && games.map(game => {
  const [startTime, endTime] = getGameTimes(game, timeConverter);
  return [Math.abs(startTime), Math.abs(startTime) + (Math.abs(endTime) - Math.abs(startTime))];
});
