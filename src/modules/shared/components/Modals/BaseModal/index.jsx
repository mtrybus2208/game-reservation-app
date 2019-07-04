// https://medium.com/backticks-tildes/creating-a-modal-component-the-redux-way-cf9f4c5497dd
import React,  { useState, useEffect } from 'react';
import PropTypes from 'prop-types'; 
import * as S from './styles';

const propTypes = {
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onDecline: PropTypes.func,
};

const defaultProps = {
  title: 'modal',
}; 

const BaseModal = ({
  title,
  onConfirm,
  onDecline,
}) =>
  (
    <S.Modal>
      <S.Header>
        <S.Title>{title}</S.Title>
      </S.Header>
      <S.Body>
        <button
          onClick={onConfirm}
        >OK</button>
        <button
          onClick={onDecline}
        >NOT</button>
      </S.Body>
    </S.Modal> 
  );

BaseModal.propTypes = propTypes;
BaseModal.defaultProps = defaultProps;
export default BaseModal;
