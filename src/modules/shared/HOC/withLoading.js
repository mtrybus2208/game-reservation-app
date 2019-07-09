import React from 'react';
import { PushSpinner, ClapSpinner } from 'react-spinners-kit';

const SPINNERS = {
  PUSH_SPINNER: PushSpinner,
  CLAP_SPINNER: ClapSpinner,
};

const WithLoading = (type, conf) => Component =>
  ({ isLoading, ...props }) => {
    if (!isLoading) return (<Component {...props} />);

    const SpecificSpinner = SPINNERS[type];

    return (
      <SpecificSpinner {...conf} />
    );
  };

export default WithLoading;
