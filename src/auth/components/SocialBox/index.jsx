import React from 'react';
import PropTypes from 'prop-types';
import AuthTop from './../AuthTop';
import * as S from './styles';

const propTypes = {
};

const defaultProps = { 
};

const SocialBox = ({ }) => {
  const socialImages = {
    facebook: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553528530/facebook-logo_1.svg',
    google: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553594853/search.svg',
  };

  return (
    <S.SocialBox>
      <S.SocialButton>
        <S.SocialImage src={socialImages.facebook} />
      </S.SocialButton>
      <S.Divider />
      <S.SocialButton bg="#ff624d">
        <S.SocialImage src={socialImages.google} />
      </S.SocialButton>
    </S.SocialBox>
  );
};

SocialBox.propTypes = propTypes;
SocialBox.defaultProps = defaultProps;
export default SocialBox;
