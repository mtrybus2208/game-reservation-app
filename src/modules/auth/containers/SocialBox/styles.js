import styled from 'styled-components';
import PropTypes from 'prop-types';
import BaseButton from '../../../shared/components/BaseButton';

export const SocialBox = styled.div`
`;

export const Row = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 20px;

`;

export const SocialButton = styled(BaseButton)`
    background-color: #5450f2;
    box-shadow: 0 17px 24px 0 rgba(0, 0, 0, 0.33), inset 0 2px 3px 0 rgba(255, 255, 255, 0.1);
    display: flex;
    justify-content: center;
    align-items: center;
    color: #fff;
    padding: 20px;
    flex: 1 1 100%;
`;

export const FacebookButton = styled(SocialButton)`
    background-color: #5450f2;
`;

export const GoogleButton = styled(SocialButton)`
    background-color: #ff624d;
`;

export const TwitterButton = styled(SocialButton)`
    background-color: #1da1f2;
`;

export const GithubButton = styled(SocialButton)`
    background-color: #333;
`;

export const Divider = styled.div`
    width: 60px;
`;

export const SocialImage = styled.img`
    width: 20px;
    height: 20px;
`;
