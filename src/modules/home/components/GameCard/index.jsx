import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { ClapSpinner } from 'react-spinners-kit';
import Avatar from '@/modules/shared/components/Avatar';
import CircleItem from '@/modules/shared/components/CircleItem';
import BaseIcon from '@/modules/shared/components/BaseIcon';
import * as S from './styles';

const propTypes = {
  user: PropTypes.object,
  display: PropTypes.object,
  children: PropTypes.node,
  customTitle: PropTypes.node,
  customPosition: PropTypes.bool,
  deleteGame: PropTypes.func,
  gameId: PropTypes.number,
  isReservedByUser: PropTypes.bool,
  showSpinner: PropTypes.bool,
};

const defaultProps = {
  isReservedByUser: false,
  showSpinner: false,
};

const GameCard = ({
  user,
  display,
  children,
  customTitle,
  customPosition,
  deleteGame,
  gameId,
  isReservedByUser,
  showSpinner,
}) => {
  useEffect(() => {
  })

  const handlerDeleteGame = () => {
    deleteGame(gameId);
  }

  const avatar = user && (user.photoUrl || user.photoURL)
    ? <Avatar path={(user.photoUrl || user.photoURL)} />
    : <Avatar />;

  return (
    <S.GameCard
      size={display.size || 100}
      left={customPosition ? 0 : display.left}
      top={customPosition ? 0 : 101}
    >
      <S.InfoTime>
        <S.InfoRow>
          <span>{display.gameTime}</span>
          {
            isReservedByUser && (
              <S.CloseIcon
                onClick={handlerDeleteGame}
              >
                <BaseIcon
                  path="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1560257452/close-button.svg"
                  size="15px"
                />
              </S.CloseIcon>
            )
          }
        </S.InfoRow>
      </S.InfoTime>
      <S.Body>
        <S.AvatarBox>
          <CircleItem
            active={isReservedByUser}
          >
            <ClapSpinner
              size={30}
              frontColor="#bd790b"
              loading={showSpinner}
            />
            {!showSpinner && avatar}
          </CircleItem>
        </S.AvatarBox>
      </S.Body>
      <S.TitleBox>
        {!showSpinner && (
          customTitle || (
            <React.Fragment>
              <S.Title>{user && user.name}</S.Title>
              <S.SubTitle>{user && user.profession}</S.SubTitle>
            </React.Fragment>
          )
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
