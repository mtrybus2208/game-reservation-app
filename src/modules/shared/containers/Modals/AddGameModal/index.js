import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '@/modules/shared/components/Modals/BaseModal';
import * as fromActions from '@/modules/shared/state/actions';
import * as fromHomeActions from '@/modules/home/state/actions';

const propTypes = {};
const defaultProps = {};

const AddGameModal = () => {
  const modalProps = useSelector(({ modal }) => modal.modalProps);

  const isAddGameFetching = useSelector(({ timeLine }) => timeLine.isAddGameFetching);

  const dispatch = useDispatch();

  const handlerHideModal = () => dispatch(fromActions.hideModal());

  const handlerAddGame = () => dispatch(fromHomeActions.addNewGame(modalProps.gameId));

  return (
    <BaseModal
      title="Do You want to reserve game at: 13:00?"
      onConfirm={handlerAddGame}
      onDecline={handlerHideModal}
      isLoading={isAddGameFetching}
    />
  );
};

AddGameModal.propTypes = propTypes;
AddGameModal.defaultProps = defaultProps;
export default AddGameModal;
