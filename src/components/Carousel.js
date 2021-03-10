import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

export class Carousel extends React.Component {
  state = {
    position: 0,
  }

  goForward = () => {
    const { images, step, itemWidth, framesize } = this.props;

    const scrollStep = itemWidth * step;
    const maxLength = (images.length - framesize) * itemWidth;

    this.setState(prevState => ({
      position: (scrollStep - prevState.position > maxLength)
        ? -maxLength
        : prevState.position - scrollStep,
    }));
  }

  goBack = () => {
    const { step, itemWidth } = this.props;
    const scrollStep = itemWidth * step;

    this.setState(prevState => ({
      position: (prevState.position + scrollStep > 0)
        ? 0
        : prevState.position + scrollStep,
    }));
  }

  render() {
    const { images, itemWidth, framesize, animationDuration } = this.props;

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * framesize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${this.state.position}px)`,
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
          onClick={this.goBack}
        >
          Prev
        </button>
        <button
          type="button"
          onClick={this.goForward}
        >
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  step: PropTypes.number.isRequired,
  itemWidth: PropTypes.number.isRequired,
  framesize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};
