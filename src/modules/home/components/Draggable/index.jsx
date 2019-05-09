/**
 * TODO: 
 * prevent to setState on every muoseMOve
 * store this._ref.current.getBoundingClientRect() in local state
 * on update instead getting values from state calculate from  ' event.pageX - left'
 */

import React, { PureComponent } from 'react'; 
import GameCard from '@/modules/home/components/GameCard'; 
import * as S from './styles';
 

const throttle = (f) => {
    let token = null, lastArgs = null;
    const invoke = () => {
        f(...lastArgs);
        token = null;
    };
    const result = (...args) => {
        lastArgs = args;
        if (!token) {
            token = requestAnimationFrame(invoke);
        }
    };
    result.cancel = () => token && cancelAnimationFrame(token);
    return result;
};

class Draggable extends React.PureComponent {
  _relX = 0;
  _relY = 0;
  _ref = React.createRef();
  
  _onMouseDown = (event) => {
      if (event.button !== 0) {
          return;
      }
      const {scrollLeft, scrollTop, clientLeft, clientTop} = document.body;
      console.log({scrollLeft, scrollTop, clientLeft, clientTop});
      const {left, top} = this._ref.current.getBoundingClientRect();

      this._relX = left;
      this._relY = event.pageY - (top + scrollTop - clientTop);
      document.addEventListener('mousemove', this._onMouseMove);
      document.addEventListener('mouseup', this._onMouseUp);
      event.preventDefault();
  };
  
  _onMouseUp = (event) => {
      document.removeEventListener('mousemove', this._onMouseMove);
      document.removeEventListener('mouseup', this._onMouseUp);
      event.preventDefault();
  };
  
  _onMouseMove = (event) => {
    console.log('this._relX');
    console.log(this._relX);
      this.props.onMove(
          event.pageX - this._relX,
          event.pageY - this._relY,
      );
      event.preventDefault();
  };
  
  _update = throttle(() => {
      const {x, y} = this.props;
      console.log(`UPDATE ${x}`);
      console.log(`tranformX - ${x}`)
      this._ref.current.style.transform = `translateX(${x}px)`;
  });
  
  componentDidMount() {
      this._ref.current.addEventListener('mousedown', this._onMouseDown);
      this._update();
  }
  
  componentDidUpdate() {
      this._update();
      console.log('UPDATE!')
  }
  
  componentWillUnmount() {
      this._ref.current.removeEventListener('mousedown', this._onMouseDown);
      this._update.cancel();
  }
  
  render() {
      return (
          <div style={{
            display: 'inline-block',
            background: 'white',
            userSelect: 'none',
            position: 'absolute',
            left: 200,
            top: 0,
            bottom: 0,
            width:'300px',
            background: '#283e28',
            top: '101px',
            zIndex: 1,

          }} ref={this._ref}>
              {this.props.children}  
  
          </div>
      );
  }
}

export default Draggable;