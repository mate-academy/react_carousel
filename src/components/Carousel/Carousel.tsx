import React, { useState } from 'react';
import './Carousel.scss';

import { CarouselProps } from '../../Carousel';
import { CarouselSettings } from '../CarouselSettings';

const defaultValue = 0;
const defaultIndex = 1;

export const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  onChangeSettings,
}) => {
  const carouselWidthInner = itemWidth * frameSize;
  const [carouselWidthList, setCarouselWidthList] =
    useState<number>(defaultValue);
  const [indexSlide, setIndexSlide] = useState<number>(defaultIndex);

  const nextSlide = () => {
    setCarouselWidthList(value => value + itemWidth * step);
    setIndexSlide(currentIndex => currentIndex + Number(step) * frameSize);
  };

  const prevSlide = () => {
    setCarouselWidthList(value => value - itemWidth * step);
    setIndexSlide(currentIndex => currentIndex - Number(step) * frameSize);
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
          disabled={!images[indexSlide - 1]}
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
