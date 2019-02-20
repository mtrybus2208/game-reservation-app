import styled from 'styled-components';
import PropTypes from 'prop-types';

const Ruler = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #e3d3d6;
  height: 1px;
  min-width: ${props => (props.height)}px;
`;

Ruler.Box = styled.div`
    padding: 0 ${props => props.theme.padding.lg * 2}px;  
    display: flex; 
    align-items: center;
`;

Ruler.HoursDivider = styled.div` 
  position: absolute;
  left: ${props => (props.position)}px;
  top: 50%;
  transform: translateY(-50%);
  height: 60px;
  width: 1px;
  background: #b3bdc5;

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