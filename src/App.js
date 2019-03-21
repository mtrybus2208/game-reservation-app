import React, { Component } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom'; 
import { ConnectedRouter as Router } from 'react-router-redux';
import { ThemeProvider } from 'styled-components';
import AppGrid from './shared/AppGrid';
import AppHeader from './shared/AppHeader';
import ChatWrapper from './chat/components/ChatWrapper';
import Home from './home';
import Auth from './auth';
import theme from './theme';

class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Router history={this.props.history}>
            <AppGrid>
              <AppGrid.SidebarArea>
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

export default App;
