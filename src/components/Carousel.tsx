/* eslint-disable */
import React from 'react';

import { CarouselType } from '../types/Carousel';

import './Carousel.scss';

type CarouselProps = CarouselType;

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
    const { step, infinite, images, frameSize } = this.props;
    const maxTransition = calculateMaxTransition(images.length, frameSize);
    let result: number;

    if (operation === '-') {
      result = actualTransition - step / frameSize * 100;

      if (actualTransition === 0 && infinite) {
        result = maxTransition;
      } else if (result < 0) {
        result = 0;
      }
    } else {
      result = actualTransition + step / frameSize * 100;

      if (actualTransition === maxTransition && infinite) {
        result = 0;
      } else if (result > maxTransition) {
        result = maxTransition;
      }
    }

    return result;
  };

  isBlocked = (button: 'prev' | 'next') => {
    const { images, frameSize, infinite} = this.props;
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
      frameSize,
      animationDuration,
      itemWidth,
    } = this.props;

    const { transition } = this.state;

    return (
      <div className="Carousel">
        <div className="Carousel__wrapper" style={{ width: frameSize * itemWidth }}>
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
        </div>

        <div className="Carousel__buttons">
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
      </div>
    );
  }
}
