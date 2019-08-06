import React, { useState, useRef, useEffect } from "react";
import PropTypes from 'prop-types';
import TimeRuler from '@/modules/home/containers/TimeRuler';
import * as S from './styles';

const propTypes = {
  isReservationBlocked: PropTypes.bool,
};

const defaultProps = { };

const TimeLineMover = React.memo(({
  actualDateInPixels,
  isReservationBlocked,
}) => {
  const [isBlocked, setIsBlocked] = useState(false);
  const [startX, setStartX] = useState(undefined);
  const [isDown, setIsDown] = useState(false);
  const [scrollLeft, setScrollLeft] = useState(undefined);
  const [startPosition, setStartPosition] = useState(false);

  useEffect(() => {
    handlerMoveTimeLine(actualDateInPixels)
  }, []);

  let timeLineRef = useRef();

  const mouseLeave = () => setIsDown(false);

  const mouseMove = e => {
    const { current } = timeLineRef;
    if (!isDown || isBlocked) return;
    e.preventDefault();
    const x = e.pageX - current.offsetLeft;
    const walk = (x - startX);
    current.scrollLeft = scrollLeft - walk;
  };

  const mouseUp = () => setIsDown(false);

  const mouseDown = e => {
    const { current } = timeLineRef;
    setIsDown(true);
    setStartX(e.pageX - current.offsetLeft);
    setScrollLeft(current.scrollLeft);
  };

  const setStart = data => setStartPosition(data);

  const handlerMoveTimeLine = modifier => {    
    const { current } = timeLineRef;
    current.scrollLeft = current.scrollLeft + modifier;
    return current.scrollLeft;
  } 

  const getWrapperScrollPosition = () => {
    const { current } = timeLineRef;
    return current ? current.scrollLeft : 0;
  }

  return (
    <S.TimeLineWrapper
      isBlocked={isBlocked}
      isReservationBlocked={isReservationBlocked}
    >
      <S.TimeLineMover
        ref={timeLineRef}
        onMouseDown={mouseDown}
        onMouseLeave={mouseLeave}
        onMouseUp={mouseUp}
        onMouseMove={mouseMove}
      >
        <TimeRuler
          onBlockTimeLine={setIsBlocked}
          onMoveTimeLine={handlerMoveTimeLine}
          startPosition={startPosition}
          setStart={setStart}
          wrapperScrollPosition={getWrapperScrollPosition()}
        />
      </S.TimeLineMover>
    </S.TimeLineWrapper>
  );
});

TimeLineMover.propTypes = propTypes;
TimeLineMover.defaultProps = defaultProps;
export default TimeLineMover;
