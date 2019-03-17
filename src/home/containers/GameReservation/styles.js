import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';

export const CtaWrapper = styled.div`
  display: flex;
  background:  ${props => props.theme.base.light};
  height: 80px;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
  align-items: stretch;
  font-size: 11px;
`;