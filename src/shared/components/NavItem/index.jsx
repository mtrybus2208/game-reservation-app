import React from 'react';
import PropTypes from 'prop-types';
import * as ROUTES from '@/constants/routes';
import * as S from './styles';
import { NavLink } from 'react-router-dom';

const propTypes = {
  mobileIcon: PropTypes.string,
  redirect: PropTypes.string,
  clickHandler: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  mobileIcon: null,
  redirect: '',
  clickHandler: null,
};

const NavItem = ({ clickHandler, mobileIcon, redirect, children }) => {
  return (
    <S.NavItem
      onClick={clickHandler}
    >
      <NavLink
        to={redirect}
      >
        {mobileIcon && <S.LinkIcon src={mobileIcon} alt="item" />}
        {children && <S.LinkTxt>{children}</S.LinkTxt>}
      </NavLink>
    </S.NavItem>
  );
};

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;
export default NavItem;
