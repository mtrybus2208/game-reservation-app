import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as fromActions from '../../state/actions';
import Logo from '../../components/Logo';
import MainNav from '../../components/MainNav';
import * as S from './styles';

const propTypes = {
  openLeftSidebar: PropTypes.func.isRequired,
};

const defaultProps = {}; 

class AppHeader extends Component {
  componentDidMount() { } 

  openLeftSidebar = this.openLeftSidebar.bind(this);

  openLeftSidebar() {
    this.props.openLeftSidebar();
  }

  render() {
    return (
      <S.AppHeader>
        <S.LogoWrapper exact to="/">
          <Logo />
        </S.LogoWrapper>
        <MainNav 
          openLeftSidebar = {this.openLeftSidebar}
        />
      </S.AppHeader>
    );
  }
}

const mapStateToProps = ({ }) => (
  { }
);

const mapDispatchToProps = dispatch => {
  return {
    openLeftSidebar: () => {
      dispatch(fromActions.openLeftSidebar())
    },
  }
};

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
