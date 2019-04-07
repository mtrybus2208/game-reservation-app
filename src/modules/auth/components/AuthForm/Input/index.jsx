import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  type: PropTypes.string,
  name: PropTypes.string,
  placeholder: PropTypes.string,
  onChange: PropTypes.func,
  mandatory: PropTypes.bool,
};

const defaultProps = {
  mandatory: true,
}; 
//label
const AuthInput = ({ type, name, placeholder, onChange, mandatory }) => {
  return (
    <S.Input
      type={type ? type : name}
      name={name}
      placeholder={placeholder ? placeholder : name}
      onChange={onChange}
    />
  );
};

AuthInput.propTypes = propTypes;
AuthInput.defaultProps = defaultProps;
export default AuthInput;
