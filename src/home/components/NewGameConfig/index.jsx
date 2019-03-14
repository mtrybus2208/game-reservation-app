import React from 'react';
import PropTypes from 'prop-types';
import InfoCard from '../InfoCard';
import Avatar from '../../../shared/Avatar';
import * as S from './styles';

const propTypes = {
  isOpen: PropTypes.bool,
};

const defaultProps = {}; 

const NewGameConfig = ({isOpen}) => {
  return (
    <S.NewGameConfig isOpen={isOpen}>
      <InfoCard>time</InfoCard>
      <InfoCard>type</InfoCard>
      <InfoCard>
        <Avatar />
      </InfoCard>
      <InfoCard>play</InfoCard>
      <InfoCard>cta</InfoCard>
    </S.NewGameConfig>
  );
};

NewGameConfig.propTypes = propTypes;
NewGameConfig.defaultProps = defaultProps;
export default NewGameConfig;
