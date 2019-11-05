import React, { memo, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDrag from '@/modules/home/hooks/useDrag';
import PresentationCard from '@/modules/home/components/PresentationCardMover/components/PresentationCard';
import { getReservationIsAllowed, getTimeAndType } from '@/modules/home/state/selectors/gameReservation';
import CardSkeleton from '@/modules/home/components/CardSkeleton';
import Avatar from '@/modules/shared/components/Avatar';
import CircleItem from '@/modules/shared/components/CircleItem';

const PresentationCardMover = ({ wrapperRef }) => {
  const childRef = useRef();
  const {
    translateX,
    handleMouseUp,
    handlerMouseDown,
  } = useDrag(childRef, wrapperRef);
  const isReservationIsAllowed = useSelector(state => getReservationIsAllowed(state));
  const { gameType, time } = useSelector(state => getTimeAndType(state));

  // const avatar = user && (user.photoUrl || user.photoURL)
  //   ? <Avatar path={(user.photoUrl || user.photoURL)} />
  //   : <Avatar />;

  if(!isReservationIsAllowed) {
    return null;
  }
  return (
    <PresentationCard
      ref={childRef}
      translateX={translateX}
      onMouseUp={handleMouseUp}
      onMouseDown={handlerMouseDown}
    >
      <CardSkeleton
        header={<div>time</div>}
        footer={<div>gameType</div>}
      >
        <CircleItem
          active={false}
        >
          <Avatar />
        </CircleItem>
      </CardSkeleton>
    </PresentationCard>
  );
};

export default memo(PresentationCardMover);
