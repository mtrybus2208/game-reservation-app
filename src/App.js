import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Route, Switch, Redirect } from 'react-router-dom'; 
import { ConnectedRouter as Router } from 'react-router-redux';
import { connect } from 'react-redux';
import { ThemeProvider } from 'styled-components';
import AppGrid from './shared/components/AppGrid';
import AppHeader from './shared/containers/AppHeader';
import ChatWrapper from './chat/components/ChatWrapper';
import Home from './home';
import Auth from './auth';
import theme from './theme';

const propTypes = {
  ui: PropTypes.object.isRequired
};

const defaultProps = {}; 
class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Router history={this.props.history}>
            <AppGrid>
              <AppGrid.SidebarArea leftGridOpen={this.props.ui.leftSidebarOpened}>
                <ChatWrapper />
              </AppGrid.SidebarArea>

              <AppGrid.HeaderArea>
                <AppHeader />
              </AppGrid.HeaderArea>
              <Switch>
                <Route exact path="/" component={Home} />
                <Route path="/auth" component={Auth} />
              </Switch>
            </AppGrid>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}


const mapStateToProps = ({ ui }) => (
  { ui }
);

const mapDispatchToProps = dispatch => {
  return { }
};

App.propTypes = propTypes;
App.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(App);
