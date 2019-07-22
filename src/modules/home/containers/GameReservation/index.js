// TODO: This components should be divided to subcomponents
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GAMES, GAMES_DURATION } from '@/constants/gameSettings';
import * as fromSharedActions from '@/modules/shared/state/actions';
import { getHoursFromPixels } from '@/modules/home/state/selectors';
import ReservationButton from '@/modules/home/containers/ReservationButton';
import * as fromActions from '../../state/actions';
import NewGameConfig from '../../components/NewGameConfig';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  sessionState: PropTypes.object.isRequired,
  gameReservation: PropTypes.object,
  endLastReservation: PropTypes.string,
  setGameTime: PropTypes.func.isRequired,
};

class GameReservation extends Component {
  state = {
    games: GAMES,
    duration: GAMES_DURATION,
    selectedTime: null,
    selectedGame: null,
  }

  handleTypeSelect = game => () => {
    this.props.setGameType(game);
  };

  handleTimeSelect = time => () => {
    this.props.setGameTime(time);
  }

  render() {
    return (
      <React.Fragment>
        <NewGameConfig
          authUser={this.props.sessionState.authUser}
          endLastReservation={this.props.endLastReservation}
          isOpen={this.props.timeLine.gameConfigOpen}
          duration={this.state.duration}
          games={this.state.games}
          selectedGame={this.props.gameReservation.gameType}
          selectedTime={this.props.gameReservation.time}
          onTimeSelect={this.handleTimeSelect}
          onTypeSelect={this.handleTypeSelect}
          currentReservationTime={this.props.currentReservationTime}
        />
        <S.CtaWrapper>
          <ReservationButton />
        </S.CtaWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => (
  {
    timeLine: state.timeLine,
    currentReservationTime: getHoursFromPixels(state),
    sessionState: state.sessionState,
    gameReservation: state.gameReservationState,
  }
);

const mapDispatchToProps = dispatch => ({
  setGameType: payload => {
    dispatch(fromActions.setGameType(payload));
  },
  setGameTime: payload => {
    dispatch(fromActions.setGameTime(payload));
  },
});

GameReservation.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(GameReservation);
