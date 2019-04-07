import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
  hoverable: PropTypes.bool,
};

const defaultProps = {
  hoverable: false,
}; 

const CircleItem = ({ children, hoverable }) => {
  return (
    <S.CircleItem hoverable={hoverable}>
      <S.Body>
        {children}
      </S.Body>
    </S.CircleItem>
  );
};

CircleItem.propTypes = propTypes;
CircleItem.defaultProps = defaultProps;
export default CircleItem;
