/* eslint-disable */
import React from 'react';

import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
}

interface CarouselState {
  transition: number;
}

const calculateMaxTransition = (count: number, frame: number) => {
  return ((count / frame) * 100) - 100;
};

export class Carousel extends React.Component<CarouselProps, CarouselState> {
  state: Readonly<CarouselState> = {
    transition: 0,
  };

  nextButtonHandler = () => {
    this.setState((prevState) => ({
      transition: this.calculateTransition(prevState.transition, '+'),
    }));
  };

  prevButtonHandler = () => {
    this.setState((prevState) => ({
      transition: this.calculateTransition(prevState.transition, '-'),
    }));
  };

  calculateTransition = (actualTransition: number, operation: '-' | '+') => {
    const { step = 3, infinite = false, images } = this.props;
    const maxTransition = calculateMaxTransition(images.length, step);
    let result: number;

    if (operation === '-') {
      result = actualTransition - 100;

      if (actualTransition === 0 && infinite) {
        result = maxTransition;
      } else if (result < 0) {
        result = 0;
      }
    } else {
      result = actualTransition + 100;

      if (actualTransition === maxTransition && infinite) {
        result = 0;
      } else if (result > maxTransition) {
        result = maxTransition;
      }
    }

    return result;
  };

  isBlocked = (button: 'prev' | 'next') => {
    const { images, frameSize = 3, infinite = false } = this.props;
    const { transition } = this.state;

    const isEdge = button === 'next'
      ? transition === calculateMaxTransition(images.length, frameSize)
      : transition === 0;

    return !infinite && isEdge
      ? true
      : undefined;
  };

  render() {
    const {
      images,
      frameSize = 3,
      animationDuration = 1000,
      itemWidth = 130,
    } = this.props;

    const { transition } = this.state;

    return (
      <div
        className="Carousel"
        style={{ width: frameSize * (itemWidth + 25) }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(-${transition}%)`,
            transition: `all ${animationDuration}ms`,
          }}
        >
          {images.map((image, i) => {
            return (
              <li key={image}>
                <img style={{ width: itemWidth }} src={image} alt={`${i}`} />
              </li>
            );
          })}
        </ul>

        <button
          type="button"
          onClick={this.prevButtonHandler}
          disabled={this.isBlocked('prev')}
          className="Carousel__button"
        >
          &larr;
        </button>
        <button
          type="button"
          onClick={this.nextButtonHandler}
          data-cy="next"
          disabled={this.isBlocked('next')}
          className="Carousel__button Carousel__button--next"
        >
          &rarr;
        </button>
      </div>
    );
  }
}
