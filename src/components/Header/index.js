import React from 'react'; 
import styled from 'styled-components';

import Nav from './Nav';
import NavList from './NavList';
import NavItem from './NavItem';
import StyledLink from './StyledLink';
 

const BasicHeader = styled.header`
  background-color: ${({theme}) => theme.secondary};
`
 const Header = () => {
    return (
      <BasicHeader>
        <Nav>
          <NavList>
            <NavItem>
              <StyledLink exact activeClassName="active" to="/">New game</StyledLink>  
            </NavItem>
            <NavItem>
              <StyledLink activeClassName="active" to="/best-results">Best results</StyledLink>  
            </NavItem>
          </NavList>
        </Nav>
      </BasicHeader>
    )
}; 
//export default withRouter(Header);
export default Header;
