import React, { useState, useEffect, useRef } from 'react'; 
import PropTypes from 'prop-types';
import GameCard from '../GameCard';
import MockGameCard from '../MockGameCard';
import * as S from './styles';
import moment from 'moment';

const propTypes = {
  timeConverter: PropTypes.number,
};

const defaultProps = {};

const TimeRuler2 = React.memo(({
  timeConverter,
  height,
  children,
}) => { 
  const hoursToPixels = h => h * 60 * timeConverter;
 
  return (
    <S.TimeRuler
      height={height}
      timeConverter={timeConverter}
    >
      {children}
    </S.TimeRuler>
  );
});

TimeRuler2.propTypes = propTypes;
TimeRuler2.defaultProps = defaultProps;
export default TimeRuler2;
