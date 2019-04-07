import styled, { css } from 'styled-components';

export const CircleItem = styled.div`
    position: relative;
    border: solid 5px #23272d;
    box-shadow:
        0px 17px 24px 0 rgba(0, 0, 0, 0.33),
        inset 0px 2px 3px 0 rgba(255, 255, 255, 0.1);
    border: none;
    background-color: #23272d;
    flex: 1 1 100%;
    border-radius: 100%;
    ${props => props.hoverable && css`
      &:hover {
        background: #bd790b;
      }
    `}
`;

export const Body = styled.div`
    width: 85%;
    height: 85%;
    overflow: hidden;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    box-shadow: -1px 1px 30px -3px rgba(0,0,0,0.21);
    border: none;
    background-color: #191b21;
    border-radius: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
`;
