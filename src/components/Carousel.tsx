import React, { useState } from 'react';
import './Carousel.scss';

interface CarouselProps {
  images: string[];
  step: number;
  frameSize: number;
  itemWidth: number;
  animationDuration: number;
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  step,
  frameSize,
  itemWidth,
  animationDuration,
}) => {
  const [position, setPosition] = useState(0);
  const [chooseStep, setChooseStep] = useState(step);
  const [chooseItemWidth, setChooseItemWidth] = useState(itemWidth);
  const [widthFrame, setWidthFrame] = useState(chooseItemWidth * frameSize);
  const widthList = chooseItemWidth * images.length - widthFrame;

  const handleInputStep = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    setChooseStep(value);
  };

  const handleInputWidth = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10);

    setChooseItemWidth(value);
    setWidthFrame(value * frameSize);
  };

  const handleInputFrameSize = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(event.target.value, 10) * chooseItemWidth;

    setWidthFrame(value);
  };

  const moveRight = () => {
    if (position !== -widthList
        && widthList - Math.abs(position) >= widthFrame) {
      setPosition(
        currentPosition => currentPosition - chooseItemWidth * chooseStep,
      );
    } else {
      setPosition(-widthList);
    }
  };

  const moveLeft = () => {
    if (position !== 0 && Math.abs(position) >= widthFrame) {
      setPosition(
        currentPosition => currentPosition + chooseItemWidth * chooseStep,
      );
    } else {
      setPosition(0);
    }
  };

  const items = images.map(img => (
    <li
      className="Carousel__list-img"
      key={img}
      style={{ listStyle: 'none' }}
    >
      <img
        src={img}
        alt={img}
        style={{ width: `${chooseItemWidth}px` }}
      />
    </li>
  ));

  return (
    <div
      className="Carousel"
      style={{
        transition: `all ${animationDuration}ms ease`,
      }}
    >
      <h1 className="Carousel__title" data-cy="title">
        {/* eslint-disable-next-line */}
        Carousel with {images.length} images
      </h1>

      <div className="Carousel__inputs inputs">
        <div>
          Step:&nbsp;
          <input
            className="input input-number"
            type="number"
            name="step"
            min={1}
            max={10}
            defaultValue={step}
            onChange={handleInputStep}
          />
        </div>

        <div>
          Frame size:&nbsp;
          <input
            className="input input-frameSize"
            type="number"
            name="frameSize"
            min={1}
            max={10}
            defaultValue={frameSize}
            onChange={handleInputFrameSize}
          />
        </div>

        <div>
          Item width:&nbsp;
          <input
            className="input input-itemWidth"
            type="number"
            name="itemWidth"
            step={10}
            min={50}
            defaultValue={chooseItemWidth}
            onChange={handleInputWidth}
          />
        </div>

        <div>
          Animation duration:&nbsp;
          <input
            className="input input-animationDuration"
            type="number"
            name="animationDuration"
            step={100}
            defaultValue={animationDuration}
          />
        </div>
      </div>

      <div
        className="Carousel__list-wrapper"
        style={{
          width: `${widthFrame}px`,
          height: `${chooseItemWidth}px`,
          transition: `all ${animationDuration}ms ease`,
        }}
      >
        <ul
          className="Carousel__list"
          style={{
            left: `${position}px`,
            transition: `left ${animationDuration}ms ease`,
          }}
        >
          {items}
        </ul>
      </div>

      <div className="Carousel__button-wrapper">
        <button
          onClick={moveLeft}
          className="Carousel__button"
          data-cy="prev"
          type="button"
        >
          Prev
        </button>

        <button
          onClick={moveRight}
          className="Carousel__button"
          data-cy="next"
          type="button"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default Carousel;
