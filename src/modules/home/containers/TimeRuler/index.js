import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import RulerWrapper from '../../components/RulerWrapper';
import TimeRuler2 from '../../components/TimeRuler2';
import { getArrayOfWorkdayHours } from '../../state/selectors';
import HoursDivider from '../../components/HoursDivider';
import MockGameCardContainer from './MockGameCardContainer';
import GameCard from '../../components/GameCard';
import moment from 'moment';

const propTypes = {
  arrayOfWorkdayHours: PropTypes.array,
  workdayInPixels: PropTypes.number,
  timeConverter: PropTypes.number,
  reservedGames: PropTypes.array,
  workdayStart: PropTypes.object,
  gameReservation: PropTypes.object,
  authUser: PropTypes.object,
};

const defaultProps = {
 
};

const hoursToPixels = h => h * 60 * this.props.timeConverter;

class TimeRuler extends PureComponent {
  state = {
    isDown: false,
    isBlocked: false,
    startX: undefined,
    scrollLeft: undefined,
    startPosition: false,
  };

  setStart(data) {
    this.setState(prev => {
      if (prev.startPosition !== data) {
        return { startPosition: data };
      }
    })
  }

  handlerBlockTimeLine = isBlocked => {
    this.setState({
      isBlocked,
    });
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

  render() {
    const { gameReservation, arrayOfWorkdayHours, timeConverter, reservedGames, workdayInPixels } = this.props;
    return (
      <RulerWrapper
        ref={wrapperEl}
      >
        {
          reservedGames && reservedGames.map(game => this.renderGameCard(game))
        }
        {
          gameReservation.editMode &&
          gameReservation.time &&
          gameReservation.gameType &&
          <MockGameCardContainer
            onMoveTimeLine={this.onMoveTimeLine}
            onBlockTimeLine={this.handlerBlockTimeLine}
            startPosition={this.state.startPosition}
            setStart={this.setStart}
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
                position={hoursToPixels(i)}
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
});

const mapDispatchToProps = dispatch => {
  return { };
};

TimeRuler.propTypes = propTypes;
TimeRuler.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(TimeRuler);
