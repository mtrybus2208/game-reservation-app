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
