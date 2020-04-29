import React from 'react';
import PropsTypes from 'prop-types';
import './Carousel.css';

class Carousel extends React.Component {
  state = {
    index: 0,
  }

  prevClick = () => {
    const { images, frameSize, step, infinite } = this.props;
    let prevIndex;

    if (infinite) {
      if (this.state.index === 0) {
        prevIndex = images.length - frameSize;
      } else if (this.state.index < step) {
        prevIndex = 0;
      } else {
        prevIndex = this.state.index - step;
      }

      this.setState(state => ({
        index: prevIndex,
      }));
    } else {
      if (this.state.index < step) {
        prevIndex = 0;
      } else if (this.state.index === 0) {
        prevIndex = 0;
      } else {
        prevIndex = this.state.index - step;
      }

      this.setState(state => ({
        index: prevIndex,
      }));
    }
  }

  nextClick = () => {
    const { images, frameSize, step, infinite } = this.props;
    let nextIndex;

    if (infinite) {
      if (this.state.index + frameSize === images.length) {
        nextIndex = 0;
      } else if (this.state.index + frameSize > images.length - step) {
        nextIndex = images.length - frameSize;
      } else {
        nextIndex = this.state.index + step;
      }

      this.setState(state => ({
        index: nextIndex,
      }));
    } else {
      if (this.state.index + frameSize > images.length - step) {
        nextIndex = images.length - frameSize;
      } else {
        nextIndex = this.state.index + step;
      }

      this.setState(state => ({
        index: nextIndex,
      }));
    }
  }

  render() {
    const { images, itemWidth, frameSize, animationDuration } = this.props;
    const { index } = this.state;

    return (
      <div
        style={{ width: `${itemWidth * frameSize}px` }}
        className="Carousel"
      >
        <ul
          style={{
            transform: `translateX(-${index * itemWidth}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
          className="Carousel__list"
        >
          {images.map(el => (
            <li key={el}><img src={el} alt="index" /></li>
          ))
          }
        </ul>

        <button onClick={this.prevClick} type="button">Prev</button>
        <button onClick={this.nextClick} type="button">Next</button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropsTypes.arrayOf.isRequired,
  frameSize: PropsTypes.number.isRequired,
  step: PropsTypes.number.isRequired,
  infinite: PropsTypes.bool.isRequired,
  itemWidth: PropsTypes.number.isRequired,
  animationDuration: PropsTypes.number.isRequired,
};

export default Carousel;
