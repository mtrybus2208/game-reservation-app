import styled from 'styled-components';
import PropTypes from 'prop-types';

const AppGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 0 1fr;
  grid-template-rows: 60px 1.3fr 1fr;
  grid-template-areas: 
    "header header"
    "sidebar timeline"
    "sidebar reservation";
  background-color: #17191c;
  
  @media ${({theme}) => theme.media.laptop} {
    grid-template-columns: 250px 1fr;
    grid-template-rows: 80px 1.3fr 1fr;
    grid-template-areas: 
      "sidebar header"
      "sidebar timeline"
      "sidebar reservation";
  }
`;

AppGrid.SidebarArea = styled.div`
  grid-area: sidebar;
  background: #222;
`;

AppGrid.HeaderArea = styled.div`
  grid-area: header;
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
  overflow-x: hidden;
  padding: 0;

  @media ${({theme}) => theme.media.laptopL} {
    padding: 40px 40px 0;
  }
`;

export default AppGrid;
