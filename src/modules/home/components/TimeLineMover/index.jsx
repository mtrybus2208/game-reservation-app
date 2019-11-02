import React, { useRef } from 'react';
import PropTypes from 'prop-types';
import Ruler from '@/modules/home/containers/Ruler';
import useDragToScroll from '@/modules/home/hooks/useDragToScroll';
import PresentationCardMover from '@/modules/home/components/PresentationCardMover';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  workdayInPixels: PropTypes.number,
};

const defaultProps = {};

const TimeLineMover = ({ workdayInPixels }) => {
  const childRef = useRef();
  const containerdRef = useRef();
  const wrapperRef = useRef();
  const {
    mouseLeave,
    mouseMove,
    mouseUp,
    mouseDown,
  } = useDragToScroll(wrapperRef, false);

  return (
    <S.TimeLineWrapper
      ref={wrapperRef}
      onMouseLeave={mouseLeave}
      onMouseUp={mouseUp}
      onMouseMove={mouseMove}
      onMouseDown={mouseDown}
    >
      <S.TimeLineMover
        ref={containerdRef}
        size={workdayInPixels}
      >
        <PresentationCardMover
          wrapperRef={wrapperRef}
        />
        <Ruler />
      </S.TimeLineMover>
  </S.TimeLineWrapper>
  ); 
};

TimeLineMover.propTypes = propTypes;
TimeLineMover.defaultProps = defaultProps;
export default React.memo(TimeLineMover);