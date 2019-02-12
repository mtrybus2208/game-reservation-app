/**
 * Need to move this logic to TimeLine Component
 */
import React, { Component } from 'react';
import PropTypes from 'prop-types';

import Ruler from './styles';

const propTypes = {
  workdayInPixels: PropTypes.number,
  timeConverter: PropTypes.number,
  arrayOfWorkdayHours: PropTypes.array,
};
 
class TimeRuler extends Component {

  state = {
    isDown: false,
    startX: undefined,
    scrollLeft: undefined,
  };

  wrapRef = null;

  hoursToPixels(h) {
    return h * 60 * this.props.timeConverter;
  } 

  mouseLeave = () => (e) => { 
    this.setState({
      isDown: false,
    });
  };

  mouseMove = () => (e) => { 
    if(!this.state.isDown) return;
    e.preventDefault();
    const x = e.pageX - this.wrapRef.offsetLeft;
    const walk = (x - this.state.startX);
    this.wrapRef.scrollLeft = this.state.scrollLeft - walk;
  };

  mouseUp = () => (e) => { 
    this.setState({
      isDown: false,
    });
  };

  mouseDown = () => (e) => { 
    this.setState({
      isDown: true,
      startX: e.pageX - this.wrapRef.offsetLeft,
      scrollLeft: this.wrapRef.scrollLeft,
    });
  };

  render() {
    return (
      <Ruler.Wrapper
        innerRef={(el) => this.wrapRef = el}
        onMouseDown={this.mouseDown()}
        onMouseLeave={this.mouseLeave()}
        onMouseUp={this.mouseUp()}
        onMouseMove={this.mouseMove()}
      >
        <Ruler.Box>
          <Ruler
            height={this.props.workdayInPixels}
            timeConverter={this.props.timeConverter}
          >
            {this.props.arrayOfWorkdayHours.map((h, i) =>
              (
                <Ruler.HoursDivider
                  key={`t-${i}`}
                  position={this.hoursToPixels(i)}
                  time={h}
                />
              ))}
          </Ruler>
        </Ruler.Box>     
      </Ruler.Wrapper>
    );
  }
};

TimeRuler.propTypes = propTypes;
export default TimeRuler;
