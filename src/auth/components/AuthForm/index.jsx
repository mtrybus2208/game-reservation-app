import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from '../../../shared/components/BaseButton';
import useForm from '../../helpers/useForm';
import * as S from './styles';

const propTypes = {
  submitHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
};

const defaultProps = {}; 

const AuthForm = ({ submitHandler, changeHandler }) => {
  const { values, handleChange, handleSubmit } = useForm(submitHandler, changeHandler);

  return (
    <form onSubmit={handleSubmit}>
      <S.FormItem>
        {/* <S.Label>Email Address</S.Label> */}
        <S.Control>
          <S.Input
            type="email"
            name="email"
            placeholder="Username"
            onChange={handleChange}
            value={values.email ? values.email : ''}
          />
        </S.Control>
      </S.FormItem>

      <S.FormItem>
        {/* <S.Label>Password</S.Label> */}
        <S.Control>
          <S.Input
            type="password"
            name="password"
            placeholder="Password"
            onChange={handleChange}
            value={values.password ? values.password : ''}
          />
        </S.Control>
        <S.ButtonWrapper>
          <BaseButton.Cta>Login</BaseButton.Cta>
        </S.ButtonWrapper>
      </S.FormItem>

      <S.FormItem>
        <S.FormInfo>
          <S.InfoCopy>Remember Me</S.InfoCopy>
          <S.InfoCopy>Reset Password?</S.InfoCopy>
        </S.FormInfo>
      </S.FormItem>

    </form>
  );
};

AuthForm.propTypes = propTypes;
AuthForm.defaultProps = defaultProps;
export default AuthForm;
