import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

const propTypes = {
  sessionState: PropTypes.object,
};

export const withUser = (ComposedComponent) => {
  class SessionUser extends Component {
    componentDidMount() { }

    render() {
      return (
        <ComposedComponent
          { ...this.props}
        />
      )
    }
  }

  const mapStateToProps = ({ sessionState }) => (
    {
      user: sessionState.authUser,
    }
  );

  SessionUser.propTypes = propTypes;
  return connect(mapStateToProps)(SessionUser);
}

export default withUser;
