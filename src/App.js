import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import { ConnectedRouter as Router } from 'react-router-redux';
import { ThemeProvider } from 'styled-components';
import AppGrid from './shared/AppGrid';
import AppHeader from './shared/AppHeader';
import ChatWrapper from './chat/components/ChatWrapper';
import HomeWrapper from './home';

import theme from './theme';
class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Router history={this.props.history}>
            <AppGrid>
              <AppGrid.Sidebar>
                <ChatWrapper />
              </AppGrid.Sidebar>

              <AppGrid.Header>
                <AppHeader />
              </AppGrid.Header>

              <AppGrid.Main>
                <Route exact path="/" component={HomeWrapper} />
              </AppGrid.Main>

            </AppGrid>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
