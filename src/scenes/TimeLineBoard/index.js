import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AppGrid from '../../components/AppGrid';
import GameReservation  from './components/GameReservation';
import TimeLine  from './components/TimeLine';
import BaseButton from '../../components/Button';
import * as fromActions from './actions';


const AppHeader = styled.header`
    background: #141619;
    height: 100%;
    box-shadow: rgba(0,0,0,.12) 0 1px 6px;
`;

const AppSidebar = styled.div`
  display: flex; 
  padding: 15px;
  background: #16181b;
`;

const AppMain = styled.main`
    overflow-y: hidden; 
    text-align: center;
    display: grid;
    grid-template-rows: [timeline] 60vh [cta-row] 1fr;
    padding: 0;
    margin: 0;
`;

AppMain.CtaWrap = styled.div`
  display: flex;
  background:  ${props => props.theme.base.light};
  height: 80px;
  padding: 0;
  margin: 0;
  justify-content: flex-start;
  align-items: stretch;
`;

AppMain.TimeWrap = styled.div` 
  overflow-x: auto;
  border-radius: 0;
`;

const propTypes = {
  changeGameConfigState: PropTypes.func.isRequired,
};

class TimeLineBoard extends Component {
  async componentDidMount() {
  }

  openGameConfig = this.openGameConfig.bind(this);

  openGameConfig() {
    this.props.changeGameConfigState(true);
  }

  render() {
    return ( 
      <AppGrid>
        <AppGrid.Sidebar>
          <AppSidebar>Sidebar</AppSidebar>
        </AppGrid.Sidebar>
        <AppGrid.Header>
          <AppHeader>Header</AppHeader>
        </AppGrid.Header>
        <AppGrid.Main>
          <AppMain>
            <AppMain.TimeWrap>
              <TimeLine />
            </AppMain.TimeWrap>

            <AppMain.CtaWrap>
              <BaseButton.Cta
                maxWidth={'480px'}
                onClick={this.openGameConfig}
              >
                <span>Reserve Game</span>
              </BaseButton.Cta>
            </AppMain.CtaWrap>
          </AppMain>
        </AppGrid.Main>
        <GameReservation />
      </AppGrid>
    );
  } 
}

const mapStateToProps = ({ timeLine }) => (
  { timeLine }
);

const mapDispatchToProps = dispatch => {
  return {
    setGameTime: (payload) => {
      dispatch(
        fromActions.setGameTime(payload),
      )
    },

    changeGameConfigState: (payload) => {
      dispatch(
        fromActions.changeGameConfigState(payload),
      )
    },
  }
}

TimeLineBoard.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TimeLineBoard);
