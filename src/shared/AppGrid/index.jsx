import styled from 'styled-components';
import PropTypes from 'prop-types';

const AppGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100vw 1fr;
  grid-template-rows: 80px 1fr;
  grid-template-areas: 
    "header header"
    "sidebar timeline"
    "sidebar reservation";
  background-color: #17191c;
  margin-left: -100vw;

  @media ${({theme}) => theme.media.tablet} {
    grid-template-columns: 250px 1fr;
    grid-template-rows: 80px 1.3fr 1fr;
    grid-template-areas: 
      "sidebar header"
      "sidebar timeline"
      "sidebar reservation";
      margin-left: 0;
  }
`;

AppGrid.SidebarArea = styled.div`
    grid-area: sidebar;
    background: #222;
`;

AppGrid.HeaderArea = styled.div`
  grid-area: header;
  margin-left: 100vw;
  @media ${({theme}) => theme.media.tablet} {
      margin-left: 0;
  }
`;

AppGrid.ReservationArea = styled.div`
  grid-area: reservation;
  padding: 0;
  display: flex;
  flex-direction: column;
  @media ${({theme}) => theme.media.laptopL} {
    padding: 0 40px 40px;
  }
`;

AppGrid.TimeLineArea = styled.div`
  grid-area: timeline;
  padding: 0;
  overflow-y: hidden;
  @media ${({ theme }) => theme.media.tablet} {
    overflow-x: hidden;
    overflow-y: unset;
  }
  @media ${({ theme }) => theme.media.laptopL} {
    padding: 40px 40px 0;
  }
`;

export default AppGrid;
