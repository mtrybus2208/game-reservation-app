import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../../components/Avatar';
import * as S from './styles';

const propTypes = {
  user: PropTypes.object,
  display: PropTypes.object,
};

const defaultProps = { 
}; 

const GameCard = ({ user, display }) => {
  return (
    <S.GameCard
      size={display.size}
      left={display.left}
    >
      <S.GameCard.Info>
        <span>{display.gameTime}</span>
      </S.GameCard.Info>
      <S.GameCard.Body>
        <Avatar
          path={user.avatarImg}
        />
        <S.GameCard.Body.TitleBox>
          <S.GameCard.Body.Title>
            {user.name}
          </S.GameCard.Body.Title>
          <S.GameCard.Body.SubTitle>
            {user.profession}
          </S.GameCard.Body.SubTitle>
        </S.GameCard.Body.TitleBox>
      </S.GameCard.Body>
      <S.GameCard.Info>
        <span>{display.gameType}</span>
      </S.GameCard.Info>
    </S.GameCard>
  );
};

GameCard.propTypes = propTypes;
GameCard.defaultProps = defaultProps;
export default GameCard;
