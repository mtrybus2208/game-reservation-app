import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import { CardSkeleton } from './index';

describe('<CardSkeleton />', () => {
  let props;

  beforeEach(() => {
    props = {
      header: <div>foo</div>,
      footer: <div>foo</div>,
    };
  });

  it('renders without crashing', () => {
    const cardSkeleton = shallow(<CardSkeleton {...props} />);

    expect(toJson(cardSkeleton)).toMatchSnapshot();
  });
});
