import { useReducer } from 'react';

const useDragToScroll = (ref, isBlocked = false) => {
  const initialState = {
    startX: undefined,
    isDown: false,
    scrollLeft: undefined,
  };

  const reducer = (state, newState) => ({ ...state, ...newState });
  const [state, setState] = useReducer(reducer, initialState);

  const mouseLeave = () => setState({ isDown: false });

  const mouseMove = e => {
    e.preventDefault();
    const { current } = ref;
    if (!state.isDown || isBlocked) return;
    const x = e.pageX - current.offsetLeft;
    const walk = (x - state.startX);
    current.scrollLeft = state.scrollLeft - walk;
  };

  const mouseUp = () => setState({ isDown: false });

  const mouseDown = e => {
    e.preventDefault();
    const { current } = ref;
    setState({
      isDown: true,
      startX: (e.pageX - current.offsetLeft),
      scrollLeft: current.scrollLeft,
    });
  };

  return {
    mouseLeave,
    mouseMove,
    mouseUp,
    mouseDown,
  };
};

export default useDragToScroll;
