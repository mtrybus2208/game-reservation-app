import moment from 'moment';
import { format } from 'upath';

export const getTimeLine = state => state.timeLine;

export const getWorkdayInMinutes = state => {
  const { workdayStart, workdayEnd } = getTimeLine(state);
  console.log(moment.duration(workdayEnd.diff(workdayStart)).asMinutes())
  return moment.duration(workdayEnd.diff(workdayStart)).asMinutes();
};

export const getWorkdayInHours = state => (getWorkdayInMinutes(state) / 60);

export const getWorkdayInPixels = state => {
  const { timeConverter } = getTimeLine(state);
  const workdayInMin = getWorkdayInMinutes(state);
  return workdayInMin * timeConverter;
};

export const getArrayOfWorkdayHours = state => {
  const timeline = getTimeLine(state);
  const { workdayStart, workdayEnd } = getTimeLine(state);
  const mins = moment.duration(workdayEnd.diff(workdayStart)).hours(); 
  return [...Array(8).keys()]
    .map((h, i) => {
      return timeline.workdayStart.add(1, 'h').format('HH:mm');
    }); 
}
 
