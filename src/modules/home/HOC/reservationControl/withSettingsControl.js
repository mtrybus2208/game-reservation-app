import React from 'react';
import PropTypes from 'prop-types';

const propTypes = {
  isBlocked: PropTypes.bool,
};

export const withSettingsControl = (isTimeSelected, isTypeSelected) =>
  Component => props => {
    const key = `${isTimeSelected}-${isTypeSelected}`;
    const notification = {
      'false-false': 'please select game type and time to reserve the game',
      'true-false': 'please select game type',
      'false-true': 'please select game time',
      'true-true': undefined,
    };

    if (props.isBlocked) return (<Component {...props} />);
    return (
      <Component
        {...props}
        isBlocked={!!notification[key]}
        info={notification[key]}
      />
    );
  };

withSettingsControl.propTypes = propTypes;
