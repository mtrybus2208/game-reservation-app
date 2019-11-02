import { useState, useEffect, useLayoutEffect } from 'react';
import useMover from '@/modules/home/hooks/useMover';
import useGetMoverDimensions from '@/modules/home/hooks/useGetMoverDimensions';
import { detectDirection } from '@/helpers';

const useDrag = (ref, wrapperRef) => { 
  const [isDragging, setIsDragging] = useState(false);
  const [translateX, setTranslateX] = useState(0);
  const [originalX, setOriginalX] = useState(0);
  const [lastTranslateX, setLastTranslateX] = useState(0); 
  const [onEdge, setOnEdge] = useState(false);
  const [count, setAllowAnimation] = useMover();
  const [ELS_PARAMS] = useGetMoverDimensions(ref);
  
  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    }
  }, [isDragging]);

  useLayoutEffect(() => {
    if (onEdge === 'right' || onEdge === 'left') {
      setIsDragging(false);
      setAllowAnimation(true);
    } 
  }, [onEdge]); 

  useLayoutEffect(() => {
    if (!wrapperRef.current) { return; }
    const { current } = wrapperRef;
    if (onEdge === 'left') {
      calcTranslateX(translateX - count);
      current.scrollLeft -= count;  
    } else {
      current.scrollLeft += count;
      calcTranslateX(translateX + count);
    }
  }, [count]);

  const calcTranslateX = pos => {
    if (pos < ELS_PARAMS.start) {
      setTranslateX(ELS_PARAMS.start);
      return;
    }
    if (pos + ELS_PARAMS.movedElSize >= ELS_PARAMS.end) {
      setTranslateX(ELS_PARAMS.end - ELS_PARAMS.movedElSize);
      return;
    }
    setTranslateX(pos);
  };

  const isLeftEdge = e =>
    detectDirection(e) < 0 && wrapperRef.current.scrollLeft >= parseInt(ref.current.style.left, 10);

  const isRightEge = (e, endWrapper) =>
    detectDirection(e) > 0 && parseInt(ref.current.style.left, 10) >= endWrapper;

  const handleMouseMove = e => {
    e.stopPropagation();
    const currentX = e.clientX - originalX + lastTranslateX;
    const endWrapper = wrapperRef.current.offsetWidth + wrapperRef.current.scrollLeft - ELS_PARAMS.movedElSize;

    if (onEdge === 'right' && detectDirection(e) < 0 || onEdge === 'left' && detectDirection(e) > 0) {
      calcTranslateX(pr => pr);
      setOriginalX(e.clientX);
      setLastTranslateX(parseInt(ref.current.style.left, 10));
      setOnEdge(false);
      setAllowAnimation(false);
      setIsDragging(true);
      return;
    }

    if (!isDragging ) { return; }

    if (isLeftEdge(e)) {
      calcTranslateX(wrapperRef.current.scrollLeft);
      setOnEdge('left');
      return;
    }

    if (isRightEge(e, endWrapper)) {
      calcTranslateX(endWrapper);
      setOnEdge('right');
      return;
    }
    setAllowAnimation(false);
    calcTranslateX(currentX);
  };

  const handleMouseUp = e => {
    e.stopPropagation();
    setIsDragging(false);
    setAllowAnimation(false);
    setOnEdge(false);
    setLastTranslateX(parseInt(ref.current.style.left, 10));
    setOriginalX(0);
  };

  const handlerMouseDown = e => {
    e.stopPropagation();
    setIsDragging(true);
    setLastTranslateX(parseInt(ref.current.style.left, 10));
    setOriginalX(e.clientX);
  };

  return {
    handleMouseUp,
    handlerMouseDown,
    translateX,
  };
};

export default useDrag;
