import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  itemWidth: number;
  frameSize: number;
  step: number;
  animationDuration: number;
  infinite: boolean;
};

const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  frameSize,
  step,
  animationDuration,
  infinite,
}) => {
  const [orderIndex, setOrderIndex] = useState(0);
  const position = orderIndex * itemWidth;

  const totalWidth = itemWidth * images.length;
  const visibleWidth = itemWidth * frameSize;

  const maxShiftOrderIndex = images.length - frameSize;
  const carouselWidth = visibleWidth;

  const handleScroll = (direction: 'next' | 'prev') => {
    setOrderIndex(prev => {
      let currOrder = prev;

      if (direction === 'next') {
        for (let i = 0; i < step; i += 1) {
          if (infinite && currOrder === maxShiftOrderIndex && i === 0) {
            currOrder = 0;
            break;
          }

          if (currOrder < maxShiftOrderIndex) {
            currOrder += 1;
          }
        }
      } else {
        for (let i = 0; i < step; i += 1) {
          if (infinite && currOrder === 0 && i === 0) {
            currOrder = maxShiftOrderIndex;
            break;
          }

          if (currOrder > 0) {
            currOrder -= 1;
          }
        }
      }

      return currOrder;
    });
  };

  if (visibleWidth + position > totalWidth) {
    setOrderIndex(prev => prev - 1);
  }

  const isDisabledNext = orderIndex >= maxShiftOrderIndex && !infinite;
  const isDisabledPrev = orderIndex <= 0 && !infinite;

  return (
    <div
      className="Carousel"
      style={{
        width: carouselWidth,
        transition: `width ${animationDuration}ms`,
      }}
    >
      <div className="container">
        <ul
          className="Carousel__list"
          style={{
            width: totalWidth,
            transform: `translate(${-position}px)`,
            transition: `transform ${animationDuration}ms`,
          }}
        >
          {images.map((img, index) => (
            <li
              className={`Carousel__item${
                index < orderIndex || index >= orderIndex + frameSize
                  ? '-hidden'
                  : ''
              }`}
              key={index}
            >
              <img
                src={img}
                width={itemWidth}
                height={itemWidth}
                alt={`Image ${index + 1}`}
                className="Carousel__image"
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__buttons">
        <button
          type="button"
          className="btn"
          onClick={() => handleScroll('prev')}
          disabled={isDisabledPrev}
        >
          {' < '}
        </button>
        <button
          type="button"
          data-cy="next"
          className="btn"
          onClick={() => handleScroll('next')}
          disabled={isDisabledNext}
        >
          {' > '}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
