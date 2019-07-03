// https://medium.com/backticks-tildes/creating-a-modal-component-the-redux-way-cf9f4c5497dd
import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles'; 

const propTypes = { 
};

const defaultProps = {
 
}; 

const HoursDivider = ({
  width,
  position,
  time
}) => { 

  return ( 
    <S.HoursDivider
      width={width}
      position={position}
      time={time}
    />
  );
};

HoursDivider.propTypes = propTypes;
HoursDivider.defaultProps = defaultProps;
export default HoursDivider;
