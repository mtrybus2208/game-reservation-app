import React from 'react';
import PropTypes from 'prop-types';
import InfoCard from '../InfoCard';
import Avatar from '@/modules/shared/components/Avatar';
import UserInfo from '@/modules/shared/components/UserInfo';
import TimeCircle from '@/modules/home/components/TimeCircle';
import CircleItem from '@/modules/shared/components/CircleItem';
import * as S from './styles';

const propTypes = {
  isOpen: PropTypes.bool,
  authUser: PropTypes.object,
};

const defaultProps = {}; 

const NewGameConfig = ({ isOpen, authUser }) => {
  const avatar = authUser && authUser.photoURL
    ? <Avatar path={authUser.photoURL} />
    : <Avatar />
  return (
    <S.NewGameConfig isOpen={isOpen}>
      <InfoCard>
        <S.AvatarBox>
          <CircleItem>
            {avatar}
          </CircleItem>
        </S.AvatarBox>
        <UserInfo
          name={authUser ? authUser.displayName : 'guest'}
        />
      </InfoCard>
      <InfoCard header='you can start at:'>
        <S.GameStartBox>
          <TimeCircle time="21:24" />
        </S.GameStartBox>
      </InfoCard>
      <InfoCard header='game type'>
        type
      </InfoCard>
      <InfoCard header='game time'>
        <S.GameTimeBox>
          <S.TimeItem><TimeCircle time='10' unit='min'/></S.TimeItem>
          <S.TimeItem><TimeCircle time='15' unit='min'/></S.TimeItem>
          <S.TimeItem><TimeCircle time='20' unit='min'/></S.TimeItem>
        </S.GameTimeBox>
      </InfoCard>
    </S.NewGameConfig>
  );
};

NewGameConfig.propTypes = propTypes;
NewGameConfig.defaultProps = defaultProps;
export default NewGameConfig;
