import React, { useContext } from 'react';
import { shallow, mount, render } from 'enzyme';
import toJson from 'enzyme-to-json';
import 'jest-styled-components';
import NotAllowed from './index';
import * as S from './styles';

describe('<NotAllowed />', () => {

  beforeEach(() => {});

  afterEach(() => {});
  it('renders without crashing', () => {
    shallow(<NotAllowed />);
  });

  it('should matches the snapshot', () => {
    const notAllowed = shallow(<NotAllowed />);

    expect(toJson(notAllowed)).toMatchSnapshot();
  }); 

  it('should render Alert icon from default props', () => {
    const notAllowed = shallow(<NotAllowed />);

    expect(notAllowed.find('icon-mock')).toHaveLength(1);
  });

  it('should render given icon from customIcon props', () => {
    const Mock = () => 'test';
    const notAllowed = shallow(<NotAllowed customIcon={<Mock />} />);

    expect(notAllowed.find(Mock)).toHaveLength(1);
  });
});
