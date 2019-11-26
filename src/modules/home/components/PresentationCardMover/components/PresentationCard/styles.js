import styled from 'styled-components';

export const Body = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
`;

export const PresentationCard = styled.div.attrs({
  style: ({ x }) => ({
    left: `${x}px`,
  }),
})`
  box-sizing: border-box;
  color: #222;
  background: #9a9e9e;
  display: flex;
  width: 300px;
  justify-content: center;
  color: #1b1f23;
  font-family: sans-serif;
  font-weight: 500;
  cursor: grab;
  position: absolute;
  top: 101px;
  bottom: 0;
  left: 0;
  right: 0;
  user-select: none;
  z-index: 4;
  border: ${({ isAbleToReserve, theme }) => {
    if (!isAbleToReserve) {
      return `3px solid ${theme.error}`;
    }

    if (isAbleToReserve) {
      return `3px solid ${theme.success}`;
    }

    return 'none';
  }};
  background: ${({ isAbleToReserve }) =>
    !isAbleToReserve ? 'rgba(103, 16, 16, .41)' : 'rgba(1, 66, 23, .3)'};
  &:hover {
    opacity: 0.8;
  }
`;
