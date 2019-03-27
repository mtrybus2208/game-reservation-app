import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import  { FirebaseContext } from '@/shared/components/Firebase';
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
      <AuthWrapper>
        <FirebaseContext.Consumer>
          {firebase => {
            console.log(firebase)
            return <div>I've access to Firebase and render something.z</div>;
          }}
        </FirebaseContext.Consumer>
        <AuthTop name="Sign In" />
        <AuthBody>
          <SocialBox />
          <OptionDivider />
          <AuthForm
            formType="login"
            fields={this.getFields()}
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
