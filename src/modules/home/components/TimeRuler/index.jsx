import React, { useState, useEffect } from 'react'; 
import PropTypes from 'prop-types';
import GameCard from '../GameCard';
import MockGameCard from '../MockGameCard';
import * as S from './styles';
import moment from 'moment';

const propTypes = {
  authUser: PropTypes.object,
  workdayInPixels: PropTypes.number,
  timeConverter: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
  reservedGames: PropTypes.array,
  workdayStart: PropTypes.object,
  gameReservation: PropTypes.object,
  onBlockTimeLine: PropTypes.func,
  onMoveTimeLine: PropTypes.func,
  setCurrentReservationTime: PropTypes.func,
};

const defaultProps = {};

const TimeRuler = React.memo(({
  authUser,
  workdayInPixels,
  timeConverter,
  arrayOfWorkdayHours,
  reservedGames,
  workdayStart,
  gameReservation,
  onBlockTimeLine,
  onMoveTimeLine,
  startPosition,
  setStart,
  timeLineRef,
  setCurrentReservationTime,
}) => {
  const [cardPosition, setCardPosition] = useState(0);
  const hoursToPixels = h => h * 60 * timeConverter;
  const minutesToPixels = m => m * timeConverter;

  // TODO: Need to merge these funtions
  const createReservedIntervals = (games) => {
    return games && games.map(game => {
      const starGame = moment(game.startDate);
      const distanceInMinutes = moment.duration(starGame.diff(workdayStart)).asMinutes();
      const startTime = distanceInMinutes * timeConverter;
  
      const endGame = moment(game.endDate);
      const distanceInMinutesEnd = moment.duration(endGame.diff(workdayStart)).asMinutes();
      const endTime = distanceInMinutesEnd * timeConverter;
      return [Math.abs(startTime), Math.abs(startTime) + (Math.abs(endTime) - Math.abs(startTime))];
    });
  };

  const renderGameCard = (game) => {
    const starGame = moment(game.startDate);
    const distanceInMinutes = moment.duration(starGame.diff(workdayStart)).asMinutes();
    const startTime = distanceInMinutes * timeConverter;

    const endGame = moment(game.endDate);
    const distanceInMinutesEnd = moment.duration(endGame.diff(workdayStart)).asMinutes();
    const endTime = distanceInMinutesEnd * timeConverter;

    const player = game.player && {
      name: game.player.displayName,
      avatarImg: game.player.photoUrl,
      profession: 'Software developer',
    };
    return (
      <GameCard
        user={player}
        display={
          {
            gameTime: '30min',
            gameType: game.gameName,
            size: (Math.abs(endTime) -  Math.abs(startTime)),
            left: Math.abs(startTime),
          }
        }
      />
    );
  };

  return (
    <S.Wrapper>
      {
        reservedGames && reservedGames.map(game => renderGameCard(game))
      }
      {
        gameReservation.editMode &&
        gameReservation.time &&
        gameReservation.gameType &&
        <MockGameCard
          display={
            {
              gameTime: `${gameReservation.time.duration}min`,
              gameType: gameReservation.gameType.name,
              size: minutesToPixels(gameReservation.time.duration),
              left: 200,
            }
          }
          onBlockTimeLine={onBlockTimeLine}
          setCardPosition={setCardPosition}
          cardPosition={cardPosition}
          authUser={authUser}
          onMoveTimeLine={onMoveTimeLine}
          startPosition={startPosition}
          setStart={setStart}
          timeLineRef={timeLineRef}
          setCurrentReservationTime={setCurrentReservationTime}
          reservedIntervals={createReservedIntervals(reservedGames)}
        />
      }
      <S.TimeRuler
        height={workdayInPixels}
        timeConverter={timeConverter}
      >
        {
          arrayOfWorkdayHours.map((h, i) => (
            <S.HoursDivider
              key={`t-${i}`}
              width={60 * timeConverter}
              position={hoursToPixels(i)}
              time={h}
            />
          ))
        }
      </S.TimeRuler>
    </S.Wrapper>
  );
});

TimeRuler.propTypes = propTypes;
TimeRuler.defaultProps = defaultProps;
export default TimeRuler;
