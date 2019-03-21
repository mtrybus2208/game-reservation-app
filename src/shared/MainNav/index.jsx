import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  loginImagePath: PropTypes.string,
  chatImagePath: PropTypes.string,
};

const defaultProps = {
  loginImagePath: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/login.svg',
  chatImagePath: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
};

const MainNav = ({ loginImagePath, chatImagePath }) => {
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

        <S.MobileLink to="/auth//login">
          <S.ImageLink src={loginImagePath} />
        </S.MobileLink>
      </S.Item>

      <S.Item>
        <S.MobileChatTrigger>
          <S.ImageLink src={chatImagePath} />
        </S.MobileChatTrigger>
      </S.Item>
    </S.MainNav>
  );
};

MainNav.propTypes = propTypes;
MainNav.defaultProps = defaultProps;
export default MainNav;
