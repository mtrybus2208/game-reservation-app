import { useState, useEffect } from 'react';

const useGetMoverDimensions = ref => {
  const [ELS_PARAMS, setDimension] = useState({
    start: 0,
    end: 0,
    movedElSize: 0,
  });

  useEffect(() => {
    setDimension({
      start: 0,
      end: ref.current ? ref.current.offsetParent.offsetWidth : 0,
      movedElSize: ref.current ? ref.current.offsetWidth : 0,
    });
  }, [ref.current]);

  return [ELS_PARAMS];
};

export default useGetMoverDimensions;
