import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import BaseModal from '@/modules/shared/components/Modals/BaseModal';
import * as fromActions from '@/modules/shared/state/actions';
import * as fromHomeActions from '@/modules/home/state/actions';

const propTypes = {
  deleteGame: PropTypes.func,
  hideModal: PropTypes.func,
};

const defaultProps = { 
}; 

class DeleteGameModal extends PureComponent {
  render() {
    return (
      <BaseModal
        title="Do You want to delete this game?"
        onConfirm={this.props.deleteGame}
        onDecline={this.props.hideModal}
      />
    );
  }
}

const mapStateToProps = ({ }) => (
  { }
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
