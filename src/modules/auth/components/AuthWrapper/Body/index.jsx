import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {};

const Body = ({ children }) => {
  return (
    <S.Body>{children}</S.Body>
  );
};

Body.propTypes = propTypes;
Body.defaultProps = defaultProps;
export default Body;
