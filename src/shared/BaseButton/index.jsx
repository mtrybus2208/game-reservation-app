import styled from 'styled-components';
import PropTypes from 'prop-types';

const BaseButton = styled.button`
  color: #fff;
  background-color: ${props => props.bg || props.theme.primary}};
  box-sizing: border-box;
  -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  box-shadow: none;
  border-radius:  ${props => props.borderRadius || 0}};
  padding:  ${props => props.padding || 0}};
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

BaseButton.Cta = styled(BaseButton)`
  background: ${props => props.bg || props.theme.accent}};
  color: ${props => props.color || props.theme.darkFontColor}};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  height: ${props => props.maxHeight || '100%'}}
  width: 100%;
  max-width: ${props => props.maxWidth || '100%'}};
  font-size: 15px;
  font-weight: 600;
  position: relative;

  span {
    position: relative;
    z-index: 1;
  }

  &:after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    bottom: 10px;
    right: 10px;
    background: #f5ba00;
    filter: blur(5px);
    opacity: 0.25;
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    &:after {
      opacity: .4;
    } 
  }
`; 

BaseButton.Time = styled(BaseButton.Cta)`
  margin: 10px 20px;
  background: #896e4c;
`; 

export default BaseButton;
