import styled from 'styled-components';
import PropTypes from 'prop-types';

const AppGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100vw 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas: "header header" "sidebar content" "sidebar content";
  background-color: #17191c;
  margin-left: ${props => (props.leftGridOpen ? '0' : '-100vw')};
  position: relative;
  transition: all linear 400ms;

  @media ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 250px 1fr;
    grid-template-rows: 80px 1fr;
    grid-template-areas:
      "sidebar header"
      "sidebar content"
      "sidebar content";
    margin-left: 0;
    overflow: hidden;
  }
`;

AppGrid.SidebarArea = styled.div`
  grid-area: sidebar;
  background: #222;
`;

AppGrid.HeaderArea = styled.div`
  grid-area: header;
  margin-left: ${props => (props.leftGridOpen ? '0' : '100vw')};

  @media ${({ theme }) => theme.media.tablet} {
      margin-left: 0;
  }
`;

export default AppGrid;
