import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
};

const defaultProps = { 
}; 

const AuthInput = ({ type, name, placeholder, onChange }) => {
  return (
    <S.Input
      type={type}
      name={name}
      placeholder={placeholder}
      onChange={onChange}
    />
  );
};

AuthInput.propTypes = propTypes;
AuthInput.defaultProps = defaultProps;
export default AuthInput;
