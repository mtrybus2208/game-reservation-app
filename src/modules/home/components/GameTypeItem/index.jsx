import React from 'react';
import PropTypes from 'prop-types';
import Avatar from '@/modules/shared/components/Avatar';
import CircleItem from '@/modules/shared/components/CircleItem';
import * as S from './styles';

const propTypes = {
  active: PropTypes.bool,
  game: PropTypes.object,
};

const defaultProps = {};

const GameTypeItem = ({ active, game }) => {
  return (
    <S.GameTypeItem active={active} >
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
