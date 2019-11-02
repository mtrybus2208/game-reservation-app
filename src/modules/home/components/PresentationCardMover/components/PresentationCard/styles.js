import styled from 'styled-components';

export const Body = styled.div` 
    display: flex;
    justify-content: center;
    align-items: center;
`;

export const PresentationCard = styled.div.attrs({
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