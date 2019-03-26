import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {};

const defaultProps = {}; 

const ChatWrapper = ({}) => {
  return (
    <S.ChatWrapper>
        <S.MessagesWrapper>
          <S.Message>
            <S.MessageHeader>
              <S.PlayerName>
                <S.PlayerNameText>
                  Jakub Stanisławczyk
                </S.PlayerNameText>
              </S.PlayerName>

              <S.PlayerDirectChat>
                <S.PlayerDirectChatIcon src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg" />
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
                <S.PlayerDirectChatIcon src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg" />
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
                  Jakub Stanisławczyk
                </S.PlayerNameText>
              </S.PlayerName>

              <S.PlayerDirectChat>
                <S.PlayerDirectChatIcon src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg" />
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
                <S.PlayerDirectChatIcon src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg" />
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
        </S.MessagesWrapper>

        <S.MessageInputWrapper>
          <S.MessageInput placeholder="Type message" maxLength={200}/>
        </S.MessageInputWrapper>

        <S.MessageButtonsWrapper>
          <S.MessageButton>
            <S.MessageButtonIcon src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595074/smiling-emoticon.svg" />
          </S.MessageButton>

          <S.MessageButton>
            <S.MessageButtonIcon src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595060/send-button.svg"/>
          </S.MessageButton>
        </S.MessageButtonsWrapper>
    </S.ChatWrapper>
  );
};

ChatWrapper.propTypes = propTypes;
ChatWrapper.defaultProps = defaultProps;
export default ChatWrapper;
