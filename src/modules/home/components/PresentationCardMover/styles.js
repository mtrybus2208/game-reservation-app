import styled from 'styled-components';
import PropTypes from 'prop-types';


export const Wrapper = styled.div`
  overflow: hidden;
  filter: saturate(0.001);
`;

export const Divider = styled.div`
  background: pink;
  width: ${({width}) => width + 'px'};
  background: ${({bg}) => bg  };
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Child = styled.div.attrs({
  style: ({ x }) => ({ 
    left: `${x}px`, 
  }),
})` 
    box-sizing: border-box;
    padding: 10px;
    color: #222;
    background: #9a9e9e;
    display: flex;
    width: 300px;
    justify-content: center;
    color: #1b1f23;
    font-family: sans-serif;
    font-weight: 500;
    cursor: grab;
    border-radius: 10px;
    border: 10px solid #2c3033;
    position: absolute;
    top: 10px;
    bottom: 10px;
    left: 0;
    right: 0;
    user-select: none;
    z-index: 4;

    &:hover {
      opacity: .8;
    }
`;
export const Checker = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  padding: 30px;
  background: #fff;
  display: flex;
  justify-content: center;
`;

export const Body = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
`;
