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
  });

  let wrapRef = null;

  const setWrapRef = element => {
    if(element) {
      wrapRef = element;
    }
  } 

  const customTitle = (
    <S.AnimatedIcon>
      <BaseIcon
        path="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1556279407/scroll.svg"
        size="25px"
      />
    </S.AnimatedIcon>
  );

  const detectWrapperEdges = () => {
    return true;
  }
  const moveWrapper = () => {
    console.log('TODO: Detect edges of Wrapper component and run function resposible for scrolling')
  }

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
    setOffsetLeft(wrapRef.offsetLeft);
  }
  const handlerMouseMove = e => {
    if (!isAbleToMove) return;
    e.preventDefault();
    const walk = (e.pageX - startX);
    wrapRef.style.left = `${offsetLeft + walk}px`;

    const position = wrapRef.getBoundingClientRect();
    detectWrapperEdges(position) && moveWrapper();
  }

  return (
    <S.CardWrap
      size={display.size}
      onMouseMove={handlerMouseMove}
      onMouseDown={handlerMouseDown}
      onMouseLeave={handlerMouseLeave}
      onMouseUp={handlerMouseUp}
      ref={setWrapRef}
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
