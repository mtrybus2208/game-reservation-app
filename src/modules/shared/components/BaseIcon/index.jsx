import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  path: PropTypes.string,
  size: PropTypes.string,
};

const defaultProps = {
  path: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
  size: '20px',
};

const BaseIcon = ({ path, size }) => (
  <S.BaseIcon src={path} size={size} />
);

BaseIcon.propTypes = propTypes;
BaseIcon.defaultProps = defaultProps;
export default BaseIcon;

