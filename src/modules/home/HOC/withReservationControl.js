import React from 'react';

const withReservationControl = ({
  isLogged,
  isTimeSelected,
  isTypeSelected,
  isTooLate,
}) => Component => (...props) => {
  const key = !isLogged ? `${isLogged}` : `${isTimeSelected}-${isTypeSelected}-${isTooLate}`;

  const notification = {
    'false': 'please login to reserve the game',
    'false-false-false': 'please select game type and time to reserve the game',
    'true-false-false': 'please select game type',
    'false-true-false': 'please select game time',
    'true-false-true': 'please select game time',
    'true-true-false': 'It is too late for game reservation',
    'false-false-true': 'It is too late for game reservation',
  };
  return (
    <Component
      isBlocked={!!notification[key]}
      info={notification[key]}
      {...props}
    />
  );
};

export default withReservationControl;
