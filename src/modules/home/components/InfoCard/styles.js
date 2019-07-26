import styled from 'styled-components';
import PropTypes from 'prop-types';
import { rgba } from 'polished';

export const InfoCard = styled.div`
  display: flex;
  align-items: stretch;
  max-width: ${props => props.maxWidth || '100%'};
  height: 100%;
  border: solid 1px #1a1d21;
  background-image: linear-gradient(to top, ${rgba('#1f2228', 0.35)}, ${rgba('#2a323d', 0.35)});
  border-right: 1px solid #141619;
  flex-direction: column;
`;

export const Header = styled.div`
   border-bottom: solid 1px  #141619;
   padding: 15px;
   display: flex;
   align-items: center;
   justify-content: center;
   background: linear-gradient(to top, #1f222830, #2a323d36);
   text-transform: uppercase;
   font-size: 13px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1 1 100%;
  position: relative;
`;

export const Blocked = styled.div`
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    right: 0;
    background: yellow;
    position: absolute;
    background: rgba(25, 29, 32, 1);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 2;
    flex-direction: column;
`;

