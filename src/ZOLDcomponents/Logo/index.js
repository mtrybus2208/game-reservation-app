import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  path: PropTypes.string,
};

const defaultProps = {
  path: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1551280372/logo.png',
};

const Logo = ({ path }) => {
  return (
    <S.Logo>
      <S.Logo.Image src={path} />
    </S.Logo>
  );
};

Logo.propTypes = propTypes;
Logo.defaultProps = defaultProps;
export default Logo;
