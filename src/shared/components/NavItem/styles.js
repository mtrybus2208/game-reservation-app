import styled from 'styled-components';
import { NavLink } from 'react-router-dom';
import { rgba } from 'polished';

export const NavItem = styled.li`
  display: flex;  
  margin: 0;
  padding: 0;

  @media ${({ theme }) => theme.media.laptop} {
    a {
      padding: 0 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 500;
      line-height: 1;
      letter-spacing: 0.4px;
      color: ${rgba('#fff', 0.7)};
      padding: 0px 60px;
      text-decoration: none;
      background: ${({ theme, isActive }) => isActive ? theme.link.bg.active : theme.link.bg.normal};
    }
  }
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
