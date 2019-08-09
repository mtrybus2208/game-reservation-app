import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { getWorkdayInPixels, getArrayOfWorkdayHours } from '@/modules/home/state/selectors';
import * as S from './styles';

const propTypes = {};
const defaultProps = {};

const Ruler = () => {
  const workdayInPixels = useSelector(state => getWorkdayInPixels(state));
  const timeConverter = useSelector(({ timeLine }) => timeLine.timeConverter);
  const arrayOfWorkdayHours = useSelector(state => getArrayOfWorkdayHours(state));

  const hoursToPixels = h => h * 60 * timeConverter;

  return (
    <S.Ruler
      height={workdayInPixels}
      timeConverter={timeConverter}
    >
      {
        arrayOfWorkdayHours.map((h, i) => (
          <S.HoursDivider
            key={`t-${i}`}
            width={60 * timeConverter}
            position={hoursToPixels(i)}
            time={h}
          />
        ))
      }
    </S.Ruler>
  );
};

Ruler.propTypes = propTypes;
Ruler.defaultProps = defaultProps;
export default Ruler;
