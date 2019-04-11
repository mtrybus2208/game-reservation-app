import styled from 'styled-components';
import PropTypes from 'prop-types';

export const Body = styled.div`
  padding: 60px 25px;

  @media ${({ theme }) => theme.media.tablet} {
    padding: 60px 80px;
  }
`;
