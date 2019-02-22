import styled from 'styled-components';
import PropTypes from 'prop-types';


const StyledAvatar = styled.div`
    background:  ${props => props.theme.base.avatarBg};
    display: flex;
    width:  ${props => (props.size ? props.size : 100)}px;
    height:  ${props => (props.size ? props.size : 100)}px;
    border-radius: ${props => (props.rounded ? 100 : 0)}%;
    overflow: hidden;
`;

StyledAvatar.ImageWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1 1 100%;
`;

StyledAvatar.Image = styled.img`
  width: 100%;
  height: auto;
  transform: scale(1.1);
`;

StyledAvatar.propTypes = {
  size: PropTypes.number.isRequired,
  rounded: PropTypes.bool,
};

export default StyledAvatar;
