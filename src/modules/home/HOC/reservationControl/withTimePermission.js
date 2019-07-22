import React from 'react';

export const withTimePermission = isReservationBlocked =>
  Component => props =>
    props.isBlocked
      ? <Component {...props} />
      : (
        <Component
          {...props}
          info={isReservationBlocked ? "You can't reserve game at this time" : undefined}
          isBlocked={isReservationBlocked}
        />
      );
