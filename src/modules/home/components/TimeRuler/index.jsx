import React from 'react';
import PropTypes from 'prop-types';
import GameCard from '../GameCard';
import MockGameCard from '../MockGameCard';
import * as S from './styles';
import moment from 'moment';

const propTypes = {
  workdayInPixels: PropTypes.number,
  timeConverter: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
  reservedGames: PropTypes.array,
  workdayStart: PropTypes.object,
  gameReservation: PropTypes.object,
};

const defaultProps = {};

 

const TimeRuler = React.memo(({
  workdayInPixels,
  timeConverter,
  arrayOfWorkdayHours,
  reservedGames,
  workdayStart,
  gameReservation,
}) => {
  const hoursToPixels = h => h * 60 * timeConverter;

  const minutesToPixels = m => m * timeConverter;

  const renderGameCard = (game) => {
    const starGame = moment(game.startDate);
    const distanceInMinutes = moment.duration(starGame.diff(workdayStart)).asMinutes();
    const startTime = distanceInMinutes * timeConverter;

    const endGame = moment(game.endDate);
    const distanceInMinutesEnd = moment.duration(endGame.diff(workdayStart)).asMinutes();
    const endTime = distanceInMinutesEnd * timeConverter;
    return (
      <GameCard
        user={
          {
            name: 'Michal Trybus',
            avatarImg: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1551047093/43160946_1970943372961667_6703179334590398464_n.jpg',
            profession: 'Frontend developer',
          }
        }
        display={
          {
            gameTime: '30min',
            gameType: 'fifa',
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
          user={
            {
              name: 'Michal Trybus',
              avatarImg: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1551047093/43160946_1970943372961667_6703179334590398464_n.jpg',
              profession: 'Frontend developer',
            }
          }
          display={
            {
              gameTime: `${gameReservation.time.duration}min`,
              gameType: gameReservation.gameType.name,
              size: minutesToPixels(gameReservation.time.duration),
              left: 200,
            }
          }
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
        };
      </S.TimeRuler>
    </S.Wrapper>
  );
});

TimeRuler.propTypes = propTypes;
TimeRuler.defaultProps = defaultProps;
export default TimeRuler;
