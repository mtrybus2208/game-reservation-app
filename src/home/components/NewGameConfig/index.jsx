import React from 'react';
import PropTypes from 'prop-types';
import InfoCard from '../InfoCard';
import Avatar from '../../../shared/components/Avatar';
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
      <InfoCard>time</InfoCard>
      <InfoCard>type</InfoCard>
      <InfoCard>
        {avatar}
      </InfoCard>
      <InfoCard>play</InfoCard>
      <InfoCard>cta</InfoCard>
    </S.NewGameConfig>
  );
};

NewGameConfig.propTypes = propTypes;
NewGameConfig.defaultProps = defaultProps;
export default NewGameConfig;
