import { configure, addDecorator  } from '@storybook/react';
import theme from '../src/theme';
import React from 'react';
import { ThemeProvider } from 'styled-components';

function loadStories() {
  require('../src/stories'); 
}

addDecorator((story) => (
  <ThemeProvider theme={theme}>
    {story()}
  </ThemeProvider>
))

configure(loadStories, module);
