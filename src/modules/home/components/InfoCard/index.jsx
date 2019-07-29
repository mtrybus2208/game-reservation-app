import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NotAllowed from '@/modules/shared/components/NotAllowed';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
  header: PropTypes.string,
  isBlocked: PropTypes.bool,
};

const defaultProps = {
  isBlocked: false,
};

const InfoCard = ({ children, header, isBlocked }) => {
  return (
    <S.InfoCard>
      {header && <S.Header>{header}</S.Header>}
      <S.Body>
        {isBlocked && (
          <S.Blocked>
            <NotAllowed />
          </S.Blocked>
        )}
        {children}
      </S.Body>
    </S.InfoCard>
  );
};

InfoCard.propTypes = propTypes;
InfoCard.defaultProps = defaultProps;
export default InfoCard;
