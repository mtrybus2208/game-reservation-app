import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
};

const defaultProps = { 
}; 

const AuthInput = ({ type, name, placeholder }) => {
  return (
    <S.Input
      type={type}
      name={name}
      placeholder={placeholder}
    />
  );
};

AuthInput.propTypes = propTypes;
AuthInput.defaultProps = defaultProps;
export default AuthInput;
