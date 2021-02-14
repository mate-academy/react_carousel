import React from 'react';
import uuid from 'uuid-random';
import { CarouselTypes, CarouselDefault } from './CarouselTypes';

import './Carousel.scss';

export class Carousel extends React.Component {
  showNextImages = () => {
    const {
      step,
      frameSize,
      itemWidth,
      indexFrame,
      infinite,
      images,
      currentPosition,
      handleGetValue,
    } = this.props;
    const index = currentPosition === itemWidth * (images.length - frameSize)
      ? indexFrame : indexFrame + 1;
    let position = itemWidth * step * index;

    handleGetValue(index, 'indexFrame');

    if (infinite && currentPosition
      === itemWidth * (images.length - frameSize)) {
      position = 0;
      handleGetValue(0, 'indexFrame');
    }

    return Math.min(
      position,
      itemWidth * (images.length - frameSize),
    );
  }

  showPrevImages = () => {
    const {
      images,
      step,
      itemWidth,
      indexFrame,
      infinite,
      frameSize,
      currentPosition,
      handleGetValue,
    } = this.props;
    const index = currentPosition === 0 ? indexFrame : indexFrame - 1;
    let position = itemWidth * step * index;

    if (infinite && currentPosition === 0) {
      position = itemWidth * ([...images].length - frameSize);
      handleGetValue(Math.floor([...images].length / frameSize), 'indexFrame');
    } else {
      handleGetValue(index, 'indexFrame');
    }

    return Math.max(
      0,
      position,
    );
  }

  handleMoveImages = (
    event,
    action,
  ) => {
    const {
      handleGetValue,
    } = this.props;

    switch (action) {
      case 'next':
        handleGetValue(this.showNextImages(), 'currentPosition');
        break;
      case 'prev':
        handleGetValue(this.showPrevImages(), 'currentPosition');
        break;
      default:
        break;
    }
  }

  render() {
    const {
      images,
      itemWidth,
      frameSize,
      currentPosition,
      animationDuration,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={{
          width: itemWidth * frameSize,
          height: itemWidth,
        }}
      >
        <button
          className="prev"
          type="button"
          onClick={event => this.handleMoveImages(event, 'prev')}
        >
          {'<'}
        </button>
        <div
          className="Carousel_gallery"
          style={{
            width: itemWidth * frameSize,
            height: itemWidth,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              transition: `transform ${animationDuration}ms ease`,
              transform: `translateX(-${currentPosition}px)`,
            }}
          >
            {[...images].map((image, index) => (
              <li key={uuid()}>
                <img
                  src={image}
                  alt={index + 1}
                  style={{
                    width: itemWidth,
                    height: itemWidth,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          className="next"
          type="button"
          onClick={event => this.handleMoveImages(event, 'next')}
        >
          {'>'}
        </button>
      </div>
    );
  }
}

Carousel.propTypes = CarouselTypes;
Carousel.defaultProps = CarouselDefault;
