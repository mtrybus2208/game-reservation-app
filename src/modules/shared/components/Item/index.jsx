import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  copy: PropTypes.string,
};

const defaultProps = {};

const Item = ({ copy }) => {
  return (
    <S.Item>
      {copy}
    </S.Item>
  );
};

Item.propTypes = propTypes;
Item.defaultProps = defaultProps;
export default Item;
