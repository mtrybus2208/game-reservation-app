import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RulerWrapper from '../../components/RulerWrapper';
import TimeRuler2 from '../../components/TimeRuler2'; 
import HoursDivider from '../../components/HoursDivider';
import MockGameCardContainer from '../MockGameCardContainer';
import { getTimeLine, getWorkdayInPixels, getArrayOfWorkdayHours, getActualDateInPixels } from '../../state/selectors';
import GameCard from '../../components/GameCard';
import moment from 'moment';
import * as fromActions from '../../state/actions';

const propTypes = {
  arrayOfWorkdayHours: PropTypes.array,
  workdayInPixels: PropTypes.number,
  timeConverter: PropTypes.number,
  reservedGames: PropTypes.array,
  workdayStart: PropTypes.object,
  gameReservation: PropTypes.object,
  authUser: PropTypes.object,
  wrapperScrollPosition: PropTypes.number,
};

const defaultProps = {
 
};
 
class TimeRuler extends PureComponent {
  state = {
    cardPosition: 0,
  };

  hoursToPixels = this.hoursToPixels.bind(this);
  setCardPosition = this.setCardPosition.bind(this); 
  minutesToPixels = this.minutesToPixels.bind(this); 
 
  setCardPosition(pos) {
    this.setState(prev => ({
      cardPosition: pos,
    }));
  }

  hoursToPixels(h) {
    return h * 60 * this.props.timeConverter;
  }

  minutesToPixels(m) {
    return m * this.props.timeConverter;
  }   

  renderGameCard = game => {
    const { timeConverter, workdayStart } = this.props;
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
        isReservedByUser={game.playerId === (this.props.authUser || {}).uid}
        key={game.id}
        gameId={game.id}
        deleteGame={this.props.deleteGame}
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

  createReservedIntervals(games) {
    return games && games.map(game => {
      const starGame = moment(game.startDate);
      const distanceInMinutes = moment.duration(starGame.diff(this.props.workdayStart)).asMinutes();
      const startTime = distanceInMinutes * this.props.timeConverter;
  
      const endGame = moment(game.endDate);
      const distanceInMinutesEnd = moment.duration(endGame.diff(this.props.workdayStart)).asMinutes();
      const endTime = distanceInMinutesEnd * this.props.timeConverter;
      return [Math.abs(startTime), Math.abs(startTime) + (Math.abs(endTime) - Math.abs(startTime))];
    });
  };

  render() {
    const { gameReservation, arrayOfWorkdayHours, timeConverter, reservedGames, workdayInPixels } = this.props;
    return (
      <RulerWrapper >
        {
          reservedGames && reservedGames.map(game => this.renderGameCard(game))
        }
        {
          gameReservation.editMode &&
          gameReservation.time &&
          gameReservation.gameType &&
          <MockGameCardContainer
            onMoveTimeLine={this.props.onMoveTimeLine}
            onBlockTimeLine={this.props.onBlockTimeLine}
            startPosition={this.state.startPosition}
            setCurrentReservationTime={this.props.setCurrentReservationTime}
            setStart={this.props.setStart}
            initialCardPosition={this.props.wrapperScrollPosition}
            reservedIntervals={this.createReservedIntervals(reservedGames)}
            authUser={this.props.authUser}
            display={
              {
                gameTime: `${gameReservation.time.duration}min`,
                gameType: gameReservation.gameType.name,
                size: this.minutesToPixels(gameReservation.time.duration),
                left: 200,
              }
            }
          />
        }
        <TimeRuler2
          height={workdayInPixels}
          timeConverter={timeConverter}
          onBlockTimeLine={this.props.onBlockTimeLine}
        >
          {
            arrayOfWorkdayHours.map((h, i) => (
              <HoursDivider
                key={`t-${i}`}
                width={60 * timeConverter}
                position={this.hoursToPixels(i)}
                time={h}
              />
            ))
          }
        </TimeRuler2>
      </RulerWrapper>
    );
  }
}

const mapStateToProps = state => ({
  arrayOfWorkdayHours: getArrayOfWorkdayHours(state),
  gameReservation: state.gameReservationState,
  timeConverter: state.timeLine.timeConverter,
  authUser: state.sessionState.authUser,
  workdayStart: state.timeLine.workdayStart,
  actualDateInPixels: getActualDateInPixels(state),

});

const mapDispatchToProps = dispatch => {
  return {
    deleteGame: payload => {
      dispatch(fromActions.deleteGame(payload));
    },
    setCurrentReservationTime: payload => {
      dispatch(fromActions.setCurrentReservationTime(payload));
    },
  };
};

TimeRuler.propTypes = propTypes;
TimeRuler.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(TimeRuler);
