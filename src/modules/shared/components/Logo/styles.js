import styled from 'styled-components';

export const Logo = styled.div`
    display: flex;
    flex-direction: row;
    height: 35px;
`;

export const Image = styled.img`
    height: auto;
    box-sizing: content-box;
    width: 26px;
    padding: 0 21px;
    @media ${({ theme }) => theme.media.laptop} {
        width: 30px;
        padding: 0 16px 0 30px;
        border-right: 2px solid #6d6e6f;
    }
`;

export const Title = styled.div`
    margin-top: 3px;
    @media ${({ theme }) => theme.media.laptop} {
        margin-top: 0;
        margin-left: 18px;
    }
`;

export const Header = styled.div`
    font-family: Roboto;
    font-size: 13px;
    font-weight: normal;
    line-height: 1.19;
    letter-spacing: 2.4px;
    text-align: left;
    text-transform: uppercase;
    color: #6d6e6f;
    @media ${({ theme }) => theme.media.laptop} {
        font-size: 17px;
        line-height: 16px;
        letter-spacing: 3.15px;
    }
`;

export const HeaderHighlighted = styled.span`
    color: #8f6618;
`;

export const Description = styled.div`
    font-family: Roboto;
    font-size: 10px;
    font-weight: 300;
    line-height: 1.94;
    letter-spacing: .2px;
    text-align: left;
    color: #8f6618;
    @media ${({ theme }) => theme.media.laptop} {
        margin-top: 5px;
        font-size: 11px;
        line-height: 1.45;
        letter-spacing: .3px;
    }
`;