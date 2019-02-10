import React from 'react';
import PropTypes from 'prop-types';

import Ruler from './styles';

const propTypes = {
  workdayInPixels: PropTypes.number,
  timeConverter: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
};

const TimeRuler = ({ workdayInPixels, arrayOfWorkdayHours, timeConverter }) => {
  const hoursToPixels = h => h * 60 * timeConverter;
  return (
    <Ruler
      height={workdayInPixels}
      timeConverter={timeConverter}
    >
      {arrayOfWorkdayHours.map((h, i) =>
        (
          <Ruler.HoursDivider
            key={`t-${i}`}
            position={hoursToPixels(i + 1)}
            time={h}
          />
        ))}
    </Ruler>
  );
};

TimeRuler.propTypes = propTypes;
export default TimeRuler;
