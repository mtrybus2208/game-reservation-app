import React from 'react';
import PropTypes from 'prop-types';
import ReservationButton from '@/modules/home/containers/ReservationButton';
import AppGrid from '../shared/components/AppGrid';
import TimeLine from './containers/Timeline';
import NewGameConfig from './containers/NewGameConfig';
import * as S from './styles';

const propTypes = {};

const defaultProps = {};

const Home = () => (
  <S.Home>
    <S.TimeLineWrapper>
      <TimeLine />
    </S.TimeLineWrapper>

    <S.ReservationWrapper>
      <NewGameConfig />
      <S.CtaWrapper>
        <ReservationButton />
      </S.CtaWrapper>
    </S.ReservationWrapper>
  </S.Home>
);

Home.propTypes = propTypes;
Home.defaultProps = defaultProps;
export default Home;
