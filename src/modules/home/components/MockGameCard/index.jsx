import React, { useState } from 'react';
import PropTypes from 'prop-types';
import GameCard from '@/modules/home/components/GameCard';
import BaseIcon from '@/modules/shared/components/BaseIcon';
import * as S from './styles';

const propTypes = {
  user: PropTypes.object,
  display: PropTypes.object,
};

const defaultProps = {};

const MockGameCard = React.memo(({ user, display }) => {
  const [leftPosition, setLeftPosition] = useState(null);

  const customTitle = (
    <S.AnimatedIcon>
      <BaseIcon
        path="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1556279407/scroll.svg"
        size="25px"
      />
    </S.AnimatedIcon>
  );

  const handlerMove = (e) => {
    console.log('dsadasd');
    console.log(e);
  }
  const handlerMouseDown = (e) => {
    console.log('dsadasd');
    console.log(e);
  }
  const handlerMouseLeave = (e) => {
    console.log('dsadasd');
    console.log(e);
  }
  const handlerMouseUp = (e) => {
    console.log('dsadasd');
    console.log(e);
  }
  const handlerMouseMove = (e) => {
    console.log('mouse move');
    const { size } = display;
     
    const postionMy = (e.pageX - 340 + 200) - size;
    console.log(leftPosition);
    setLeftPosition(postionMy);
    // left:  e.pageX-width,
  }

  
  return (
    <S.Test
      left={leftPosition || display.left}
      size={display.size}
      onMouseMove={handlerMouseMove}
    >
      <GameCard 
        user={user}
        display={display}
        customTitle={customTitle} 
        customPosition="0"
      >
        <S.MockGameCard
          // onClick={handlerMove}
          // onMouseDown={handlerMouseDown}
          // onMouseLeave={handlerMouseLeave}
          // onMouseUp={handlerMouseUp}
         
        >
          {/* <S.EnableDragButton>Move me!</S.EnableDragButton> */}
        </S.MockGameCard>
      </GameCard>
    </S.Test>
  );
});

MockGameCard.propTypes = propTypes;
MockGameCard.defaultProps = defaultProps;
export default MockGameCard;
