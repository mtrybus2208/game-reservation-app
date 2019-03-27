import React from 'react';
import PropTypes from 'prop-types';
import AuthTop from './../AuthTop';
import SocialBox from './../SocialBox';
import AuthBody from './../AuthBody';
import * as S from './styles';

const propTypes = {
};

const defaultProps = { 
}; 

const AuthWrapper = ({ }) => {
  return (
    <S.AuthWrapper>
      <AuthTop>
        <span>Sign In</span>
      </AuthTop>
      <AuthBody>
        <SocialBox />
      </AuthBody>
    </S.AuthWrapper>
  );
};

AuthWrapper.propTypes = propTypes;
AuthWrapper.defaultProps = defaultProps;
export default AuthWrapper;
