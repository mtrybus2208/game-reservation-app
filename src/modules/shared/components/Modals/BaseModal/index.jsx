import React from 'react';
import PropTypes from 'prop-types';
import WithLoading from '@/modules/shared/HOC/withLoading';
import * as S from './styles';

const propTypes = {
  title: PropTypes.string,
  onConfirm: PropTypes.func,
  onDecline: PropTypes.func,
  isLoading: PropTypes.bool,
};

const defaultProps = {
  title: 'modal',
};

const BaseModal = ({
  title,
  onConfirm,
  onDecline,
  isLoading,
}) => {
  
  const ModalBodyWithLoading = WithLoading(
  'PUSH_SPINNER', {
    size: 30,
    color:"#bd790b",
  })(S.Body);

  return (
    <S.Modal>
      <S.Header>
        <S.Title>{title}</S.Title>
      </S.Header>
      <S.Body>
        <ModalBodyWithLoading isLoading={isLoading}>
          <div>
            <button onClick={onConfirm} >OK</button>
            <button onClick={onDecline} >NOT</button>
          </div>
        </ModalBodyWithLoading>
      </S.Body>
    </S.Modal>
  );

}
BaseModal.propTypes = propTypes;
BaseModal.defaultProps = defaultProps;
export default BaseModal;
