import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = { 
};

const defaultProps = { 
}; 

const MainNav = () =>
  (
    <S.MainNav>
      <S.MainNav.Item>
        <S.MainNav.Link to="/">Home</S.MainNav.Link>
      </S.MainNav.Item>
      <S.MainNav.Item>
        <S.MainNav.Link to="/about">About</S.MainNav.Link>
      </S.MainNav.Item>
      <S.MainNav.Item>
        <S.MainNav.Link to="/login">Login</S.MainNav.Link>
      </S.MainNav.Item>
    </S.MainNav>
  );

MainNav.propTypes = propTypes;
MainNav.defaultProps = defaultProps;
export default MainNav;
