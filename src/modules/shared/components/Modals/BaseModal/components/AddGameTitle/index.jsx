import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  gameStartTime: PropTypes.string,
  duration: PropTypes.number,
};

const defaultProps = {
  gameStartTime: '',
  duration: 0,
};

const AddGameTitle = ({
  gameStartTime,
  duration,
}) => (
  <div>
    Reserve game at <S.Bold>{gameStartTime}</S.Bold> for <S.Bold>{duration}</S.Bold> min?
  </div>
);

AddGameTitle.propTypes = propTypes;
AddGameTitle.defaultProps = defaultProps;
export default AddGameTitle;