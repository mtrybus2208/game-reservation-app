import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import WithLoading from '@/modules/shared/HOC/withLoading';
import ModalActionButton from '@/modules/shared/components/Modals/BaseModal/components/ModalActionButton';
import  { ReactComponent as ConfirmIcon }  from '@/assets/Icons/confirm.svg';
import  { ReactComponent as CloseIcon }  from '@/assets/Icons/close.svg';
import { ThemeContext } from 'styled-components';
import * as S from './styles';

const propTypes = {
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onDecline: PropTypes.func,
  isLoading: PropTypes.bool,
};

const defaultProps = {
  title: 'modal',
  isLoading: false,
};

const BaseModal = ({
  title,
  onConfirm,
  onDecline,
  isLoading,
}) => {
  const theme = useContext(ThemeContext);

  const ModalBodyWithLoading = WithLoading('PUSH_SPINNER', {
    size: 30,
    color: theme.accent,
  })(S.Body);

  return (
    <S.Modal>
      <S.Header>
        <S.Title>{title}</S.Title>
      </S.Header>
        <ModalBodyWithLoading isLoading={isLoading}>
          <S.ActionBox>
            <S.ActionItem>
              <ModalActionButton
                onAction={onConfirm}
                actionColors={{
                  base: theme.accent,
                  hover: theme.success
                }}
              >
                <ConfirmIcon
                  width="25px"
                  height="25px"
                />
              </ ModalActionButton>
            </S.ActionItem>
            <S.ActionItem>
              <ModalActionButton
                onAction={onDecline}
                actionColors={{
                  base: theme.accent,
                  hover: theme.error
                }}
              >
                <CloseIcon
                  width="20px"
                  height="20px"
                />
              </ ModalActionButton>
            </ S.ActionItem>
          </S.ActionBox>
        </ModalBodyWithLoading>
    </S.Modal>
  );
}

BaseModal.propTypes = propTypes;
BaseModal.defaultProps = defaultProps;
export default BaseModal;
