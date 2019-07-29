import { ThemeConsumer } from 'styled-components';
import { shallow } from 'enzyme';
import theme from '@/theme';

export const shallowWithTheme = (children, defaultTheme = theme) => {
  ThemeConsumer._currentValue = defaultTheme;
  return shallow(children);
};
