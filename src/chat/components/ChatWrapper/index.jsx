import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {};

const defaultProps = {}; 

const ChatWrapper = ({}) => {
  return (
    <S.ChatWrapper>
      <S.MessageWrapper>
        <S.Message>
          <S.MessageTime>
            5:07
          </S.MessageTime>
          
          <S.MessageText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </S.MessageText>
        </S.Message>

        <S.MessageAuthor>
          <S.MessageAuthorPicture>
            
          </S.MessageAuthorPicture>
        </S.MessageAuthor>
      </S.MessageWrapper>

      <S.MessageWrapper>
        <S.Message>
          <S.MessageTime>
            5:07
          </S.MessageTime>
          
          <S.MessageText>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
          </S.MessageText>
        </S.Message>

        <S.MessageAuthor>
          <S.MessageAuthorPicture>
            
          </S.MessageAuthorPicture>
        </S.MessageAuthor>
      </S.MessageWrapper>
    </S.ChatWrapper>
  );
};

ChatWrapper.propTypes = propTypes;
ChatWrapper.defaultProps = defaultProps;
export default ChatWrapper;
