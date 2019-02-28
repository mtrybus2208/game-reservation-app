import React, { Component } from 'react';
import PropTypes from 'prop-types';

import UserInfo from '../../../UserInfo';
import BaseButton from '../../../../../../components/Button';
import Avatar from '../../../../../../components/Avatar';
import * as S from './styles';

const propTypes = {
  setGameTime: PropTypes.func.isRequired,
  lastGame: PropTypes.object,
  isOpen: PropTypes.bool,
};

class NewGameConfig extends Component {
  componentDidMount() { } 

  render() {
    return (
      <S.NewGameConfig isOpen={this.props.isOpen}>
        <S.ColTop>
          <S.StartField>
            <S.StartItem>
              <span>You can start Game at:</span>
            </S.StartItem>
            <S.StartItem>
              <span>
                {this.props.lastGame.format('HH:mm')}
              </span>
            </S.StartItem>
          </S.StartField>
        </S.ColTop>
        <S.ColBottom>
          <S.ColItem>
            <Avatar />
          </S.ColItem>
          <S.ColItem>
            {/* <p>How long You want to play?</p> */}
            <S.ButtonsWrapper>
              {['10', '15', '20'].map((val) => {
                return (
                  <S.ButtonsBox>
                    <BaseButton.Cta
                      onClick={this.props.setGameTime}
                      value={val}
                      padding=" 10px 15px"
                    >
                      {val} min
                    </BaseButton.Cta>
                  </S.ButtonsBox>
                )
              }
              )}
            </S.ButtonsWrapper>
          </S.ColItem>
        </S.ColBottom>
      </S.NewGameConfig>
    )
  }  
}

NewGameConfig.propTypes = propTypes;
export default NewGameConfig;
