import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuthUser, getUiState } from '@/auth/state/selectors';
import * as fromActions from '@/shared/state/actions';
import Logo from '@/shared/components/Logo';
import MainNav from '@/shared/components/MainNav';
import * as S from './styles';

const propTypes = {
  ui: PropTypes.object,
  authUser: PropTypes.object,
};

const defaultProps = {}; 

class AppHeader extends Component {

  redirectHandler = this.redirectHandler.bind(this);

  redirectHandler(path) {
    return path
      ? this.props.closeChatWithRedirect(path)
      : this.props.toggleLeftSidebar(!this.props.ui.leftSidebarOpened);
  }
  
  render() {
    return (
      <S.AppHeader>
        <S.LogoWrapper exact to="/">
          <Logo redirectHandler={this.redirectHandler} />
        </S.LogoWrapper>
        <MainNav
          authUser={this.props.authUser}
          redirectHandler={this.redirectHandler}
        />
      </S.AppHeader>
    );
  }
}

const mapStateToProps = (state) => {
  return (
    {
      ui: getUiState(state),
      authUser: getAuthUser(state),
    }
  );
} 

const mapDispatchToProps = dispatch => {
  return {
    closeChatWithRedirect: (path) => {
      dispatch(fromActions.closeChatWithRedirect(path));
    },
    toggleLeftSidebar: (visible) => {
      dispatch(fromActions.toggleLeftSidebar(visible));
    },
  };
};

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
