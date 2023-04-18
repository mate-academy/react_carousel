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
    setPosition(prevPosition => prevPosition + (step * itemWidth));
  };

  const maxPosition = images.length * itemWidth - itemNumber * itemWidth;

  const handleTransitionRight = () => {
    setPosition(prevPosition => prevPosition - (step * itemWidth));
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

  const isLastImageDisplayed = Math.abs(position) >= Number(maxPosition)
    + itemWidth;

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
        // }
        >
          {'>'}
        </button>
      </div>
      <div className="inputs inputs__container">
        <label
          htmlFor="itemWidth"
          className="inputs__labels"
        >
          Item width (px):
          <input
            type="range"
            id="itemWidth"
            step="10"
            min="100"
            max="160"
            value={itemWidth}
            onChange={(event) => setItemWidth(Number(event.target.value))}
          />
        </label>

        <label
          htmlFor="frameSize"
          className="inputs__labels"
        >
          Items in frame:
          <input
            type="range"
            id="frameSize"
            min="1"
            max="5"
            value={itemNumber}
            onChange={(event) => setItemNumber(Number(event.target.value))}
          />
        </label>

        <label
          htmlFor="stepId"
          className="inputs__labels"
        >
          Step:
          <input
            type="range"
            id="stepId"
            min="1"
            max="5"
            value={step}
            onChange={handleStepChange}
          />
        </label>

        <label
          htmlFor="animationDuration"
          className="inputs__labels"
        >
          Animation Duration (ms):
          <input
            type="range"
            id="animationDuration"
            min="100"
            max="1000"
            value={animationDuration}
            onChange={handleAnimChange}
          />
        </label>
        <div className="inputs__container-radio">
          Infinite rotation:
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
