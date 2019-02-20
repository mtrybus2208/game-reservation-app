import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Ruler from './styles';

const propTypes = {
  workdayInPixels: PropTypes.number,
  timeConverter: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
};

class TimeRuler extends Component {
  hoursToPixels(h) {
    return h * 60 * this.props.timeConverter;
  }

  render() {
    return (
      <Ruler.Box>
        <Ruler
          height={this.props.workdayInPixels}
          timeConverter={this.props.timeConverter}
        >
          {this.props.arrayOfWorkdayHours.map((h, i) => {
            console.log(i)
            return  (
              <Ruler.HoursDivider
                key={`t-${i}`}
                width={60 * this.props.timeConverter}
                position={this.hoursToPixels(i)}
                time={h}
              />
            
            )}
            )}
        </Ruler>
      </Ruler.Box>
    );
  }
};

TimeRuler.propTypes = propTypes;
export default TimeRuler;
