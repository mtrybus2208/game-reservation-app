import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

const StyledLink = styled(NavLink)`
  color: palevioletred; 
  margin: 0.5em 0; 
  text-decoration: none;
  color: ${({theme}) => theme.baseFontColor};
  &:hover {
    opacity: 0.8;
  }
  &.active {
    color: ${({theme}) => theme.primary};
  }
`;

export default StyledLink;
