import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
};

const defaultProps = {}; 

const InfoCard = ({ children }) => {
  return (
    <S.InfoCard>
      {children}
    </S.InfoCard>
  );
};

InfoCard.propTypes = propTypes;
InfoCard.defaultProps = defaultProps;
export default InfoCard;
