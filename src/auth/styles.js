import styled from 'styled-components';

export const Auth = styled.div`
    display: flex;
    flex-direction: column;
    
    &::-webkit-scrollbar {
        width: 10px;
    }
    
    &::-webkit-scrollbar-track {
        background: #111315;
    }
    
    &::-webkit-scrollbar-thumb {
        background: #1b1e22;
    }

    @media ${({ theme }) => theme.media.tablet} {
        overflow-y: auto;
    }
`;
