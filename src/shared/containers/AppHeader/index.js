import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getUiState } from '@/auth/state/selectors';
import Logo from '@/shared/components/Logo';
import MainNav from '@/shared/containers/MainNav';
import BaseIcon from '@/shared/components/BaseIcon';
import * as ROUTES from '@/constants/routes';
import * as fromActions from '@/shared/state/actions';
import * as S from './styles';

const propTypes = {
  ui: PropTypes.object,
  toggleLeftSidebar: PropTypes.func,
  closeChatWithRedirect: PropTypes.func,
};

const defaultProps = {}; 

class AppHeader extends Component {

  handleToggleSidebar = () => () => {
    this.props.toggleLeftSidebar(!this.props.ui.leftSidebarOpened);
  }

  handleRedirect = (path) => e => {
    e.preventDefault();
    this.props.closeChatWithRedirect(path);
  }

  render() {
    return (
      <S.AppHeader>
        <S.LogoWrapper to={ROUTES.HOME} onClick={this.handleRedirect(ROUTES.HOME)}>
          <Logo />
        </S.LogoWrapper>
        <S.NavigationWrapper>
          <S.IconButton onClick={this.handleToggleSidebar()}>
            <BaseIcon />
          </S.IconButton>
          <MainNav />
        </S.NavigationWrapper>
      </S.AppHeader>
    );
  }
}

const mapStateToProps = (state) => (
  {
    ui: getUiState(state),
  }
);

const mapDispatchToProps = dispatch => {
  return {
    toggleLeftSidebar: (visible) => {
      dispatch(fromActions.toggleLeftSidebar(visible));
    },
    closeChatWithRedirect: (path) => {
      dispatch(fromActions.closeChatWithRedirect(path));
    },
  };
};

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
