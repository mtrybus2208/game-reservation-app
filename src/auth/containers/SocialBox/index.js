import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromActions from '@/auth/state/actions';
import * as S from './styles';

const propTypes = {
  socialAuthGoogle: PropTypes.func,
  socialAuthGithub: PropTypes.func,
};

const defaultProps = {
};

const socialImages = {
  google: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553594853/search.svg',
  github: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553772637/github-big-logo.svg',
};

class SocialBox extends Component {
  componentDidMount() {}

  handleSignInWithGoogle = () => () => {
    this.props.socialAuthGoogle();
  }

  handleSignInWithGithub = () => () => {
    this.props.socialAuthGithub();
  }

  render() {
    return (
      <S.SocialBox>
        <S.Row>
          <S.GithubButton
            onClick={this.handleSignInWithGithub()}
          >
            <S.SocialImage src={socialImages.github} />
          </S.GithubButton >
          <S.Divider />
          <S.GoogleButton
            onClick={this.handleSignInWithGoogle()}
          >
            <S.SocialImage src={socialImages.google} />
          </S.GoogleButton>
        </S.Row>
      </S.SocialBox>
    );
  }
}

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch => {
  return {
    socialAuthGoogle: () => {
      dispatch(fromActions.socialAuthGoogle());
    },
    socialAuthGithub: () => {
      dispatch(fromActions.socialAuthGithub());
    },
  };
};

SocialBox.propTypes = propTypes;
SocialBox.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(SocialBox);