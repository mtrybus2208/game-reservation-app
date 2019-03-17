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
      <S.Info>
        <span>{display.gameTime}</span>
      </S.Info>
      <S.Body>94
        <Avatar
          path={user.avatarImg}
        />
        <S.TitleBox>
          <S.Title>
            {user.name}
          </S.Title>
          <S.SubTitle>
            {user.profession}
          </S.SubTitle>
        </S.TitleBox>
      </S.Body>
      <S.Info>
        <span>{display.gameType}</span>
      </S.Info>
    </S.GameCard>
  );
};

GameCard.propTypes = propTypes;
GameCard.defaultProps = defaultProps;
export default GameCard;
