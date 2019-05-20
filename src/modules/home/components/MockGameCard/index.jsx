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
  cardPosition: PropTypes.number,
  setCardPosition: PropTypes.func,
};

const defaultProps = {};

const MockGameCard = React.memo(({
  user,
  display,
  onBlockTimeLine,
  cardPosition,
  setCardPosition,
}) => {
  const [isAbleToMove, setIsAbleToMove] = useState(false);
  const ref = useRef(null);
  let relX = null;
  let interval = null;

  useEffect(() => {
    ref.current.addEventListener('mousedown', onMouseDown);
    return () => {
      ref.current.removeEventListener('mousedown', onMouseDown); 
      update.cancel();
      if (interval) { clearInterval(interval); }
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

  const onMouseMove = event => {
    const walk = event.pageX - relX;
    update(walk);
    event.preventDefault();
  };

  const onMouseUp = event => {
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    handlerMoveStatus(false);
    setCardPosition(parseInt(ref.current.style.left));
    event.preventDefault();
  };

  const onMouseDown = event => {
    if (event.button !== 0) { return; }
    handlerMoveStatus();
    relX = event.pageX;
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    event.preventDefault();
  };

  const moveMe = () => {
    // const pos = ref.current.style.left;
    interval = setInterval(() => {
      if(ref.current.style.left) {
        console.log(parseInt(ref.current.style.left));
        ref.current.style.left = `${parseInt(ref.current.style.left) + 1}px`;
      }
    }, 0);
  };

  return (
    <S.CardWrap
      size={display.size}
      onMouseDown={onMouseDown}
      ref={ref}
      isAbleToMove={isAbleToMove}
      cardPosition={cardPosition}
      onClick={moveMe}
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
