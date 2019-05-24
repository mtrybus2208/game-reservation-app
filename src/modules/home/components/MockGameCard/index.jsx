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

import { useInterval } from './hook';

const propTypes = {
  authUser: PropTypes.object,
  display: PropTypes.object,
  onBlockTimeLine: PropTypes.func,
  cardPosition: PropTypes.number,
  setCardPosition: PropTypes.func,
  onMoveTimeLine: PropTypes.func,
};

const defaultProps = {};

const MockGameCard =  ({
  authUser,
  display,
  onBlockTimeLine,
  cardPosition,
  setCardPosition,
  onMoveTimeLine,
  startPosition,
  setStart
}) => {
  const [isAbleToMove, setIsAbleToMove] = useState(false);
  const [delay, setDelay] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const ref = useRef(null);
  let relX = null;

  useInterval(() => {
    timerCB();
  }, isRunning ? delay : null);

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

  const update = throttleAnimation(walk => { 
    const x = parseInt(ref.current.style.left, 10);
    console.log('@@@@@@@@' + x)
    // console.log('NIEPOWINNO TEGO KURWA BYC!')
 
    if(walk < 0) { 
      // console.log('LEWO:'  + walk)
      // console.log('detectStartEdge   '  + detectStartEdge())
      if (detectStartEdge()) {
 
        setIsRunning(true);
      } else {
        setIsRunning(false);
 
         
        ref.current.style.left = `${cardPosition + walk}px`;
      } 
 
    } else if (walk > 0) {
      if (detectEndEdge()) {
 
        setIsRunning(true);
      } else { 
        ref.current.style.left = `${cardPosition + walk}px`;
       
      } 
       
    }
    // ref.current.style.left = `${cardPosition + walk}px`;
  });

  const handlerMoveStatus = (status = true) => {
    onBlockTimeLine(status);
    setIsAbleToMove(status);
  };

  const detectStartEdge = () => {
    const { left } = ref.current.getBoundingClientRect();
    return left <= DESKTOP_SIDEBAR_WIDTH + DESKTOP_TIMELINE_BORDER;
  };

  const detectEndEdge = () => {
    const { right } = ref.current.getBoundingClientRect();
    return right >= window.innerWidth - DESKTOP_TIMELINE_BORDER;
  };

  const detectWrapperEdges = () => detectEndEdge() || detectStartEdge();

  const moveTimeLineHandler = () => { 
    const x = parseInt(ref.current.style.left, 10);

    const modifier = detectEndEdge() ? +TIMELINE_MOVE_SPEED : -TIMELINE_MOVE_SPEED;
    onMoveTimeLine(modifier);
    ref.current.style.left = `${x + modifier}px`;

    if (x <= 0) { 
      ref.current.style.left = `${0}px`;
      onMoveTimeLine(modifier);
    }
  };

  const timerCB = () => {
    const pars = ref.current.getBoundingClientRect();
    console.log('timerSTart');
    if(startPosition === false) {
      moveTimeLineHandler();
    }
  
  }

  const onMouseMove = event => {
    event.preventDefault();
    const walk = event.pageX - relX; 
    const pars = ref.current.getBoundingClientRect();
      update(walk);
  };

  const onMouseUp = event => {
    event.preventDefault();
    document.removeEventListener('mousemove', onMouseMove);
    document.removeEventListener('mouseup', onMouseUp);
    handlerMoveStatus(false);
    setCardPosition(parseInt(ref.current.style.left, 10));
    setIsRunning(false);
  };

  const onMouseDown = event => {
    event.preventDefault();
    if (event.button !== 0) { return; }
    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
    handlerMoveStatus();
    relX = event.pageX;
    if(parseInt(ref.current.style.left, 10) >= 0) {
      setStart(false)
    }
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
} ;

MockGameCard.propTypes = propTypes;
MockGameCard.defaultProps = defaultProps;
export default MockGameCard;
