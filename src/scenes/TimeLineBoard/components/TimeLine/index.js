import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as fromActions from '../../actions';

const propTypes = {
  timeLine: PropTypes.object.isRequired,
};

class TimeLine extends Component {
  componentDidMount() {
    console.log(this.props)
  } 

  render() {
    return (
      <div>
        <p>Actual Time - {this.props.timeLine.actualTime.format('h:mm:ss a')}</p>
      </div>
    );
  }
}

const mapStateToProps = ({ timeLine }) => (
  { timeLine }
);

const mapDispatchToProps = dispatch => {
  return { 
  }
};

TimeLine.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(TimeLine);
