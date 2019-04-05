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
  location: PropTypes.object,
};

const defaultProps = {
  mobileIcon: null,
  redirect: '',
  clickHandler: null,
};

const NavItem = ({
  clickHandler,
  mobileIcon,
  redirect,
  children,
  location }) => (
    <S.NavItem
      isActive={location.pathname === redirect}
    >
      <NavLink
        to={redirect}
        onClick={clickHandler}
      >
        {mobileIcon && <S.LinkIcon src={mobileIcon} alt="item" />}
        {children && <S.LinkTxt>{children}</S.LinkTxt>}
      </NavLink>
    </S.NavItem>
);

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;
export default NavItem;
