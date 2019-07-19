import React from 'react';

export const withSessionControl = isLogged => Component => props => (
  <Component
    info={isLogged ? undefined : 'please login to reserve the game'}
    isBlocked={!isLogged}
    {...props}
  />
);

