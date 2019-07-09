import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '@/modules/shared/components/Modals/BaseModal';
import * as fromActions from '@/modules/shared/state/actions';
import * as fromHomeActions from '@/modules/home/state/actions';

const propTypes = {
  deleteGame: PropTypes.func,
  hideModal: PropTypes.func,
  modalProps: PropTypes.obj,
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
        isLoading={this.props.isLoading}
      />
    );
  }
}

const mapStateToProps = ({ modal }) => (
  {
    modalProps: modal.modalProps,
    isLoading: modal.isLoading,
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
