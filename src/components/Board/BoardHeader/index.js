import styled from 'styled-components';

export const BoardHeader = styled.div`
  display: flex;  
  background: #fdfdfd;
  border-bottom: 1px solid #e9e4ea;
  div {
    color: #a692aa;
    justify-content: center;
    align-items: center;
    display: flex;
    width: 100%;
    padding: 15px;
    &:first-child {
      border-right: 1px solid #e9e4ea;
    }
  }
`
export default BoardHeader;