import React from 'react';
import PropTypes from 'prop-types';
import './Carousel.scss';

export class Carousel extends React.Component {
  state = {
    currentPosition: 0,
  }

  showNext = () => {
    const { images, step, itemWidth, frameSize } = this.props;
    const scrollStep = itemWidth * step;
    const maxLength = (images.length - frameSize) * itemWidth;

    this.setState(state => ({
      currentPosition: state.currentPosition - scrollStep < -maxLength
        ? -maxLength
        : state.currentPosition - scrollStep,
    }));
  }

  showPrevious = () => {
    const { step, itemWidth } = this.props;
    const scrollStep = itemWidth * step;

    this.setState(state => ({
      currentPosition: state.currentPosition + scrollStep > 0
        ? 0
        : state.currentPosition + scrollStep,
    }));
  }

  render() {
    const { images, itemWidth, frameSize, animationDuration } = this.props;

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${this.state.currentPosition}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {
            images.map((image, index) => (
              <li
                key={image}
                style={{ width: `${itemWidth}px` }}
              >
                <img src={image} alt={index} />
              </li>
            ))}
        </ul>
        <div className="Carousel__buttons">
          <button type="button" onClick={this.showPrevious}>
            Prev
          </button>
          <button type="button" onClick={this.showNext}>
            Next
          </button>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(
    PropTypes.string.isRequired,
  ).isRequired,
  step: PropTypes.number,
  itemWidth: PropTypes.number.isRequired,
  frameSize: PropTypes.number,
  animationDuration: PropTypes.number,
};

Carousel.defaultProps = {
  step: 3,
  frameSize: 3,
  animationDuration: 1000,
};
