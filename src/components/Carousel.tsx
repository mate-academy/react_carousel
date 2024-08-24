import React, { useState } from 'react';
import './Carousel.scss';

type Props = {
  images: string[];
  step?: number;
  frameSize?: number;
  itemWidth?: number;
  animationDuration?: number;
  infinite?: boolean;
};

export const DEFAULT_PROPS = Object.freeze({
  STEP: 3,
  FRAME_SIZE: 3,
  ITEM_WIDTH: 130,
  ANIMATION_DURATION: 1000,
  INFINITE: false,
});

export const Carousel: React.FC<Props> = ({
  images,
  step = DEFAULT_PROPS.STEP,
  frameSize = DEFAULT_PROPS.FRAME_SIZE,
  itemWidth = DEFAULT_PROPS.ITEM_WIDTH,
  animationDuration = DEFAULT_PROPS.ANIMATION_DURATION,
  infinite = DEFAULT_PROPS.INFINITE,
}) => {
  const [firstToDisplayIndex, setFirstToDisplayIndex] = useState(0);

  const isPrevPossible = infinite || firstToDisplayIndex > 0;

  const isNextPossible =
    infinite || firstToDisplayIndex < images.length - frameSize;

  const containerWidth = itemWidth * frameSize;
  const offset = itemWidth * firstToDisplayIndex;

  const containerStyle = { width: `${containerWidth}px` };
  const listStyle = {
    left: `-${offset}px`,
    transitionDuration: `${animationDuration}ms`,
  };

  const imageHiddenStyle = {
    visibility: 'hidden',
    transitionDelay: `${animationDuration}ms`,
  };

  const goToNextIndex = () => {
    setFirstToDisplayIndex(oldIndex => {
      let newIndex = oldIndex + step;

      if (newIndex >= images.length - (frameSize - step)) {
        newIndex = 0;
      } else if (newIndex > images.length - frameSize) {
        newIndex = images.length - frameSize;
      }

      return newIndex;
    });
  };

  const goToPrevIndex = () => {
    setFirstToDisplayIndex(oldIndex => {
      let newIndex = oldIndex - step;

      if (newIndex <= -frameSize + (frameSize - step)) {
        newIndex = images.length - frameSize;
      } else if (newIndex < 0) {
        newIndex = 0;
      }

      return newIndex;
    });
  };

  return (
    <div className="Carousel" style={containerStyle}>
      <ul className="Carousel__list" style={listStyle}>
        {images.map((image, id) => {
          const isVisible =
            id >= firstToDisplayIndex && id < firstToDisplayIndex + frameSize;

          return (
            <li className="Carousel__item" key={image}>
              <img
                className="Carousel__img"
                width={itemWidth}
                style={
                  isVisible ? {} : (imageHiddenStyle as React.CSSProperties)
                }
                src={image}
                alt={`${id + 1}`}
              />
            </li>
          );
        })}
      </ul>

      <button
        className="Carousel__button"
        onClick={goToPrevIndex}
        type="button"
        disabled={!isPrevPossible}
      >
        Prev
      </button>
      <button
        className="Carousel__button"
        data-cy="next"
        onClick={goToNextIndex}
        type="button"
        disabled={!isNextPossible}
      >
        Next
      </button>
    </div>
  );
};
