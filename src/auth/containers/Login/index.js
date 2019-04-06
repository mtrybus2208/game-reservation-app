import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import AuthWrapper from '@/auth/components/AuthWrapper';
import SocialBox from '@/auth/containers/SocialBox';
import OptionDivider from '@/auth/components/OptionDivider';
import AuthForm from '@/auth/components/AuthForm';
import * as S from './styles';

const propTypes = {
};

const defaultProps = {
};

class Login extends Component {

  changeHandler = this.changeHandler.bind(this);
  submitHandler = this.submitHandler.bind(this);

  changeHandler(data) {
    console.log('Login changeHandler');
    console.log(this);
  }

  submitHandler(data) {
    console.log('Login submitHandler');
    console.log(data);
  }

  getFields = () => {
    return [
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
    ];
  }


  render() {
    return (
      <AuthWrapper name="login">
        <SocialBox />
        <OptionDivider />
        <AuthForm
          formType="login"
          fields={this.getFields()}
          submitHandler={this.submitHandler}
          changeHandler={this.changeHandler}
        />
      </AuthWrapper>
    );
  }
};

Login.propTypes = propTypes;
Login.defaultProps = defaultProps;
export default Login;
