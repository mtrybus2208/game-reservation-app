import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromActions from '../../actions';
import NewGameConfig from './components/NewGameConfig';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  setGameTime: PropTypes.func.isRequired,
  changeGameConfigState: PropTypes.func.isRequired,
};

class GameReservation extends Component {
  componentDidMount() { } 

  setGameTime = this.setGameTime.bind(this);

  setGameTime({ target }) {
    const payload = {
      time: target.value,
    };
    this.props.changeGameConfigState(false);
    this.props.setGameTime(payload);
  }

  render() {
    return (
      <NewGameConfig
        setGameTime={this.setGameTime}
        lastGame={this.props.timeLine.endLastReservation}
        isOpen={this.props.timeLine.gameConfigOpen}
      />
    );
  }
}

const mapStateToProps = ({ timeLine }) => (
  { timeLine }
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
