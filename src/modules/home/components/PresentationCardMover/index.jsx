import React, { memo, useRef } from 'react'; 
import useDrag from '@/modules/home/hooks/useDrag';  
import PresentationCard from '@/modules/home/components/PresentationCardMover/components/PresentationCard'; 

const PresentationCardMover = ({ wrapperRef }) => {
  const childRef = useRef(); 
  const {
    translateX,
    handleMouseUp,
    handlerMouseDown,
  } = useDrag(childRef, wrapperRef);

  return (
    <PresentationCard
      ref={childRef}
      translateX={translateX}
      onMouseUp={handleMouseUp}
      onMouseDown={handlerMouseDown}
    />
  ); 
};

export default memo(PresentationCardMover); 