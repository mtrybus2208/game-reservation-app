import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { getAuthUser } from '@/auth/state/selectors';
import NavItem from '@/shared/components/NavItem';
import * as fromActions from '@/shared/state/actions';
import * as fromAuthActions from '@/auth/state/actions';
import * as ROUTES from '@/constants/routes';
import * as S from './styles';

const propTypes = {
  location: PropTypes.object,
  authUser: PropTypes.object,
  signOut: PropTypes.func,
  closeChatWithRedirect: PropTypes.func,
};

const defaultProps = {}; 

const mobileIcons = {
  login: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/login.svg',
  register: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1554583947/log-in.svg',
  logout: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1554468550/logout.svg',
  chat: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553015547/message.svg',
  activeChat: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1553587606/message-yellow.svg',
}

class MainNav extends Component {

  handleSignOut = () => (e) => {
    e.preventDefault();
    this.props.signOut();
  }

  handleRedirect = (path) => e => {
    e.preventDefault();
    this.props.closeChatWithRedirect(path);
  }

  render() {
    return (
      <S.MainNav>
        <NavItem
          url={ROUTES.HOME}
          location={this.props.location}
          onLinkClick={this.handleRedirect}
          onlyDesktop
        >
          Home
        </NavItem>
        {
          !!this.props.authUser
            ? (
              <NavItem
                mobileIcon={mobileIcons.logout}
                onLinkClick={this.handleSignOut}
                url={ROUTES.REGISTER}
                location={this.props.location}
              >
                Logout
              </NavItem>
            )
            : (
              <React.Fragment>
                <NavItem
                  mobileIcon={mobileIcons.login}
                  onLinkClick={this.handleRedirect}
                  url={ROUTES.LOGIN}
                  location={this.props.location}
                >
                  Login
                </NavItem>
                <NavItem
                  mobileIcon={mobileIcons.register}
                  onLinkClick={this.handleRedirect}
                  url={ROUTES.REGISTER}
                  location={this.props.location}
                >
                Register
                </NavItem>
              </React.Fragment>
            )
        }
      </S.MainNav>
    );
  }
}

const mapStateToProps = (state) => ({
  authUser: getAuthUser(state),
  location: state.router.location,
});

const mapDispatchToProps = dispatch => ({
  closeChatWithRedirect: (path) => {
    dispatch(fromActions.closeChatWithRedirect(path));
  },
  signOut: () => {
    dispatch(fromAuthActions.signOut());
  },
});

MainNav.propTypes = propTypes;
MainNav.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(MainNav);
