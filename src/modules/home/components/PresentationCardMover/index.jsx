import React, { memo, useRef, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import useDrag from '@/modules/home/hooks/useDrag';
import PresentationCard from '@/modules/home/components/PresentationCardMover/components/PresentationCard';
import {
  getIsReservationCardDisplayAllowed,
  getTimeAndType,
  getIsReservationBlocked,
} from '@/modules/home/state/selectors/gameReservation';
import { getAuthUser } from '@/modules/auth/state/selectors';
import CardSkeleton from '@/modules/home/components/CardSkeleton';
import Item from '@/modules/shared/components/Item';
import Avatar from '@/modules/shared/components/Avatar';
import CircleItem from '@/modules/shared/components/CircleItem';
import { Box } from '@/modules/shared/components/AppGrid';
import { throttled } from '@/helpers';
import * as fromActions from '@/modules/home/state/actions';
import { throttle } from 'lodash';

const PresentationCardMover = ({ wrapperRef }) => {
  const dispatch = useDispatch();
  const childRef = useRef();
  const { translateX, handleMouseUp, handlerMouseDown } = useDrag(childRef, wrapperRef);
  const isReservationCardDisplayAllowed = useSelector(state =>
    getIsReservationCardDisplayAllowed(state),
  );
  const isReservationBlocked = useSelector(state => getIsReservationBlocked(state));
  const { gameType, time } = useSelector(state => getTimeAndType(state));
  const user = useSelector(state => getAuthUser(state));

  const setCurrentReservationTime = useRef(
    throttle(newValue => {
      dispatch(fromActions.setCurrentReservationTime(newValue));
    }, 100),
  );

  useEffect(() => setCurrentReservationTime.current(translateX), [translateX]);

  const avatar =
    user && (user.photoUrl || user.photoURL) ? (
      <Avatar path={user.photoUrl || user.photoURL} />
    ) : (
      <Avatar />
    );

  if (!isReservationCardDisplayAllowed) {
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
        header={<Item copy={`${time.duration} min`} />}
        footer={<Item copy={gameType.name} />}
      >
        <Box>
          <CircleItem active={false}>{avatar}</CircleItem>
        </Box>
      </CardSkeleton>
    </PresentationCard>
  );
};

export default memo(PresentationCardMover);
