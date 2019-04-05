import React from 'react';
import PropTypes from 'prop-types';
import * as ROUTES from '@/constants/routes';
import * as S from './styles';
import { NavLink } from 'react-router-dom';

const propTypes = {
  mobileIcon: PropTypes.string,
  url: PropTypes.string,
  onLinkClick: PropTypes.func,
  children: PropTypes.node,
  location: PropTypes.object,
};

const defaultProps = {
  mobileIcon: null,
  url: '',
  onLinkClick: null,
};


const NavItem = ({
  onLinkClick,
  mobileIcon,
  url,
  children,
  location }) => (
    <S.NavItem
      isActive={location.pathname === url}
    >
      <NavLink
        to={url}
        onClick={onLinkClick(url)}
      >
        {mobileIcon && <S.LinkIcon src={mobileIcon} alt="item" />}
        {children && <S.LinkTxt>{children}</S.LinkTxt>}
      </NavLink>
    </S.NavItem>
);

NavItem.propTypes = propTypes;
NavItem.defaultProps = defaultProps;
export default NavItem;
