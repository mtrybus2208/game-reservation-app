import React from 'react';
import PropTypes from 'prop-types';
import * as S from './styles';

const propTypes = {};

const defaultProps = {
  globalChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
};

const DirectChatWrapper = ({ globalChatIcon }) => (
  <S.DirectChatWrapper> 
    <S.GlobalChatReturn>
      <S.GlobalChatIcon src={globalChatIcon} />
      <S.GlobalChatInfo>Global chat</S.GlobalChatInfo>
    </S.GlobalChatReturn>

    <S.DirectChatPlayerInfo>
      <S.PlayerPictureWrapper>
        <S.PlayerPicture />
      </S.PlayerPictureWrapper>
      <S.PlayerNameInfo>John Doe</S.PlayerNameInfo>
    </S.DirectChatPlayerInfo>

    <S.MessagesWrapper>
      
    </S.MessagesWrapper>

    <S.MessageInputWrapper>
      <S.MessageInput>

      </S.MessageInput>

      <S.MessageButtonsWrapper>
        <S.MessageButton>

        </S.MessageButton>


        <S.MessageButton>
          
        </S.MessageButton>
      </S.MessageButtonsWrapper>
    </S.MessageInputWrapper>
  </S.DirectChatWrapper>
);

DirectChatWrapper.propTypes = propTypes;
DirectChatWrapper.defaultProps = defaultProps;
export default DirectChatWrapper;
