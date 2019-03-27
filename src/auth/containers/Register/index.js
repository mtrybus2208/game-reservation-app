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

class Register extends Component {

  static contextType = FirebaseContext;

  componentDidMount() {
    console.log('kajsdhkasdhkjasdh');
    console.log(this.context);
    console.log(this.contextType); 
 }

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

  changeHandler(data) {
    console.log('Register  changeHandler');
    console.log(this);
  }

  submitHandler(data) {
    console.log('@@Register  submitHandler');
    console.log(this.props.firebase);
    const { email, password } = data;

    // this.props.firebase
    //   .doCreateUserWithEmailAndPassword(email, passwordOne)
    //   .then(authUser => {
    //     this.setState({ ...INITIAL_STATE });
    //   })
    //   .catch(error => {
    //     this.setState({ error });
    //   });

    event.preventDefault();
  }

  render() {
    return (
      <AuthWrapper>
        <AuthTop name="Register" />
        <AuthBody>
          <SocialBox />
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

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
export default Register;
