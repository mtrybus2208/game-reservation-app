import React, { useEffect } from 'react';
import { compose } from 'redux';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ActionButton from '@/modules/home/components/ActionButton';
import * as fromSharedActions from '@/modules/shared/state/actions';
// import {
//   withSessionControl,
//   withSettingsControl,
// } from '@/modules/home/HOC/withReservationControl';
import {
  withSessionControl,
  withSettingsControl,
} from '@/modules/home/HOC/reservationControl';

const propTypes = {};
const defaultProps = {};

const ReservationButton = () => {
  const isAddGameFetching = useSelector(({ timeLine }) => timeLine.isAddGameFetching);
  const user = useSelector(({ sessionState }) => sessionState.authUser);
  const dispatch = useDispatch();

  const handlerAddGame = () => dispatch(fromSharedActions.showModal({
    modalProps: {},
    modalType: 'ADD_GAME_MODAL',
  }));

  const ComposedActionButton = compose(
    withSessionControl(true),
    withSettingsControl(false, true),
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
