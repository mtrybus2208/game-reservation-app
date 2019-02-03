import styled from 'styled-components';

const Nav = styled.nav`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  box-shadow: ${props => props.theme.shadow.base};
`;

export default Nav;