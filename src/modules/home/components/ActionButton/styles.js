import styled from 'styled-components';
import { lighten } from 'polished';
import BaseButton from '@/modules/shared/components/BaseButton';

export const ActionButton = styled(BaseButton)`
  background: ${props => props.isBlocked ? props.theme.grey.dark : props.theme.accent};
  color: ${props => props.color || props.theme.darkFontColor};
  display: flex;
  justify-content: center;
  align-items: center;
  text-transform: uppercase;
  height: ${props => props.maxHeight || '100%'};
  width: 100%;
  max-width: 100%;
  font-weight: 600;
  line-height: 1;
  position: relative;
  font-size: 13px;
  box-shadow: 13px 17px 30px -13px rgba(0, 0, 0, .52);
  pointer-events: ${props => props.isBlocked ? 'none' : 'auto'};

  &:after {
    content: '';
    position: absolute;
    top: 10px;
    left: 10px;
    bottom: 10px;
    right: 10px;
    background: ${props =>
    props.isBlocked
      ? props.theme.grey.semiDark
      : lighten(0.2, props.theme.accent)};
    filter: blur(5px);
    opacity: .25;
    pointer-events: none;
    z-index: 0;
  }

  &:hover {
    &:after {
      opacity: .4;
    } 
  }
`;

export const InfoBox = styled.div`
  display: block;
`;

export const Info = styled.span`
  position: relative;
  z-index: 1;
`;
