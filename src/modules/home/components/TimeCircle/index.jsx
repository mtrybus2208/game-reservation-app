import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  time: PropTypes.node,
  unit: PropTypes.string,
};

const defaultProps = {
  unit: null,
}; 

const TimeCircle = ({ time, unit }) => {
  return (
    <S.TimeCircle>
      <S.Time>
        {time}
      </S.Time>
      {unit && <S.Unit>{unit}</S.Unit>}
    </S.TimeCircle>
  );
};

TimeCircle.propTypes = propTypes;
TimeCircle.defaultProps = defaultProps;
export default TimeCircle;
