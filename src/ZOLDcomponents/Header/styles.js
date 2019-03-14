import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #141619;
  height: 100%;
  box-shadow: rgba(0,0,0,.12) 0 1px 6px;
`;

Header.propTypes = { 
};

Header.LogoWrapper = styled.div`
    width: 100%;
    max-width: 200px;
    margin-left: 20px;
`;
 
