import React from 'react';
import PropTypes from 'prop-types';
import AuthTop from './../AuthTop';
import SocialBox from './../SocialBox';
import AuthBody from './../AuthBody';
import OptionDivider from './../OptionDivider';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = { 
}; 

const AuthWrapper = ({ children }) => {
  return (
    <S.AuthWrapper>
      { children }
    </S.AuthWrapper>
  );
};

AuthWrapper.propTypes = propTypes;
AuthWrapper.defaultProps = defaultProps;
export default AuthWrapper;
