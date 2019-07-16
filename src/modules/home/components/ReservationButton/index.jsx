import React from 'react';
import PropTypes from 'prop-types';
import WithLoading from '@/modules/shared/HOC/withLoading';
import * as S from './styles';

const propTypes = {
  isBlocked: PropTypes.bool,
  isLoading: PropTypes.bool,
  info: PropTypes.string,
  onAction: PropTypes.function,
};

const defaultProps = {
  isBlocked: false,
  isLoading: false,
  info: 'reserve game',
};

const ReservationButton = ({
  isBlocked,
  info,
  isLoading,
  onAction,
}) => {
  const InfoBoxWithLoading = WithLoading('PUSH_SPINNER', {
    size: 30,
    color: '#141619',
  })(S.InfoBox);

  return (
    <S.ReservationButton
      isBlocked={isBlocked}
      onClick={onAction}
    >
      <InfoBoxWithLoading
        isLoading={isLoading}
      >
        <S.Info>{info}</S.Info>
      </InfoBoxWithLoading>
    </S.ReservationButton>
  );
};

ReservationButton.propTypes = propTypes;
ReservationButton.defaultProps = defaultProps;
export default ReservationButton;
