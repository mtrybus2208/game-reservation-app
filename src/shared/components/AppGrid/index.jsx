import styled from 'styled-components';
import PropTypes from 'prop-types';

const AppGrid = styled.div`
  display: grid;
  height: 100vh;
  overflow: hidden;
  grid-template-columns: 100vw 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas: 
    "header header"
    "sidebar timeline"
    "sidebar reservation";
  background-color: #17191c;
  margin-left: -100vw;
  position: relative;

  @media ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 250px 1fr;
    grid-template-rows: 80px 1.3fr 1fr;
    grid-template-areas: 
      "sidebar header"
      "sidebar timeline"
      "sidebar reservation";
      margin-left: 0;
  }
  @media ${({ theme }) => theme.media.laptopL} {
    &:after {
      content: '';
      position: absolute;
      right: 35px;
      top: 120px;
      left: 287px;
      height: 100%;
      pointer-events: none;
      box-shadow: 0 -5px 5px -5px rgba(0, 0, 0, .53);
    }

    &:before {
      content: '';
      position: absolute;
      right: 39px;
      top: 114px;
      left: 290px;
      bottom: -10px;
      pointer-events: none;
      box-shadow:
        -5px 0 5px -5px rgba(0, 0, 0, .73),
        5px 0 5px -6px rgba(0, 0, 0, .73);
    }
  }
`;

AppGrid.SidebarArea = styled.div`
  grid-area: sidebar;
  background: #222;
`;

AppGrid.HeaderArea = styled.div`
  grid-area: header;
  margin-left: 100vw;
  @media ${({ theme }) => theme.media.tablet} {
      margin-left: 0;
  }
`;

AppGrid.ReservationArea = styled.div`
  grid-area: reservation;
  padding: 0;
  display: flex;
  flex-direction: column;
  position: relative;
  @media ${({ theme }) => theme.media.laptopL} {
    margin: 0 40px 40px;
  }
`;

AppGrid.TimeLineArea = styled.div`
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

export default AppGrid;
