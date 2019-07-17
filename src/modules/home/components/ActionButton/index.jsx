import React from 'react';
import PropTypes from 'prop-types';
import WithLoading from '@/modules/shared/HOC/withLoading';
import * as S from './styles';

const propTypes = {
  isBlocked: PropTypes.bool,
  isLoading: PropTypes.bool,
  info: PropTypes.string,
  onAction: PropTypes.func,
};

const defaultProps = {
  isBlocked: false,
  isLoading: false,
  info: 'reserve game',
  onAction: null,
};

const ActionButton = ({
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
    <S.ActionButton
      isBlocked={isBlocked}
      onClick={onAction}
    >
      <InfoBoxWithLoading
        isLoading={isLoading}
      >
        <S.Info>{info}</S.Info>
      </InfoBoxWithLoading>
    </S.ActionButton>
  );
};

ActionButton.propTypes = propTypes;
ActionButton.defaultProps = defaultProps;
export default ActionButton;
