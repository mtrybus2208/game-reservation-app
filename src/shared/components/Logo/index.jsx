import React from 'react';
import PropTypes from 'prop-types';
import * as ROUTES from '@/constants/routes';
import * as S from './styles';

const propTypes = {
  path: PropTypes.string,
  redirectHandler: PropTypes.func.isRequired,
};

const defaultProps = {
  path: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1552903737/gamepad-controller.svg',
};

const Logo = ({ path, redirectHandler }) => {
  const logoClickHandler = (path) => (e) => {
    e.preventDefault();
    redirectHandler(path);
  };

  return (
    <S.Logo onClick={logoClickHandler(ROUTES.HOME)}>
      <S.Image src={path} />
      <S.Title>
        <S.Header>
          Reser
          <S.HeaderHighlighted>v</S.HeaderHighlighted> 
          ly
        </S.Header>
        <S.Description>Reserve your game!</S.Description>
      </S.Title>
    </S.Logo>
  );
};

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;
export default Logo;
