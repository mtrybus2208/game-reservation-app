import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserInfo from '../../../UserInfo';
import BaseButton from '../../../../../../components/Button';
import GameConfig from './styles';

const propTypes = {
  setGameTime: PropTypes.func.isRequired,
  lastGame: PropTypes.object,
  isOpen: PropTypes.bool,
};

class NewGameConfig extends Component {
  componentDidMount() { } 

  render() {
    return (
      <GameConfig isOpen={this.props.isOpen}>
        <GameConfig.ColTop>
          <GameConfig.StartField>
            <p># You can start Game at:</p>
            <p># {this.props.lastGame.format('HH:mm')}</p>
          </GameConfig.StartField>
        </GameConfig.ColTop>
        <GameConfig.ColBottom>
          <GameConfig.ButtonsWrapper>
            <UserInfo />
          </GameConfig.ButtonsWrapper>
          <p># How long You want to play?</p>
          <GameConfig.ButtonsWrapper>
            <BaseButton.Time onClick={this.props.setGameTime} value="10">10 min </BaseButton.Time>
            <BaseButton.Time onClick={this.props.setGameTime} value="15">15 min </BaseButton.Time>
            <BaseButton.Time onClick={this.props.setGameTime} value="20">20 min </BaseButton.Time>
          </GameConfig.ButtonsWrapper>
        </GameConfig.ColBottom>
      </GameConfig>
    )
  }  
}

NewGameConfig.propTypes = propTypes;
export default NewGameConfig;
