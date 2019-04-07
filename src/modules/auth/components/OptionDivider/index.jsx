import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {
};

const defaultProps = { 
}; 

const OptionDivider = ({ }) => {
  return (
    <S.OptionDivider>
      <S.OptionBox>
        <S.OptionCopy>
          or
        </S.OptionCopy>
      </S.OptionBox>
    </S.OptionDivider>
  );
};

OptionDivider.propTypes = propTypes;
OptionDivider.defaultProps = defaultProps;
export default OptionDivider;
