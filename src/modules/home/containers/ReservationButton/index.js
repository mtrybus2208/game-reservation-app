import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import ActionButton from '@/modules/home/components/ActionButton';
import * as fromSharedActions from '@/modules/shared/state/actions';
import * as fromHomeActions from '@/modules/home/state/actions';

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

  if (!user) {
    return (
      <ActionButton
        onAction={handlerAddGame}
        isBlocked
        info="Please login to reserve the game"
      />
    );
  }

  return (
    <ActionButton
      onAction={handlerAddGame}
      isLoading={isAddGameFetching}
    />
  );
};

ReservationButton.propTypes = propTypes;
ReservationButton.defaultProps = defaultProps;
export default ReservationButton;
