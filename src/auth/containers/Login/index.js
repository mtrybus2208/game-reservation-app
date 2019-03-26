import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AuthWrapper from '../../components/AuthWrapper';
import AuthTop from '../../components/AuthTop';
import SocialBox from '../../components/SocialBox';
import AuthBody from '../../components/AuthBody';
import OptionDivider from '../../components/OptionDivider';
import AuthForm from '../../components/AuthForm';
import * as S from './styles';

const propTypes = {
};

const defaultProps = {
};

class Login extends Component {

  changeHandler = this.changeHandler.bind(this)

  submitHandler = (data) => (e) => {
    console.log('submitHandler');
    console.log(data);
  };

  // changeHandler = (data) => (e) => {
  //   console.log('changeHandler');
  //   console.log(data);
  // };

  changeHandler(data) {
    console.log('changeHandler');
    console.log(data);
  }

  render() {
    return (
      <AuthWrapper>
        <AuthTop name="Sign In" />
        <AuthBody>
          <SocialBox />
          <OptionDivider />
          <AuthForm
            submitHandler={this.submitHandler}
            changeHandler={this.changeHandler}
          />
        </AuthBody>
      </AuthWrapper>
    );
  }
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
export default Login;
