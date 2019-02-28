import styled from 'styled-components';
import PropTypes from 'prop-types';

const TimeLineBox = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background: #1b1f23;
    overflow-x: hidden;
    cursor: -webkit-grab;
    position: relative;
    border-radius: 0;
    padding: 0;
    height: 100%;
    background-image: url(https://res.cloudinary.com/dfmqgkkbx/image/upload/v1551046589/rt.png);
    background-size: auto;
    transform:  translateY(${props => (props.isOpen ? '0' : '-250px')});
    transition: transform .3s ease-in-out;
`;

TimeLineBox.ActualTime = styled.div`
  position: absolute;
  left: ${props => props.distanceFromStart}px;
  top: 10%;
  bottom: 10%;
  width: 50px;
  color: #f2f2f2;
  transform: translateX(-50%);
  z-index: 1;

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

