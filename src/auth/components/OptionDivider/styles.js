import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';

export const OptionDivider = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;
  margin: 50px auto;

  @media ${({ theme }) => theme.media.tablet} {
    max-width: 80%;
  }
`;

export const OptionBox = styled.div`
  font-size: 15px;
  line-height: 1.87;
  letter-spacing: 0.2px;
  color: #798fa8;
  position: relative;
  text-transform: uppercase;
  text-align: center;
  flex: 1;

  &:after {
      content: '';
      position: absolute;
      width: 100%;
      left: 0;
      top: 50%;
      height: 1px;
      background: ${rgba('#fff', 0.2)};
  }
`;

export const OptionCopy = styled.span`
    background-color: #1b1e22;
    padding: 15px;
    position: relative;
    z-index: 1;
    letter-spacing: 3px;
`;
