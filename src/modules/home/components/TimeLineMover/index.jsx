import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import TimeRuler from '@/modules/home/containers/TimeRuler';
import useDragToScroll from '@/modules/home/hooks/useDragToScroll';
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
  const [startPosition, setStartPosition] = useState(false);

  const timeLineRef = useRef();

  const {
    mouseLeave,
    mouseMove,
    mouseUp,
    mouseDown,
  } = useDragToScroll(timeLineRef, isBlocked);

  useEffect(() => {
    handlerMoveTimeLine(actualDateInPixels);
  }, []);

  const setStart = data => setStartPosition(data);

  const handlerMoveTimeLine = modifier => {
    const { current } = timeLineRef;
    current.scrollLeft += modifier;
    return current.scrollLeft;
  };

  const getWrapperScrollPosition = () => {
    const { current } = timeLineRef;
    return current ? current.scrollLeft : 0;
  };

  return (
    <S.TimeLineWrapper
      isBlocked={isBlocked}
      isReservationBlocked={isReservationBlocked}
    >
      <S.TimeLineMover
        ref={timeLineRef}
        onMouseLeave={mouseLeave}
        onMouseDown={mouseDown}
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
