import React, { useState, useRef, useEffect, useReducer } from 'react';
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
  const initialState = {
    isBlocked: false,
    startX: undefined,
    isDown: false,
    scrollLeft: undefined,
    startPosition: false,
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  useEffect(() => {
    handlerMoveTimeLine(actualDateInPixels);
  }, []);

  const timeLineRef = useRef();

  const mouseLeave = () => setState({ isDown: false });

  const setIsBlocked = isBlocked => setState({ isBlocked });

  const mouseMove = e => {
    const { current } = timeLineRef;
    if (!state.isDown || state.isBlocked) return;
    e.preventDefault();
    const x = e.pageX - current.offsetLeft;
    const walk = (x - state.startX);
    current.scrollLeft = state.scrollLeft - walk;
  };

  const mouseUp = () => setState({ isDown: false });

  const mouseDown = e => {
    const { current } = timeLineRef;
    setState({
      isDown: true,
      startX: (e.pageX - current.offsetLeft),
      scrollLeft: current.scrollLeft,
    });
  };

  const setStart = data => setState({ startPosition: data });

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
      isBlocked={state.isBlocked}
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
          startPosition={state.startPosition}
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
