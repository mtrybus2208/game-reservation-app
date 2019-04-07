import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@/modules/shared/components/Avatar';
import CircleItem from '@/modules/shared/components/CircleItem';
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
      <S.InfoTime>
        <span>{display.gameTime}</span>
      </S.InfoTime>
      <S.Body>
        <S.AvatarBox>
          <CircleItem>
            <Avatar path={user.avatarImg} />
          </CircleItem>
        </S.AvatarBox>
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
};

GameCard.propTypes = propTypes;
GameCard.defaultProps = defaultProps;
export default GameCard;
