import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const AppHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #141619;
  height: 100%;
  box-shadow: rgba(0, 0, 0, .12) 0 1px 6px;
`;

export const LogoWrapper = styled(NavLink)`
  height: 100%;
  display: flex;
  align-items: center;
  width: 100%;
  max-width: 200px;
  color: #747a81;
  text-decoration: none; 
`;
