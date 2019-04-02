import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const AuthBody = ({ children }) => (
  <S.AuthBody>{children}</S.AuthBody>
);

AuthBody.propTypes = propTypes;
AuthBody.defaultProps = defaultProps;
export default AuthBody;
