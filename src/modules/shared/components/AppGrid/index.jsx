import styled from 'styled-components';
import PropTypes from 'prop-types';
import { DESKTOP_SIDEBAR_WIDTH } from '@/constants/gameSettings';

const AppGrid = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 100vw 1fr;
  grid-template-rows: 60px 1fr;
  grid-template-areas: "header header" "sidebar content" "sidebar content";
  background-color: #17191c;
  margin-left: -100vw;
  position: relative;

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

  @media ${({ theme }) => theme.media.laptop} {
    grid-template-columns: ${DESKTOP_SIDEBAR_WIDTH}px 1fr;
  }
`;

AppGrid.SidebarArea = styled.div`
  transition: all linear 400ms;
  grid-area: sidebar;
  position: relative;
  left: ${props => (props.leftGridOpen ? '100vw' : '0')};
  z-index: 10;
  background: #222;

  @media ${({ theme }) => theme.media.tablet} {     
    left: 0;
  }
`;

AppGrid.HeaderArea = styled.div`
  grid-area: header;
  margin-left: 100vw;

  @media ${({ theme }) => theme.media.tablet} {
      margin-left: 0;
  }
`;

export const Centered = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const CenteredWrapper = styled(Centered)`
    height: 100%;
`;

export default AppGrid;
