import styled from 'styled-components';
import PropTypes from 'prop-types';

export const CardSkeleton = styled.div`
  display: grid;
  grid-template-rows: repeat(2,40px) 1fr;
  grid-template-columns: 40% 1fr;
  grid-template-areas:
    "avatar header"
    "avatar footer"
    "avatar content";
  z-index: 1;
  max-width: 100%;
  /* background: #23272d; */
  flex: 1;
  width: auto;
  box-shadow: 3px 2px 20px 0 rgba(0,0,0,.41);

  @media ${({ theme }) => theme.media.tablet} {
    grid-template-columns: 1fr;
    grid-template-rows: 50px 1.5fr 1fr 50px;
    grid-template-areas:
      "header"
      "content"
      "info"
      "footer";
    overflow-y: auto;
    height: 100%;
  }
`;

export const Info = styled.div`
  height: 100%;
  /* background: #15181b; */
  display: flex;
  justify-content: center;
  align-items: center;
  color: #60666c;
  font-size: 11px;
  font-weight: 500;
`;

export const InfoFooter = styled(Info)`
  grid-area: footer;
  border-top: 1px solid #23272d;
  @media ${({ theme }) => theme.media.tablet} {
    border: none;
  }
`;

export const InfoHeader = styled(Info)`
  grid-area: header;
`;

export const InfoRow = styled.div`
  display: flex;
  flex: 1 1 100%;
  justify-content: center;
  align-items: center;
  position: relative;
`;

export const Body = styled.div`
    grid-area: avatar;
    /* background: #23272d; */
    position: relative;
    flex: 1 1 auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    box-shadow: inset 0 9px 24px -4px rgba(056,60,69,.6);

    @media ${({ theme }) => theme.media.tablet} {
      grid-area: content;
      justify-content: flex-end;
    }
`;
