/* eslint-disable react/no-array-index-key */
/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from 'react';
import './Carousel.scss';
import CarouselProps from '../types';

const Carousel: React.FC<CarouselProps> = ({
  images,
  itemWidth = 130,
  frameSize = 3,
  step = 3,
  animationDuration = 1000,
  infinite = false,
}) => {
  const [startIndex, setStartIndex] = useState(0);

  useEffect(() => {
    const container = document.querySelector('.Carousel') as HTMLElement;
    const containerList
      = document.querySelector('.Carousel__list') as HTMLElement;

    if (container) {
      container.style.width = `${(itemWidth + 50) * frameSize}px`;
      containerList.style.transition = `transform ${animationDuration}ms ease-in-out`;
      containerList.style.transform = `translateX(${-startIndex * (itemWidth + 50)}px)`;
    }
  }, [startIndex, animationDuration, itemWidth, frameSize]);

  const moveImage = (value: number) => () => {
    let newIndex = startIndex + value;

    if (infinite) {
      newIndex = (newIndex + images.length) % images.length;
    }

    if (newIndex <= 0) {
      newIndex = 0;
    }

    if (newIndex >= images.length - frameSize) {
      newIndex = images.length - frameSize;
    }

    setStartIndex(newIndex);
  };

  return (
    <div className="Carousel">
      <ul className="Carousel__list" data-cy="carousel-list">
        {images.map((image: string, index: number) => (
          <li key={index}>
            <img src={image} width={itemWidth} />
          </li>
        ))}
      </ul>

      <button
        type="button"
        onClick={moveImage(-step)}
        disabled={startIndex === 0}
        data-cy="prev-button"
      >
        Prev
      </button>
      <button
        type="button"
        onClick={moveImage(step)}
        disabled={startIndex + frameSize > images.length}
        data-cy="next"
      >
        Next
      </button>
    </div>
  );
};

export default Carousel;
