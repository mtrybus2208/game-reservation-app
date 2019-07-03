import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'; 

const propTypes = {
 
};

const defaultProps = {
 
};
 

class MockGameCardContainer extends PureComponent {

  createReservedIntervals(games) {
    return games && games.map(game => {
      const starGame = moment(game.startDate);
      const distanceInMinutes = moment.duration(starGame.diff(workdayStart)).asMinutes();
      const startTime = distanceInMinutes * timeConverter;
  
      const endGame = moment(game.endDate);
      const distanceInMinutesEnd = moment.duration(endGame.diff(workdayStart)).asMinutes();
      const endTime = distanceInMinutesEnd * timeConverter;
      return [Math.abs(startTime), Math.abs(startTime) + (Math.abs(endTime) - Math.abs(startTime))];
    });
  };

  render() { 
 
  }
}

const mapStateToProps = ({ modal }) => (
  {
    modal,
  }
);

const mapDispatchToProps = dispatch => {
  return { };
};

MockGameCardContainer.propTypes = propTypes;
MockGameCardContainer.defaultProps = defaultProps;
export default connect(mapStateToProps, mapDispatchToProps)(MockGameCardContainer);
