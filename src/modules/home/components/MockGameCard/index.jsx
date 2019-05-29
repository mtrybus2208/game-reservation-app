import React, { useState, useEffect, useRef } from 'react'; 
import PropTypes from 'prop-types';
import { throttleAnimation } from '@/helpers';
import GameCard from '@/modules/home/components/GameCard';
import BaseIcon from '@/modules/shared/components/BaseIcon';
import {
  DESKTOP_SIDEBAR_WIDTH,
  DESKTOP_TIMELINE_BORDER,
  TIMELINE_MOVE_SPEED,
} from '@/constants/gameSettings';
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

class MockGameCard extends React.Component {

  state = {
    isDragging: false,
    isAbleToMove: false,
    originalX: 0,
    originalY: 0,

    translateX: 0,
    translateY: 0,

    lastTranslateX: 0,
    lastTranslateY: 0
  };

  myRef = React.createRef();

  componentWillUpdate(prevProps, prevState) {
  }

  componentWillUnmount() {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);
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
    });
  };

  handleMouseMove = ({ clientX, clientY }) => {
    const { isDragging } = this.state;
    const { onDrag } = this.props;

    if (!isDragging) {
      return;
    }

    this.setState(prevState => {
      const { current } = this.myRef;
      const { offsetParent } = current;
      const { display } = this.props;

      let res = clientX - prevState.originalX + prevState.lastTranslateX;
      const isLeftDirection = clientX - prevState.originalX < 0;
      const isRightEdge =
        current.offsetLeft + display.size >= offsetParent.offsetWidth + offsetParent.scrollLeft;
      const isLeftEdge = offsetParent.scrollLeft !== 0 && offsetParent.scrollLeft - res > 0;

      if (isLeftEdge) {
        res = offsetParent.scrollLeft;
      }

      if (isRightEdge && !isLeftDirection) {
        res = (offsetParent.offsetWidth + offsetParent.scrollLeft) - display.size;
      }

      return ({
        translateX: res < 0 ? 0 : res,
        translateY: clientY - prevState.originalY + prevState.lastTranslateY,
      });
    }, () => {
      if (onDrag) {
        onDrag({
          translateX: this.state.translateX,
          translateY: this.state.translateY,
        });
      }
    });
  }; 
  handleMouseUp = () => {
    window.removeEventListener('mousemove', this.handleMouseMove);
    window.removeEventListener('mouseup', this.handleMouseUp);

    this.setState(
      {
        originalX: 0,
        originalY: 0,
        lastTranslateX: this.state.translateX,
        lastTranslateY: this.state.translateY,

        isDragging: false,
        isAbleToMove: false,
      },
      () => {
        if (this.props.onDragEnd) {
          this.props.onDragEnd();
        }

        this.props.onBlockTimeLine(false);
      },
    );
  };

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
 
} ;

MockGameCard.propTypes = propTypes;
MockGameCard.defaultProps = defaultProps;
export default MockGameCard;
