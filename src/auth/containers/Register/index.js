import React, { Component } from 'react';
import PropTypes from 'prop-types';
import shortid from 'shortid';
import { connect } from 'react-redux';
import * as fromActions from '@/auth/state/actions';
import SocialBox from '@/auth/containers/SocialBox';
import AuthWrapper from '../../components/AuthWrapper';
import OptionDivider from '../../components/OptionDivider';
import AuthForm from '../../components/AuthForm';
import * as S from './styles';

const propTypes = {
};

const defaultProps = {
};

class Register extends Component {

  getFields = () => (
    [
      {
        id: shortid.generate(),
        name: 'email',
      },
      {
        id: shortid.generate(),
        name: 'name',
        type: 'text',
      },
      {
        id: shortid.generate(),
        name: 'password',
      },
      {
        id: shortid.generate(),
        name: 'confirm-password',
        type: 'password',
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
    const { email, password } = data;
    event.preventDefault();
  }

  render() {
    return (
      <AuthWrapper name="register">
        <SocialBox />
        <OptionDivider />
        <AuthForm
          formType="register"
          fields={this.getFields()}
          submitHandler={this.submitHandler}
          changeHandler={this.changeHandler}
        />
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

const mapDispatchToProps = dispatch => ({});

Register.propTypes = propTypes;
Register.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(Register);
