import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@/modules/shared/components/Avatar';
import CircleItem from '@/modules/shared/components/CircleItem';
import * as S from './styles';

const propTypes = { 
};

const defaultProps = {};

const CardWrap = ({
  size,
  isAbleToMove,
  isAbleToReserve,
  handleMouseDown,
  translateX,
  translateY,
  isDragging,
  children
}) => (
    <S.CardWrap
      size={size}  
      isAbleToMove={isAbleToMove}
      isAbleToReserve={isAbleToReserve}
      onMouseDown={handleMouseDown} 
      x={translateX}
      y={translateY}
      isDragging={isDragging}
    >
    {children}
    </S.CardWrap>
  );

CardWrap.propTypes = propTypes;
CardWrap.defaultProps = defaultProps;
export default CardWrap;
