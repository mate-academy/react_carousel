import PropTypes from 'prop-types';
import React from 'react';
import './Carousel.scss';

export class Carousel extends React.Component {
  state = {
    currentPosition: 0,
  }

  scrollNext = () => {
    const { images, step, itemWidth, framesize } = this.props;
    const scrollStep = itemWidth * step;
    const maxLength = (images.length - framesize) * itemWidth;

    this.setState(state => ({
      currentPosition: (state.currentPosition - scrollStep < -maxLength)
        ? -maxLength
        : state.currentPosition - scrollStep,
    }));
  }

  scrollPrevious = () => {
    const { step, itemWidth } = this.props;
    const scrollStep = step * itemWidth;

    this.setState(state => ({
      currentPosition: (state.currentPosition + scrollStep > 0)
        ? 0
        : state.currentPosition + scrollStep,
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
            transform: `translateX(${this.state.currentPosition}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          { images.map((image, index) => (
            <li
              key={image}
            >
              <img src={image} alt={index} />
            </li>
          ))}
        </ul>
        <button type="button" onClick={this.scrollPrevious}>Prev</button>
        <button type="button" onClick={this.scrollNext}>Next</button>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  itemWidth: PropTypes.number.isRequired,
  step: PropTypes.number,
  framesize: PropTypes.number,
  animationDuration: PropTypes.number,
};

Carousel.defaultProps = {
  step: 3,
  framesize: 3,
  animationDuration: 1000,
};
