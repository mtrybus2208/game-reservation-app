import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  name: PropTypes.string.isRequired,
  profession: PropTypes.string,
};

const defaultProps = {
  profession: 'Software developer',
};

const UserInfo = ({ name, profession, direction }) => (
  <S.UserInfo>
    <S.Name>{name}</S.Name>
    <S.Profession>{profession}</S.Profession>
  </S.UserInfo>
);

UserInfo.propTypes = propTypes;
UserInfo.defaultProps = defaultProps;
export default UserInfo;
