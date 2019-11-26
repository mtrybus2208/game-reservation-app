import React, { memo, forwardRef } from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  onMouseDown: PropTypes.func,
  onMouseUp: PropTypes.func,
  translateX: PropTypes.string,
  children: PropTypes.node,
  isAbleToReserve: PropTypes.bool,
};

const PresentationCard = (
  { onMouseDown, onMouseUp, translateX, children, isAbleToReserve },
  ref,
) => (
  <S.PresentationCard
    ref={ref}
    onMouseDown={onMouseDown}
    onMouseUp={onMouseUp}
    x={translateX}
    isAbleToReserve={isAbleToReserve}
  >
    <S.Body>{children}</S.Body>
  </S.PresentationCard>
);

PresentationCard.propTypes = propTypes;
export default memo(forwardRef(PresentationCard));
