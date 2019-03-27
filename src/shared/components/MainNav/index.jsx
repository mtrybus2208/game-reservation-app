import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  loginImagePath: PropTypes.string,
  chatImagePath: PropTypes.string,
  activeChatImagePath: PropTypes.string,
  toggleLeftSidebar: PropTypes.func.isRequired,
  isLeftSidebarOpened: PropTypes.bool,
};

const defaultProps = {
  loginImagePath: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/login.svg',
  chatImagePath: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
  activeChatImagePath: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg',
};

const MainNav = ({ loginImagePath, chatImagePath, activeChatImagePath, isLeftSidebarOpened, toggleLeftSidebar }) => {
  return (
    <S.MainNav>
      <S.Item>
        <S.DesktopLink exact to="/">
          Home
        </S.DesktopLink>
      </S.Item>

      <S.Item>
        <S.DesktopLink to="/about">
          About
        </S.DesktopLink>
      </S.Item>

      <S.Item>
        <S.DesktopLink to="/auth/login">
          Login
        </S.DesktopLink>

        <S.MobileLink to="/auth/login" onClick={isLeftSidebarOpened ? toggleLeftSidebar : ''}>
          <S.ImageLink src={loginImagePath} />
        </S.MobileLink>
      </S.Item>

      <S.Item>
        <S.MobileChatTrigger onClick={toggleLeftSidebar}>
          <S.ImageLink src={isLeftSidebarOpened ? activeChatImagePath : chatImagePath} />
        </S.MobileChatTrigger>
      </S.Item>
    </S.MainNav>
  );
};

MainNav.propTypes = propTypes;
MainNav.defaultProps = defaultProps;
export default MainNav;
