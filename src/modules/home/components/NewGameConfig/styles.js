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

export const GameStartBox = styled.div`
    width: 100px;
    height: 100px;
    display: flex;
    font-size: 22px;

    @media ${({ theme }) => theme.media.tablet} {
      
    }
`;

export const GameTimeBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;

    @media ${({ theme }) => theme.media.tablet} {
      
    }
`;

export const TimeItem = styled.div`
    width: 70px;
    height: 70px;
    display: flex;
    font-size: 21px;
    margin-right: 40px;
    cursor: pointer;

    &:last-child {
      margin-right: 0;
    }

    @media ${({ theme }) => theme.media.tablet} {
      
    }
`;

export const AvatarBox = styled.div`
  height: 100px;
  width: 100px;
  display: flex;
`;
