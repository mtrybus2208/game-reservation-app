import React from 'react';
import PropTypes from 'prop-types';
import AppGrid from '../shared/AppGrid';
import TimeLine from './containers/Timeline';
import GameReservation from './containers/GameReservation';
import * as S from './styles';

const propTypes = {};

const defaultProps = {}; 

const HomeWrapper = ({}) => {
  return (
    <S.HomeWrapper>
      <TimeLine />
      <GameReservation />
    </S.HomeWrapper>
  );
};

HomeWrapper.propTypes = propTypes;
HomeWrapper.defaultProps = defaultProps;
export default HomeWrapper;
