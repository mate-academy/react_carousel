import React, { useState } from 'react';
import './Carousel.scss';

import { CarouselProps } from '../../Carousel';
import { CarouselSettings } from '../CarouselSettings';

const defaultValue = 0;

export const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  onChangeSettings,
}) => {
  const carouselWidthInner = itemWidth * frameSize;
  const [carouselWidthList, setCarouselWidthList] = useState(defaultValue);

  const nextSlide = () => {
    setCarouselWidthList(value => value + itemWidth * step);
  };

  const prevSlide = () => {
    setCarouselWidthList(value => value - itemWidth * step);
  };

  return (
    <div className="Carousel__wrapper">
      <div className="Carousel">
        <button
          disabled={carouselWidthList === defaultValue}
          className="Carousel__button"
          onClick={prevSlide}
          type="button"
        >
          Prev
        </button>
        <div
          style={{
            width: `${carouselWidthInner}px`,
          }}
          className="Carousel__inner"
        >
          <ul
            style={{
              transform: `translateX(-${carouselWidthList}px)`,
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
          disabled={
            carouselWidthList + itemWidth * step === images.length * itemWidth
          }
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
