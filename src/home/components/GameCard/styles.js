import styled from 'styled-components';
import PropTypes from 'prop-types';

export const GameCard = styled.div`
  display: grid;
  grid-template-rows: repeat(2,40px) 1fr;
  grid-template-columns: 40% 1fr;
  grid-template-areas: 
    "avatar time"
    "avatar type"
    "avatar content";
  position: absolute;
  z-index: 1;
  left: 86px;
  right: 18px;
  top: ${props => props.left}px;
  bottom: 1px;
  max-width: 100%;
  background: #23272d;
  width: auto;
  box-shadow: 3px 2px 20px 0px rgba(0,0,0,.41);
  height: ${props => props.size}px;
  
  @media ${({ theme }) => theme.media.tablet} {
    left: ${props => props.left}px;
    right: auto;
    width: ${props => props.size}px;
    top: 101px;
    height: initial;
    max-width: 300px;
    grid-template-columns: 1fr;
    grid-template-rows: 50px 1.5fr 1fr 50px;
    grid-template-areas: 
      "time"
      "content"
      "info"
      "type";
  }
`;

GameCard.propTypes = {
  size: PropTypes.number,
  left: PropTypes.number,
};

export const Info = styled.div`
  height: 100%;
  background: #15181b;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #60666c;
  font-size: 11px;
  font-weight: 500;
`;

export const InfoType = styled(Info)`
  grid-area: type;
  border-top: 1px solid #23272d;
  @media ${({ theme }) => theme.media.tablet} {
    border: none;
  }
`;
export const InfoTime = styled(Info)`
  grid-area: time;
`;

export const Body = styled.div`
    grid-area: avatar;
    background: #23272d;
    position: relative;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0px 9px 24px -4px rgba(056,60,69,.6);

    @media ${({ theme }) => theme.media.tablet} { 
      grid-area: content;
      justify-content: flex-end;
    } 
`;

export const TitleBox = styled.div`
  flex-direction: column;
  font-weight: 500;
  grid-area: content;
    display: flex;
    justify-content: flex-end;
    align-items: flex-start;
    padding: 20px;

  @media ${({ theme }) => theme.media.tablet} {
    border-bottom: 1px solid #494e54;
    grid-area: info;
    justify-content: flex-start;
    align-items: center;
  } 
`;

export const Title = styled.div`
  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
  margin: 20px 0px 10px;
`;

export const SubTitle = styled.div`
  color: #747a81;
  font-size: 10px;
`;
