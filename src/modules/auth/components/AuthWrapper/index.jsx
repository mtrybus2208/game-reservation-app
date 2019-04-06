import React from 'react';
import PropTypes from 'prop-types';
import Top from './Top';
import Body from './Body';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
  name: PropTypes.node,
};

const defaultProps = { 
}; 

const AuthWrapper = ({ children, name }) => {
  return (
    <S.AuthWrapper>
      <Top name={name} />
      <Body>{children}</Body>
    </S.AuthWrapper>
  );
};

AuthWrapper.propTypes = propTypes;
AuthWrapper.defaultProps = defaultProps;
export default AuthWrapper;
