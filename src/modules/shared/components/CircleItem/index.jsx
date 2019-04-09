import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
  hoverable: PropTypes.bool,
  active: PropTypes.bool,
};

const defaultProps = {
  hoverable: false,
  active: false,
}; 

const CircleItem = ({ children, hoverable, active }) => {
  return (
    <S.CircleItem hoverable={hoverable} active={active}>
      <S.Body>
        {children}
      </S.Body>
    </S.CircleItem>
  );
};

CircleItem.propTypes = propTypes;
CircleItem.defaultProps = defaultProps;
export default CircleItem;
