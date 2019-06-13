// TODO: This components should be divided to subcomponents
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { GAMES, GAMES_DURATION } from '@/constants/gameSettings';
import {
  getReservationInHours,
  getHoursFromPixels,
} from '@/modules/home/state/selectors';
import * as fromActions from '../../state/actions';
import BaseButton from '../../../shared/components/BaseButton';
import NewGameConfig from '../../components/NewGameConfig';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  sessionState: PropTypes.object.isRequired,
  gameReservation: PropTypes.object,
  endLastReservation: PropTypes.string,
  addNewGame: PropTypes.func.isRequired,
  setGameTime: PropTypes.func.isRequired,
  setGameType: PropTypes.func.isRequired,
};

class GameReservation extends Component {

  state = {
    games: GAMES,
    duration: GAMES_DURATION,
    selectedTime: null,
    selectedGame: null,
  }

  addNewGame = () => () => {
    this.props.addNewGame();
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
          <BaseButton.Cta 
            maxWidth="480px"
            onClick={this.addNewGame()}
          >
            <span>Reserve Game</span>
          </BaseButton.Cta>
        </S.CtaWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = state => (
  {
    timeLine: state.timeLine,
    currentReservationTime: getHoursFromPixels(state),
    endLastReservation: getReservationInHours(state),
    sessionState: state.sessionState,
    gameReservation: state.gameReservationState,
  }
);

const mapDispatchToProps = dispatch => ({
  addNewGame: (payload) => {
    dispatch(fromActions.addNewGame(payload));
  },
  setGameType: (payload) => {
    dispatch(fromActions.setGameType(payload));
  },
  setGameTime: (payload) => {
    dispatch(fromActions.setGameTime(payload));
  },
});

GameReservation.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(GameReservation);
