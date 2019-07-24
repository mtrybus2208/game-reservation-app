import React from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import Avatar from './index';
import * as S from './styles';

describe('<Avatar />', () => {
  it('renders without crashing', () => {
    shallow(<Avatar />);
  });

  it('should matches the snapshot', () => {
    const avatar = shallow(<Avatar />);

    expect(toJson(avatar)).toMatchSnapshot();
  });

  it('should render without crashing given the props', () => {
    const props = {
      path: 'test',
      size: 'md',
      rounded: true,
    };
    const avatar = shallow((<Avatar {...props} />));

    expect(toJson(avatar)).toMatchSnapshot();
  });

  it('should set the path prop as the `src` prop on the S.Image component', () => {
    const props = {
      path: 'test',
      size: 'md',
      rounded: true,
    };
    const wrapper = shallow(<Avatar {...props} />);
    const SImage = wrapper.find(S.Image);

    expect(SImage.props().src).toBe(props.path);
  });
});
