import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MainNav = styled.ul`
  display: flex;
  align-items: center;
  margin: 0;
  padding: 0;
  height: 100%;

  
  @media ${({ theme }) => theme.media.laptop} {
    flex-direction: row;
    align-items: stretch;
  }
`;

export const Item = styled.li`
  display: flex;
  justify-content: center;
  align-items: center;
  padding-top: 7px;

  @media ${({ theme }) => theme.media.laptop} {
    &:last-child {
      display: none;
    }
  }
`;

export const DesktopLink = styled(NavLink)`
  display: none;

  @media ${({ theme }) => theme.media.laptop} {
    display: flex;
    align-items: center;
    height: 100%;
    padding: 0 60px;
    text-align: left;
    text-decoration: none;
    font-family: Roboto;
    font-size: 14px;
    font-weight: 500;
    line-height: 1;
    letter-spacing: .4px;
    color: #fff;

    &:hover {
      cursor: pointer;
      background-image: linear-gradient(to top, #1f252a, #22282e 50%, #262d35 76%, #28303b);
    }

    &.active {
      background-image: linear-gradient(to top, #1f252a, #22282e 50%, #262d35 76%, #28303b);
    }
  } 
`;

export const MobileLink = styled(NavLink)`
  padding: 0 13px;

  @media ${({ theme }) => theme.media.laptop} {
    display: none;
  } 
`;

export const ImageLink = styled.img`
  width: 23px;
`;

export const MobileChatTrigger = styled.button`
  margin: 0;
  padding: 0 10px;
  background: none;
  border: none;
`;
