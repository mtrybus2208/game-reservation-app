import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromActions from '../../actions';
import { getTimeLine, getWorkdayInPixels, getArrayOfWorkdayHours } from '../../selectors';
import TimeRuler from './components/TimeRuler';
import TimeLineBox from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  workdayInPixels: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
  timeConverter: PropTypes.number,
};

class TimeLine extends Component {
  componentDidMount() {
    console.log(this.props.arrayOfWorkdayHours);
  } 

  render() {
    return (
      <TimeRuler
        workdayInPixels={this.props.workdayInPixels}
        arrayOfWorkdayHours={this.props.arrayOfWorkdayHours}
        timeConverter={this.props.timeConverter}
      />
    );
  }
}

const mapStateToProps = (state) => (
  {
    timeLine: getTimeLine(state),
    workdayInPixels: getWorkdayInPixels(state),
    timeConverter: state.timeLine.timeConverter,
    arrayOfWorkdayHours: getArrayOfWorkdayHours(state),
  }
);

const mapDispatchToProps = dispatch => {
  return { }
};

TimeLine.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
