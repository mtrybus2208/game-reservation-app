import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { connect } from 'react-redux';
import * as fromActions from '@/auth/state/actions';
import AuthWrapper from '../../components/AuthWrapper';
import AuthTop from '../../components/AuthTop';
import SocialBox from '../../components/SocialBox';
import AuthBody from '../../components/AuthBody';
import OptionDivider from '../../components/OptionDivider';
import AuthForm from '../../components/AuthForm';
import * as S from './styles';

const propTypes = {
  socialAuthGoogle: PropTypes.func,
};

const defaultProps = {
};

class Register extends Component {

  getFields = () => (
    [
      {
        id: shortid.generate(),
        name: 'email',
        type: 'email',
        label: 'Email',
        placeholder: 'Email',
        mandatory: true,
      },
      {
        id: shortid.generate(),
        name: 'password',
        type: 'password',
        label: 'Password',
        placeholder: 'Password',
        mandatory: true,
      },
      {
        id: shortid.generate(),
        name: 'confirm-password',
        type: 'password',
        label: 'Confirm Password',
        placeholder: 'Confirm password',
        mandatory: true,
      },
    ]);

  changeHandler = this.changeHandler.bind(this);
  submitHandler = this.submitHandler.bind(this);
  doSignInWithGoogle = this.doSignInWithGoogle.bind(this);
  doSignInWithGithub = this.doSignInWithGithub.bind(this);

  changeHandler(data) {
    console.log('Register  changeHandler');
    console.log(this);
  }

  submitHandler(data) {
    console.log('@@Register  submitHandler');
    const { email, password } = data;
    event.preventDefault();
  }

  doSignInWithGoogle() {
    this.props.socialAuthGoogle();
  }
  
  doSignInWithGithub() {
    this.props.socialAuthGithub();
  }

  render() {
    return (
      <AuthWrapper>
        <AuthTop name="Register" />
        <AuthBody>
          <SocialBox
            doSignInWithGoogle={this.doSignInWithGoogle}
            doSignInWithTwitter={this.doSignInWithTwitter}
            doSignInWithGithub={this.doSignInWithGithub}
          />
          <OptionDivider />
          <AuthForm
            formType="register"
            fields={this.getFields()}
            submitHandler={this.submitHandler}
            changeHandler={this.changeHandler}
          />
        </AuthBody>
      </AuthWrapper>
    );
  }
};

const mapStateToProps = ({ messageState, sessionState }) => (
  {
    messageState,
    sessionState,
  }
);

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

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Register);
