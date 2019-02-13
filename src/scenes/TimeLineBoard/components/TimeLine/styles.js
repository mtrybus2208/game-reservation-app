import styled from 'styled-components';
import PropTypes from 'prop-types';

const TimeLineBox = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #00000029;
  border-radius: 10px;
  padding: 40px;
  box-shadow: rgba(0,0,0,.12) 0 10px 16px;
  overflow-x: hidden;
  height: 70%;
  cursor: -webkit-grab;
`;

export default TimeLineBox;

