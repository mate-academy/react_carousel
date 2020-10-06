/* eslint-disable no-param-reassign */
/* eslint-disable jsx-a11y/alt-text */
import React from 'react';
import uuid from 'uuid-random';
import { CarouselTypes, CarouselDefault } from './CarouselTypes';

import './Carousel.scss';

class Carousel extends React.Component {
  handleMoveImages = (
    event,
    step,
    itemWidth,
    animationDuration,
    infinite,
    indexFrame,
    move,
  ) => {
    const listImages = event.target.closest('.Carousel')
      .children[1].children[0].children;
    let position = 0;
    const index = move === 'next' ? indexFrame + 1 : indexFrame - 1;

    [...listImages].forEach((image) => {
      position = itemWidth * step;
      image.style.transition = `transform ${animationDuration}ms`;
      image.style.transform = `translateX(-${position * index}px)`;
    });
    this.props.setNewIndex(index);
  }

  render() {
    const {
      images,
      step,
      frameSize,
      itemWidth,
      animationDuration,
      infinite,
      indexFrame,
    } = this.props;

    return (
      <div
        className="Carousel"
        style={
          {
            width: frameSize * itemWidth,
          }
        }
      >
        <button
          type="button"
          className="prev"
          onClick={event => this.handleMoveImages(
            event,
            step,
            itemWidth,
            animationDuration,
            infinite,
            indexFrame,
            'prev',
          )}
        >
          ⇦
        </button>
        <div
          className="container"
        >
          <ul className="Carousel__list">
            {images.map((image, index) => (
              // eslint-disable-next-line react/no-array-index-key
              <li key={uuid()}><img src={image} alt={index + 1} /></li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="next"
          onClick={event => this.handleMoveImages(
            event,
            step,
            itemWidth,
            animationDuration,
            infinite,
            indexFrame,
            'next',
          )}
        >
          ⇨
        </button>
      </div>
    );
  }
}

Carousel.propTypes = CarouselTypes;

Carousel.defaultProps = CarouselDefault;

export default Carousel;
