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

export const NavigationWrapper = styled.div`
  padding: 0;
  margin: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

export const AppHeaderCol = styled.div`
  display: flex;
  align-items: center;
`;

export const ClockWrapper = styled.div`
  margin-left: 20px;
  border-left: 2px solid #2c3033;
  padding: 0 15px; 
  display: flex;
  align-items: center;
  font-size: 18px;
`;

export const IconButton = styled.button`
  margin: 0;
  padding: 0 25px;
  background: none;
  border: none;

  @media ${({ theme }) => theme.media.laptop} {
    display: none;
  } 
`;
