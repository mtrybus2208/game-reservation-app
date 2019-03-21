import React from 'react';
import PropTypes from 'prop-types';
import AppGrid from '../shared/AppGrid';
import TimeLine from './containers/Timeline';
import GameReservation from './containers/GameReservation';
import * as S from './styles';

const propTypes = {};

const defaultProps = {}; 

const Home = ({}) => ( 
  <S.Home>
    <S.TimeLineWrapper>
      <TimeLine />
    </S.TimeLineWrapper>

    <S.ReservationWrapper>
      <GameReservation />
    </S.ReservationWrapper>
  </S.Home>
);

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
export default Home;
