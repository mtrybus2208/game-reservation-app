import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  path: PropTypes.string,
  size: PropTypes.string,
  rounded: PropTypes.bool,
};

const defaultProps = {
  path: 'https://res.cloudinary.com/duo6ruqkc/image/upload/v1550848181/child_rtmjgd.png',
  size: 'medium',
  rounded: true,
};

const sizesObj = {
  sm: 55,
  md: 100,
  lg: 150,
};

const Avatar = ({ path, size, rounded }) => (
  <S.Avatar
    size={sizesObj[size]}
    rounded={rounded}
  >
    <S.ImageWrapper>
      <S.Image src={path} />
    </S.ImageWrapper>
  </S.Avatar>
);

Avatar.propTypes = propTypes;
Avatar.defaultProps = defaultProps;
export default Avatar;
