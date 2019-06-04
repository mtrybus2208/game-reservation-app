import React from 'react'; 
import PropTypes from 'prop-types';
import GameCard from '@/modules/home/components/GameCard';
import BaseIcon from '@/modules/shared/components/BaseIcon';
import * as S from './styles';

const propTypes = {
  authUser: PropTypes.object,
  display: PropTypes.object,
  onBlockTimeLine: PropTypes.func,
  cardPosition: PropTypes.number,
  setCardPosition: PropTypes.func,
  onMoveTimeLine: PropTypes.func,
};

const defaultProps = {}; 

class MockGameCard extends React.PureComponent {

  state = {
    isDragging: false,
    isAbleToMove: false,
    originalX: 0, 
    translateX: 0,
    lastTranslateX: 0, 
    able: false,
    intervalDirection: null,
  };
   
  resetInterval = this.resetInterval.bind(this);
  animLoop = this.animLoop.bind(this);
  myRef = React.createRef();
  running = true; 

  componentDidMount() {
    this.animLoop(() => {
      if (this.state.able) {
        this.tick();
      }
    }, this.myRef.current );
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  animLoop(render, element) {
    let lastFrame = +new Date();
    const loop = now => {
      if (this.running !== false) {
        requestAnimationFrame(loop, element);
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

  detectIntervalReset = (directionX) => {
    return (directionX > 0 && this.state.intervalDirection === 'left') || (directionX < 0 && this.state.intervalDirection === 'right');
  }

  isLeftEdge = () => {
    return (this.myRef.current.offsetParent.scrollLeft > this.state.translateX);
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

    if (this.isLeftEdge() && directionX < 0) {
      this.setState({
        able: true,
        intervalDirection: 'left',
      });
      return;
    }

    if (!this.state.able) {
      this.setState(prevState => ({
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        intervalDirection: null,
        able: false,
      }));
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
      return;
    }

    if (this.state.intervalDirection === 'right' && this.state.able) {
      this.props.onMoveTimeLine(13);
      const computed = (current.offsetParent.offsetWidth + current.offsetParent.scrollLeft) - this.props.display.size;
      current.style.left = `${computed}px`;
    }
  }

  render() {
    const { translateX, translateY, isDragging } = this.state;
    return (
      <S.CardWrap
        size={this.props.display.size}  
        isAbleToMove={this.state.isAbleToMove}
        onMouseDown={this.handleMouseDown} 
        x={translateX}
        y={translateY}
        isDragging={isDragging}
        ref={this.myRef}
      >
        <GameCard
          user={this.props.authUser}
          display={this.props.display}
          customTitle={this.customTitle}
          customPosition
        >
          <S.MockGameCard />
        </GameCard>
      </S.CardWrap>
    );
  }
};

MockGameCard.propTypes = propTypes;
MockGameCard.defaultProps = defaultProps;
export default MockGameCard;
