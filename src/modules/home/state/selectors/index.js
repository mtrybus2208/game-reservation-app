import moment from 'moment';
import { createSelector } from 'reselect';

export const getTimeLine = state => state.timeLine;

export const getTimeConverter = state => state.timeLine.timeConverter;

export const getWorkdayInMinutes = createSelector(
  getTimeLine,
  timeLine => {
    const { workdayStart, workdayEnd } = timeLine;
    return moment.duration(workdayEnd.diff(workdayStart)).asMinutes();
  },
);

export const getActualDateMinutes = createSelector(
  getTimeLine,
  ({ workdayStart, actualTime }) =>
    moment.duration(actualTime.diff(workdayStart)).asMinutes(),
);

export const getWorkdayInHours = state => (getWorkdayInMinutes(state) / 60);

export const getWorkdayInPixels = createSelector(
  getTimeConverter,
  getWorkdayInMinutes,
  (timeConverter, workdayInMin) => workdayInMin * timeConverter,
);

export const getActualDateInPixels = createSelector(
  getTimeConverter,
  getActualDateMinutes,
  (timeConverter, actualDateInMin) =>
    Math.round(actualDateInMin * timeConverter),
);

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
