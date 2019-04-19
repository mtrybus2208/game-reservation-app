import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@/modules/shared/components/Avatar';
import UserInfo from '@/modules/shared/components/UserInfo';
import TimeCircle from '@/modules/home/components/TimeCircle';
import CircleItem from '@/modules/shared/components/CircleItem';
import InfoCard from '@/modules/home/components/InfoCard';
import GameTypeItem from '@/modules/home/components/GameTypeItem';
import { GAMES, GAMES_DURATION } from '@/constants/gameSettings';
import * as S from './styles';

const propTypes = {
  isOpen: PropTypes.bool,
  authUser: PropTypes.object,
  onTypeSelect: PropTypes.func,
  onTimeSelect: PropTypes.func,
  time: PropTypes.object,
  games: PropTypes.array,
  selectedGame: PropTypes.object,
};

const defaultProps = {}; 

const NewGameConfig = ({
  isOpen,
  authUser,
  onTypeSelect,
  onTimeSelect,
  selectedGame,
  time,
  games,
}) => {
  const avatar = authUser && authUser.photoURL
    ? <Avatar path={authUser.photoURL} />
    : <Avatar />;
  console.log(' ja jebie');
  console.log(games);
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
          <TimeCircle time="21:24" />
        </S.GameStartBox>
      </InfoCard>
      <InfoCard header="game type">
        <S.TypesBox>
          { games.map(game => (
            <GameTypeItem
              active={selectedGame && selectedGame.id === game.id}
              key={game.id}
              game={game}
              onClick={onTypeSelect}
            />
          ))}
        </S.TypesBox>
      </InfoCard>
      <InfoCard header="game time">
        <S.GameTimeBox>
          { GAMES_DURATION.map(game => (
            <S.TimeItem key={game.id}><TimeCircle time={game.duration} unit="min" /></S.TimeItem>
          ))}
        </S.GameTimeBox>
      </InfoCard>
    </S.NewGameConfig>
  );
};

NewGameConfig.propTypes = propTypes;
NewGameConfig.defaultProps = defaultProps;
export default NewGameConfig;
