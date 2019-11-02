import React, { memo, forwardRef } from 'react';
import * as S from './styles';

const PresentationCard = ({ 
  onMouseDown,
  onMouseUp,
  translateX,
}, ref) => {

  return (
    <S.PresentationCard
      ref={ref}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
      x={translateX}
    >
      <S.Body>
        <div>
          <span>Move me! :D</span>
        </div>
      </S.Body>
    </S.PresentationCard>
  );
};

export default memo(forwardRef(PresentationCard));
