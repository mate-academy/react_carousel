import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

export class Carousel extends React.Component {
  state = {
    currentPosition: 0,
  };

  scrollLeft = () => {
    const { itemWidth, step } = this.props;

    this.setState((prevState) => {
      const prevPosition = prevState.currentPosition;

      const expectedPosition = (
        prevPosition + itemWidth * step
      );

      const currentPosition = expectedPosition > 0
        ? 0
        : expectedPosition;

      return { currentPosition };
    });
  }

  scrollRight = () => {
    const { itemWidth, step, images, frameSize } = this.props;

    this.setState((prevState) => {
      const prevPosition = prevState.currentPosition;

      const expectedPosition = (
        prevPosition - itemWidth * step
      );
      const maxAllowableShift = (
        -(itemWidth * images.length) + itemWidth * frameSize
      );

      const currentPosition = expectedPosition < maxAllowableShift
        ? maxAllowableShift
        : expectedPosition;

      return { currentPosition };
    });
  }

  render() {
    const {
      itemWidth,
      images,
      frameSize,
      animationDuration,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{ width: `${itemWidth * frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${this.state.currentPosition}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {
            images.map((image, index) => (
              <li
                className="Carousel__item"
                key={image}
                style={{ width: `${itemWidth}px` }}
              >
                <img
                  src={image}
                  alt={`Carousel item ${index}`}
                />
              </li>
            ))
          }
        </ul>

        <div className="Carousel__button-container">
          <button type="button" onClick={this.scrollLeft}>Prev</button>
          <button type="button" onClick={this.scrollRight}>Next</button>
        </div>
      </div>
    );
  }
}

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string).isRequired,
  itemWidth: PropTypes.number.isRequired,
  step: PropTypes.number.isRequired,
  frameSize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};
