import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DeleteGameModal from '@/modules/shared/containers/Modals/DeleteGameModal';
import AddGameModal from '@/modules/shared/containers/Modals/AddGameModal';
import ModalWrapper from '@/modules/shared/components/Modals/ModalWrapper';

const propTypes = {
  modal: PropTypes.object,
};

const defaultProps = {
  modal: null,
};

const MODAL_COMPONENTS = {
  DELETE_GAME_MODAL: DeleteGameModal,
  ADD_GAME_MODAL: AddGameModal,
};

class ModalRoot extends PureComponent {

  render() {
    const { modalType, modalProps } = this.props.modal;

    if (!modalType) {
      return null;
    }

    const SpecificModal = MODAL_COMPONENTS[modalType];

    return (  
      <ModalWrapper>
        <SpecificModal />;
      </ModalWrapper>
    );
  }
}

const mapStateToProps = ({ modal }) => (
  {
    modal,
  }
);

const mapDispatchToProps = dispatch => {
  return { };
};

ModalRoot.propTypes = propTypes;
ModalRoot.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(ModalRoot);
