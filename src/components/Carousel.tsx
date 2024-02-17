import React, { useState } from 'react';
import './Carousel.scss';

function getImageNameFromUrl(imgUrl: string): string {
  const imageNameWithFormat = imgUrl.substring(imgUrl.lastIndexOf('/') + 1);
  const imageNameWithoutFormat = imageNameWithFormat
    .substring(0, imageNameWithFormat.length - 4);

  return imageNameWithoutFormat;
}

function getRandomId():number {
  return +Math.random().toFixed(12).slice(2);
}

type Props = {
  images: string[],
  itemWidth: number,
  frameSize: number,
  step: number,
  animationDuration: number,
  infinite: boolean,
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

  const handleNext = () => {
    setOrderIndex(prev => {
      let currOrder = prev;

      for (let i = 0; i < step; i += 1) {
        if (infinite && currOrder === maxShiftOrderIndex && i === 0) {
          currOrder = 0;
          break;
        }

        if (currOrder < maxShiftOrderIndex) {
          currOrder += 1;
        }
      }

      return currOrder;
    });
  };

  const handlePrev = () => {
    setOrderIndex(prev => {
      let currOrder = prev;

      for (let i = 0; i < step; i += 1) {
        if (infinite && currOrder === 0 && i === 0) {
          currOrder = maxShiftOrderIndex;
          break;
        }

        if (currOrder > 0) {
          currOrder -= 1;
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
          {images.map(img => (
            <li
              className="Carousel__item"
              key={getRandomId()}
            >
              <img
                src={img}
                width={itemWidth}
                height={itemWidth}
                alt={getImageNameFromUrl(img)}
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
          onClick={handlePrev}
          disabled={isDisabledPrev}
        >
          {' < '}
        </button>
        <button
          type="button"
          data-cy="next"
          className="btn"
          onClick={handleNext}
          disabled={isDisabledNext}
        >
          {' > '}
        </button>
      </div>
    </div>
  );
};

export default Carousel;
