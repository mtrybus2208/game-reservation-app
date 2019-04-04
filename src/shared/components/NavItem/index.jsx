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
  isLink: PropTypes.bool,
};

const defaultProps = {
  mobileIcon: null,
  redirect: '',
  clickHandler: null,
  isLink: true,
};

const NavItem = ({ clickHandler, mobileIcon, redirect, children, isLink }) => {
  const LinkComponent = !isLink ? S.NavButton : NavLink;
  return (
    <S.NavItem>
      <LinkComponent
        to={redirect}
        onClick={clickHandler}
      >
        {mobileIcon && <S.LinkIcon src={mobileIcon} alt="item" />}
        {children && <S.LinkTxt>{children}</S.LinkTxt>}
      </LinkComponent>
    </S.NavItem>
  );
};

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;
export default NavItem;
