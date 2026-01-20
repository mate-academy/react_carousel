import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselType {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration?: number;
  infinite?: boolean;
}

const Carousel: React.FC<CarouselType> = ({
  images,
  step: initialStep = 3,
  frameSize: initialFrameSize = 3,
  itemWidth: initialItemWidth = 130,
  animationDuration: initialAnimationDuration = 1000,
}: CarouselType) => {
  const [index, setIndex] = useState(0);
  const [step, setStep] = useState(initialStep);
  const [frameSize, setFrameSize] = useState(initialFrameSize);
  const [itemWidth, setItemWidth] = useState(initialItemWidth);
  const [animationDuration, setAnimationDuration] = useState(
    initialAnimationDuration,
  );


  const maxIndex = Math.max(0, images.length - frameSize);

  const nextSlide = () => {
    setIndex(prev => {
      return Math.min(maxIndex, prev + step);
    });
  };

  const prevSlide = () => {
    setIndex(prev => {
      return Math.max(0, prev - step);
    });
  };

  return (
    <div>
      <form action="" className="Carousel__form">
        <label htmlFor="itemId">
          Item width &nbsp;
          <input
            type="number"
            value={itemWidth}
            id="itemId"
            onChange={event => setItemWidth(Number(event.target.value))}
          />
        </label>
        <label htmlFor="frameId">
          Frame size &nbsp;
          <input
            type="number"
            value={frameSize}
            id="frameId"
            onChange={event => setFrameSize(Number(event.target.value))}
          />
        </label>
        <label htmlFor="stepId">
          Step &nbsp;
          <input
            type="number"
            value={step}
            id="stepId"
            onChange={event => setStep(Number(event.target.value))}
          />
        </label>
        <label htmlFor="animationId">
          Animation duration &nbsp;
          <input
            type="number"
            value={animationDuration}
            id="animationId"
            onChange={event => setAnimationDuration(Number(event.target.value))}
          />
        </label>
      </form>

      <div className="Carousel__wrapper">
        <button
          disabled={index === 0}
          type="button"
          onClick={prevSlide}
          className="button"
        >
          <img
            src="/img/right-arrow.png"
            alt=""
            className="button__arrow button__arrow__rotate"
          />
        </button>

        <div
          className="Carousel container__list"
          style={{ width: `${itemWidth * frameSize}px` }}
        >
          <ul
            className="Carousel__list container__list__wrapper"
            style={{
              transform: `translateX(-${index * itemWidth}px)`,
              animationDuration: `${animationDuration}ms`,
            }}
          >
            {images.map((image: string) => (
              <li key={image}>
                <img
                  width={itemWidth}
                  src={image}
                  alt=""
                  className="image carousel__item"
                  style={{
                    minWidth: `${itemWidth}px`,
                    width: `${itemWidth}px`,
                    height: `${itemWidth}px`,
                  }}
                />
              </li>
            ))}
          </ul>
        </div>

        <button
          disabled={index === maxIndex}
          type="button"
          onClick={nextSlide}
          data-cy="next"
          className="button"
        >
          <img src="/img/right-arrow.png" alt="" className="button__arrow" />
        </button>
      </div>
    </div>
  );
};

export default Carousel;
