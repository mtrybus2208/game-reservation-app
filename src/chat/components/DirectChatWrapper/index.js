import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as S from './styles';
import * as fromActions from '@/modules/shared/state/actions';
import { debounced } from '@/helpers/index';
import axios from 'axios';

const propTypes = { 
  setGlobalChatMode: PropTypes.func,
};

const defaultProps = { };

class DirectChatWrapper extends Component {

  state = {
    messages: [],
    typedMessage: '',
  };

  links = {
    globalChatIcon: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
  }

  openGlobalChat = () => {
    this.props.setGlobalChatMode();
  }

  render() {
    return (
    <S.DirectChatWrapper> 
      <S.GlobalChatReturn onClick={this.openGlobalChat}>
        <S.GlobalChatIcon src={this.links.globalChatIcon} />
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
  };
};

const mapStateToProps = () => ({
  
});

const mapDispatchToProps = (dispatch) => {
  return {
    setGlobalChatMode: () => {
      dispatch(fromActions.setGlobalChatMode());
    },
  };
};

DirectChatWrapper.propTypes = propTypes;
DirectChatWrapper.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(DirectChatWrapper);
