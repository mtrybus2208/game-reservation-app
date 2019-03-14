import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {};

const defaultProps = {}; 

const ChatWrapper = ({}) => {
  return (
    <S.ChatWrapper>
      <span>Chat :D</span>
    </S.ChatWrapper>
  );
};

ChatWrapper.propTypes = propTypes;
ChatWrapper.defaultProps = defaultProps;
export default ChatWrapper;
