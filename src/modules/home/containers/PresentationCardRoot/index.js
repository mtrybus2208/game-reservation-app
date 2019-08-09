import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '@/modules/shared/components/Modals/BaseModal';
import AddGameTitle from '@/modules/shared/components/Modals/BaseModal/components/AddGameTitle';
import { getActualDateInPixels } from '@/modules/home/state/selectors';
import { getHoursFromPixels } from '@/modules/home/state/selectors';
import * as fromActions from '@/modules/shared/state/actions';
import * as fromHomeActions from '@/modules/home/state/actions';

const propTypes = {
  onBlockTimeLine: PropTypes.func,
  onMoveTimeLine: PropTypes.func,
  initialCardPosition: PropTypes.number,
};
const defaultProps = {};

const PresentationCardRoot = ({
  onBlockTimeLine,
  onMoveTimeLine,
  initialCardPosition,
}) => {
  const gameReservation = useSelector(({ gameReservationState }) => gameReservationState);
  const { timeConverter, isAddGameFetching } = useSelector(({ timeLine }) => timeLine);
  const actualDateInPixels = useSelector(state => getActualDateInPixels(state));

  


























  const modalProps = useSelector(({ modal }) => modal.modalProps);
  const isAddGameFetching = useSelector(({ timeLine }) => timeLine.isAddGameFetching);
  const currentReservationTime = useSelector(state => getHoursFromPixels(state));

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

PresentationCardRoot.propTypes = propTypes;
PresentationCardRoot.defaultProps = defaultProps;
export default PresentationCardRoot;
