import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

import AppGrid from '../../components/AppGrid';
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
  padding: 20px;
  text-align: center;
`;

AppMain.CtaWrap = styled.main`
  padding: 15px;
  margin: 20px auto;
`;

AppMain.CopyWrap = styled.main`
  padding: 15px;
  margin-top: 30px;
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
            <AppMain.CopyWrap>
              <p>Nulla aliqua occaecat qui duis tempor amet.</p>
              <p>Nulla aliqua occaecat qui duis tempor amet.</p>
              <p>Nulla aliqua occaecat qui duis tempor amet.</p>
            </AppMain.CopyWrap>
            <AppMain.CtaWrap>
              <BaseButton.Cta onClick={this.openGameConfig}>Reserve Game + </BaseButton.Cta>
            </AppMain.CtaWrap>
            <TimeLine />
          </AppMain>
        </AppGrid.Main>
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
