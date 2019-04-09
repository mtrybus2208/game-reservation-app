// TODO: This components should be divided to subcomponents
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromActions from '../../state/actions';
import BaseButton from '../../../shared/components/BaseButton';
import NewGameConfig from '../../components/NewGameConfig';
import { GAMES, GAMES_DURATION } from '@/constants/gameSettings';
import { getReservationInHours } from '@/modules/home/state/selectors';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  sessionState: PropTypes.object.isRequired,
  addNewGame: PropTypes.func.isRequired,
};

class GameReservation extends Component {

  state = {
    games: GAMES,
    duration: GAMES_DURATION,
    selectedTime: null,
    selectedGame: null,
  }

  addNewGame = () => () => {
    const payload = {
      time: this.state.selectedTime,
      game: this.state.selectedGame,
    };
    this.props.addNewGame(payload);
  }

  handleSelect = (props, data) => () => {
    this.setState({
      [props]: data,
    });
  };

  render() {
    return (
      <React.Fragment>
        <NewGameConfig
          authUser={this.props.sessionState.authUser}
          endLastReservation={this.props.endLastReservation}
          isOpen={this.props.timeLine.gameConfigOpen}
          duration={this.state.duration}
          games={this.state.games}
          selectedGame={this.state.selectedGame}
          onSelect={this.handleSelect}
          selectedTime={this.state.selectedTime}
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

const mapStateToProps = (state) => (
  {
    timeLine: state.timeLine,
    endLastReservation: getReservationInHours(state),
    sessionState: state.sessionState,
  }
);

const mapDispatchToProps = dispatch => ({
  addNewGame: (payload) => {
    dispatch(fromActions.addNewGame(payload));
  },
});

GameReservation.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(GameReservation);
