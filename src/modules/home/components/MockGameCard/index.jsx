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
  const [walks, setwalks] = useState(0);
  let [lastUpdateCall, setLastUpdateCall] = useState(null);

  useEffect(() => {
    // update(walks);
    return () => {
      // update.cancel();
    }
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
    document.removeEventListener('mousemove', handlerMouseMove);
    setOffsetLeft(wrapRef.offsetLeft);
  }

  const throttle = (f) => {
    let token = null, lastArgs = null;
    const invoke = () => {
        f(...lastArgs);
        token = null;
    };
    const result = (...args) => {
        lastArgs = args;
        if (!token) {
            token = requestAnimationFrame(invoke);
        }
    };
    result.cancel = () => token && cancelAnimationFrame(token);
    return result;
};

const update = (data) => {
  console.log('???????????data');
  console.log(data);
  // const walk = (e.pageX - startX);
  // wrapRef.style.left = `${offsetLeft + walk}px`;
  wrapRef.style.transform = `translateX(${walks}px)`;
};


  const handlerMouseMove = e => {
    if (!isAbleToMove) return;
    e.preventDefault();
    const walk = (e.pageX - startX);
    const res = offsetLeft + walk;
    // wrapRef.style.left = `${offsetLeft + walk}px`;
    // wrapRef.style.transform = `translateX(${offsetLeft + walk}px)`;

    // const position = wrapRef.getBoundingClientRect();
    // detectWrapperEdges(position) && moveWrapper();

    // setwalks(res)
    // update(res)
    if(lastUpdateCall) cancelAnimationFrame(lastUpdateCall); 
    lastUpdateCall=requestAnimationFrame(() => { //save the requested frame so we can check next time if one was already requested
      // distancePosition = (e.clientX - startPosition) + currentPosition;
      setwalks(res);
       // Do the distance calculation inside the animation frame request also, so the browser doesn't have to do it more often than necessary 
      update(); //all the function that handles the request
      setLastUpdateCall(null); // Since this frame didn't get cancelled, the lastUpdateCall should be reset so new frames can be called. 
  });
    // requestAnimationFrame(() => {
    //   wrapRef.style.transform = `translateX(${res}px)`;
    // });
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
