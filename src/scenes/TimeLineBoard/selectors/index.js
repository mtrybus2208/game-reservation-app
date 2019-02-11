import moment from 'moment';

export const getTimeLine = state => state.timeLine;

export const getWorkdayInMinutes = state => {
  const { workdayStart, workdayEnd } = getTimeLine(state);
  return moment.duration(workdayEnd.diff(workdayStart)).asMinutes();
};

export const getWorkdayInHours = state => (getWorkdayInMinutes(state) / 60);

export const getWorkdayInPixels = state => {
  const { timeConverter } = getTimeLine(state);
  const workdayInMin = getWorkdayInMinutes(state);
  return workdayInMin * timeConverter;
};

export const getArrayOfWorkdayHours = state => {
  const { workdayStart } = getTimeLine(state);
  return [...Array(getWorkdayInHours(state)).keys()]
    .map(h => moment(workdayStart).add(h, 'h').format('HH:mm'));
};

