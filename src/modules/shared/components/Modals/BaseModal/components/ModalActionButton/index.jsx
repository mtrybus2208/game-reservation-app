import React, { useState } from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
  actionColors: PropTypes.obj,
  onAction: PropTypes.func,
  onEnter: PropTypes.func,
  onLeave: PropTypes.func,
  children: PropTypes.node,
};

const defaultProps = {
  onEnter: null,
  onLeave: null,
};

const ModalActionButton = ({
  actionColors,
  onAction,
  onEnter,
  onLeave,
  children,
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const handlerButtonEnter = () => setIsHovered(true);

  const handlerButtonLeave = () => setIsHovered(false);

  return (
    <S.ModalActionButton
      onClick={onAction}
      onMouseEnter={onEnter ? onEnter : handlerButtonEnter}
      onMouseLeave={onLeave ? onLeave : handlerButtonLeave}
    >
    {React.cloneElement(children, {fill: isHovered ? actionColors.hover : actionColors.base })}}
    </S.ModalActionButton>
  );
}

ModalActionButton.propTypes = propTypes;
ModalActionButton.defaultProps = defaultProps;
export default ModalActionButton;