import React, { useState, useEffect, useRef } from 'react'; 
import PropTypes from 'prop-types';
import GameCard from '@/modules/home/components/GameCard';
import BaseIcon from '@/modules/shared/components/BaseIcon';
import * as S from './styles';

/**
 * Create handlers foe every directions
 * 1. left
 * 2. right
 * 3. right interval 
 * 4. left interval 
 * 5. right interval + change direction to left
 * 6. left interval + change direction to right
 */

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
    test: 0,
    intervalMove: false,
    isRightEdge: false,
  };
  handleNormalMove = this.handleNormalMove.bind(this);
  leftMoveSimple = this.leftMoveSimple.bind(this);
  animLoop = this.animLoop.bind(this);
  myRef = React.createRef();
  running = true;

  localMouseDirection = {
    x: 0,
  }

  componentDidMount() {
    this.animLoop( ( deltaT ) => {
      if(this.state.able) {
        this.tick(); 
      }
  }, this.myRef.current );
}

  componentDidUpdate(prevProps, prevState) { 
  }
  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
  }

  animLoop( render, element ) {
    let lastFrame = +new Date; 
    const loop = ( now ) => { 
  
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

    this.setState( prev =>
      ({ 
        lastTranslateX: !prev.able ? parseInt(this.myRef.current.style.left) : this.state.translateX,
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

  handleNormalMove(clientX) {
    const { isDragging } = this.state;
    const { current } = this.myRef;
    const { offsetParent } = current;

    if (!isDragging) {
      return;
    }
    
    const isRightEdge = this.state.translateX + this.props.display.size >= offsetParent.offsetWidth + offsetParent.scrollLeft; 
    this.setState(prevState => ({  
      isRightEdge,
      translateX: isRightEdge ? offsetParent.offsetWidth + offsetParent.scrollLeft - this.props.display.size : clientX - prevState.originalX + prevState.lastTranslateX,
      
    }), () => {
      if(this.state.isRightEdge) {
        this.setState(prevState => ({
          able: true,
        }), () => { 
        });
      }
    }); 
  }

  leftMoveSimple(clientX) { 
    this.setState( prev =>
      ({
        originalX: clientX, 
        lastTranslateX: parseInt(this.myRef.current.style.left),
        isDragging: true,
        isAbleToMove: true,
        able: false,
        isRightEdge: false
      }),
    );
  }

  handleMouseMove = (e) => {
    const {clientX } = e;
    const { isDragging } = this.state;

    const directionX = e.movementX || e.mozMovementX || e.webkitMovementX || 0;
    const isRightEdge = this.state.translateX + this.props.display.size >= this.myRef.current.offsetParent.offsetWidth +this.myRef.current. offsetParent.scrollLeft;  

    const mouseLeftMove = clientX - this.state.originalX < 0;
    const mouseRightMove = clientX - this.state.originalX > 0;

    if (!isDragging) {
      return;
    }

    if(directionX <0 && isRightEdge) {
      console.log('end of wrapper');

      this.setState(prevState => ({  
        isRightEdge: false,
        translateX: clientX - prevState.originalX + prevState.lastTranslateX,
        able: false,
        isAbleToMove: true,
      }));
      return false;
    }


    if(mouseRightMove && directionX <0 && !this.state.able && !this.state.isRightEdge) {
      this.leftMoveSimple(clientX)
      return;
    }

    if(mouseRightMove && this.state.able && directionX < 0) { 
      this.setState({
        able: false,
        isRightEdge: false,
      })
      return;
    } 

     this.handleNormalMove(clientX);
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
