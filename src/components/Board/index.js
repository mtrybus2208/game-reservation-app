import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Board = styled.div`
  max-width: 700px;
  margin: 60px auto;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px;
  padding: ${props => props.padding === 'medium' ? '15px' : 0};
  @media (min-width: 576px) {
    padding: ${props => props.padding === 'medium' ? '15px' : 0};
  }
  @media (min-width: 768px) {
    padding: ${props => props.padding === 'medium' ? '20px 60px' : 0};
  }
`;
 
Board.propTypes = {
  padding: PropTypes.string
};

export default Board;