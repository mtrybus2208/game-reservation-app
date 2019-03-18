import styled from 'styled-components';
import { NavLink } from 'react-router-dom';

export const MainNav = styled.ul`
  display: flex;
  padding: 0;
  margin: 0;
  height: 100%;
`;

export const Item = styled.li`
  display: none;

  @media ${({theme}) => theme.media.laptop} {
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Link = styled(NavLink)`
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
`;
