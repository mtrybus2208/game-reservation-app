import styled from 'styled-components';
import PropTypes from 'prop-types';

export const GameCard = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  position: absolute;
  z-index: 1;
  left: ${props => props.left}px;
  top: 101px;
  bottom: 1px;
  max-width: 300px;
  background: #23272d;
  width: ${props => props.size}px;;
  box-shadow: 3px 2px 20px 0px rgba(0,0,0,.41);
`;

GameCard.propTypes = {
  size: PropTypes.number,
  left: PropTypes.number,
};

GameCard.Info = styled.div`
  background: #15181b;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #60666c;
  height: 50px;
  font-size: 11px;
  font-weight: 500;
`;

GameCard.Body = styled.div`
    background: #23272d;
    position: relative;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0px 9px 24px -4px rgba(056,60,69,.6);
    border-bottom: 1px solid #494e54;
`;

GameCard.Body.TitleBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-weight: 500;
`;

GameCard.Body.Title = styled.div`
  color: #fff;
  font-size: 12px;
  text-transform: uppercase;
  margin: 20px 0px 10px;
`;

GameCard.Body.SubTitle = styled.div`
  color: #747a81;
  font-size: 10px;
`;
