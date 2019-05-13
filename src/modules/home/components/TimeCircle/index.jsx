import React from 'react';
import PropTypes from 'prop-types';
import CircleItem from '@/modules/shared/components/CircleItem'
import * as S from './styles';

const propTypes = {
  time: PropTypes.node,
  unit: PropTypes.string,
  active: PropTypes.bool,
  hoverable: PropTypes.bool,
};

const defaultProps = {
  unit: null,
  active: false,
  hoverable: false,
}; 

const TimeCircle = ({ time, unit, active, hoverable }) => {
  return (
    <CircleItem hoverable={hoverable} active={active}>
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
