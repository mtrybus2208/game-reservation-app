import styled from 'styled-components';

export const NewGameConfig = styled.div`
    background-color: #14171a;
    padding: 0;
    margin: 0;
    display: grid;
    grid-template-columns:
      [game-start] 15% [game-type] 28% [game-avatar] 1fr [game-type] 28% [game-action] 15%;
    grid-template-rows: [top] 1fr [top-end]; 
    flex-grow: 1;
`;

