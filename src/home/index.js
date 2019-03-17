import React from 'react';
import PropTypes from 'prop-types';
import AppGrid from '../shared/AppGrid';
import TimeLine from './containers/Timeline';
import GameReservation from './containers/GameReservation';
import * as S from './styles';

const propTypes = {};

const defaultProps = {}; 

const HomeWrapper = ({}) => ( 
  <React.Fragment>
    <AppGrid.TimeLineArea>
      <TimeLine />
    </AppGrid.TimeLineArea>

    <AppGrid.ReservationArea>
      <GameReservation />
    </AppGrid.ReservationArea>
  </React.Fragment>
);

HomeWrapper.propTypes = propTypes;
HomeWrapper.defaultProps = defaultProps;
export default HomeWrapper;
