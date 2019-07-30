import React, { useEffect } from 'react';
import { compose } from 'redux';
import {useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ActionButton from '@/modules/home/components/ActionButton';
import { getIsReservationBlocked, getTimeAndType } from '@/modules/home/state/selectors/gameReservation';
import * as fromSharedActions from '@/modules/shared/state/actions';
import {
  withSessionControl,
  withSettingsControl,
  withTimePermission,
} from '@/modules/home/HOC/reservationControl';

const propTypes = {};
const defaultProps = {};

const ReservationButton = () => {
  const isAddGameFetching = useSelector(({ timeLine }) => timeLine.isAddGameFetching);
  const user = useSelector(({ sessionState }) => sessionState.authUser);
  const isReservationBlocked = useSelector(getIsReservationBlocked);
  const { gameType, time } = useSelector(getTimeAndType);
  const dispatch = useDispatch();

  const handlerAddGame = () => dispatch(fromSharedActions.showModal({
    modalProps: {},
    modalType: 'ADD_GAME_MODAL',
  }));
  
  const ComposedActionButton = compose(
    withSessionControl(!!user),
    withSettingsControl(!!gameType, !!time),
    withTimePermission(isReservationBlocked),
  )(ActionButton);

  return (
    <ComposedActionButton
      onAction={handlerAddGame}
      isLoading={isAddGameFetching}
    />
  );
};

ReservationButton.propTypes = propTypes;
ReservationButton.defaultProps = defaultProps;
export default ReservationButton;
