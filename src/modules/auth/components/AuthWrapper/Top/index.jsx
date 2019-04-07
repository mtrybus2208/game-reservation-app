import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  name: PropTypes.string,
};

const defaultProps = {};

const Top = ({ name }) => {
  return (
    <S.Top>
      <span>{ name }</span>
    </S.Top>
  );
};

Top.propTypes = propTypes;
Top.defaultProps = defaultProps;
export default Top;
