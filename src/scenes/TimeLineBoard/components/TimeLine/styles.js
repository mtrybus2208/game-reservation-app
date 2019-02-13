import styled from 'styled-components';
import PropTypes from 'prop-types';

const TimeLineBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #00000029;
  border-radius: 10px;
  padding: ${props => props.theme.padding.md * 2}px;
  box-shadow: rgba(0,0,0,.12) 0 10px 16px;
  overflow-x: hidden;
  height: 70%;
  cursor: -webkit-grab;
  position: relative;
`;

TimeLineBox.ActualTime = styled.div`
  position: absolute;
  left: ${props =>
    props.distanceFromStart + props.theme.padding.md * 2 + props.theme.padding.lg * 2}px;
  top: 10%;
  bottom: 10%;
  width: 50px;
  color: #f2f2f2;
  transform: translateX(-50%);

  &:after {
    content: '';
    position: absolute;
    top: 15%;
    bottom: 0;
    width: 1px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(255,255,255,0.1);
  }
`;

TimeLineBox.ActualTime.propTypes = {
  distanceFromStart: PropTypes.number,
};

export default TimeLineBox;

