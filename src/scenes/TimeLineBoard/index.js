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
  background: #363030;
  height: 100%;
  box-shadow: rgba(0,0,0,.12) 0 1px 6px;
  border-bottom: border-right: 1px solid #3c3838;
  border-bottom: 1px solid #3c3838; 
`;

const AppSidebar = styled.div`
  display: flex;
  background: #624f63;
  background: #332c2c;
  box-shadow: rgba(0,0,0,.12) 0 1px 6px;
  border-right: 1px solid #3c3838;
  padding: 15px;
`;

const AppMain = styled.main`
  overflow-y: hidden; 
  padding-top: 50px;
  text-align: center;
  display: grid; 
  grid-template-rows: [timeline] 60vh [cta-row] 1fr;
`;

AppMain.CtaWrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
AppMain.TimeWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  background: #00000017;
  border-radius: 10px;
  padding: 40px;
  box-shadow: rgba(0,0,0,.12) 0 10px 16px;
  overflow-x: auto;
  max-width: 80%;
  margin: 0 auto;

  &::-webkit-scrollbar-track {
    background-color: rgba(255, 255, 255, .4);
  }

  &::-webkit-scrollbar {
    background-color: rgba(255, 255, 255, .4);    
    width: 5px;
  }

  &::-webkit-scrollbar-thumb {
    background-color: #5b4269;
  }
`;

const propTypes = {
  changeGameConfigState: PropTypes.func.isRequired,
};

class TimeLineBoard extends Component {
  async componentDidMount() {
    //   const data = await loadStuff();
    //   this.setState({ loading: false, data });
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
              <BaseButton.Cta onClick={this.openGameConfig}>Reserve Game + </BaseButton.Cta>
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
