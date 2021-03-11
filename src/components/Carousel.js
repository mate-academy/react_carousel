import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

export class Carousel extends React.Component {
  state = {
    currentPosition: 0,
  }

  slideRight = () => {
    let { currentPosition } = this.state;
    const { images, itemWidth, step } = this.props;

    const maxWidth = images.length * itemWidth - itemWidth * 3;

    if (currentPosition >= maxWidth - itemWidth * 2) {
      this.setState({
        currentPosition: maxWidth,
      });
    } else {
      this.setState({
        currentPosition: currentPosition += itemWidth * step,
      });
    }
  }

  slideLeft = () => {
    let { currentPosition } = this.state;
    const { itemWidth, step } = this.props;

    if (currentPosition <= itemWidth * 3) {
      this.setState({
        currentPosition: 0,
      });
    } else {
      this.setState({
        currentPosition: currentPosition -= itemWidth * step,
      });
    }
  }

  render() {
    const {
      images,
      frameSize,
      itemWidth,
      animationDuration,
    } = this.props;

    const {
      currentPosition,
    } = this.state;

    const width = (itemWidth * frameSize);
    const maxWidth = images.length * itemWidth - itemWidth * 3;

    return (
      <div
        className="Carousel"
        style={{
          maxWidth: `${width}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${-currentPosition}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img
                src={image}
                alt={index}
                style={{
                  width: `${itemWidth}px`,
                }}
              />
            </li>
          ))}
        </ul>

        <button
          disabled={currentPosition === 0}
          type="button"
          onClick={this.slideLeft}
        >
          Prev
        </button>
        <button
          disabled={currentPosition === maxWidth}
          type="button"
          onClick={this.slideRight}
        >
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};
