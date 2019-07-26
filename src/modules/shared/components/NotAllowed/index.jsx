import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { ThemeContext } from 'styled-components';
import  { ReactComponent as Alert }  from '@/assets/Icons/alert.svg';
import * as S from './styles';

const propTypes = {
  icon: PropTypes.function,
  msg: PropTypes.string,
  size: PropTypes.string,
  iconColor: PropTypes.string,
  fontColor: PropTypes.string,
};

const defaultProps = {
  customIcon: null,
  msg: 'Not Allowed',
  size: 'sm',
};

const sizesObj = {
  sm: {
    width: '40px',
    font: '12px',
  },
  md: {
    width: '60px',
    font: '14px',
  },
  lg: {
    width: '80px',
    font: '16px',
  },
};

const NotAllowed = ({
  customIcon,
  msg,
  size,
  iconColor,
  fontColor,
}) => {
  const theme = useContext(ThemeContext);
  const Icon = customIcon || Alert;

   return(
      <S.NotAllowed>
        <S.Content>
          <Icon
              fill={iconColor || theme.accent}
              width={sizesObj[size]['width']}
              height={sizesObj[size]['width']}
          />
          <S.Info
            size={sizesObj[size]['font']}
          >
            {msg}
          </S.Info>
        </S.Content>
      </S.NotAllowed>
   )
};

NotAllowed.propTypes = propTypes;
NotAllowed.defaultProps = defaultProps;
export default NotAllowed;
