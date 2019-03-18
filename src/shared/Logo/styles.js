import styled from 'styled-components';

export const Logo = styled.div`
    display: flex;
    flex-direction: row;
    height: 35px;
`;

export const Image = styled.img`
    width: 30px;
    padding: 0px 16px 0px 30px;
    border-right: 2px solid #6d6e6f;
    height: auto;
`;

export const Title = styled.div`
    margin-left: 18px;
`;

export const Header = styled.div`
    text-transform: uppercase;
    font-size: 17px;
    line-height: 16px;
    letter-spacing: 3.15px;
`;

export const HeaderHighlighted = styled.span`
    color: #8f6618;
`;


export const Description = styled.div`
    margin-top: 5px;
    font-size: 11px;
    font-weight: 300;
    line-height: 1.45;
    letter-spacing: .3px;
    text-align: left;
    color: #8f6618;
`;