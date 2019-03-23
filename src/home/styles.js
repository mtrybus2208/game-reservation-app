import styled from 'styled-components';
import { rgba } from 'polished';

export const Home = styled.div`
  grid-area: content;
  display: grid;
  grid-template-rows: 1fr;
  grid-template-areas: "timeline";
  grid-template-columns: 1fr;
  position: relative;

  @media ${({ theme }) => theme.media.tablet} {
    grid-template-rows: 1.3fr 1fr;
    grid-template-areas: "timeline" "reservation";
  }
  @media ${({ theme }) => theme.media.laptopL} {
    &:after {
      content: '';
      position: absolute;
      width: 40px;
      top: 0;
      left: 0;
      height: 100%;
      box-shadow: 5px 0 5px -5px ${rgba('#000', 0.55)};
    }

    &:before {
      content: '';
      position: absolute;
      width: 40px;
      top: 0;
      height: 100%;
      box-shadow: 5px 0 5px -5px rgba(0,0,0,0.55);
      box-shadow: -5px 0 5px -5px ${rgba('#000', 0.55)};
    }
  }
`;

export const TimeLineWrapper = styled.div`
  grid-area: timeline;
  padding: 0;
  overflow-y: hidden;
  position: relative;
  
  @media ${({ theme }) => theme.media.tablet} {
    overflow-x: hidden;
    overflow-y: unset;
  }
  @media ${({ theme }) => theme.media.laptopL} {
    margin: 40px 40px 0;
  }
`;

export const ReservationWrapper = styled.div`
  grid-area: reservation;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  @media ${({ theme }) => theme.media.laptopL} {
    margin: 0 40px 40px;
  }
`;
