import React, { useState, useEffect, useRef } from 'react'; 
import PropTypes from 'prop-types';
import GameCard from '../GameCard';
import MockGameCard from '../MockGameCard';
import * as S from './styles';
import moment from 'moment';

const propTypes = {
  authUser: PropTypes.object,
  workdayInPixels: PropTypes.number,
  wrapperScrollPosition: PropTypes.number,
  timeConverter: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
  reservedGames: PropTypes.array,
  workdayStart: PropTypes.object,
  gameReservation: PropTypes.object,
  onBlockTimeLine: PropTypes.func,
  onMoveTimeLine: PropTypes.func,
  setCurrentReservationTime: PropTypes.func,
  deleteGame: PropTypes.func,
  isAddGameFetching: PropTypes.bool,
  actualDateInPixels: PropTypes.number,
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
  wrapperScrollPosition,
  setCurrentReservationTime,
  deleteGame,
  isAddGameFetching,
  actualDateInPixels,
}) => {
  const [cardPosition, setCardPosition] = useState(0);
  const wrapperEl = useRef(null);
  const hoursToPixels = h => h * 60 * timeConverter;
  const minutesToPixels = m => m * timeConverter;

  useEffect(() => {
  }) 

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
      photoUrl: game.player.photoUrl,
      profession: 'Software developer',
    };

    return (
      <GameCard
        isReservedByUser={game.playerId === (authUser || {}).uid}
        key={game.id}
        gameId={game.id}
        deleteGame={deleteGame}
        user={player}
        display={
          {
            gameTime: '30min',
            gameType: game.gameName,
            size: (Math.abs(endTime) - Math.abs(startTime)),
            left: Math.abs(startTime),
          }
        }
      />
    );
  };
 
  return (
    <S.Wrapper
      ref={wrapperEl}
    >
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
          initialCardPosition={wrapperScrollPosition}
          setCurrentReservationTime={setCurrentReservationTime}
          reservedIntervals={createReservedIntervals(reservedGames)}
          showSpinner={isAddGameFetching}
          actualDateInPixels={actualDateInPixels}
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
