import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom';
import * as ROUTES from '@/constants/routes';
import Register from './containers/Register';
import Login from './containers/Login';
import * as S from './styles';

const propTypes = {};

const defaultProps = {};

const Auth = ({ match }) => (
  <S.Auth>
    <Switch>
      <Route path={ROUTES.LOGIN} component={Login} />
      <Route path={ROUTES.REGISTER} component={Register} />
      <Redirect exact from="/auth" to={ROUTES.LOGIN} />
    </Switch>
  </S.Auth>
);

Auth.propTypes = propTypes;
Auth.defaultProps = defaultProps;
export default Auth;
