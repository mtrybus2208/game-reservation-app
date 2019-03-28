import React from 'react';
import PropTypes from 'prop-types';
import AuthTop from './../AuthTop';
import * as S from './styles';

const propTypes = {};

const defaultProps = {};

const socialImages = {
  facebook: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553528530/facebook-logo_1.svg',
}

const SocialBox = () => (
  <S.SocialBox>
    <S.SocialButton>
      <S.SocialImage src={socialImages.facebook}/>
    </S.SocialButton>
    <S.Divider />
    <S.SocialButton bg="#ff624d">g</S.SocialButton>
  </S.SocialBox>
);

SocialBox.propTypes = propTypes;
SocialBox.defaultProps = defaultProps;
export default SocialBox;
