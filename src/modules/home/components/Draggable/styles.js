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

export const CardWrap = styled.div`
  position: absolute;
  left: 200;
  top: 0;
  bottom: 0;
  width:300px;
  background: rgba(1, 66, 23, 0.3);
  top: 101px;
  z-index: 1;
  /* border: ${({ isAbleToMove }) => isAbleToMove ? '3px solid #014217' : 'none'}; */
  border-top: none;
  border-bottom: none;
  display: 'inline-block';
    background: 'white';
    user-select: 'none';
`;

export const AnimatedIcon = styled.div`
  animation: ${rotate} 3s linear infinite;
`;
