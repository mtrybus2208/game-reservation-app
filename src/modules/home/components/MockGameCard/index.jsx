import React, { useState, useEffect, useRef } from 'react'; 
import PropTypes from 'prop-types';
import GameCard from '@/modules/home/components/GameCard';
import BaseIcon from '@/modules/shared/components/BaseIcon';
import Draggable, {DraggableCore} from 'react-draggable'; 
import {
  DESKTOP_SIDEBAR_WIDTH,
  DESKTOP_TIMELINE_BORDER,
  TIMELINE_MOVE_SPEED,
} from '@/constants/gameSettings';
import * as S from './styles';

import { useInterval } from './hook';
import { isNull } from 'util';

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
  setCardPosition,
  onMoveTimeLine,
  startPosition,
  wrapperWidth,
  tempPosition,
  setTempPosition,
}) => {
  const [isAbleToMove, setIsAbleToMove] = useState(false);
  const [delay, setDelay] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [customPosition, setCustomPosition] = useState({ x:0, y:0 });
  const [disabled, setDisabled] = useState(false);
  // const [tempPosition, setTempPosition] = useState({ x:0, y:0 });
  const ref = useRef(null);
  const ref2 = useRef(null);
  let relX = null;
  

 
  useInterval(() => {
    timerCB();
  }, isRunning ? delay : null);

  useEffect(() => {
    ref.current.addEventListener('mousedown', onMouseDown);
    return () => { 
      ref.current.removeEventListener('mousedown', onMouseDown); 
    };
  }, [customPosition]);

  const customTitle = (
    <S.AnimatedIcon>
      <BaseIcon
        path="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1556279407/scroll.svg"
        size="25px"
      />
    </S.AnimatedIcon>
  );
 
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
    setDisabled(true);
    console.log('TIMER') 
    const {x} = tempPosition;
    setTempPosition(x - 3);
 
    // ref.current.style.transform = `translateX(${tempPosition.x})px`
    ref.current.style.transform = `translate(${tempPosition.x}px, 0px)`
    console.log(tempPosition);
    // setTempPosition({
    //   x: tempPosition.x++,
    //   y: 0,
    // })
    // customPosition = customPosition + 1;
  }

  const onMouseLeave = e => {
    handlerMoveStatus(false);
  }

  const onMouseUp = event => {
    event.preventDefault();
    handlerMoveStatus(false);
    setCardPosition(parseInt(ref.current.style.left, 10));
    setIsRunning(false);
  };

  const onMouseDown = event => {
    event.preventDefault();
    if (event.button !== 0) { return; }
  };

  const handleStart = (event, data) => {
    // console.log('handleStart');
    //  console.log('Event: ', event);
    // console.log('Data: ', data);
    handlerMoveStatus();
    setDisabled(false)
    
  }

  const handleDrag = (event, data) => {
    console.log('handleDrag');
    console.log('Event: ', event);
    const { left } = data.node.getBoundingClientRect();
    // setTempPosition({
    //   x: data.x,
    //   y: 0,
    // })
 
    setTempPosition(data.x)
    // console.log(data.node.getBoundingClientRect());
    if(left < 340) {
     
      console.log('PO LEWO LOL')
      setIsRunning(true);
    } else {
      setIsRunning(false);
       
    }
    
    // console.log('Data: ', data.node.style.transform);
    // console.log('Data: ', data.node.offsetParent);
  }

  const handleStop = (event, data) => {
    handlerMoveStatus(false);
    setIsRunning(false);
    setCustomPosition({
      x: data.x,
      y: 0,
    })
    // setTempPosition({
    //   x: data.x,
    //   y: 0,
    // })
 
    setTempPosition(data.x)
    setDisabled(false)
    // customPosition.x = data.x;
    // setCustomPosition(data.x);
    // console.log('handleStop');
    // console.log('Event: ', event);
    // console.log('Data: ', data.x);
  }

  const calculateEndBound = () => wrapperWidth - display.size;

  return (
    <Draggable
      disabled={disabled}
      axis="x"
      handle=".handle"
      defaultPosition={customPosition}
      position={tempPosition}
      bounds= {{
        left: 0,
        right: calculateEndBound(),
      }}
      grid={[1, 1]}
      scale={1}
      onStart={() => handleStart()}
      onDrag={handleDrag}
      ref={ref2}
 
      onStop={handleStop}>
      <S.CardWrap
        className='handle'
        size={display.size}
        // onMouseDown={onMouseDown}
        ref={ref}
        isAbleToMove={isAbleToMove}
 
        // cardPosition={cardPosition}
        // onMouseLeave={onMouseLeave}
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
    </Draggable>
  );
} ;

MockGameCard.propTypes = propTypes;
MockGameCard.defaultProps = defaultProps;
export default MockGameCard;
