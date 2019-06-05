import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { ConnectedRouter as Router } from 'react-router-redux';
import { connect } from 'react-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import AppGrid from './modules/shared/components/AppGrid';
import AppHeader from './modules/shared/containers/AppHeader';
import ChatSidebar from './chat/components/ChatSidebar/index';
import Home from './modules/home';
import Auth from './modules/auth';
import theme from './theme';

const propTypes = {
  ui: PropTypes.object.isRequired,
  sessionState: PropTypes.object.isRequired,
  chat: PropTypes.object.isRequired,
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
                <ChatSidebar 
                  authUser={this.props.sessionState.authUser} 
                  chat={this.props.chat}
                />
              </AppGrid.SidebarArea>

              <AppGrid.HeaderArea>
                <AppHeader />
              </AppGrid.HeaderArea>
              <Switch>
                <Route path="/auth" component={Auth} />
                <Route exact path="/" component={Home} />
              </Switch>
            </AppGrid>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ ui, sessionState, chat }) => (
  { 
    ui,
    sessionState,
    chat,
  }
);

const mapDispatchToProps = () => {
  return { }
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(App);
