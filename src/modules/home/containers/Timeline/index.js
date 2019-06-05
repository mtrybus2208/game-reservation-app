import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { throttled } from '@/helpers';
import { getAllReservedGames } from '@/modules/home/state/selectors/entieties';
import TimeRuler from '@/modules/home/components/TimeRuler';
import * as fromActions from '../../state/actions';
import { getTimeLine, getWorkdayInPixels, getArrayOfWorkdayHours, getActualDateInPixels } from '../../state/selectors';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  workdayInPixels: PropTypes.number,
  actualDateInPixels: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
  reservedGames: PropTypes.array,
  timeConverter: PropTypes.number,
  fetchReservedGames: PropTypes.func,
  setCurrentReservationTime: PropTypes.func,
  sessionState: PropTypes.object,
};

class TimeLine extends Component {

  state = {
    isDown: false,
    isBlocked: false,
    startX: undefined,
    scrollLeft: undefined,
    startPosition: false,
  };
  interval = null;
  handlerMoveTimeLine = this.handlerMoveTimeLine.bind(this);
  setStart = this.setStart.bind(this);

  componentDidMount() {
    this.props.fetchReservedGames();
    
  }

  componentDidUpdate() {}

  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  setStart(data) {
    this.setState((prev) => {
      if (prev.startPosition !== data) {
        return { startPosition: data };
      }
    })
  }

  handlerMoveTimeLine(modifier) {    
    const { current } = this.timeLineRef;
    current.scrollLeft = current.scrollLeft + modifier;
 
    return current.scrollLeft;
  }

  timeLineRef = React.createRef();

  mouseLeave = () => () => {
    this.setState({
      isDown: false,
    });
  };

  mouseMove = () => e => {
    const { current } = this.timeLineRef;
    if (!this.state.isDown || this.state.isBlocked) return;
    e.preventDefault();
    const x = e.pageX - current.offsetLeft;
    const walk = (x - this.state.startX);
    current.scrollLeft = this.state.scrollLeft - walk;

    throttled(200, this.props.setCurrentReservationTime(current.scrollLeft));
  };

  mouseUp = () => () => {
    this.setState({
      isDown: false,
    });
  };

  mouseDown = () => e => {
    const { current } = this.timeLineRef;
    this.setState({
      isDown: true,
      startX: e.pageX - current.offsetLeft,
      scrollLeft: current.scrollLeft,
    });
  };

  handlerBlockTimeLine = isBlocked => {
    this.setState({
      isBlocked,
    });
  }

  render() {
    return (
      <S.TimeLineWrapper
        isBlocked={this.state.isBlocked}
        ref={this.setWrapperRef}
      >
        <S.TimeLine
          ref={this.timeLineRef}
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
            reservedGames={this.props.reservedGames}
            workdayStart={this.props.workdayStart}
            gameReservation={this.props.gameReservation}
            onBlockTimeLine={this.handlerBlockTimeLine}
            onMoveTimeLine={this.handlerMoveTimeLine}
            authUser={this.props.sessionState.authUser}
            startPosition={this.state.startPosition}
            setStart={this.setStart}
            setCurrentReservationTime={this.props.setCurrentReservationTime}
          />
        </S.TimeLine>
      </S.TimeLineWrapper>
    );
  }
}

const mapStateToProps = state => ({
  timeLine: getTimeLine(state),
  workdayInPixels: getWorkdayInPixels(state),
  workdayStart: state.timeLine.workdayStart,
  actualDateInPixels: getActualDateInPixels(state),
  timeConverter: state.timeLine.timeConverter,
  arrayOfWorkdayHours: getArrayOfWorkdayHours(state),
  reservedGames: getAllReservedGames(state),
  gameReservation: state.gameReservationState,
  sessionState: state.sessionState,
});

const mapDispatchToProps = dispatch => ({
  fetchReservedGames: () => {
    dispatch(fromActions.fetchReservedGames());
  },
  zoomTimeLine: payload => {
    dispatch(fromActions.zoomTimeLine(payload));
  },
  setCurrentReservationTime: payload => {
    dispatch(fromActions.setCurrentReservationTime(payload));
  },
});

TimeLine.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
