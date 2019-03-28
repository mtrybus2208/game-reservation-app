import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  doSignInWithGoogle: PropTypes.func,
  doSignInWithGithub: PropTypes.func,
};

const defaultProps = { 
};

const SocialBox = ({ doSignInWithGoogle, doSignInWithGithub }) => {
  const socialImages = {
    google: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553594853/search.svg',
    github: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553772637/github-big-logo.svg',
  };

  return (
    <S.SocialBox>
      <S.Row>
        <S.GithubButton
          onClick={doSignInWithGithub}
        >
          <S.SocialImage src={socialImages.github} />
        </S.GithubButton >
        <S.Divider />
        <S.GoogleButton
          onClick={doSignInWithGoogle}
        >
          <S.SocialImage src={socialImages.google} />
        </S.GoogleButton>
      </S.Row>
    </S.SocialBox>
  );
};

SocialBox.propTypes = propTypes;
SocialBox.defaultProps = defaultProps;
export default SocialBox;
