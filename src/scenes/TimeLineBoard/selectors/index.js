import moment from 'moment';

export const getTimeLine = state => state.timeLine;

export const getWorkdayInMinutes = state => {
  const { workdayStart, workdayEnd } = getTimeLine(state);
  return moment.duration(workdayEnd.diff(workdayStart)).asMinutes();
}

export const getWorkdayInPixels = state => {
  const { timeConverter } = getTimeLine(state);
  const workdayInMin = getWorkdayInMinutes(state);
  return workdayInMin * timeConverter;
};
