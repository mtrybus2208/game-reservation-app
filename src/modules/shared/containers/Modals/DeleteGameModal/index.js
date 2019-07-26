import React, { PureComponent } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '@/modules/shared/components/Modals/BaseModal';
import * as fromActions from '@/modules/shared/state/actions';
import * as fromHomeActions from '@/modules/home/state/actions';

const propTypes = {
  deleteGame: PropTypes.func,
  hideModal: PropTypes.func,
  modalProps: PropTypes.any,
  isDeleteGameFetching: PropTypes.bool,
};
const defaultProps = {
  isDeleteGameFetching: false,
};
class DeleteGameModal extends PureComponent {

  handlerDeleteGame = this.handlerDeleteGame.bind(this);
  boundActionCreators = bindActionCreators(fromHomeActions, this.props.dispatch);

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
    ...bindActionCreators({
      ...fromHomeActions,
      ...fromActions,
    }, dispatch),
  };
};

DeleteGameModal.propTypes = propTypes;
DeleteGameModal.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(DeleteGameModal);
