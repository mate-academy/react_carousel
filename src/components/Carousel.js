import PropTypes from 'prop-types';
import React, { Component } from 'react';

import './Carousel.scss';

function generateIDbyImageName(image) {
  return image.replace(/[./img/.png]/g, '');
}

export class Carousel extends Component {
  state = {
    currentPosition: 0,
  }

  scrollLeft = () => {
    const { itemWidth, step, images, frame } = this.props;
    const maxMoving = itemWidth * step;
    const maxWidth = (images.length - frame) * itemWidth;

    this.setState(prevState => ({
      currentPosition: prevState.currentPosition - maxMoving < -maxWidth
        ? -maxWidth
        : prevState.currentPosition - maxMoving,
    }));
  }

  scrollRight = () => {
    const { itemWidth, step } = this.props;
    const maxMoving = itemWidth * step;

    this.setState(prevState => ({
      currentPosition: prevState.currentPosition + maxMoving > 0
        ? 0
        : prevState.currentPosition + maxMoving,
    }));
  }

  render() {
    const { currentPosition } = this.state;
    const {
      images,
      itemWidth,
      frame,
      animationDuration,
    } = this.props;

    const maxWidth = (images.length - frame) * itemWidth;

    const preparedImages = images.map(image => ({
      id: generateIDbyImageName(image),
      src: image,
    }));

    const imageList = preparedImages.map(image => (
      <li className="Carousel__item" key={image.id}>
        <img
          className="Carouser__image"
          src={image.src}
          alt={image.id}
          width={`${itemWidth}px`}
        />
      </li>

    ));

    return (
      <div className="Carousel" style={{ width: `${itemWidth * frame}px` }}>
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${currentPosition}px)`,
            transitionDuration: `${animationDuration}ms`,
          }}
        >
          {imageList}
        </ul>

        <button
          className="Carousel__prev"
          type="button"
          disabled={currentPosition === 0}
          onClick={this.scrollRight}
        >
          Prev
        </button>
        <button
          className="Carousel__next"
          type="button"
          disabled={currentPosition <= -maxWidth}
          onClick={this.scrollLeft}
        >
          Next
        </button>
      </div>
    );
  }
}

Carousel.propTypes = {
  frame: PropTypes.number,
  itemWidth: PropTypes.number,
  step: PropTypes.number,
  animationDuration: PropTypes.number,
  images: PropTypes.arrayOf(
    PropTypes.string,
  ).isRequired,
};

Carousel.defaultProps = {
  frame: 3,
  itemWidth: 130,
  step: 3,
  animationDuration: 3000,
};
