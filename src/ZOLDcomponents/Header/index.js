import React from 'react';
import PropTypes from 'prop-types';
import MainNav from './components/MainNav';
import Logo from '../Logo';
import * as S from './styles';

const propTypes = { 
};

const defaultProps = { 
}; 

const Header = () => { 
  return (
    <S.Header>
      <S.Header.LogoWrapper>
        <Logo />
      </S.Header.LogoWrapper>
      <MainNav />
    </S.Header>
  );
};

Header.propTypes = propTypes;
Header.defaultProps = defaultProps;
export default Header;
