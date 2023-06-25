/* eslint-disable */
import React from 'react';

import './Carousel.scss';

export interface CarouselProps {
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
      transition: this.calculateTransition(prevState.transition, 1),
    }));
  };

  prevButtonHandler = () => {
    this.setState((prevState) => ({
      transition: this.calculateTransition(prevState.transition, -1),
    }));
  };

  calculateTransition = (actualTransition: number, operator: 1 | -1) => {
    const { step, infinite, images, frameSize } = this.props;
    const maxTransition = calculateMaxTransition(images.length, frameSize);

    if (infinite && actualTransition === 0) {
      return maxTransition;
    }

    if (infinite && actualTransition === maxTransition) {
      return 0;
    }

    const delta = (step / frameSize) * 100 * operator;

    let result = actualTransition + delta;
    result = Math.min(result, maxTransition);
    result = Math.max(result, 0);

    return result;
  };

  isBlocked = (button: 'prev' | 'next') => {
    const { images, frameSize, infinite} = this.props;
    const { transition } = this.state;

    if (infinite) {
      return false;
    }

    return button === 'next'
      ? transition === calculateMaxTransition(images.length, frameSize)
      : transition === 0;
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
