import React, { useState, useEffect, useRef } from 'react'; 
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
    originalY: 0,
    translateX: 0,
    translateY: 0,
    lastTranslateX: 0,
    lastTranslateY: 0,
    paused: false,
    able: false,
    test: 0,
  };

  myRef = React.createRef();
  running = undefined; 

  componentDidMount() {
    this.animLoop( ( deltaT ) => {
      this.tick(); 
  }, this.myRef.current );
  }

  componentWillUpdate(prevProps, prevState) {}

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  animLoop = ( render, element ) => {
    let lastFrame = +new Date; 
    const loop = ( now ) => { 
      time.elapsed = now - time.start;  
      const position =  parseInt(this.myRef.current.style.left); 
  
      if ( this.running !== false) {
          requestAnimationFrame( loop, element );
            if(this.state.able !== false) {
              this.running = render( now - lastFrame );
              lastFrame = now;

            } 
      }
    }

    loop( lastFrame ); 
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

    if (this.props.onDragStart) {
      this.props.onDragStart();
    }

    this.props.onBlockTimeLine(true);

    this.setState({
      originalX: clientX,
      originalY: clientY,
      isDragging: true,
      isAbleToMove: true,
      able: false
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    } 
    this.setState(prevState => {
      let res = clientX - prevState.originalX + prevState.lastTranslateX;
 
      const { current } = this.myRef;
      const { offsetParent } = current;
      const isLeftDirection = clientX - prevState.originalX < 0;
      const isLeftEdge = offsetParent.scrollLeft - res > 0;   
      if (this.isRightEdge() && !isLeftDirection) {
        if(!this.state.able) {
          this.moveDir = clientX;
          this.setState(prev => {
            return {
              able: true, 
            } 
          })
        }  
        return;
      }

      if (isLeftEdge ) {  
        res = offsetParent.scrollLeft;
      }   
 
      return ({
        translateX: res < 0 ? 0 : res, 
        paused: true,
      });
    });
  }; 
  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
 
    this.setState( prev =>
      ({
        originalX: 0,
        originalY: 0,
        lastTranslateX: prev.able ? parseInt(this.myRef.current.style.left) : this.state.translateX,

        isDragging: false,
        isAbleToMove: false,
        paused: false,
        able: false,
      }),
      () => { 

        this.props.onBlockTimeLine(false);
      },
    );
  };  

  isRightEdge = () => {
    const { current } = this.myRef;
    const { offsetParent } = current;
    const { display } = this.props; 

    return current.offsetLeft + display.size >= offsetParent.offsetWidth + offsetParent.scrollLeft;
  }

  tick = () => {
    const { current } = this.myRef;
    this.props.onMoveTimeLine(+13);
    const computed = (this.myRef.current.offsetParent.offsetWidth + this.myRef.current.offsetParent.scrollLeft) - this.props.display.size;
    this.myRef.current.style.left = `${computed}px`;
    return;
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
