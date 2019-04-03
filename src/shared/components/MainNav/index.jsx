import React from 'react';
import PropTypes from 'prop-types';
import * as ROUTES from '@/constants/routes';
import * as S from './styles';
import NavItem from '../NavItem';

const propTypes = {
  toggleLeftSidebar: PropTypes.func.isRequired,
  isLeftSidebarOpened: PropTypes.bool,
  userAuth: PropTypes.object,
};

const defaultProps = {
};

const mobileIcons = {
  login: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/login.svg',
  chat: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
  activeChat: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg',
}

const MainNav = ({ isLeftSidebarOpened, toggleLeftSidebar, userAuth }) => {
  const toogleSidebar = (e) => {
    e.preventDefault();
    console.log('toogleSidebar')
  }
  const logoutHandler = (e) => {
    e.preventDefault();
    console.log('toogleSidebar')
  }
  const loginHandler = (e) => {
    e.preventDefault();
    console.log('toogleSidebar')
  }
  console.log('{name: userAuth}');
  console.log(userAuth);
  return (
    <S.MainNav>
      <NavItem redirect={ROUTES.HOME}>
        Home
      </NavItem>
      {
        !!userAuth
          ? (
            <NavItem mobileIcon={mobileIcons.login} clickHandler={loginHandler}>
              Login
            </NavItem>
          )
          : (
            <NavItem mobileIcon={mobileIcons.login} clickHandler={logoutHandler}>
              Logout
            </NavItem>
          )
      }
      <NavItem
        mobileIcon={mobileIcons.chat}
        clickHandler={toogleSidebar}
      />
    </S.MainNav>
  );
};

MainNav.propTypes = propTypes;
MainNav.defaultProps = defaultProps;
export default MainNav;
