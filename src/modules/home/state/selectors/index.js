import moment from 'moment';

export const getTimeLine = state => state.timeLine;

export const getWorkdayInMinutes = state => {
  const { workdayStart, workdayEnd } = getTimeLine(state);
  return moment.duration(workdayEnd.diff(workdayStart)).asMinutes();
};

export const getReservationInHours = state => {
  const { endLastReservation } = getTimeLine(state);
  return endLastReservation.format('HH:mm')
};

export const getActualDateMinutes = state => {
  const { workdayStart, actualTime } = getTimeLine(state);
  return moment.duration(actualTime.diff(workdayStart)).asMinutes();
};

export const getWorkdayInHours = state => (getWorkdayInMinutes(state) / 60);

export const getWorkdayInPixels = state => {
  const { timeConverter } = getTimeLine(state);
  const workdayInMin = getWorkdayInMinutes(state);
  return workdayInMin * timeConverter;
};

export const getActualDateInPixels = state => {
  const { timeConverter } = getTimeLine(state);
  const actualDateInMin = getActualDateMinutes(state);
  return Math.round(actualDateInMin * timeConverter);
};

export const getArrayOfWorkdayHours = state => {
  const { workdayStart } = getTimeLine(state);
  return [...Array(getWorkdayInHours(state)).keys()]
    .map(h => moment(workdayStart).add(h, 'h').format('HH:mm'));
};

export const getHoursFromPixels = state => {
  const { workdayStart, currentReservationTime, timeConverter } = getTimeLine(state);
  const minutes = currentReservationTime / timeConverter;
  return moment(workdayStart).add(minutes, 'minutes').format('HH:mm');
}
