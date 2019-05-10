import React, { useState, useEffect, useRef } from 'react'; 
import PropTypes from 'prop-types';
import { throttleAnimation } from '@/helpers';
import GameCard from '@/modules/home/components/GameCard';
import BaseIcon from '@/modules/shared/components/BaseIcon';
import * as S from './styles';

const propTypes = {
  user: PropTypes.object,
  display: PropTypes.object,
  onBlockTimeLine: PropTypes.func,
};

const defaultProps = {};

const MockGameCard = React.memo(({
  user,
  display,
  onBlockTimeLine,
}) => {
  const [startX, setStartX] = useState(null);
  const [isAbleToMove, setIsAbleToMove] = useState(false);
  let relX = 0;
  let relY = 0;
  const ref = useRef(null);

  useEffect(() => {
    ref.current.addEventListener('mousedown', onMouseDown);
    return () => {
      ref.current.removeEventListener('mousedown', onMouseDown);
      update.cancel();
    };
  });

  const customTitle = (
    <S.AnimatedIcon>
      <BaseIcon
        path="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1556279407/scroll.svg"
        size="25px"
      />
    </S.AnimatedIcon>
  );

  const update = throttleAnimation(data => {
    ref.current.style.transform = `translateX(${data}px)`;
  });

  const handlerMoveStatus = (status = true) => {
    onBlockTimeLine(status);
    setIsAbleToMove(status);
  };

  const onMouseMove = event => {
    const walk = event.pageX - startX;
    update(walk);
    event.preventDefault();
  };

  const onMouseUp = event => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    handlerMoveStatus(false);
    event.preventDefault();
  };

  const onMouseDown = event => {
    if (event.button !== 0) { return; }
    handlerMoveStatus();
    setStartX(event.pageX);

    const { left } = ref.current.getBoundingClientRect();
    relX = left;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    event.preventDefault();
  };

  return (
    <S.CardWrap
      size={display.size}
      onMouseDown={onMouseDown}
      ref={ref}
      isAbleToMove={isAbleToMove}
    >
      <GameCard
        user={user}
        display={display}
        customTitle={customTitle}
        customPosition
      >
        <S.MockGameCard />
      </GameCard>
    </S.CardWrap>
  );
});

MockGameCard.propTypes = propTypes;
MockGameCard.defaultProps = defaultProps;
export default MockGameCard;
