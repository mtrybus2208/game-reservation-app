import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import { ConnectedRouter as Router } from 'react-router-redux';
import { ThemeProvider } from 'styled-components';
import AppGrid from './shared/components/AppGrid';
import AppHeader from './shared/containers/AppHeader';
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
              <AppGrid.SidebarArea>
                <ChatWrapper />
              </AppGrid.SidebarArea>

              <AppGrid.HeaderArea>
                <AppHeader />
              </AppGrid.HeaderArea>
              <Route exact path="/" component={HomeWrapper} />
            </AppGrid>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
