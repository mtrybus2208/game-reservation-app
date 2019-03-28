import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '../../../shared/components/Avatar';
import * as S from './styles';

const propTypes = {
  user: PropTypes.object,
  display: PropTypes.object,
};

const defaultProps = {};

const GameCard = ({ user, display }) => (
  <S.GameCard
    size={display.size}
    left={display.left}
  >
    <S.InfoTime>
      <span>{display.gameTime}</span>
    </S.InfoTime>
    <S.Body>
      <Avatar
        path={user.avatarImg}
      />
    </S.Body>
    <S.TitleBox>
      <S.Title>
        {user.name}
      </S.Title>
      <S.SubTitle>
        {user.profession}
      </S.SubTitle>
    </S.TitleBox>
    <S.InfoType>
      <span>{display.gameType}</span>
    </S.InfoType>
  </S.GameCard>
);

GameCard.propTypes = propTypes;
GameCard.defaultProps = defaultProps;
export default GameCard;
