import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';

export const CtaWrapper = styled.div`
  position: fixed;
  bottom: 30px;
  left: 20px;
  right: 20px;
  height: 50px;
  display: flex;
  background:  ${props => props.theme.base.light};
  height: 50px;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
  align-items: stretch;
  font-size: 11px;
  @media ${({ theme }) => theme.media.tablet} {
    position: static;
    height: 80px;
  }
`;
