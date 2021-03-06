import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@/modules/shared/components/Avatar';
import CircleItem from '@/modules/shared/components/CircleItem';
import * as S from './styles';

const propTypes = {
  active: PropTypes.bool,
  game: PropTypes.object,
  onClick: PropTypes.func,
};

const defaultProps = {};

const GameTypeItem = ({ active, game, onClick }) => {
  return (
    <S.GameTypeItem active={active} onClick={onClick('selectedGame', game)}>
      <S.IconBox>
        <S.Icon src={game.icon} />
      </S.IconBox>
      <S.Content><span>{game.name}</span></S.Content>
    </S.GameTypeItem>
  );
};

GameTypeItem.propTypes = propTypes;
GameTypeItem.defaultProps = defaultProps;
export default GameTypeItem;
