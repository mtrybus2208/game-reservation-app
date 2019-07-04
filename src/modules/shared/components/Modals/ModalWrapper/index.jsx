// https://medium.com/backticks-tildes/creating-a-modal-component-the-redux-way-cf9f4c5497dd
import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles'; 

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
 
}; 

const ModalWrapper = ({
  children
}) => { 

  return ( 
    <S.ModalWrapper>
      {children}
    </S.ModalWrapper>
  );
};

ModalWrapper.propTypes = propTypes;
ModalWrapper.defaultProps = defaultProps;
export default ModalWrapper;
 