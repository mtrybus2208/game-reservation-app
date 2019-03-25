import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import * as fromActions from '../../state/actions';
import Logo from '../../components/Logo';
import MainNav from '../../components/MainNav';
import * as S from './styles';

const propTypes = {
  toggleLeftSidebar: PropTypes.func.isRequired,
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
          <Logo />
        </S.LogoWrapper>
        <MainNav 
          toggleLeftSidebar = {this.toggleLeftSidebar}
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
    toggleLeftSidebar: () => {
      dispatch(fromActions.toggleLeftSidebar())
    },
  }
};

AppHeader.propTypes = propTypes;
AppHeader.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(AppHeader);
