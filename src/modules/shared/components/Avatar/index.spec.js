import React from 'react';
import { shallow, mount } from 'enzyme';
import { create } from 'react-test-renderer';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import { ThemeProvider } from 'styled-components';
import theme from '@/theme';
import Avatar from './index';
import * as S from './styles';

describe('<Avatar />', () => {
  it('renders without crashing', () => {
    shallow(<Avatar />);
  });

  it('should matches the snapshot', () => {
    const avatar = create(
      <ThemeProvider theme={theme}>
        <Avatar />
      </ThemeProvider>,
    ).toJSON();

    expect(avatar).toMatchSnapshot();
  });

  it('should render without crashing given the props', () => {
    const props = {
      path: 'test',
      size: 'md',
      rounded: true,
    };

    const avatar = shallow((
      <ThemeProvider theme={theme}>
        <Avatar {...props} />
      </ThemeProvider>
    ));

    expect(toJson(avatar)).toMatchSnapshot();
  });

  it('should set the path prop as the `src` prop on the S.Image component', () => {
    const props = {
      path: 'test',
      rounded: true,
    }; 
    const wrapper = shallow(
      <ThemeProvider theme={theme}>
        <Avatar {...props} />
      </ThemeProvider>
    );  
    const PickerComponent = wrapper.find(S.Avatar);
    expect(PickerComponent).to.have.lengthOf(1);
  });
});
