import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

class Carousel extends React.Component {
  state = {
    currentPosition: 0,
  };

  scrollPrev = () => {
    const { itemWidth, step } = this.props;
    const maxMoving = itemWidth * step;

    this.setState(prevState => ({
      currentPosition: (prevState.currentPosition + maxMoving > 0)
        ? 0
        : prevState.currentPosition + maxMoving,
    }));
  };

  scrollNext = () => {
    const { images, step, frameSize, itemWidth } = this.props;
    const maxMoving = itemWidth * step;
    const maxLength = (images.length - frameSize) * itemWidth;

    this.setState(prevState => ({
      currentPosition: (prevState.currentPosition - maxMoving < -maxLength)
        ? -maxLength
        : prevState.currentPosition - maxMoving,
    }));
  };

  render() {
    const { images, frameSize, itemWidth, animationDuration } = this.props;
    const maxLength = (images.length - frameSize) * itemWidth;

    return (
      <div
        className="Carousel"
        style={{
          width: `${frameSize * itemWidth}px`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${this.state.currentPosition}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {images.map((image, index) => (
            <li key={image}>
              <img src={image} alt={index} />
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={this.scrollPrev}
          disabled={this.state.currentPosition === 0}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.scrollNext}
          disabled={this.state.currentPosition === -maxLength}
        >
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
  step: PropTypes.number,
  frameSize: PropTypes.number,
  itemWidth: PropTypes.number,
  animationDuration: PropTypes.number,
};

Carousel.defaultProps = {
  step: 3,
  frameSize: 3,
  itemWidth: 130,
  animationDuration: 1000,
};

export default Carousel;
