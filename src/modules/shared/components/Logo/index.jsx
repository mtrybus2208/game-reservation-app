import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  path: PropTypes.string,
};

const defaultProps = {
  path: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1552903737/gamepad-controller.svg',
};

const Logo = ({ path }) => (
  <S.Logo>
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

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;
export default Logo;
