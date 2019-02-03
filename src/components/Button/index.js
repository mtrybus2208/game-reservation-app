import styled from 'styled-components';
import PropTypes from 'prop-types';

const BaseButton = styled.button`
  color: #fff;
  background-color: ${props => props.bg || props.theme.primary}};
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: none;
  border-radius:  ${props => props.borderRadius || props.theme.borderRadius.button}};
  display: inline-block;
  cursor: pointer;
  font-weight: 400;
  text-align: center;
  white-space: nowrap;
  vertical-align: middle;
  font-size: 1rem;
  line-height: 1.5;
  border: none; 
  outline: none!important;
`;
 
BaseButton.propTypes = {
  bg: PropTypes.string,
  borderRadius: PropTypes.string,
};  

BaseButton.Cta = styled(BaseButton)`
  padding: 15px; 
  background: #9b5706;
  color: #f2f2f2;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 10px auto;

  &:hover {
    opacity: .8;
  }
`; 

BaseButton.Time = styled(BaseButton.Cta)`
  margin: 10px 20px;
  background: #896e4c;
`; 

export default BaseButton;
