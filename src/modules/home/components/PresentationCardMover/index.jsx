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
import * as fromActions from '@/modules/home/state/actions';
import { getActualDateInPixels, getWorkdayInPixels } from '@/modules/home/state/selectors';
import { throttle } from 'lodash';
import { createReservedIntervals } from '@/modules/home/helpers';
import { getAllReservedGames } from '@/modules/home/state/selectors/entieties';

const PresentationCardMover = ({ wrapperRef, setCurrentReservationTime }) => {
  const dispatch = useDispatch();
  const childRef = useRef();
  const { translateX, handleMouseUp, handlerMouseDown } = useDrag(childRef, wrapperRef);
  const isReservationCardDisplayAllowed = useSelector(state =>
    getIsReservationCardDisplayAllowed(state),
  );
  const isReservationBlocked = useSelector(state => getIsReservationBlocked(state));
  const { gameType, time } = useSelector(state => getTimeAndType(state));
  const user = useSelector(state => getAuthUser(state));
  const actualDateInPixels = useSelector(state => getActualDateInPixels(state));

  const reservedGames = useSelector(state => getAllReservedGames(state));

  const isCardBlocked = pos => {
    if (pos < actualDateInPixels) {
      return true;
    }
    const fullPos = pos + 300;
    const reservedIntervals = createReservedIntervals(reservedGames);
    return reservedIntervals.some(posArr => {
      const [start, end] = posArr;
      return fullPos >= start && pos <= end;
    });
  };

  const handlerSetCurrentReservationTime = useRef(
    throttle(newValue => {
      setCurrentReservationTime(newValue);
    }, 200),
  );

  useEffect(() => handlerSetCurrentReservationTime.current(translateX), [translateX]);

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
      isAbleToReserve={!isCardBlocked(translateX)}
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
