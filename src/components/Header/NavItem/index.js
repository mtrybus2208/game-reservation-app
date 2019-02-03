import styled from 'styled-components';

const NavItem = styled.li`
  padding: 15px;
  list-style-type: none;
  border-right: 1px solid ${props => props.theme.grey.dark};
  &:first-child {
    border-left: 1px solid ${props => props.theme.grey.dark};
  }
`

export default NavItem;