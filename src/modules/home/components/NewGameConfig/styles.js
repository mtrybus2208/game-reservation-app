import styled from 'styled-components';

export const NewGameConfig = styled.div`
    background-color: #14171a;
    padding: 0;
    margin: 0;
    display: none;
    grid-template-columns:
      [user-infp] .7fr [game-start] .7fr [game-type] 1fr [game-time] 1fr;
    grid-template-rows: [top] 1fr [top-end]; 
    flex-grow: 1;
    @media ${({ theme }) => theme.media.tablet} {
      display: grid;
    }
`;
