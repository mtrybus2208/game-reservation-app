import styled from 'styled-components';
import PropTypes from 'prop-types';

const BaseButton = styled.button`
  color: #fff;
  background-color: ${props => props.bg || props.theme.primary};
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: none;
  border-radius:  ${props => props.borderRadius || 0};
  padding:  ${props => props.padding || 0};
  display: inline-block;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  font-size: 1rem;
  line-height: 1.5;
  border: none; 
  outline: none;
`;

BaseButton.propTypes = {
  bg: PropTypes.string,
  borderRadius: PropTypes.string,
  padding: PropTypes.string,
};

export default BaseButton;
