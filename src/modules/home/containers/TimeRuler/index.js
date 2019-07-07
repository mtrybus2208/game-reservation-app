import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllReservedGames } from '@/modules/home/state/selectors/entieties';
import { getTimeLine, getWorkdayInPixels, getArrayOfWorkdayHours, getActualDateInPixels } from '@/modules/home/state/selectors';
import * as fromActions from '@/modules/home/state/actions';
import GameCard from '@/modules/home/components/GameCard';
import MockGameCard from '@/modules/home/components/MockGameCard';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  workdayInPixels: PropTypes.number,
  wrapperScrollPosition: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
  reservedGames: PropTypes.array,
  gameReservation: PropTypes.object,
  onBlockTimeLine: PropTypes.func,
  onMoveTimeLine: PropTypes.func,
  deleteGame: PropTypes.func,
  actualDateInPixels: PropTypes.number,
  sessionState: PropTypes.object,
};

const defaultProps = {};
class TimeRuler extends Component {
  state = {
    cardPosition: 0,
  };

  setCardPosition(cardPosition) {
    this.setState({
      cardPosition,
    });
  }

  hoursToPixels(h) {
    return h * 60 * this.props.timeLine.timeConverter;
  }

  minutesToPixels(m) {
    return m * this.props.timeLine.timeConverter;
  }

  wrapperEl = React.createRef();

  createReservedIntervals(games) {
    return games && games.map(game => {
      const starGame = moment(game.startDate);
      const distanceInMinutes = moment.duration(starGame.diff(this.props.timeLine.workdayStart)).asMinutes();
      const startTime = distanceInMinutes * this.props.timeLine.timeConverter;

      const endGame = moment(game.endDate);
      const distanceInMinutesEnd = moment.duration(endGame.diff(this.props.timeLine.workdayStart)).asMinutes();
      const endTime = distanceInMinutesEnd * this.props.timeLine.timeConverter;
      return [Math.abs(startTime), Math.abs(startTime) + (Math.abs(endTime) - Math.abs(startTime))];
    });
  };

  renderGameCard(game) {
    const starGame = moment(game.startDate);
    const distanceInMinutes = moment.duration(starGame.diff(this.props.timeLine.workdayStart)).asMinutes();
    const startTime = distanceInMinutes * this.props.timeLine.timeConverter;

    const endGame = moment(game.endDate);
    const distanceInMinutesEnd = moment.duration(endGame.diff(this.props.timeLine.workdayStart)).asMinutes();
    const endTime = distanceInMinutesEnd * this.props.timeLine.timeConverter;

    const player = game.player && {
      name: game.player.displayName,
      photoUrl: game.player.photoUrl,
      profession: 'Software developer',
    };

    return (
      <GameCard
        isReservedByUser={game.playerId === (this.props.sessionState.authUser || {}).uid}
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

  render() {
    return (
      <S.Wrapper
        ref={this.wrapperEl}
      >
        {
          this.props.reservedGames && this.props.reservedGames.map(game => this.renderGameCard(game))
        }
        {
          this.props.gameReservation.editMode &&
          this.props.gameReservation.time &&
          this.props.gameReservation.gameType &&
          <MockGameCard
            display={
              {
                gameTime: `${this.props.gameReservation.time.duration}min`,
                gameType: this.props.gameReservation.gameType.name,
                size: this.minutesToPixels(this.props.gameReservation.time.duration),
                left: 200,
              }
            }
            onBlockTimeLine={this.props.onBlockTimeLine}
            onMoveTimeLine={this.props.onMoveTimeLine}
            startPosition={this.props.startPosition}
            setStart={this.props.setStart}
            initialCardPosition={this.props.wrapperScrollPosition}
            reservedIntervals={this.createReservedIntervals(this.props.reservedGames)}
            showSpinner={this.props.timeLine.isAddGameFetching}
            actualDateInPixels={this.props.actualDateInPixels}
          />
        }
        <S.TimeRuler
          height={this.props.workdayInPixels}
          timeConverter={this.props.timeLine.timeConverter}
        >
          {
            this.props.arrayOfWorkdayHours.map((h, i) => (
              <S.HoursDivider
                key={`t-${i}`}
                width={60 * this.props.timeLine.timeConverter}
                position={this.hoursToPixels(i)}
                time={h}
              />
            ))
          }
        </S.TimeRuler>
      </S.Wrapper>
    );
  }
}

const mapStateToProps = state => ({
  timeLine: getTimeLine(state),
  reservedGames: getAllReservedGames(state),
  gameReservation: state.gameReservationState,
  sessionState: state.sessionState,
  workdayInPixels: getWorkdayInPixels(state),
  arrayOfWorkdayHours: getArrayOfWorkdayHours(state),
  actualDateInPixels: getActualDateInPixels(state),
});

const mapDispatchToProps = dispatch => ({
  deleteGame: payload => {
    dispatch(fromActions.deleteGame(payload));
  },
});

TimeRuler.propTypes = propTypes;
TimeRuler.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(TimeRuler);
