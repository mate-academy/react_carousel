import React from 'react';
import './Carousel.scss';
import { CarouselItem } from '../CarouselItem/CarouselItem';
import { SliderWidth } from '../../types/SliderWidth';
import { Transform } from '../../types/Transform';
import { Transition } from '../../types/Transition';

type TranslateCallback = () => void;

type Props = {
  images: string[];
  itemWidth: number,
  sliderWidth: SliderWidth,
  transform: Transform,
  transition: Transition,
  onSlideForward: TranslateCallback,
  onSlideBackward: TranslateCallback,
  isDecDisabled: boolean,
  isIncDisabled: boolean,
  isAnimationDisabled: boolean,
};

export const Carousel: React.FC<Props> = ({
  images,
  itemWidth,
  sliderWidth,
  transform,
  transition,
  onSlideForward,
  onSlideBackward,
  isDecDisabled,
  isIncDisabled,
  isAnimationDisabled,
}) => {
  return (
    <div className="Carousel">
      <button
        className="Carousel__arrowbutton"
        type="button"
        disabled={isDecDisabled}
        onClick={onSlideBackward}
      >
        &#10096;
      </button>

      <div
        className="Carousel__wrapper"
        style={sliderWidth}
      >
        <ul
          className="Carousel__list"
          style={!isAnimationDisabled
            ? { ...transform, ...transition }
            : transform}
        >
          {images.map((imageSrc, index) => (
            <CarouselItem
              imageSrc={imageSrc}
              index={index}
              width={itemWidth}
              key={Math.random()}
            />
          ))}
        </ul>
      </div>

      <button
        className="Carousel__arrowbutton"
        type="button"
        onClick={onSlideForward}
        disabled={isIncDisabled}
        data-cy="next"
      >
        &#10097;
      </button>
    </div>
  );
};
