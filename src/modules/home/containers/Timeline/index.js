import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import TimeLineMover from '@/modules/home/components/TimeLineMover';
import { getActualDateInPixels, getWorkdayInPixels } from '@/modules/home/state/selectors';
import { getIsReservationBlocked } from '@/modules/home/state/selectors/gameReservation';
import * as fromActions from '../../state/actions';

const propTypes = {
  actualDateInPixels: PropTypes.number,
  fetchReservedGames: PropTypes.func,
};

const TimeLine = () => {
  const actualDateInPixels = useSelector(state => getActualDateInPixels(state));
  const isReservationBlocked = useSelector(state => getIsReservationBlocked(state));
  const workdayInPixels = useSelector(state => getWorkdayInPixels(state));
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fromActions.fetchReservedGames());
  }, []);

  return (
    <TimeLineMover
      actualDateInPixels={actualDateInPixels}
      isReservationBlocked={isReservationBlocked}
      workdayInPixels={workdayInPixels}
    />
  );
}

TimeLine.propTypes = propTypes;
export default TimeLine;
