import styled, { keyframes } from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';


const rotate = keyframes`
  0% {
    transform: translateX(-50%);
  }

  50% {
    transform: translateX(0%);
  }

  100% {
    transform: translateX(-50%);
  }
`;

export const MockGameCard = styled.div`
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(1, 66, 23, 0.3);
`;

export const AnimatedIcon = styled.div`
  animation: ${rotate} 3s linear infinite;
`;
