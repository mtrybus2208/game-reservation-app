// TODO: Rewrite this with hooks
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromActions from '../../state/actions';
import { getTimeLine, getWorkdayInPixels, getArrayOfWorkdayHours, getActualDateInPixels } from '../../state/selectors';
import TimeRuler from '../../components/TimeRuler';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  workdayInPixels: PropTypes.number,
  actualDateInPixels: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
  timeConverter: PropTypes.number,
};

class TimeLine extends Component {
  state = {
    isDown: false,
    startX: undefined,
    scrollLeft: undefined,
  };

  componentDidMount() {
    this.props.fetchReservedGames();
  }

  wrapRef = null;

  mouseLeave = () => () => {
    this.setState({
      isDown: false,
    });
  };

  mouseMove = () => (e) => {
    if (!this.state.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.wrapRef.offsetLeft;
    const walk = (x - this.state.startX);
    this.wrapRef.scrollLeft = this.state.scrollLeft - walk;
  };

  mouseUp = () => () => {
    this.setState({
      isDown: false,
    });
  };

  mouseDown = () => (e) => {
    this.setState({
      isDown: true,
      startX: e.pageX - this.wrapRef.offsetLeft,
      scrollLeft: this.wrapRef.scrollLeft,
    });
  };

  render() {
    return (
      <S.TimeLineWrapper>
        <S.TimeLine
          innerRef={(el) => {
            this.wrapRef = el;
          }}
          onMouseDown={this.mouseDown()}
          onMouseLeave={this.mouseLeave()}
          onMouseUp={this.mouseUp()}
          onMouseMove={this.mouseMove()}
          isOpen={!this.props.timeLine.gameConfigOpen}
        >
          {/* <TimeLineBox.ActualTime
            distanceFromStart={
              Number(this.props.actualDateInPixels.toFixed())
            }
          >
            {this.props.timeLine.actualTime.format('HH:mm')}
          </TimeLineBox.ActualTime> */}
          <TimeRuler
            workdayInPixels={this.props.workdayInPixels}
            arrayOfWorkdayHours={this.props.arrayOfWorkdayHours}
            timeConverter={this.props.timeConverter}
          />
        </S.TimeLine>
      </S.TimeLineWrapper>
    );
  }
}

const mapStateToProps = (state) => (
  {
    timeLine: getTimeLine(state),
    workdayInPixels: getWorkdayInPixels(state),
    actualDateInPixels: getActualDateInPixels(state),
    timeConverter: state.timeLine.timeConverter,
    arrayOfWorkdayHours: getArrayOfWorkdayHours(state),
  }
);

const mapDispatchToProps = dispatch => {
  return {
    fetchReservedGames: () => {
      dispatch(fromActions.fetchReservedGames());
    },
  }
};

TimeLine.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
