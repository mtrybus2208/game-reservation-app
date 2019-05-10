// TODO: Rewrite this with hooks
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getAllReservedGames } from '@/modules/home/state/selectors/entieties';
import * as fromActions from '../../state/actions';
import { getTimeLine, getWorkdayInPixels, getArrayOfWorkdayHours, getActualDateInPixels } from '../../state/selectors';
import TimeRuler from '../../components/TimeRuler';
import Draggable from '../../components/Draggable/index.jsx';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  workdayInPixels: PropTypes.number,
  actualDateInPixels: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
  reservedGames: PropTypes.array,
  timeConverter: PropTypes.number,
  fetchReservedGames: PropTypes.func, 
};

class TimeLine extends Component {
  state = {
    isDown: false,
    isBlocked: false,
    startX: undefined,
    scrollLeft: undefined,
    wrapperPosition: null,
  };

  componentDidMount() {
    this.props.fetchReservedGames();

    // const { current } = this.wrapperRef;
    // this.setState({
    //   wrapperPosition: current.getBoundingClientRect(),
    // });
  }

  componentDidUpdate() {
    // console.log('this.state.wrapperPosition');
    // console.log(this.state.wrapperPosition);
  }

  setWrapperRef = element => element &&
    this.setState({
      wrapperPosition: element.getBoundingClientRect(),
    });

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
          />
        </S.TimeLine>
      </S.TimeLineWrapper>
    );
  }
}

const mapStateToProps = (state) => ({
  timeLine: getTimeLine(state),
  workdayInPixels: getWorkdayInPixels(state),
  workdayStart: state.timeLine.workdayStart,
  actualDateInPixels: getActualDateInPixels(state),
  timeConverter: state.timeLine.timeConverter,
  arrayOfWorkdayHours: getArrayOfWorkdayHours(state),
  reservedGames: getAllReservedGames(state),
  gameReservation: state.gameReservationState,
});

const mapDispatchToProps = dispatch => ({
  fetchReservedGames: () => {
    dispatch(fromActions.fetchReservedGames());
  },
});

TimeLine.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
