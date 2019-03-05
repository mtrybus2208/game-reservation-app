import styled from 'styled-components';

export const NewGameConfig = styled.div`
    background-color: #14171a;
    transform:  translateY(${props => (props.isOpen ? '-250px' : '0')});
    transition: transform .3s ease-in-out;
    padding: 0;
    margin: 0;
    height: 250px;
    display: grid;
    grid-template-columns: [game-start] 15% [game-type] 28% [game-avatar] 1fr [game-type] 28% [game-action] 15%;
    grid-template-rows: [top] 1fr [top-end]; 
`;

