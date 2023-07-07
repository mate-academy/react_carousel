import React, { useEffect, useRef } from 'react';

import './Carousel.scss';
import { InputField } from '../data/Data';

type Props = {
  images: string[],
  step: number,
  frameSize: number,
  itemWidth: number,
  animationDuration: number,
  onChangeCarousel: (value: number, name: InputField) => void,
};

let steps = 0;
let isLast = false;

const Carousel: React.FC<Props> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
  onChangeCarousel,
}) => {
  const carouselRef = useRef<HTMLDivElement>(null);
  const carouselWrapperRef = useRef<HTMLDivElement>(null);
  const carouselListRef = useRef<HTMLUListElement>(null);
  const carouselItemsRef = useRef<HTMLLIElement[]>([]);
  const prevButtonRef = useRef<HTMLButtonElement>(null);
  const nextButtonRef = useRef<HTMLButtonElement>(null);
  const itemWidthInputRef = useRef<HTMLInputElement>(null);
  const frameSizeInputRef = useRef<HTMLInputElement>(null);
  const animationDurationInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const carousel = carouselRef.current as HTMLElement;
    const carouselWrapper = carouselWrapperRef.current as HTMLElement;
    const carouselList = carouselListRef.current as HTMLElement;
    const carouselItems = carouselItemsRef.current;
    const prevButton = prevButtonRef.current as HTMLElement;
    const nextButton = nextButtonRef.current as HTMLElement;
    const itemWidthInput = itemWidthInputRef.current as HTMLElement;
    const frameSizeInput = frameSizeInputRef.current as HTMLElement;
    const animationDurationInput = animationDurationInputRef
      .current as HTMLElement;

    const computedStyle = getComputedStyle(carouselList);
    let translateValue = +computedStyle
      .getPropertyValue('transform')
      .split(', ')[4];
    const totalWidth = itemWidth * images.length;

    prevButton.onclick = () => {
      const prevSlide = translateValue + (step * itemWidth);
      const firstSlide = 0;

      isLast = false;

      if (prevSlide > firstSlide) {
        translateValue = firstSlide;
      } else {
        translateValue = prevSlide;
        steps -= 1;
      }

      carouselList.style.transform = `translateX(${translateValue}px)`;
    };

    nextButton.onclick = () => {
      const nextSlide = translateValue - (step * itemWidth);
      const lastSlide = -(totalWidth - itemWidth * frameSize);

      if (nextSlide < lastSlide) {
        translateValue = lastSlide;
        isLast = true;
      } else {
        translateValue = nextSlide;
        steps += 1;
      }

      carouselList.style.transform = `translateX(${translateValue}px)`;
    };

    itemWidthInput.onchange = () => {
      const lastSLide = -(totalWidth - itemWidth * frameSize);
      const currentSlide = -(steps * step * itemWidth);

      for (let i = 0; i < carouselItems.length; i += 1) {
        const element = carouselItems[i] as HTMLElement;

        element.style.width = `${itemWidth}px`;
        element.style.height = `${itemWidth}px`;
      }

      carouselWrapper.style.width = `${itemWidth * frameSize}px`;
      translateValue = isLast
        ? lastSLide
        : currentSlide;

      carouselList.style.transform = `translateX(${translateValue}px)`;
    };

    frameSizeInput.onchange = () => {
      carouselWrapper.style.width = `${itemWidth * frameSize}px`;
    };

    animationDurationInput.onchange = () => {
      carousel.style.transitionDuration = `${animationDuration}ms`;
    };
  }, [step, itemWidth, frameSize, animationDuration]);

  return (
    <div
      className="Carousel"
      ref={carouselRef}
    >
      <div
        className="Carousel__wrapper"
        ref={carouselWrapperRef}
      >
        <ul
          className="Carousel__list"
          ref={carouselListRef}
        >
          {images.map((image, id) => (
            <li
              key={image}
              className="Carousel__item"
              ref={(el) => {
                if (el) {
                  carouselItemsRef.current[id] = el;
                }
              }}
            >
              <img
                className="Carousel__image"
                src={image}
                alt={`${id}`}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__inputs inputs">
        <div className="Carousel__input-container input-container">
          <label htmlFor="stepId" className="Carousel__label">
            Step
          </label>

          <input
            onChange={(event) => {
              const value = +event.target.value;

              if (value >= 1 && value <= 10) {
                onChangeCarousel(value, InputField.STEP);
              }
            }}
            id="stepId"
            name={InputField.STEP}
            className="Carousel__input"
            type="range"
            min="1"
            max="10"
            value={step}
          />
        </div>
        <div className="Carousel__input-container input-container">
          <label htmlFor="frameId" className="Carousel__label">
            Frame Size
          </label>

          <input
            onChange={(event) => {
              const value = +event.target.value;

              if (value >= 1 && value <= 10) {
                onChangeCarousel(value, InputField.FRAME_SIZE);
              }
            }}
            id="frameId"
            name={InputField.FRAME_SIZE}
            className="Carousel__input"
            type="range"
            min="1"
            max="10"
            value={frameSize}
            ref={frameSizeInputRef}
          />
        </div>
        <div className="Carousel__input-container input-container">
          <label htmlFor="itemId" className="Carousel__label">
            Item Width
          </label>

          <input
            onChange={(event) => {
              const value = +event.target.value;

              if (value >= 50 && value <= 500) {
                onChangeCarousel(value, InputField.ITEM_WIDTH);
              }
            }}
            id="itemId"
            name={InputField.ITEM_WIDTH}
            className="Carousel__input"
            type="range"
            min="50"
            max="500"
            value={itemWidth}
            ref={itemWidthInputRef}
          />
        </div>
        <div className="Carousel__input-container input-container">
          <label htmlFor="animationId" className="Carousel__label">
            Animation Duration
          </label>

          <input
            onChange={(event) => {
              const value = +event.target.value;

              if (value >= 0 && value <= 5000) {
                onChangeCarousel(value, InputField.ANIMATION_DURATION);
              }
            }}
            id="animationId"
            name={InputField.ANIMATION_DURATION}
            className="Carousel__input"
            type="range"
            min="0"
            max="5000"
            value={animationDuration}
            ref={animationDurationInputRef}
          />
        </div>
      </div>

      <div className="Carousel__buttons buttons">
        <button
          className="Carousel__button Carousel__button--prev"
          type="button"
          ref={prevButtonRef}
        >
          Prev
        </button>

        <button
          className="Carousel__button"
          type="button"
          data-cy="next"
          ref={nextButtonRef}
        >
          Next
        </button>
      </div>

      <ul className="Carousel__rules rules">
        <h2 className="rules__title">
          RULES
        </h2>
        <li className="rules__item">
          Step from 1 to 10;
        </li>

        <li className="rules__item">
          Frame Size from 1 to 10;
        </li>

        <li className="rules__item">
          Item Width from 50 to 500px;
        </li>

        <li className="rules__item">
          Animation Duration from 0 to 5000ms;
        </li>
      </ul>
    </div>
  );
};

export default Carousel;
