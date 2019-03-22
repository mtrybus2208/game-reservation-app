import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Logo from '../../components/Logo';
import MainNav from '../../components/MainNav';
import * as S from './styles';

const propTypes = {};

const defaultProps = {}; 


class AppHeader extends Component {
  componentDidMount() { } 

  render() {
    return (
      <S.AppHeader>
      <S.LogoWrapper exact to="/">
        <Logo />
      </S.LogoWrapper>
      <MainNav />
    </S.AppHeader>
    );
  }
}

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
export default AppHeader;
