import React, { useState } from 'react';
import cn from 'classnames';

import './Carousel.scss';
import { State } from '../types/State';

type Props = {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
  infinite: boolean;
  setNewState: (newState: Partial<State>) => void;
};

const Carousel: React.FC<Props> = props => {
  const {
    images,
    step,
    frameSize,
    itemWidth,
    animationDuration,
    infinite,
    setNewState,
  } = props;

  const [currentIndex, setCurrentIndex] = useState<number>(0);

  const stepWidth = itemWidth * step;
  const visibleFrame = frameSize * itemWidth;
  const totalWidth = images.length * itemWidth;
  const isDisabledPrev = currentIndex === 0;
  const isDisabledNext = currentIndex === -(totalWidth - stepWidth);

  const handleNextClick = () => {
    setCurrentIndex(prevCurrentIndex => {
      let newCurrentIndex = prevCurrentIndex - stepWidth;

      if (infinite && currentIndex - visibleFrame === -totalWidth) {
        setCurrentIndex(0);
      }

      if (newCurrentIndex + totalWidth <= visibleFrame) {
        const firstPart = newCurrentIndex + totalWidth;
        const secondPart = itemWidth * (frameSize - step);

        newCurrentIndex = prevCurrentIndex - firstPart + secondPart;
      }

      return newCurrentIndex;
    });
  };

  const handlePrevClick = () => {
    setCurrentIndex(prevCurrentIndex => {
      let newCurrentIndex = prevCurrentIndex + stepWidth;

      if (infinite && currentIndex === 0) {
        setCurrentIndex(-totalWidth + visibleFrame);
      }

      if (-newCurrentIndex <= 0) {
        newCurrentIndex = prevCurrentIndex + -prevCurrentIndex;
      }

      return newCurrentIndex;
    });
  };

  return (
    <div className="Carousel">
      <div className="Carousel__properties">
        <label className="Carousel__property" htmlFor="stepId">
          <p className="Carousel__title">Step:</p>
          <input
            id="stepId"
            className="Carousel__input"
            name="step"
            type="number"
            defaultValue={step}
            min="1"
            max={images.length}
            onChange={event => {
              setNewState({ step: +event.currentTarget.value });
            }}
          />
        </label>
        <label className="Carousel__property" htmlFor="frameId">
          <p className="Carousel__title">Frame Size:</p>
          <input
            id="frameId"
            className="Carousel__input"
            name="frameSize"
            type="number"
            defaultValue={frameSize}
            min="1"
            max={images.length}
            onChange={event => {
              setNewState({ frameSize: +event.currentTarget.value });
            }}
          />
        </label>
        <label className="Carousel__property" htmlFor="itemId">
          <p className="Carousel__title">Item Width:</p>
          <input
            id="itemId"
            className="Carousel__input"
            type="number"
            name="itemWidth"
            defaultValue={itemWidth}
            min="130"
            max="260"
            step="10"
            onChange={event => {
              setNewState({ itemWidth: +event.currentTarget.value });
            }}
          />
        </label>
        <label className="Carousel__property">
          <p className="Carousel__title">Animation Duration:</p>
          <input
            className="Carousel__input"
            name="animationDuration"
            type="number"
            defaultValue={animationDuration}
            step="50"
            onChange={event => {
              setNewState({ animationDuration: +event.currentTarget.value });
            }}
          />
        </label>
        <label className="Carousel__property">
          <p className="Carousel__title">Infinite:</p>
          <input
            className="Carousel__input"
            type="Checkbox"
            name="Infinite"
            defaultValue={`${infinite}`}
            onChange={event => {
              setNewState({ infinite: event.currentTarget.checked });
            }}
          />
        </label>
      </div>
      <div className="Carousel__wrapper">
        <button
          type="button"
          className={cn('Carousel__button Carousel__button--1', {
            'Carousel__button--disabled': infinite ? '' : isDisabledPrev,
          })}
          onClick={handlePrevClick}
        >
          &lt;&lt;&lt;
        </button>

        <div
          className="Carousel__images"
          style={{
            height: `${itemWidth}px`,
            width: `${visibleFrame}px`,
          }}
        >
          <ul
            className="Carousel__list"
            style={{
              width: `${totalWidth}px`,
              transform: `translateX(${currentIndex}px)`,
              transitionDuration: `${animationDuration}ms`,
            }}
          >
            {images.map((image, index) => (
              <li className="Carousel__item" key={image}>
                <img
                  src={image}
                  className="Carousel__image"
                  alt={`${index + 1}`}
                  width={itemWidth}
                  style={{
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          data-cy="next"
          className={cn('Carousel__button Carousel__button--2', {
            'Carousel__button--disabled': infinite ? '' : isDisabledNext,
          })}
          onClick={handleNextClick}
        >
          &gt;&gt;&gt;
        </button>
      </div>
    </div>
  );
};

export default Carousel;
