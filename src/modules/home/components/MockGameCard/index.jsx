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

const MockGameCard = ({ user, display }) => {
  const [count, setCount] = useState(0);
  
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
    console.log('dsadasd');
    console.log(e);
  }

  
  return (
    <GameCard
      user={user}
      display={display}
      customTitle={customTitle}
       
    >
      <S.MockGameCard
        // onClick={handlerMove}
        onMouseDown={handlerMouseDown}
        onMouseLeave={handlerMouseLeave}
        onMouseUp={handlerMouseUp}
        onMouseMove={handlerMouseMove}
      >
        {/* <S.EnableDragButton>Move me!</S.EnableDragButton> */}
      </S.MockGameCard>
    </GameCard>
  );
};

MockGameCard.propTypes = propTypes;
MockGameCard.defaultProps = defaultProps;
export default MockGameCard;
