import React from 'react';
import { PushSpinner, ClapSpinner } from 'react-spinners-kit';
import { Centered } from '@/modules/shared/components/AppGrid';

const SPINNERS = {
  PUSH_SPINNER: PushSpinner,
  CLAP_SPINNER: ClapSpinner,
};

const WithLoading = (type, conf) => Component =>
  ({ isLoading, ...props }) => {
    if (!isLoading) return (<Component {...props} />);

    const SpecificSpinner = SPINNERS[type];

    return (
      <Component {...props} >
        <Centered>
          <SpecificSpinner {...conf} />
        </Centered>
      </Component>

    );
  };

export default WithLoading;
