import React from 'react';
import PropTypes from 'prop-types'; 
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
}) =>
  (
    <S.Modal>
      <S.Header>
        <S.Title>{title}</S.Title>
      </S.Header>
      <S.Body>
        {
          isLoading
            ? '...Loading'
            : (
              <div>
                <button onClick={onConfirm} >OK</button>
                <button onClick={onDecline} >NOT</button>
              </div>
            )
        }
      </S.Body>
    </S.Modal>
  );

BaseModal.propTypes = propTypes;
BaseModal.defaultProps = defaultProps;
export default BaseModal;
