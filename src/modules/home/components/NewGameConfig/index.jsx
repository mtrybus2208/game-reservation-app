import React from 'react';
import PropTypes from 'prop-types';
import InfoCard from '../InfoCard';
import Avatar from '@/modules/shared/components/Avatar';
import UserInfo from '@/modules/shared/components/UserInfo';
import TimeCircle from '@/modules/home/components/TimeCircle';
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
        {avatar}
        <UserInfo
          name={authUser ? authUser.displayName : 'guest'}
        />
      </InfoCard>
      <InfoCard header='you can start at:'>
        <TimeCircle
          time="21:24"
        />
      </InfoCard>
      <InfoCard header='game type'>
        type
      </InfoCard>
      <InfoCard header='game time'>
        type
      </InfoCard>
    </S.NewGameConfig>
  );
};

NewGameConfig.propTypes = propTypes;
NewGameConfig.defaultProps = defaultProps;
export default NewGameConfig;
