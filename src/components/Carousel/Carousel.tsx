import React, { useState } from 'react';
import './Carousel.scss';

import { CarouselProps } from '../../Carousel';
import { CarouselSettings } from '../CarouselSettings';

import { defaultIndex } from '../../utils';

export const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  onChangeSettings,
}) => {
  const [indexSlide, setIndexSlide] = useState<number>(defaultIndex);
  const maxIndex = images.length - frameSize;

  const WrapperWidth = itemWidth * frameSize;
  const ContentWidth = indexSlide * itemWidth;

  const nextSlide = () => {
    const newIndex = indexSlide + Number(step);

    if (newIndex <= maxIndex) {
      setIndexSlide(newIndex);
    } else {
      setIndexSlide(maxIndex);
    }
  };

  const prevSlide = () => {
    const newIndex = indexSlide - Number(step);

    if (newIndex <= defaultIndex) {
      setIndexSlide(defaultIndex);
    } else {
      setIndexSlide(newIndex);
    }
  };

  return (
    <div className="Carousel__wrapper">
      <div className="Carousel">
        <button
          disabled={indexSlide === defaultIndex}
          className="Carousel__button"
          onClick={prevSlide}
          type="button"
        >
          Prev
        </button>
        <div
          style={{
            width: `${WrapperWidth}px`,
          }}
          className="Carousel__inner"
        >
          <ul
            style={{
              transform: `translateX(-${ContentWidth}px)`,
              transition: `transform ${animationDuration}ms`,
            }}
            className="Carousel__list"
          >
            {images.map((image: string) => (
              <li key={image} className="Carousel__item">
                <img
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                  className="Carousel__picture"
                  src={image}
                  alt="1"
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          className="Carousel__button"
          disabled={indexSlide === maxIndex}
          onClick={nextSlide}
          type="button"
        >
          Next
        </button>
      </div>

      <CarouselSettings
        images={images}
        step={step}
        frameSize={frameSize}
        itemWidth={itemWidth}
        animationDuration={animationDuration}
        onChangeSettings={onChangeSettings}
      />
    </div>
  );
};
