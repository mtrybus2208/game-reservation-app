import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const MainNav = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  height: 100%;
`;

MainNav.Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 60px;

  &:hover > a {
    color: #fff;
  }
`;

MainNav.Link = styled(NavLink)`
  color: #747a81;
  font-size: 13px;
  text-decoration: none;

  &.active {
    color: #c27f0a;
  }
`;

MainNav.propTypes = { 
};
 
