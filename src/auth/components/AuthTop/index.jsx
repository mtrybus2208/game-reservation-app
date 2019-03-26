import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  name: PropTypes.string,
};

const defaultProps = { 
}; 

const AuthTop = ({ name }) => {
  return (
    <S.AuthTop>
      <span>{ name }</span>
    </S.AuthTop>
  );
};

AuthTop.propTypes = propTypes;
AuthTop.defaultProps = defaultProps;
export default AuthTop;
