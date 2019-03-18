import React from 'react';
import PropTypes from 'prop-types';
import Logo from '../Logo';
import MainNav from '../MainNav';
import * as S from './styles';

const propTypes = {};

const defaultProps = {}; 

const AppHeader = ({}) => {
  return (
    <S.AppHeader>
      <S.LogoWrapper exact to="/">
        <Logo />
      </S.LogoWrapper>
      <MainNav />
    </S.AppHeader>
  );
};

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
export default AppHeader;
