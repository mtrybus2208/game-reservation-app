import React, { Component } from 'react';
import { Route } from 'react-router-dom'; 
import { ConnectedRouter as Router } from 'react-router-redux';
import { ThemeProvider } from 'styled-components';

import TimeLineBoard from './scenes/TimeLineBoard';
import theme from './theme';
class App extends Component {
  componentDidMount() {}

  render() {
    return (
      <React.Fragment>
        <ThemeProvider theme={theme}>
          <Router history={this.props.history}>
            <React.Fragment>
              <Route exact path="/" component={TimeLineBoard} />
            </React.Fragment>
          </Router>
        </ThemeProvider>
      </React.Fragment>
    );
  }
}

export default App;
