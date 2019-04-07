import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
};

const defaultProps = {};
const InfoCard = ({ children, header }) => {
  return (
    <S.InfoCard>
      {header && <S.Header>{header}</S.Header>}
      <S.Body>
        {children}
      </S.Body>
    </S.InfoCard>
  );
};

InfoCard.propTypes = propTypes;
InfoCard.defaultProps = defaultProps;
export default InfoCard;
