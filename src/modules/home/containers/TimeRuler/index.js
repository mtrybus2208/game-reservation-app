import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { connect } from 'react-redux';
import { getAllReservedGames } from '@/modules/home/state/selectors/entieties';
import { getTimeLine, getWorkdayInPixels, getArrayOfWorkdayHours, getActualDateInPixels } from '@/modules/home/state/selectors';
import GameCard from '@/modules/home/components/GameCard';
import Ruler from '@/modules/home/containers/Ruler';
import { CenteredWrapper } from '@/modules/shared/components/AppGrid';
import MockGameCard from '@/modules/home/containers/MockGameCard';
import { withGameReservation } from '@/modules/home/HOC/withGameReservation';
import * as fromActions from '@/modules/home/state/actions';
import * as fromSharedActions from '@/modules/shared/state/actions';

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
  showModal: PropTypes.func,
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

  MockedWithResevation = withGameReservation(MockGameCard);
 
  componentDidUpdate() { }

  getDistanceInMinutes(timeGame) {
    return moment.duration(timeGame.diff(this.props.timeLine.workdayStart)).asMinutes();
  }

  getGameTimes(game) {
    return ['startDate', 'endDate']
      .map(type =>
        this.getDistanceInMinutes(moment(game[type])) * this.props.timeLine.timeConverter);
  }

  createReservedIntervals(games) {
    return games && games.map(game => {
      const [startTime, endTime] = this.getGameTimes(game);
      return [Math.abs(startTime), Math.abs(startTime) + (Math.abs(endTime) - Math.abs(startTime))];
    });
  };

  renderGameCard(game) {
    const [startTime, endTime] = this.getGameTimes(game);

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
        showModal={this.props.showModal}
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
      <CenteredWrapper>
        {
          this.props.reservedGames && this.props.reservedGames.map(game => this.renderGameCard(game))
        }
        {
          <this.MockedWithResevation          
              gameReservation={this.props.gameReservation}
              timeConverter={this.props.timeLine.timeConverter}
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
        <Ruler />
      </CenteredWrapper>
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
  showModal: payload => {
    dispatch(fromSharedActions.showModal(payload));
  },
});

TimeRuler.propTypes = propTypes;
TimeRuler.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(TimeRuler);
