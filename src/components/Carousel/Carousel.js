import React, { Component } from 'react';
import './Carousel.scss';
import PropTypes from 'prop-types';
import Image from '../Image/Image';

export default class Carousel extends Component {
  state = {
    index: 0,
  }

  nextButton = () => {
    let newIndex;
    const { step, images, frameSize, infinite } = this.props;
    const { index } = this.state;

    if (infinite) {
      if (index + frameSize === images.length) {
        newIndex = 0;
      } else if (index + frameSize > images.length - step) {
        newIndex = images.length - frameSize;
      } else {
        newIndex = index + step;
      }

      this.setState(() => ({
        index: newIndex,
      }));
    } else {
      if (index + frameSize > images.length - step) {
        newIndex = images.length - frameSize;
      } else {
        newIndex = step + index;
      }

      this.setState(() => ({
        index: newIndex,
      }));
    }
  }

  prevButton = () => {
    let newIndex;
    const { step, images, frameSize, infinite } = this.props;
    const { index } = this.state;

    if (infinite) {
      if (index === 0) {
        newIndex = images.length - frameSize;
      } else if (index < step) {
        newIndex = 0;
      } else {
        newIndex = index - step;
      }

      this.setState(() => ({
        index: newIndex,
      }));
    } else {
      if (index === 0 || index < step) {
        newIndex = 0;
      } else {
        newIndex = index - step;
      }

      this.setState(() => ({
        index: newIndex,
      }));
    }
  }

  render() {
    const {
      images,
      animationDuration,
      frameSize,
      itemWidth,
    } = this.props;
    const { index } = this.state;

    return (
      <>
        <div
          className="Carousel"
          style={{
            width: `${itemWidth * frameSize}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transform: `translateX(-${index * itemWidth}px)`,
              transition: `transform ${animationDuration}ms ease-in-out`,
            }}
          >
            {images.map((image, i) => (
              <li key={image}>
                <Image itemWidth={itemWidth} image={image} index={i} />
              </li>
            ))}
          </ul>
        </div>

        <div className="button__container">
          <button
            type="button"
            className="button"
            onClick={this.prevButton}
          >
            Prev
          </button>
          <button
            type="button"
            className="button"
            onClick={this.nextButton}
          >
            Next
          </button>
        </div>
      </>
    );
  }
}

Carousel.propTypes = {
  step: PropTypes.number.isRequired,
  images: PropTypes.arrayOf.isRequired,
  itemWidth: PropTypes.number.isRequired,
  infinite: PropTypes.bool.isRequired,
  frameSize: PropTypes.number.isRequired,
  animationDuration: PropTypes.number.isRequired,
};
