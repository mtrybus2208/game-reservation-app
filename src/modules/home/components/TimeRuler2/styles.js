import styled from 'styled-components';
import PropTypes from 'prop-types';

export const TimeRuler = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: ${props => (props.height)}px;
  @media ${({ theme }) => theme.media.tablet} {
    min-width: ${props => (props.height)}px;
    width: 100%;
    height: 100%;
    min-height: auto;
  }
`;

export const Wrapper = styled.div`
    display: flex; 
    align-items: center;
    height: 100%;
`;

export const HoursDivider = styled.div` 
  position: absolute;
  left: 0;
  top:  ${props => props.position}px;
  height:  ${props => props.width - 1}px;
  background: #23272d;
  width: 70px;
  box-shadow: inset 0 9px 24px -4px rgba(056, 60, 69, .6);
  z-index: 3;
  @media ${({ theme }) => theme.media.tablet} {
    width:  ${props => props.width - 1}px;
    left: ${props => props.position}px;
    top:  0;
    height: 100px;
  }

  &:after {
    content: "${props => (props.time)}";
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
  }
`;

HoursDivider.propTypes = {
  position: PropTypes.number,
  time: PropTypes.string,
  width: PropTypes.number,
};

export default TimeRuler;
