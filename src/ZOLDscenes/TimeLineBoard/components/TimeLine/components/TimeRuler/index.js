import React, { Component } from 'react';
import PropTypes from 'prop-types';

import GameCard from '../../../GameCard';
import Ruler from './styles';

const propTypes = {
  workdayInPixels: PropTypes.number,
  timeConverter: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
};

class TimeRuler extends Component {
  hoursToPixels(h) {
    return h * 60 * this.props.timeConverter;
  }

  render() { 
    return (
      <Ruler.Box>
        <GameCard
          user={
            {
              name: 'Michal Trybus',
              avatarImg: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1551047093/43160946_1970943372961667_6703179334590398464_n.jpg',
              profession: 'Frontend developer',
            }
          }
          display={
            {
              gameTime: '30min',
              gameType: 'fifa',
              size: 400,
              left: 0,
            }
          }
        />
        <GameCard
          user={
            {
              name: 'Lee Taylor',
              avatarImg: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1551047128/23517691_1590383757684299_295854948986904711_n.jpg',
              profession: 'Administrator',
            }
          }
          display={
            {
              gameTime: '15min',
              gameType: 'fifa',
              size: 200,
              left: 500,
            }
          }
        />

        <GameCard
          user={
            {
              name: 'John Doe',
              profession: 'PM',
            }
          }
          display={
            {
              gameTime: '15min',
              gameType: 'mortal kombat',
              size: 200,
              left: 701,
            }
          }
        />

        <GameCard
          user={
            {
              name: 'Arkadiusz Bazan',
              avatarImg: 'https://res.cloudinary.com/dfmqgkkbx/image/upload/v1551048374/49702416_2318285494866880_3232942151373422592_n.jpg',
              profession: 'QA',
            }
          }
          display={
            {
              gameTime: '30min',
              gameType: 'mortal kombat',
              size: 400,
              left: 1600,
            }
          }
        />
        <Ruler
          height={this.props.workdayInPixels}
          timeConverter={this.props.timeConverter}
        >
          {this.props.arrayOfWorkdayHours.map((h, i) => {
            return  (
              <Ruler.HoursDivider
                key={`t-${i}`}
                width={60 * this.props.timeConverter}
                position={this.hoursToPixels(i)}
                time={h}
              />
            );
          })}
        </Ruler>
      </Ruler.Box>
    );
  }
}

TimeRuler.propTypes = propTypes;
export default TimeRuler;
