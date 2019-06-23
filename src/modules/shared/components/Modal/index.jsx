// https://medium.com/backticks-tildes/creating-a-modal-component-the-redux-way-cf9f4c5497dd
import React,  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
 
};

const defaultProps = {
 
}; 

const Modal = ({  }) => {
  const [isOpen, setIsOpen] = useState(true);

  const handlerClickModal = (isOpen) => () => setIsOpen(isOpen);

  if (!isOpen) {
    return null;
  }
  
  return (
    <S.ModalWrapper
      onClick={handlerClickModal(false)}
    >
      <S.Modal>
        <S.Header>
          <S.Title>Do You want to delete Game?</S.Title>
        </S.Header>
        <S.Body>

        </S.Body>
      </S.Modal>
    </S.ModalWrapper>
  );
};

Modal.propTypes = propTypes;
Modal.defaultProps = defaultProps;
export default Modal;
