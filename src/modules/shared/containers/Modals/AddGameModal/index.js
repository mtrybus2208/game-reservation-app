import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '@/modules/shared/components/Modals/BaseModal';
import AddGameTitle from '@/modules/shared/components/Modals/BaseModal/components/AddGameTitle';
import { getHoursFromPixels } from '@/modules/home/state/selectors';
import * as fromActions from '@/modules/shared/state/actions';
import * as fromHomeActions from '@/modules/home/state/actions';

const propTypes = {};
const defaultProps = {};

const AddGameModal = () => {
  const modalProps = useSelector(({ modal }) => modal.modalProps);

  const isAddGameFetching = useSelector(({ timeLine }) => timeLine.isAddGameFetching);

  const currentReservationTime = useSelector(state => getHoursFromPixels(state));

  const duration = useSelector(({ gameReservationState }) => (gameReservationState.time || {}).duration);

  const dispatch = useDispatch();

  const handlerHideModal = () => dispatch(fromActions.hideModal());

  const handlerAddGame = () => dispatch(fromHomeActions.addNewGame(modalProps.gameId));

  return (
    <BaseModal
      customTitle={
        <AddGameTitle
          gameStartTime={currentReservationTime}
          duration={duration}
        />
      }
      onConfirm={handlerAddGame}
      onDecline={handlerHideModal}
      isLoading={isAddGameFetching}
    />
  );
};

AddGameModal.propTypes = propTypes;
AddGameModal.defaultProps = defaultProps;
export default AddGameModal;
