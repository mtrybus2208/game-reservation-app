import styled from 'styled-components';
import PropTypes from 'prop-types';

const Ruler = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  min-width: ${props => (props.height)}px;
  background: #15181b;
`;

Ruler.Box = styled.div`
    display: flex; 
    align-items: center;
    height: 100%;
`;

Ruler.HoursDivider = styled.div` 
  position: absolute;
  left: ${props => props.position}px;
  top: 0;
  height: 100px;
  width:  ${props => props.width}px;
  background: #23272d;
  box-shadow: inset 0px 9px 24px -4px rgba(056, 60, 69, 0.6);

  &:after {
    content: "${props => (props.time)}";
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    top: 50%;
  }
`;

Ruler.HoursDivider.propTypes = {
  position: PropTypes.number,
  time: PropTypes.string,
  width: PropTypes.number,
};

export default Ruler;
