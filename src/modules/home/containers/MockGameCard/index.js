import React from 'react'; 
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { throttled } from '@/helpers';
import GameCard from '@/modules/home/components/GameCard';
import BaseIcon from '@/modules/shared/components/BaseIcon';
import withUser from '@/modules/home/HOC/withUser';
import { getIsReservationBlocked } from '@/modules/home/state/selectors/gameReservation';
import { getTimeLine } from '@/modules/home/state/selectors';
import * as fromActions from '@/modules/home/state/actions';
import * as S from './styles';

const propTypes = {
  timeLine: PropTypes.object,
  initialCardPosition: PropTypes.number,
  display: PropTypes.object,
  onBlockTimeLine: PropTypes.func,
  onMoveTimeLine: PropTypes.func,
  setCurrentReservationTime: PropTypes.func,
  setReservationPermission: PropTypes.func,
  reservedIntervals: PropTypes.array,
  showSpinner: PropTypes.bool,
  isReservationBlocked: PropTypes.bool,
  actualDateInPixels: PropTypes.number,
};

const defaultProps = {
};

class MockGameCard extends React.PureComponent {
  state = {
    isDragging: false,
    isAbleToMove: false,
    originalX: 0, 
    translateX: this.props.initialCardPosition,
    lastTranslateX: 0, 
    able: false,
    intervalDirection: null,
  };
   
  resetInterval = this.resetInterval.bind(this);
  animLoop = this.animLoop.bind(this); 
  myRef = React.createRef();
  running = true;
  animationId = null;

  GameCardWithUser = withUser(GameCard);

  componentDidMount() {
    const { current } = this.myRef; 
    this.setAbilityToReserve(parseInt(current.style.left, 10));
    this.animLoop(() => {
      if (this.state.able) {
        this.tick();
      }
    }, this.myRef.current);
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    if (this.animationId) {
      window.cancelAnimationFrame(this.animationId);
      this.animationId = undefined;
    }
  }

  animLoop(render, element) {
    let lastFrame = +new Date();
    const loop = now => {
      if (this.running !== false) {
        this.animationId = requestAnimationFrame(loop, element);
        if (this.state.able !== false) {
          this.running = render( now - lastFrame );
          lastFrame = now;
        }
      }
    };
    loop(lastFrame);
  }

  customTitle = (
    <S.AnimatedIcon>
      <BaseIcon
        path="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1556279407/scroll.svg"
        size="25px"
      />
    </S.AnimatedIcon>
  )

  handleMouseDown = ({ clientX, clientY }) => {
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);

    this.setState(prev =>
      ({ 
        lastTranslateX: parseInt(this.myRef.current.style.left, 10),
        originalX: clientX,
        isDragging: true,
        isAbleToMove: true,
        able: false,
      }),
    () => {
      this.props.onBlockTimeLine(true);
    },
    );
  }; 

  resetInterval(clientX) {
    this.setState({
      originalX: clientX,
      lastTranslateX: parseInt(this.myRef.current.style.left),
      isDragging: true,
      isAbleToMove: true,
      able: false,
      intervalDirection: null,
    });
  }

  detectIntervalReset = directionX =>
    (directionX > 0 && this.state.intervalDirection === 'left') || (directionX < 0 && this.state.intervalDirection === 'right');

  isLeftEdge = () => (this.myRef.current.offsetParent.scrollLeft > this.state.translateX);

  isReservedCardHovered = pos => {
    if (pos < this.props.actualDateInPixels) {
      return true;
    }
    const fullPos = pos + this.props.display.size;
    return this.props
      .reservedIntervals
      .some(posArr => {
        const [start, end] = posArr;
        return (fullPos >= start && pos <= end);
      });
  }

  setAbilityToReserve = pos => {
    return this.props.isReservationBlocked !== this.isReservedCardHovered(pos) &&
    this.props.setReservationPermission({
      payload: this.isReservedCardHovered(pos),
    });
  };

  handlerSetCurrentReservation = (pos) => () => {
    this.setAbilityToReserve(pos);
    throttled(250, this.props.setCurrentReservationTime(pos));
  }

  handleMouseMove = e => {
    const { clientX } = e;
    const { isDragging } = this.state;
    const { current } = this.myRef;
    const { offsetParent } = current;

    const directionX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    const isRightEdge = parseInt(current.style.left, 10) + this.props.display.size >= current.offsetParent.offsetWidth + offsetParent.scrollLeft;

    if (!isDragging) {
      return;
    }

    if (this.detectIntervalReset(directionX)) {
      this.resetInterval(clientX);
      return;
    }

    if (!this.state.able) {
      this.setState(prevState => {
        const translateX = clientX - prevState.originalX + prevState.lastTranslateX;
        return {
          translateX,
          intervalDirection: null,
          able: false,
        };
      }, this.handlerSetCurrentReservation(this.state.translateX));
    }

    if (this.isLeftEdge() && directionX < 0) {
      this.setState({
        able: true,
        intervalDirection: 'left',
      });
      return;
    }

    if (isRightEdge && directionX > 0 && !this.state.able) {
      this.setState(prevState => ({
        able: true,
        intervalDirection: 'right',
        translateX: isRightEdge ? offsetParent.offsetWidth + offsetParent.scrollLeft - this.props.display.size : clientX - prevState.originalX + prevState.lastTranslateX,
      }));
    }
  };

  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
    
    this.setState(prev => ({
      originalX: 0,
      originalY: 0,
      lastTranslateX: prev.able ? parseInt(this.myRef.current.style.left, 10) : this.state.translateX,

      isDragging: false,
      isAbleToMove: false, 
      able: false,
    }), () => {
      this.props.onBlockTimeLine(false);
    });
  };

  tick = () => {
    const { current } = this.myRef;

    if (this.state.intervalDirection === 'left' && this.state.able) {
      this.props.onMoveTimeLine(-13);
      const computed = current.offsetParent.scrollLeft;
      current.style.left = `${computed}px`;
      this.handlerSetCurrentReservation(computed)();
      return;
    }

    if (this.state.intervalDirection === 'right' && this.state.able) {
      this.props.onMoveTimeLine(13);
      const computed = (current.offsetParent.offsetWidth + current.offsetParent.scrollLeft) - this.props.display.size;
      current.style.left = `${computed}px`;
      this.handlerSetCurrentReservation(computed)();
    }
  }

  render() {
    const { translateX, translateY, isDragging } = this.state;
    return (
      <S.CardWrap
        size={this.props.display.size}  
        isAbleToMove={this.state.isAbleToMove}
        isAbleToReserve={this.props.isReservationBlocked}
        onMouseDown={this.handleMouseDown} 
        x={translateX}
        y={translateY}
        isDragging={isDragging}
        ref={this.myRef}
      >
        <this.GameCardWithUser
          display={this.props.display}
          customTitle={this.customTitle}
          customPosition
          showSpinner={this.props.timeLine.showSpinner}
        >
          <S.MockGameCard isAbleToReserve={this.props.isReservationBlocked} />
        </this.GameCardWithUser>
      </S.CardWrap>
    );
  }
};

const mapStateToProps = state => ({
  isReservationBlocked: getIsReservationBlocked(state),
  timeLine: getTimeLine(state),
});

const mapDispatchToProps = dispatch => ({
  setCurrentReservationTime: payload => {
    dispatch(fromActions.setCurrentReservationTime(payload));
  },
  setReservationPermission: payload => {
    dispatch(fromActions.setReservationPermission(payload));
  },
});

MockGameCard.propTypes = propTypes;
MockGameCard.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(MockGameCard);
