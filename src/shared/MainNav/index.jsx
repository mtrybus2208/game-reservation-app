import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {};

const defaultProps = {};

const MainNav = ({}) => {
  return (
    <S.MainNav>
      <S.Item>
        <S.Link exact to="/">Home</S.Link>
      </S.Item>
      <S.Item>
        <S.Link to="/about">About</S.Link>
      </S.Item>
      <S.Item>
        <S.Link to="/login">Login</S.Link>
      </S.Item>
    </S.MainNav>
  );
};

MainNav.propTypes = propTypes;
MainNav.defaultProps = defaultProps;
export default MainNav;
