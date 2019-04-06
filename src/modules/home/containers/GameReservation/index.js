
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromActions from '../../state/actions';
import BaseButton from '../../../shared/components/BaseButton';
import NewGameConfig from '../../components/NewGameConfig';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  sessionState: PropTypes.object.isRequired,
  setGameTime: PropTypes.func.isRequired,
  changeGameConfigState: PropTypes.func.isRequired,
};

class GameReservation extends Component {
  componentDidMount() { } 

  setGameTime = this.setGameTime.bind(this);
  openGameConfig = this.openGameConfig.bind(this);

  setGameTime({ target }) {
    const payload = {
      time: target.value,
    };
    this.props.changeGameConfigState(false);
    this.props.setGameTime(payload);
  }

  openGameConfig() {
    this.props.changeGameConfigState(false);
  }

  render() {
    return (
      <React.Fragment>
        <NewGameConfig
          authUser={this.props.sessionState.authUser}
          setGameTime={this.setGameTime}
          lastGame={this.props.timeLine.endLastReservation}
          isOpen={this.props.timeLine.gameConfigOpen}
        />
        <S.CtaWrapper>
          <BaseButton.Cta
            maxWidth="480px"
            onClick={this.openGameConfig}
          >
            <span>Reserve Game</span>
          </BaseButton.Cta>
        </S.CtaWrapper>
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ timeLine, sessionState }) => (
  {
    timeLine,
    sessionState,
  }
);

const mapDispatchToProps = dispatch => {
  return {
    setGameTime: (payload) => {
      dispatch(fromActions.setGameTime(payload))
    },
    changeGameConfigState: (payload) => {
      dispatch(fromActions.changeGameConfigState(payload))
    },
  }
};

GameReservation.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(GameReservation);
