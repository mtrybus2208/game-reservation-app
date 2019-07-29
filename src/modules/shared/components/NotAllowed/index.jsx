import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import theme from '@/theme';
import  { ReactComponent as Alert }  from '../../../../assets/Icons/alert.svg';
import * as S from './styles';

const propTypes = {
  customIcon: PropTypes.node,
  msg: PropTypes.string,
  size: PropTypes.string,
  iconColor: PropTypes.string,
  fontColor: PropTypes.string,
};

const defaultProps = {
  msg: 'Not Allowed',
  size: 'sm',
  iconColor: theme.accent,
  fontColor: 'inherit',
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
  const iconData = {
    fill: iconColor,
    width: sizesObj[size].width,
    height: sizesObj[size].width,
  };

  return (
    <S.NotAllowed>
      <S.Content>
        {
          customIcon
            ? React.cloneElement(customIcon, iconData)
            : <Alert {...iconData} />
        }

        <S.Info size={sizesObj[size].font} >
          {msg}
        </S.Info>
      </S.Content>
    </S.NotAllowed>
  )
};

NotAllowed.propTypes = propTypes;
NotAllowed.defaultProps = defaultProps;
export default NotAllowed;
