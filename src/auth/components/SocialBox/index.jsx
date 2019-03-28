import React from 'react';
import PropTypes from 'prop-types';
import AuthTop from './../AuthTop';
import * as S from './styles';

const propTypes = {
  doSignInWithGoogle: PropTypes.func,
};

const defaultProps = {};

const SocialBox = ({ doSignInWithGoogle }) => {
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
      <S.SocialButton
        bg="#ff624d"
        onClick={doSignInWithGoogle}
      >
        <S.SocialImage src={socialImages.google} />
      </S.SocialButton>
    </S.SocialBox>
  );
};

SocialBox.propTypes = propTypes;
SocialBox.defaultProps = defaultProps;
export default SocialBox;
