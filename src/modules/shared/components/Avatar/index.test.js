import React from 'react';
import { shallow } from 'enzyme';
import { ThemeProvider } from 'styled-components';
import theme from '@/theme';
import Avatar from './index';
import { create } from "react-test-renderer";
import * as S from './styles';

describe('<Avatar />', () => {
  it('renders without crashing', () => {
    shallow(<Avatar />);
  });

  it('should matches the snapshot', () => {
    const avatar = create(
      <ThemeProvider theme={theme}>
          <Avatar />
        </ThemeProvider>
    ).toJSON();

    expect(avatar).toMatchSnapshot();
  });

  it('should matches the snapshot2', () => {
    const sizesObj = {
      sm: 55,
      md: 100,
      lg: 150,
    };
    const avatar = create(
      <ThemeProvider theme={theme}>
          <Avatar />
        </ThemeProvider>
    ).toJSON();

    expect(avatar).toMatchSnapshot();
  });
});
