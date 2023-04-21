/* eslint-disable max-len */
/* eslint-disable no-console */
import React, { useEffect, useState } from 'react';
import '../styles/Carousel.scss';

type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [toolTipValue, setToolTipValue] = useState<number>(1);
  const [itemWidth, setItemWidth] = useState<number>(130);
  const [itemNumber, setItemNumber] = useState<number>(3);
  const [step, setSteps] = useState<number>(3);
  const [animationDuration, setAnimationDuration] = useState<number>(300);
  const [infiniteRotation, setInfiniteRotation] = useState<boolean>(false);
  const [position, setPosition] = useState<number>(0);
  const [containerWidth, setContainerWidth] = useState<number>(itemNumber * itemWidth);

  useEffect(() => {
    const toolTip = document.querySelector('.toolTip');

    if (toolTip) {
      const slider = document.querySelector('#itemWidth') as HTMLInputElement;
      const value = Number(slider.value);
      const toolPosition = ((value - Number(slider.min)) / (Number(slider.max) - Number(slider.min))) * (Number(slider.clientWidth) - Number(toolTip.clientWidth));

      (toolTip as HTMLElement).style.left = `${toolPosition}px`;

      (toolTip as HTMLElement).style.top = `-${toolTip.clientHeight}px`;
    }
  }, [toolTipValue]);

  useEffect(() => {
    setContainerWidth(itemNumber * itemWidth);
    setPosition(0);
  }, [itemNumber, itemWidth]);

  useEffect(() => {
    if (infiniteRotation) {
      setPosition(0);
    }
  }, [infiniteRotation]);

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

      if (infiniteRotation && newPosition > 0) {
        // eslint-disable-next-line @typescript-eslint/no-use-before-define
        return -maxPosition;
      }

      return Math.min(0, newPosition);
    });
  };

  let maxPosition = images.length * itemWidth - itemNumber * itemWidth;

  const handleTransitionRight = () => {
    setPosition((prevPosition) => {
      const newPosition = prevPosition - step * itemWidth;

      if (infiniteRotation) {
        if (newPosition < -maxPosition) {
          maxPosition = 0;

          return maxPosition;
        }

        if (newPosition > 0) {
          return -maxPosition;
        }

        return newPosition;
      }

      return Math.max(-maxPosition, newPosition);
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
          disabled={infiniteRotation ? false : isFirstImageDisplayed}
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
          disabled={infiniteRotation ? false : isLastImageDisplayed}
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

          <div className="input__labels-slider">
            <input
              type="range"
              id="itemWidth"
              min="100"
              max="160"
              value={itemWidth}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const radius = event.target.value;
                const newValue = parseInt(radius, 10);

                setItemWidth(Number(event.target.value));

                setToolTipValue(newValue);
              }}
            />
            <div className="toolTip">
              {itemWidth}
            </div>
          </div>

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
          <div className="input__labels-slider">

            <input
              type="range"
              id="itemNumber"
              min="1"
              max="5"
              value={itemNumber}
              onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                const radius = event.target.value;
                const newValue = parseInt(radius, 10);

                setItemNumber(Number(event.target.value));

                setToolTipValue(newValue);
              }}
            />
            <div className="toolTip">
              {itemNumber}
            </div>
          </div>
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
