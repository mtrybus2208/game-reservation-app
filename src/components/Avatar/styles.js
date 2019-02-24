import styled from 'styled-components';
import PropTypes from 'prop-types';


const StyledAvatar = styled.div`
    background:  ${props => props.theme.base.avatarBg};
    display: flex;
    width: ${props => (props.size ? props.size : 100)}px;
    height: ${props => (props.size ? props.size : 100)}px;
    border-radius: ${props => (props.rounded ? 100 : 0)}%;
    overflow: hidden;
    background: #484f5a;
    position: relative;
    box-shadow: -1px 1px 30px -3px rgba(0,0,0,.61);
`;

StyledAvatar.ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 100%;
  width: 85%;
  height: 85%;
  border-radius: 100%;
  overflow: hidden;
  background: #15181b;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: -1px 1px 30px -3px rgba(0,0,0,0.61);
`;

StyledAvatar.Image = styled.img`
  width: 100%;
  height: auto;
  transform: scale(1.1);
`;

StyledAvatar.propTypes = {
  size: PropTypes.number,
  rounded: PropTypes.bool,
};

export default StyledAvatar;
