import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as fromActions from '@/modules/shared/state/actions';
import DeleteGameModal from '@/modules/shared/components/Modals/DeleteGameModal';
import AddGameModal from '@/modules/shared/components/Modals/AddGameModal';

const propTypes = {
  modal: PropTypes.object,
  showModal: PropTypes.func,
  hideModal: PropTypes.func,
};

const defaultProps = {
  modal: null,
};

const MODAL_COMPONENTS = {
  DELETE_GAME_MODAL: DeleteGameModal,
  ADD_GAME_MODAL: AddGameModal,
}

class ModalRoot extends PureComponent {

  handlerClose = this.handlerClose.bind(this);
  handlerShow = this.handlerShow.bind(this);

  handlerClose() {
    this.props.hideModal();
  }

  handlerShow(modalProps, modalType) {
    this.props.showModal(modalProps, modalType);
  }

  renderSpecificModal() {
    const { modalType, modalProps } = this.props.modal;

    if (!modalType) {
      return null;
    }
    const SpecificModal = MODAL_COMPONENTS[modalType];
    return <SpecificModal {...modalProps} />;
    

    // return modalType === 'confirmation' && (
    //   <Modal
    //     modalType={modalType}
    //     modalProps={modalProps}
    //     onShow={this.handlerShow}
    //     onClose={this.handlerClose}
    //   />
    // );
  }

  render() {
    return (
      this.renderSpecificModal()
    );
  }
}

const mapStateToProps = ({ modal }) => (
  {
    modal,
  }
);

const mapDispatchToProps = dispatch => {
  return {
    hideModal: () => {
      dispatch(fromActions.hideModal());
    },
    showModal: (modalProps, modalType) => {
      dispatch(fromActions.showModal({ modalProps, modalType }));
    },
  };
};

ModalRoot.propTypes = propTypes;
ModalRoot.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
