import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromActions from '../../actions';
import { getTimeLine, getWorkdayInPixels } from '../../selectors';
import TimeLineBox from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  workdayInPixels: PropTypes.number,
};

class TimeLine extends Component {
  componentDidMount() { 
  } 

  render() {
    return (
      <TimeLineBox>
        <p>Workday start - {this.props.timeLine.workdayStart.format('h:mm:ss a')}</p>
        <p>Workday End - {this.props.timeLine.workdayEnd.format('h:mm:ss a')}</p>
        <p>Actual Time - {this.props.timeLine.actualTime.format('h:mm:ss a')}</p>
        <hr></hr>
        <p>workdayInPixels - {this.props.workdayInPixels}</p>

      </TimeLineBox>
    );
  }
}

const mapStateToProps = (state) => (
  {
    timeLine: getTimeLine(state),
    workdayInPixels: getWorkdayInPixels(state),
  }
);

const mapDispatchToProps = dispatch => {
  return { 
  }
};

TimeLine.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
