import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
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
  const [isAbleToMove, setIsAbleToMove] = useState(false);
  const [startX, setStartX] = useState(0);
  const [offsetLeft, setOffsetLeft] = useState(0);

  useEffect(() => {
    console.log('MockGameCard state');
    console.log(startX);
  });

  const wrapRef = React.createRef();

  const customTitle = (
    <S.AnimatedIcon>
      <BaseIcon
        path="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1556279407/scroll.svg"
        size="25px"
      />
    </S.AnimatedIcon>
  );

  const handlerMouseDown = e => {
    onBlockTimeLine(true);
    setIsAbleToMove(true);
    setStartX(e.pageX);
  }
  const handlerMouseLeave = () => {
    onBlockTimeLine(false);
    setIsAbleToMove(false);
  }
  const handlerMouseUp = () => {
    onBlockTimeLine(false);
    setIsAbleToMove(false);
    const { current } = wrapRef;
    setOffsetLeft(current.offsetLeft);
  }
  const handlerMouseMove = (e) => {
    const { current } = wrapRef;
    if (!isAbleToMove) return;
    e.preventDefault();
    const walk = (e.pageX - startX);
    current.style.left = `${offsetLeft + walk}px`;
  }

  return (
    <S.CardWrap
      size={display.size}
      onMouseMove={handlerMouseMove}
      onMouseDown={handlerMouseDown}
      onMouseLeave={handlerMouseLeave}
      onMouseUp={handlerMouseUp}
      ref={wrapRef}
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
