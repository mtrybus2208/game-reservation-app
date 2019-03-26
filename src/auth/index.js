import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom'; 
import Register from './containers/Register';
import Login from './containers/Login';
import * as S from './styles';

const propTypes = {};

const defaultProps = {}; 

const Auth = ({ match }) => {
  return (
    <S.Auth>
      <Switch>
        <Route path={`${match.path}/login`} component={Login} />
        <Route path={`${match.path}/register`} component={Register} />
        <Redirect exact from="/auth" to="/auth/login" />
      </Switch>
    </S.Auth>
  );
} 

Auth.propTypes = propTypes;
Auth.defaultProps = defaultProps;
export default Auth;