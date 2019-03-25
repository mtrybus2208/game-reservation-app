import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {};

const defaultProps = {}; 

const ChatWrapper = ({}) => {
  return (
    <S.ChatWrapper>
        <S.Message>
          <S.MessageHeader>
            <S.PlayerName>
              <S.PlayerNameText>
                Jakub Stanisławczyk
              </S.PlayerNameText>
            </S.PlayerName>

            <S.PlayerDirectChat>
              
            </S.PlayerDirectChat>
            
            <S.PlayerPictureWrapper>
              <S.PlayerPicture>
              
              </S.PlayerPicture>
            </S.PlayerPictureWrapper>
          </S.MessageHeader>
          
          <S.MessageBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </S.MessageBody>
        </S.Message>

        <S.Message>
          <S.MessageHeader>
            <S.PlayerName>
              <S.PlayerNameText>
                Michał Trybus
              </S.PlayerNameText>
            </S.PlayerName>

            <S.PlayerDirectChat>
              
            </S.PlayerDirectChat>
            
            <S.PlayerPictureWrapper>
              <S.PlayerPicture>
              
              </S.PlayerPicture>
            </S.PlayerPictureWrapper>
          </S.MessageHeader>
          
          <S.MessageBody>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, 
            sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, 
            quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
          </S.MessageBody>
        </S.Message>
    </S.ChatWrapper>
  );
};

ChatWrapper.propTypes = propTypes;
ChatWrapper.defaultProps = defaultProps;
export default ChatWrapper;
