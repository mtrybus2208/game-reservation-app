import styled from 'styled-components';

const GameConfig = styled.div`
    padding: 20px;
    background: rgb(39, 34, 39);
    display:  ${props => (props.isOpen ? 'flex' : 'none')};
    -webkit-flex-direction: column;
    -ms-flex-direction: column;
    flex-direction: column;
    min-height: 76%;
    margin: 20px auto;
    border-radius: 5px;
    position: fixed;
    left: 278px;
    right: 30px;
    top: 90px;
    z-index: 2;
`;

GameConfig.Col = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

GameConfig.ColTop = styled(GameConfig.Col)`
  height: 60%;
  border-bottom: 1px solid #43414c;
`;

GameConfig.ColBottom = styled(GameConfig.Col)`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

GameConfig.StartField = styled.div`
  text-align: center;
  font-size: 24px;
`;

GameConfig.ButtonsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default GameConfig;
