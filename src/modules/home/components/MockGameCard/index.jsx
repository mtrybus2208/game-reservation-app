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
    translateX: 0,
    lastTranslateX: 0, 
    able: false,
    test: 0,
    intervalMove: false,
    isRightEdge: false,
  };
  handleNormalMove = this.handleNormalMove.bind(this);
  handleLeftEdgeMove = this.handleLeftEdgeMove.bind(this);
  animLoop = this.animLoop.bind(this);
  myRef = React.createRef();
  running = true;

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
    // zastopuj stoper
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

  afterMouseMove() {
    const { current } = this.myRef;
    const { offsetParent } = current;
    const { display } = this.props;  
  }

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
          console.log('handleIntervalMov')
        });
      }
 
    }); 
  }

  handleIntervalMove() {
    this.setState(prevState => ({
      able: true,
    }), () => { 
    });
  }

  handleLeftEdgeMove(clientX) {  
    const { isDragging } = this.state;
    const { current } = this.myRef;
    const { offsetParent } = current;

     
    this.setState(prevState => ({ 
      isRightEdge: false,
      translateX:  clientX - prevState.originalX + prevState.lastTranslateX,
    }), this.afterMouseMove);
    
  }


  handleMouseMove = ({ clientX }) => {
    const { isDragging} = this.state;
    const mouseLeftMove = clientX - this.state.originalX < 0;
    const mouseRightMove = clientX - this.state.originalX > 0;

    if (!isDragging) {
      return;
    } 
    if(mouseLeftMove && !this.state.isRightEdge) { 
      this.handleNormalMove(clientX);
      return false;
    }

    if(mouseLeftMove && this.state.isRightEdge) { 
        this.handleLeftEdgeMove(clientX);
        return false;
  
      }

    if(mouseRightMove) { 
      this.handleNormalMove(clientX)
      return false;
    } 
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
    console.log('RENDER')
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
