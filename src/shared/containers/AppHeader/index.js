import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as fromActions from '../../state/actions';
import Logo from '../../components/Logo';
import MainNav from '../../components/MainNav';
import * as S from './styles';

const propTypes = {
  toggleLeftSidebar: PropTypes.func.isRequired,
  leftSidebarOpened: PropTypes.bool,
  ui: PropTypes.object,
};

const defaultProps = {};

class AppHeader extends Component {
  componentDidMount() { }

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
        />
      </S.AppHeader>
    );
  }
}

const mapStateToProps = ({ ui }) => (
  { ui }
);

const mapDispatchToProps = dispatch => ({
  toggleLeftSidebar: () =>
    dispatch(fromActions.toggleLeftSidebar()),
});

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
