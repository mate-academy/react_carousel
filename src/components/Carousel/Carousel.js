import React from 'react';
import PropTypes from 'prop-types';

import './Carousel.scss';

export class Carousel extends React.Component {
  constructor(props) {
    super(props);

    this.images = props.images;
    this.itemWidth = props.itemWidth;
    this.step = props.step;
    this.frameSize = props.frameSize;
    this.animationDuration = props.animationDuration;

    this.state = {
      currentPosition: 0,
    };
  }

  scrollLeft = () => {
    this.setState((prevState) => {
      const prevPosition = prevState.currentPosition;
      const currentPosition = (prevPosition + this.itemWidth * this.step > 0)
        ? 0
        : prevPosition + this.itemWidth * this.step;

      return { currentPosition };
    });
  }

  scrollRight = () => {
    this.setState((prevState) => {
      const prevPosition = prevState.currentPosition;
      const currentPosition = (
        prevPosition - this.itemWidth * this.step
          < (-(this.itemWidth * this.images.length)
          + this.itemWidth * this.frameSize))
        ? (-(this.itemWidth * this.images.length)
          + this.itemWidth * this.frameSize)
        : prevPosition - this.itemWidth * this.step;

      return { currentPosition };
    });
  }

  render() {
    return (
      <div
        className="Carousel"
        style={{ width: `${this.itemWidth * this.frameSize}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${this.state.currentPosition}px)`,
            transition: `transform ${this.animationDuration}ms`,
          }}
        >
          {
            this.images.map(image => (
              <li
                className="Carousel__item"
                key={image}
                style={{ width: `${this.itemWidth}px` }}
              >
                <img
                  src={image}
                  alt={this.images.findIndex(img => img === image) + 1}
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
