import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import TimeRuler from '@/modules/home/containers/TimeRuler';
import { getTimeLine, getActualDateInPixels } from '@/modules/home/state/selectors';
import { getIsReservationBlocked } from '@/modules/home/state/selectors/gameReservation';
import * as fromActions from '../../state/actions';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
  actualDateInPixels: PropTypes.number,
  fetchReservedGames: PropTypes.func,
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
  getWrapperScrollPosition = this.getWrapperScrollPosition.bind(this);
  setStart = this.setStart.bind(this);
  timeLineRef = React.createRef();

  componentDidMount() {
    this.props.fetchReservedGames();
    this.handlerMoveTimeLine(this.props.actualDateInPixels);
  }
  
  componentWillUnmount() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  setStart(data) {
    this.setState(prev => {
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

  getWrapperScrollPosition() {
    const { current } = this.timeLineRef;
    return current ? current.scrollLeft : 0;
  }

  render() {
    return (
      <S.TimeLineWrapper
        isBlocked={this.state.isBlocked}
        isReservationBlocked={this.props.isReservationBlocked}
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
          <TimeRuler
            onBlockTimeLine={this.handlerBlockTimeLine}
            onMoveTimeLine={this.handlerMoveTimeLine}
            startPosition={this.state.startPosition}
            setStart={this.setStart}
            wrapperScrollPosition={this.getWrapperScrollPosition()}
          />
        </S.TimeLine>
      </S.TimeLineWrapper>
    );
  }
}

const mapStateToProps = state => ({
  timeLine: getTimeLine(state),
  actualDateInPixels: getActualDateInPixels(state),
  isReservationBlocked: getIsReservationBlocked(state),
});

const mapDispatchToProps = dispatch => ({
  fetchReservedGames: () => {
    dispatch(fromActions.fetchReservedGames());
  },
});

TimeLine.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
