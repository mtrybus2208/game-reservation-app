import React from 'react';
import PropTypes from 'prop-types';
import * as ROUTES from '@/constants/routes';
import * as S from './styles';
import NavItem from '../NavItem';
import BaseIcon from '../BaseIcon';

const propTypes = {
  redirectHandler: PropTypes.func,
  authUser: PropTypes.object,
};

const defaultProps = {
};

const mobileIcons = {
  login: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/login.svg',
  chat: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
  activeChat: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg',
}

const MainNav = ({ authUser, redirectHandler }) => {
  const itemClickHandler = (path) => (e) => {
    e.preventDefault();
    redirectHandler(path);
  };

  return (
    <React.Fragment>
      <S.IconButton onClick={itemClickHandler(false)}>
        <BaseIcon />
      </S.IconButton>
      <S.MainNav>
        <NavItem redirect={ROUTES.HOME}>
          Home
        </NavItem>
        {
          !!authUser
            ? (
              <NavItem
                mobileIcon={mobileIcons.login}
                clickHandler={itemClickHandler(ROUTES.REGISTER)}
                redirect={ROUTES.REGISTER}
              >
                Logout
              </NavItem>
            )
            : (
              <NavItem
                mobileIcon={mobileIcons.login}
                clickHandler={itemClickHandler(ROUTES.LOGIN)}
                redirect={ROUTES.LOGIN}
              >
                Login
              </NavItem>
            )
        }
      </S.MainNav>
    </React.Fragment>
  );
};

MainNav.propTypes = propTypes;
MainNav.defaultProps = defaultProps;
export default MainNav;
