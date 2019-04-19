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
      <S.IncomingMessageWrapper>
        <S.Message>
          <S.MessageTime>
            21:37
          </S.MessageTime>

          <S.MessageText>
            Gentrify viral seitan, flexitarian  neutra meh
            jianbing food truck yolu ender  mixtape.
            Lomo trust fund Gentrify viral seitan,
            flexitarian neutra help
            meh jianbing food  truck mixtape.
          </S.MessageText>
        </S.Message>

        <S.MessageAuthorPictureWrapper>
          <S.MessageAuthorPicture />
        </S.MessageAuthorPictureWrapper>
      </S.IncomingMessageWrapper>

      <S.OutgoingMessageWrapper> 
        <S.Message>
          <S.MessageTime>
            21:37
          </S.MessageTime>

          <S.MessageText>
            Gentrify viral seitan, flexitarian  neutra meh
            jianbing food truck yolu ender  mixtape.
            Lomo trust fund Gentrify viral seitan,
            flexitarian neutra help
            meh jianbing food  truck mixtape.
          </S.MessageText>
        </S.Message>
      </S.OutgoingMessageWrapper>

      <S.OutgoingMessageWrapper> 
        <S.Message>
          <S.MessageTime>
            21:37
          </S.MessageTime>

          <S.MessageText>
            Gentrify viral seitan, flexitarian  neutra meh
            jianbing food truck yolu ender  mixtape.
            Lomo trust fund Gentrify viral seitan,
            flexitarian neutra help
            meh jianbing food  truck mixtape.
          </S.MessageText>
        </S.Message>
      </S.OutgoingMessageWrapper>

      <S.IncomingMessageWrapper>
        <S.Message>
          <S.MessageTime>
            21:37
          </S.MessageTime>

          <S.MessageText>
            Gentrify viral seitan, flexitarian  neutra meh
            jianbing food truck yolu ender  mixtape.
            Lomo trust fund Gentrify viral seitan,
            flexitarian neutra help
            meh jianbing food  truck mixtape.
          </S.MessageText>
        </S.Message>

        <S.MessageAuthorPictureWrapper>
          <S.MessageAuthorPicture />
        </S.MessageAuthorPictureWrapper>
      </S.IncomingMessageWrapper>
    </S.MessagesWrapper>

    <S.MessageInputSectionWrapper>
      <S.MessageInputWrapper>
        <S.MessageInput max={200} />
      </S.MessageInputWrapper>

      <S.MessageButtonsWrapper>
        <S.MessageButton>
          <S.MessageButtonImage src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595074/smiling-emoticon.svg" />
        </S.MessageButton>


        <S.MessageButton>
          <S.MessageButtonImage src="https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553595060/send-button.svg" />  
        </S.MessageButton>
      </S.MessageButtonsWrapper>
    </S.MessageInputSectionWrapper>
  </S.DirectChatWrapper>
);

DirectChatWrapper.propTypes = propTypes;
DirectChatWrapper.defaultProps = defaultProps;
export default DirectChatWrapper;
