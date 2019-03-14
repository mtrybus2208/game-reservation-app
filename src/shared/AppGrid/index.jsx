import styled from 'styled-components';
import PropTypes from 'prop-types';

const AppGrid = styled.div`
  display: grid;
  min-height: 100vh;
  grid-template-columns: [sidebar] 250px [main-content] 1fr [horizontal-end];
  grid-template-rows: [top] 80px [top-end] 1fr [vertical-end];
`;

AppGrid.Sidebar = styled.div`
    grid-column: sidebar / main-content;
    grid-row: top / vertical-end;
    display: grid;
    background: #222;
`;

AppGrid.Header = styled.div`
  grid-column: main-content / horizontal-end;
  display: grid;
`;

AppGrid.Main = styled.div`
  grid-column: main-content / horizontal-end;
  display: grid;
`;

export default AppGrid;
