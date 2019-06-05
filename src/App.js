/* eslint-enable react/forbid-foreign-prop-types */
import React, { Component, Suspense, lazy } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'connected-react-router';
import { connect } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import AppGrid from './modules/shared/components/AppGrid';
import AppHeader from './modules/shared/containers/AppHeader';
import GlobalChatWrapper from './chat/components/GlobalChatWrapper';
import DirectChatWrapper from './chat/components/DirectChatWrapper';
import theme from './theme';

const Auth = lazy(() => import('./modules/auth'));
const Home = lazy(() => import('./modules/home'));

Route.propTypes.component = PropTypes.oneOfType([
  Route.propTypes.component,
  PropTypes.object,
]);

const propTypes = {
  ui: PropTypes.object.isRequired,
  sessionState: PropTypes.object.isRequired,
};

const defaultProps = {};

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }
  
  body {
    margin: 0;
    padding: 0; 
    font-family: 'Roboto', sans-serif;
    color: #747a81;
    background: #141619;
    box-sizing: border-box;
  }
`;

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <GlobalStyle />
        <ThemeProvider theme={theme}>
          <Router history={this.props.history}>
            <AppGrid>
              <AppGrid.SidebarArea leftGridOpen={this.props.ui.leftSidebarOpened}>
                {this.props.ui.chatMode !== 'GLOBAL' ? (
                  <DirectChatWrapper />
                ) : (
                  <GlobalChatWrapper authUser={this.props.sessionState.authUser} />
                )}
              </AppGrid.SidebarArea>

              <AppGrid.HeaderArea>
                <AppHeader />
              </AppGrid.HeaderArea>
              <Suspense fallback={<div></div>}>
                <Switch>
                  <Route path="/auth" component={Auth} />
                  <Route exact path="/" component={Home} />
                </Switch>
              </Suspense>
            </AppGrid>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}


const mapStateToProps = ({ ui, sessionState }) => (
  { 
    ui,
    sessionState,
  }
);

const mapDispatchToProps = () => {
  return { }
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(App);
