import React, { useState, useEffect, useRef } from 'react'; 
import PropTypes from 'prop-types';
import { throttleAnimation } from '@/helpers';
import GameCard from '@/modules/home/components/GameCard';
import BaseIcon from '@/modules/shared/components/BaseIcon';
import {
  DESKTOP_SIDEBAR_WIDTH,
  DESKTOP_TIMELINE_BORDER,
  TIMELINE_MOVE_SPEED,
} from '@/constants/gameSettings';
import * as S from './styles';

const propTypes = {
  authUser: PropTypes.object,
  display: PropTypes.object,
  onBlockTimeLine: PropTypes.func,
  cardPosition: PropTypes.number,
  setCardPosition: PropTypes.func,
  onMoveTimeLine: PropTypes.func,
};

const defaultProps = {};

const MockGameCard = React.memo(({
  authUser,
  display,
  onBlockTimeLine,
  cardPosition,
  setCardPosition,
  onMoveTimeLine,
}) => {
  const [isAbleToMove, setIsAbleToMove] = useState(false);
  const ref = useRef(null);
  let relX = null;

  useEffect(() => {
    ref.current.addEventListener('mousedown', onMouseDown);
    const interval = setInterval(() => {
      if (isAbleToMove && detectWrapperEdges() && ref.current.style.left) {
        moveTimeLineHandler();
      }
    }, 0);
    return () => { 
      ref.current.removeEventListener('mousedown', onMouseDown);
      clearInterval(interval);
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

  const update = throttleAnimation(walk => {
    ref.current.style.left = `${cardPosition + walk}px`;
  });

  const handlerMoveStatus = (status = true) => {
    onBlockTimeLine(status);
    setIsAbleToMove(status);
  };

  const detectStartEdge = () => {
    const { left } = ref.current.getBoundingClientRect();
    return left < DESKTOP_SIDEBAR_WIDTH + DESKTOP_TIMELINE_BORDER;
  };

  const detectEndEdge = () => {
    const { right } = ref.current.getBoundingClientRect();
    return right >= window.innerWidth - DESKTOP_TIMELINE_BORDER;
  };

  const detectWrapperEdges = () => detectEndEdge() || detectStartEdge();

  const moveTimeLineHandler = () => {
    const modifier = detectEndEdge() ? +TIMELINE_MOVE_SPEED : -TIMELINE_MOVE_SPEED;
    ref.current.style.left = `${parseInt(ref.current.style.left, 10) + modifier}px`;
    onMoveTimeLine(modifier);
  };

  const onMouseMove = event => {
    event.preventDefault();
    const walk = event.pageX - relX;
    return !detectWrapperEdges() && update(walk);
  };

  const onMouseUp = event => {
    event.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    handlerMoveStatus(false);
    setCardPosition(parseInt(ref.current.style.left, 10));
  };

  const onMouseDown = event => {
    event.preventDefault();
    if (event.button !== 0) { return; }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    handlerMoveStatus();
    relX = event.pageX;
  };

  return (
    <S.CardWrap
      size={display.size}
      onMouseDown={onMouseDown}
      ref={ref}
      isAbleToMove={isAbleToMove}
      cardPosition={cardPosition}
    >
      <GameCard
        user={authUser}
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
