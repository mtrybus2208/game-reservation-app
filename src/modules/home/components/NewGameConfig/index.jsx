import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@/modules/shared/components/Avatar';
import UserInfo from '@/modules/shared/components/UserInfo';
import TimeCircle from '@/modules/home/components/TimeCircle';
import CircleItem from '@/modules/shared/components/CircleItem';
import InfoCard from '@/modules/home/components/InfoCard';
import GameTypeItem from '@/modules/home/components/GameTypeItem';
import * as S from './styles';

const propTypes = {
  isOpen: PropTypes.bool,
  authUser: PropTypes.object,
  onSelect: PropTypes.func,
  duration: PropTypes.array,
  games: PropTypes.array,
  selectedGame: PropTypes.object,
  selectedTime: PropTypes.object,
  endLastReservation: PropTypes.string,
};

const defaultProps = {}; 

const NewGameConfig = ({
  isOpen,
  authUser,
  onSelect,
  selectedGame,
  duration,
  games,
  selectedTime,
  endLastReservation,
}) => {
  const avatar = authUser && authUser.photoURL
    ? <Avatar path={authUser.photoURL} />
    : <Avatar />;
  return (
    <S.NewGameConfig isOpen={isOpen}>
      <InfoCard>
        <S.AvatarBox>
          <CircleItem>
            {avatar}
          </CircleItem>
        </S.AvatarBox>
        <UserInfo
          name={authUser ? authUser.displayName : 'guest'}
        />
      </InfoCard>
      <InfoCard header="you can start at:">
        <S.GameStartBox>
          <TimeCircle time={endLastReservation} />
        </S.GameStartBox>
      </InfoCard>
      <InfoCard header="game type">
        <S.TypesBox>
          { games.map(game => (
            <GameTypeItem
              active={selectedGame && selectedGame.id === game.id}
              key={game.id}
              game={game}
              onClick={onSelect}
            />
          ))}
        </S.TypesBox>
      </InfoCard>
      <InfoCard header="game time">
        <S.GameTimeBox>
          { duration.map(time => (
            <S.TimeItem
              key={time.id}
              onClick={onSelect('selectedTime', time)}
            >
              <TimeCircle
                hoverable={true}
                time={time.duration}
                unit="min"
                active={selectedTime && selectedTime.id === time.id}
              />
            </S.TimeItem>
          ))}
        </S.GameTimeBox>
      </InfoCard>
    </S.NewGameConfig>
  );
};

NewGameConfig.propTypes = propTypes;
NewGameConfig.defaultProps = defaultProps;
export default NewGameConfig;
