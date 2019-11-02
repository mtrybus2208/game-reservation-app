import { useState, useEffect, useRef } from 'react';

const useMover = () => {  
  const [count, setCount] = useState(1);
  const requestRef = useRef();
  const previousTimeRef = useRef();
  const allowAnimation = useRef();

  useEffect(() => {
    requestRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const animate = time => {
    if (previousTimeRef.current !== undefined && allowAnimation.current) {
      setCount(prevCount => (prevCount + 1));
    }
    previousTimeRef.current = time;
    requestRef.current = requestAnimationFrame(animate);
  }

  const setAllowAnimation = value => {
    allowAnimation.current = value;
    setCount(0);
  };

  return [count, setAllowAnimation];
};

export default useMover;
