import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '@/modules/shared/components/Modals/BaseModal';
import * as fromActions from '@/modules/shared/state/actions';
import * as fromHomeActions from '@/modules/home/state/actions';

const propTypes = {
  deleteGame: PropTypes.func,
  hideModal: PropTypes.func,
  modalProps: PropTypes.any,
  isLoading: PropTypes.bool,
};
const defaultProps = {
  isLoading: false,
};
class DeleteGameModal extends PureComponent {

  handlerDeleteGame = this.handlerDeleteGame.bind(this);

  handlerDeleteGame() {
    const { deleteGame, modalProps } = this.props;
    deleteGame(modalProps.gameId);
  }

  render() {
    return (
      <BaseModal
        title="Do You want to delete this game?"
        onConfirm={this.handlerDeleteGame}
        onDecline={this.props.hideModal}
        isLoading={this.props.isDeleteGameFetching}
      />
    );
  }
}

const mapStateToProps = ({ modal, timeLine }) => (
  {
    modalProps: modal.modalProps,
    isDeleteGameFetching: timeLine.isDeleteGameFetching,
  }
);

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => {
      dispatch(fromActions.hideModal());
    },

    deleteGame: payload => {
      dispatch(fromHomeActions.deleteGame(payload));
    },
  };
};

DeleteGameModal.propTypes = propTypes;
DeleteGameModal.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(DeleteGameModal);
