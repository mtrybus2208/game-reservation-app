import styled from 'styled-components';
import PropTypes from 'prop-types';

export const TimeLineWrapper = styled.div` 
  overflow-x: auto;
  border-radius: 0;
  height: 100%;
  position: relative;
  border: ${({ isBlocked, isReservationBlocked, theme }) => {
    if (isBlocked && !isReservationBlocked) {
      return `3px solid ${theme.success}`;
    }

    if (isBlocked && isReservationBlocked) {
      return `3px solid ${theme.error}`;
    }

    return 'none';
  }};
  border-left: none;
  border-right: none;

  &::-webkit-scrollbar {
    width: 0; 
    background: transparent;
  }

  &::-webkit-scrollbar-thumb {
      background: #FF0000;
  }

  @media ${({ theme }) => theme.media.tablet} {
    overflow-y: hidden;
  }
`;

export const TimeLineMover = styled.div`
    display: flex;
    justify-content: flex-start;
    align-items: flex-start;
    background: #1b1f23;
    overflow-x: hidden;
    cursor: -webkit-grab;
    position: relative;
    border-radius: 0;
    padding: 0;
    background-image: url(https://res.cloudinary.com/dfmqgkkbx/image/upload/v1551046589/rt.png);
    background-size: auto;
    transition: transform .3s ease-in-out;

    @media ${({ theme }) => theme.media.tablet} {
      height: 100%;
    }
`;