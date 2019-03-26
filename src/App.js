import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom'; 
import { ConnectedRouter as Router } from 'react-router-redux';
import { ThemeProvider, createGlobalStyle } from 'styled-components';
import AppGrid from './shared/components/AppGrid';
import AppHeader from './shared/containers/AppHeader';
import ChatWrapper from './chat/components/ChatWrapper';
import Home from './home';
import Auth from './auth';
import theme from './theme';

const GlobalStyle = createGlobalStyle`
  body {
    margin: 0;
    padding: 0; 
    font-family: 'Roboto', sans-serif;
    color: #747a81;
    background: #141619;
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
              <AppGrid.SidebarArea>
                <ChatWrapper />
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

export default App;
