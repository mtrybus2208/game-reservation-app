import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';

export const InfoCard = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: ${props => props.maxWidth || '100%'};
  height: 100%;
  border: solid 1px #1a1d21;
  background-image: linear-gradient(to top, ${rgba('#1f2228', 0.35)}, ${rgba('#2a323d', 0.35)});
  border-right: 1px solid #141619;
`;

