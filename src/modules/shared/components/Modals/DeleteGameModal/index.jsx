// https://medium.com/backticks-tildes/creating-a-modal-component-the-redux-way-cf9f4c5497dd
import React,  { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import ModalWrapper from '@/modules/shared/components/Modals/ModalWrapper'
import * as S from './styles';

const propTypes = {
 
};

const defaultProps = {
 
}; 

const DeleteGameModal = ({
  modalType,
  modalProps,
  onShow,
  onClose,
}) => { 

  return (
    <ModalWrapper>
      <S.Modal>
        <S.Header>
          <S.Title>Do You want to delete Game?</S.Title>
        </S.Header>
        <S.Body>
          <button
            onClick={onShow}
          >OK</button>
          <button
            onClick={onClose}
          >NOT</button>
        </S.Body>
      </S.Modal> 
    </ModalWrapper>
  );
};

DeleteGameModal.propTypes = propTypes;
DeleteGameModal.defaultProps = defaultProps;
export default DeleteGameModal;
