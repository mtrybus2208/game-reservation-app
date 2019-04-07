import React from 'react';
import PropTypes from 'prop-types';
import CircleItem from '@/modules/shared/components/CircleItem'
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
    <CircleItem hoverable={!!unit}>
      <S.Box>
        <S.Time>
          {time}
        </S.Time>
        {unit && <S.Unit>{unit}</S.Unit>}
      </S.Box>
    </CircleItem>
  );
};

TimeCircle.propTypes = propTypes;
TimeCircle.defaultProps = defaultProps;
export default TimeCircle;
