import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const NavItem = styled.li`
  display: flex;  
  margin: 0;
  padding: 0;
`;

export const NavButton = styled.button`
  display: flex;  
  margin: 0;
  padding: 0;
  background: red;
`;

export const LinkIcon = styled.img`
  display: flex;  
  margin: 0;
  padding: 0;
  width: 20px;

  
  @media ${({ theme }) => theme.media.laptop} {
      display: none;
  }
`;

export const LinkTxt = styled.span`
  display: none;
  margin: 0;
  padding: 0;

  
  @media ${({ theme }) => theme.media.laptop} {
    display: flex;  
  }
`;
