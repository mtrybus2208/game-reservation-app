import React, { useEffect }from 'react';
import PropTypes from 'prop-types';
import Avatar from '@/modules/shared/components/Avatar';
import CircleItem from '@/modules/shared/components/CircleItem';
import * as S from './styles';

const propTypes = {
  user: PropTypes.object,
  display: PropTypes.object,
  children: PropTypes.node,
  customTitle: PropTypes.node,
  customPosition: PropTypes.number,
};

const defaultProps = {};

const GameCard = ({
  user,
  display,
  children,
  customTitle,
  customPosition,
}) => {
  useEffect(() => {
    console.log('GAMECARD RERENDER');
  }, []);
  return (
    <S.GameCard
      size={display.size || 100}
      left={customPosition || display.left}
      top={customPosition || 101}
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
        {customTitle || (
          <React.Fragment>
            <S.Title>{user.name}</S.Title>
            <S.SubTitle>{user.profession}</S.SubTitle>
          </React.Fragment>
        )}
      </S.TitleBox>
      <S.InfoType>
        <span>{display.gameType}</span>
      </S.InfoType>
      {children}
    </S.GameCard>
  );
};

GameCard.propTypes = propTypes;
GameCard.defaultProps = defaultProps;
export default GameCard;
