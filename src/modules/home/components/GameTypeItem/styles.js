import styled from 'styled-components';
import PropTypes from 'prop-types';

export const GameTypeItem = styled.div`
    width: 100%;
    background: linear-gradient(to top, #1f222882, #2a323da3);
    box-shadow: 0px 17px 24px 0 rgba(0,0,0,0.25);
    display: flex;
    margin-bottom: 20px;
    border: 3px solid #1b1e22;
    border-color: ${({ active }) => active ? '#1b1e22' : '#1b1e22'};

    &:last-child {
      margin-bottom: 0;
    }

    &:hover {
      border-color: #bd790b;
    }
`;

export const IconBox = styled.div`
    box-shadow: inset 0px 2px 3px 0 rgba(255, 255, 255, 0.1);
    box-shadow: inset 0px 2px 3px 0 rgba(255, 255, 255, 0.1);
    background-color: #1b1e22;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px;
`;

IconBox.propTypes = {
  active: PropTypes.bool,
};

export const Content = styled.div`
    display: flex;
    align-items: center;
    padding-left: 20px;
    text-transform: uppercase;
    font-size: 13px;
    font-weight: 300;
`;

export const Icon = styled.img`
  width: 20px;
  height: 20px;
`;
