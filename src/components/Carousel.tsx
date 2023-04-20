/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import '../styles/Carousel.scss';

type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [itemWidth, setItemWidth] = useState(130);
  const [itemNumber, setItemNumber] = useState(3);
  const [step, setSteps] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(300);
  const [infiniteRotation, setInfiniteRotation] = useState(false);
  const [position, setPosition] = useState(0);
  const [containerWidth, setContainerWidth] = useState(itemNumber * itemWidth);

  useEffect(() => {
    setContainerWidth(itemNumber * itemWidth);
    setPosition(0);
  }, [itemNumber, itemWidth]);

  const handleAnimChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationDuration(Number(event.target.value));
  };

  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSteps(Number(event.target.value));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfiniteRotation(JSON.parse(event.target.value));
  };

  const handleTransitionLeft = () => {
    setPosition((prevPosition) => {
      const newPosition = prevPosition + step * itemWidth;

      return Math.min(0, newPosition);
    });
  };

  const maxPosition = images.length * itemWidth - itemNumber * itemWidth;

  const handleTransitionRight = () => {
    setPosition((prevPosition) => {
      const newPosition = prevPosition - step * itemWidth;

      return Math.abs(newPosition) > maxPosition ? -maxPosition : newPosition;
    });
  };

  // STYLES region
  const imagesContainerStyles = {
    width: `${containerWidth}px`,
    height: `${itemWidth}px`,
    transform: `translateX(${position}px)`,
    transition: `all ${animationDuration}ms`,
  };

  const imageStyles = {
    width: `${itemWidth}px`,
  };
  // end STYLES region

  const isLastImageDisplayed = Math.abs(position) === Number(maxPosition);

  const isFirstImageDisplayed = position === 0;

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          type="button"
          className="button button-prev"
          onClick={handleTransitionLeft}
          disabled={isFirstImageDisplayed}
        >
          {'<'}
        </button>
        <div
          className="Carousel__list"
        >
          <ul
            className="Carousel__items"
            style={imagesContainerStyles}
          >
            {images.map(image => (
              <li key={image}>
                <img
                  src={image}
                  alt="1"
                  style={imageStyles}
                />
              </li>
            ))}
          </ul>
        </div>
        <button
          type="button"
          className="button button-next"
          data-cy="next"
          onClick={handleTransitionRight}
          disabled={isLastImageDisplayed}
        >
          {'>'}
        </button>
      </div>
      <div className="inputs inputs__container">
        <label
          htmlFor="itemWidth"
          className="inputs__labels"
        >
          <div className="input__labels-title">
            Item width (px):
          </div>

          <div className="input__labels-min">
            {100}
          </div>

          <input
            type="range"
            id="itemWidth"
            min="100"
            max="160"
            value={itemWidth}
            onChange={(event) => setItemWidth(Number(event.target.value))}
          />

          <div className="input__labels-max">
            {160}
          </div>
        </label>

        <label
          htmlFor="itemNumber"
          className="inputs__labels"
        >
          <div className="input__labels-title">
            Items in frame:
          </div>

          <div className="input__labels-min">
            {1}
          </div>

          <input
            type="range"
            id="itemNumber"
            min="1"
            max="5"
            value={itemNumber}
            onChange={(event) => setItemNumber(Number(event.target.value))}
          />

          <div className="input__labels-max">
            {5}
          </div>
        </label>

        <label
          htmlFor="stepId"
          className="inputs__labels"
        >
          <div className="input__labels-title">
            Step:
          </div>

          <div className="input__labels-min">
            {1}
          </div>

          <input
            type="range"
            id="stepId"
            min="1"
            max={itemNumber}
            value={step}
            onChange={handleStepChange}
          />

          <div className="input__labels-max">
            {itemNumber}
          </div>
        </label>

        <label
          htmlFor="animationDuration"
          className="inputs__labels"
        >
          <div className="input__labels-title">
            Animation Duration (ms):
          </div>

          <div className="input__labels-min">
            0.1s
          </div>

          <input
            type="range"
            id="animationDuration"
            min="100"
            max="1000"
            value={animationDuration}
            onChange={handleAnimChange}
          />

          <div className="input__labels-max">
            1s
          </div>
        </label>

        <div className="inputs__container-radio">

          <div className="input__labels-title">
            Infinite rotation:
          </div>

          <label htmlFor="infiniteRotationTrue">
            <input
              type="radio"
              name="infiniteRotation"
              id="infiniteRotationTrue"
              value="true"
              checked={infiniteRotation === true}
              onChange={handleRadioChange}
            />
            Yes
          </label>

          <label htmlFor="infiniteRotationFalse">
            <input
              type="radio"
              name="infiniteRotation"
              id="infiniteRotationFalse"
              value="false"
              checked={infiniteRotation === false}
              onChange={handleRadioChange}
            />
            No
          </label>
        </div>

      </div>
    </div>
  );
};

export default Carousel;
