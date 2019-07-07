import React from 'react';
import PropTypes from 'prop-types';
 
export const withGameReservation = (Component) => (props) =>
  (
    !props.gameReservation.editMode ||
    !props.gameReservation.time ||
    !props.gameReservation.gameType
  )
    ? null
    : (
      <Component 
        display={
          {
            gameTime: `${props.gameReservation.time.duration}min`,
            gameType: props.gameReservation.gameType.name,
            size: props.gameReservation.time.duration * props.timeConverter,
            left: 200,
          }
        }
        {...props}
      />
    );

withGameReservation.propTypes = {
  Component: PropTypes.element,
};
