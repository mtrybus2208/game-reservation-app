import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import NotAllowed from '@/modules/shared/components/NotAllowed';
import * as S from './styles';

const propTypes = {
  children: PropTypes.node,
  header: PropTypes.node,
  footer: PropTypes.node,
};

const defaultProps = {};

const CardSkeleton = ({
  children,
  header,
  footer,
}) => {
  return (
    <S.CardSkeleton>
      <S.InfoHeader>
        <S.InfoRow>
          {header}
        </S.InfoRow>
      </S.InfoHeader>

      <S.Body>
        {children}
      </S.Body>

      <S.InfoFooter>
        <S.InfoRow>
          {footer}
        </S.InfoRow>
      </S.InfoFooter>
    </S.CardSkeleton>
  );
};

CardSkeleton.propTypes = propTypes;
CardSkeleton.defaultProps = defaultProps;
export default CardSkeleton;
