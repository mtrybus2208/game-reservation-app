import styled from 'styled-components';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

export const AuthForm = styled.form`
    
`; 
export const FormItem = styled.div`
    margin: 10px;
`;  

export const Label = styled.div`
    display: none;
    padding: 20px 0;
`;  

export const ButtonWrapper = styled.div`
    height: 75px;
    margin-top: 50px;
`;

export const Control = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 30px 0;
`;

export const FormInfo = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

export const InfoCopy = styled.div`
  line-height: 2.63;
  letter-spacing: 0.1px;
  text-align: left;
  color: #798fa8;
  font-size: 12px;
  font-weight: 300;
`;

export const InfoLink = styled(NavLink)`
  color: #798fa8; 
  text-decoration: none;
`;

export const Input = styled.input`
    display: block;
    flex: 1;
    height: 50px;
    height: 60px;
    box-shadow: 0px 1px 1px 0 rgba(255, 255, 255, 0.07), inset 0px 3px 8px 0 rgba(0, 0, 0, 0.25);
    background-color: #15181b;
    border: none;
    outline: none;
    font-size: 14px;
    font-weight: normal;
    font-style: normal;
    font-stretch: normal;
    line-height: 2.25;
    letter-spacing: 0.1px;
    text-align: left;
    color: #5a5f6b;
    padding-left: 10px;

    &::placeholder {
        font-size: 14px;
        font-weight: normal;
        font-style: normal;
        font-stretch: normal;
        line-height: 2.25;
        color: #5a5f6b;
    }
`;