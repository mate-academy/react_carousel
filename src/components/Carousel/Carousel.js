import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    images: this.props.images,
    itemWidth: this.props.itemWidth,
    frameSize: this.props.frameSize,
    step: this.props.step,
    animationDuration: this.props.animationDuration,
    position: 0,
  };

  nextSlide = () => {
    const { images, itemWidth, frameSize, step, position } = this.state;
    const carouselWidth = images.length * itemWidth;
    const frameWidth = frameSize * itemWidth;
    let left = position;

    left -= step * itemWidth;

    if (left <= -(carouselWidth - frameWidth)) {
      left = -(carouselWidth - frameWidth);
    }

    this.setState({
      position: left,
    });
  };

  prevSlide = () => {
    const { itemWidth, step, position } = this.state;
    let left = position;

    left += step * itemWidth;

    if (left > 0) {
      left = 0;
    }

    this.setState({
      position: left,
    });
  };

  // editWidth = (event) => {
  //   return this.setState({
  //     itemWidth: event.target.value,
  //   });
  // }

  // editSize = (event) => {
  //   return this.setState({
  //     frameSize: event.target.value,
  //   });
  // }

  // editStep = (event) => {
  //   return this.setState({
  //     step: event.target.value,
  //   });
  // }

  // editDuration = (event) => {
  //   return this.setState({
  //     duration: event.target.value,
  //   });
  // }

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      step,
      animationDuration,
      position,
    } = this.state;

    return (
      <>
        <div
          className="overflow"
          style={{ width: `${itemWidth * frameSize}px` }}
        >
          <div
            className="list"
            style={{
              width: `${itemWidth * images.length}px`,
              left: `${position}px`,
              transition: `left ${animationDuration}ms`,
            }}
          >
            {images.map(image => (
              <img
                src={image}
                alt="smile"
                key={image}
                style={{
                   width: `${itemWidth}px`,
                  }}
              />
            ))}
          </div>
          <button
            type="button"
            onClick={this.prevSlide}
            style={ {marginLeft: `20px`} }
          >
            Roll back
          </button>
          <button
            type="button"
            onClick={this.nextSlide}
            style={{
              marginLeft: `10px`,
            }}
          >
            Roll next
          </button>

        </div>

      </>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};

export default Carousel;