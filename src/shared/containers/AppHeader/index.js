import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuthUser, getUiState } from '@/auth/state/selectors';
import * as fromActions from '@/shared/state/actions';
import Logo from '@/shared/components/Logo';
import MainNav from '@/shared/components/MainNav';
import * as S from './styles';

const propTypes = {
  toggleLeftSidebar: PropTypes.func.isRequired,
  ui: PropTypes.object,
  authUser: PropTypes.object,
};

const defaultProps = {}; 

class AppHeader extends Component {
  componentDidMount() {
    console.log('this.props.authUser');
    console.log(this.props.authUser);
  } 

  toggleLeftSidebar = this.toggleLeftSidebar.bind(this);

  toggleLeftSidebar() {
    this.props.toggleLeftSidebar();
  }

  render() {
    return (
      <S.AppHeader>
        <S.LogoWrapper exact to="/">
          <Logo
            isLeftSidebarOpened={this.props.ui.leftSidebarOpened}
            toggleLeftSidebar={this.toggleLeftSidebar}
          />
        </S.LogoWrapper>
        <MainNav
          isLeftSidebarOpened={this.props.ui.leftSidebarOpened}
          toggleLeftSidebar={this.toggleLeftSidebar}
          authUser={this.props.authUser}
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
    toggleLeftSidebar: () => {
      dispatch(fromActions.toggleLeftSidebar());
    },
  };
};

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
