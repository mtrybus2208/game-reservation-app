import React from 'react';
import PropTypes from 'prop-types';
import BaseButton from '@/modules/shared/components/BaseButton';
import useForm from '@/modules/auth/helpers/useForm';
import Input from '@/modules/auth/components/AuthForm/Input';
import * as S from './styles';

const propTypes = {
  submitHandler: PropTypes.func.isRequired,
  changeHandler: PropTypes.func.isRequired,
  formType: PropTypes.string,
  fields: PropTypes.array,
};

const defaultProps = {}; 

const AuthForm = ({ formType, fields, changeHandler, submitHandler }) => {
  const { values, handleChange, handleSubmit } = useForm(submitHandler, changeHandler);
  return (
    <form onSubmit={handleSubmit} autoComplete="off">
      {fields.map((field) => (
        <S.FormItem key={field.id}>
          <S.Label>{field.name}</S.Label>
          <S.Control>
            <Input
              type={field.type}
              name={field.name}
              placeholder={field.placeholder}
              onChange={handleChange}
              value={values[field.name] ? values[field.name] : ''}
            />
          </S.Control>
        </S.FormItem>
      ))}
      <S.FormItem>
        <S.ButtonWrapper>
          <BaseButton.Cta>{formType}</BaseButton.Cta>
        </S.ButtonWrapper>
      </S.FormItem>

      <S.FormItem>
        <S.FormInfo>
          <S.InfoCopy>
            {formType === 'register'
              ? (<S.InfoLink to="/auth/login">Already registered? Sign in!</S.InfoLink>)
              : (<S.InfoLink to="/auth/register" >Not a member? Register!</S.InfoLink>)}
          </S.InfoCopy>
          <S.InfoCopy>Reset Password?</S.InfoCopy>
        </S.FormInfo>
      </S.FormItem>

    </form>
  );
};

AuthForm.propTypes = propTypes;
AuthForm.defaultProps = defaultProps;
export default AuthForm;
