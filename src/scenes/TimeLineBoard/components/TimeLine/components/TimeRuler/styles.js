import styled from 'styled-components';
import PropTypes from 'prop-types';

const Ruler = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #222; 
  width: 10px;
  box-shadow: rgba(0,0,0,.12) 0 1px 6px;
  height: ${props => (props.height)}px; 
`;

Ruler.HoursDivider = styled.div` 
  position: absolute;
  top: ${props => (props.position)}px;
  left: 50%;
  transform: translateX(-50%);
  height: 3px;
  width: 100px;
  background: red;

  &:after {
    content: "${props => (props.time)}";
    position: absolute;
    left: -80%;
    top: -50%;
    transform: translate(-50%, -50%);
  }
`;

Ruler.HoursDivider.propTypes = {
  position: PropTypes.number,
  time: PropTypes.string,
};

export default Ruler;
