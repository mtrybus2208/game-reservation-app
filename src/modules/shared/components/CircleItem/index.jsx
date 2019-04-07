import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {
}; 

const CircleItem = ({ children }) => {
  return (
    <S.CircleItem>
      <S.Body>
        {children}
      </S.Body>
    </S.CircleItem>
  );
};

CircleItem.propTypes = propTypes;
CircleItem.defaultProps = defaultProps;
export default CircleItem;
