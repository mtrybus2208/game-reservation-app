import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { getHoursFromPixels } from '@/modules/home/state/selectors';
import Avatar from '@/modules/shared/components/Avatar';
import UserInfo from '@/modules/shared/components/UserInfo';
import TimeCircle from '@/modules/home/components/TimeCircle';
import CircleItem from '@/modules/shared/components/CircleItem';
import InfoCard from '@/modules/home/components/InfoCard';
import GameTypeItem from '@/modules/home/components/GameTypeItem';
import {
  withSessionControl,
  withSettingsControl,
  withTimePermission,
} from '@/modules/home/HOC/reservationControl';
import * as fromActions from '@/modules/home/state/actions';
import { GAMES, GAMES_DURATION } from '@/constants/gameSettings';
import * as S from './styles';

const propTypes = { };

const defaultProps = {}; 

const NewGameConfig = () => {
  const authUser = useSelector(({ sessionState }) => sessionState.authUser);
  const currentReservationTime = useSelector(state => getHoursFromPixels(state));
  const [gameType, duration] = useSelector(({ gameReservationState }) =>
    [(gameReservationState.gameType || {}), (gameReservationState.gameType || {})]);

  const dispatch = useDispatch();
  const handlerTypeSelect = game => () => dispatch(fromActions.setGameType(game));
  const handlerTimeSelect = time => () => dispatch(fromActions.setGameTime(time));

  const InfoCardWithSession = withSessionControl(!!authUser)(InfoCard);

  return (
    <S.NewGameConfig>
      <InfoCard>
        <S.AvatarBox>
          <CircleItem>
            <Avatar path={authUser && authUser.photoURL ? authUser.photoURL : undefined} />
          </CircleItem>
        </S.AvatarBox>
        <UserInfo
          name={authUser ? authUser.displayName : 'guest'}
        />
      </InfoCard>

      <InfoCardWithSession header="you can start at:">
        <S.GameStartBox>
          <TimeCircle time={currentReservationTime} />
        </S.GameStartBox>
      </InfoCardWithSession>
      
      <InfoCardWithSession header="game type">
        <S.TypesBox>
          {GAMES.map(game => (
            <GameTypeItem
              active={gameType && gameType.id === game.id}
              key={game.id}
              game={game}
              onClick={handlerTypeSelect}
            />
          ))}
        </S.TypesBox>
      </InfoCardWithSession>

      <InfoCardWithSession header="game time">
        <S.GameTimeBox>
          { GAMES_DURATION.map(time => (
            <S.TimeItem
              key={time.id}
              onClick={handlerTimeSelect(time)}
            >
              <TimeCircle
                hoverable
                time={time.duration}
                unit="min"
                active={duration && duration.id === time.id}
              />
            </S.TimeItem>
          ))}
        </S.GameTimeBox>
      </InfoCardWithSession>
    </S.NewGameConfig>
  );
};

NewGameConfig.propTypes = propTypes;
NewGameConfig.defaultProps = defaultProps;
export default NewGameConfig;
