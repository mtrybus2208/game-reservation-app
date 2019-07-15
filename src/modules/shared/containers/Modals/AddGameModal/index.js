import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '@/modules/shared/components/Modals/BaseModal';
import * as fromActions from '@/modules/shared/state/actions';
import * as fromHomeActions from '@/modules/home/state/actions';

const propTypes = {
  addGame: PropTypes.func,
  hideModal: PropTypes.func,
  modalProps: PropTypes.any,
  isAddGameFetching: PropTypes.bool,
};
const defaultProps = {
  isAddGameFetching: false,
};
class AddGameModal extends PureComponent {
  handlerAddGame = this.handlerAddGame.bind(this);

  handlerAddGame() {
    const { addGame, modalProps } = this.props;
    addGame(modalProps.gameId);
  }

  render() {
    return (
      <BaseModal
        title="Do You want to reserve game at: 13:00?"
        onConfirm={this.handlerAddGame}
        onDecline={this.props.hideModal}
        isLoading={this.props.isAddGameFetching}
      />
    );
  }
}

const mapStateToProps = ({ modal, timeLine }) => (
  {
    modalProps: modal.modalProps,
    isAddGameFetching: timeLine.isAddGameFetching,
  }
);

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => {
      dispatch(fromActions.hideModal());
    },

    addGame: payload => {
      dispatch(fromHomeActions.addNewGame(payload));
    },
  };
};

AddGameModal.propTypes = propTypes;
AddGameModal.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(AddGameModal);
