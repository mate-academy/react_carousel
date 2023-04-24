import React, { useEffect, useState } from 'react';
import '../styles/Carousel.scss';
import { Input } from './Input/Input';

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
  const [frameWidth, setFrameWidth] = useState<number>(itemNumber * itemWidth);

  useEffect(() => {
    const toolTips = document.querySelectorAll('.toolTip');

    if (toolTips) {
      const sliders = document.querySelectorAll('.slider');

      sliders.forEach((slider, index) => {
        const value = Number(slider.getAttribute('value'));
        const toolPosition = ((value - Number(slider.getAttribute('min')))
          / (Number(slider.getAttribute('max'))
            - Number(slider.getAttribute('min'))))
          * (Number(slider.clientWidth) - Number(toolTips[index].clientWidth));

        (toolTips[index] as HTMLElement).style.left = `${toolPosition}px`;
      });
    }
  }, [toolTipValue]);

  useEffect(() => {
    if (itemNumber < step) {
      setSteps(itemNumber);
    }
  }, [itemNumber, step]);

  useEffect(() => {
    setFrameWidth(itemNumber * itemWidth);
    setPosition(0);
  }, [itemNumber, itemWidth]);

  useEffect(() => {
    if (infiniteRotation) {
      setPosition(0);
    }
  }, [infiniteRotation]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>,
    setter: React.Dispatch<React.SetStateAction<number>>) => {
    const radius = event.target.value;
    const newValue = parseInt(radius, 10);

    setter(newValue);
    setToolTipValue(newValue);
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfiniteRotation(JSON.parse(event.target.value));
  };

  let maxPosition = images.length * itemWidth - itemNumber * itemWidth;

  const handleTransitionLeft = () => {
    setPosition((prevPosition) => {
      const newPosition = prevPosition + step * itemWidth;

      if (infiniteRotation && newPosition > 0) {
        return -maxPosition;
      }

      return Math.min(0, newPosition);
    });
  };

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
    width: `${frameWidth}px`,
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
            {images.map((image, index) => (
              <li key={image}>
                <img
                  src={image}
                  alt={`Emojy ${index + 1}`}
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

          <div className="inputs__labels-title">
            Item width (px):
          </div>

          <div className="input__labels-min">
            {100}
          </div>

          <div className="input__labels-slider">
            <Input
              type="range"
              id="itemWidth"
              min="100"
              max="160"
              value={itemWidth}
              handleChange={(event) => handleInputChange(event, setItemWidth)}
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
          <div className="inputs__labels-title">
            Items in frame:
          </div>

          <div className="input__labels-min">
            {1}
          </div>

          <div className="input__labels-slider">
            <Input
              type="range"
              id="itemNumber"
              min="1"
              max="5"
              value={itemNumber}
              handleChange={(event) => handleInputChange(event, setItemNumber)}
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
          <div className="inputs__labels-title">
            Step:
            <div className="inputs__labels-warning">
              (step cannot be bigger than items in frame)
            </div>
          </div>

          <div className="input__labels-min">
            {1}
          </div>

          <div className="input__labels-slider">
            <Input
              type="range"
              id="stepId"
              min="1"
              max={itemNumber}
              value={step}
              handleChange={(event) => handleInputChange(event, setSteps)}
            />
            <div className="toolTip">
              {step}
            </div>
          </div>

          <div className="input__labels-max">
            {itemNumber}
          </div>
        </label>

        <label
          htmlFor="animationDuration"
          className="inputs__labels"
        >
          <div className="inputs__labels-title">
            Animation Duration (ms):
          </div>

          <div className="input__labels-min">
            0.1s
          </div>

          <div className="input__labels-slider">
            <Input
              type="range"
              id="animationDuration"
              min="100"
              max="1000"
              value={animationDuration}
              handleChange={(event) => {
                handleInputChange(event, setAnimationDuration);
              }}
            />

            <div className="toolTip">
              {`${(animationDuration / 1000).toFixed(1)}s`}
            </div>
          </div>

          <div className="input__labels-max">
            1s
          </div>
        </label>

        <div className="inputs__container-radio">

          <div className="inputs__labels-title">
            Infinite rotation:
          </div>

          <label htmlFor="infiniteRotation">
            <input
              type="radio"
              id="infiniteRotation"
              name="rotation"
              value="true"
              checked={infiniteRotation}
              onChange={handleRadioChange}
            />
            <span>Yes</span>
          </label>
          <label htmlFor="finiteRotation">
            <input
              type="radio"
              id="finiteRotation"
              name="rotation"
              value="false"
              checked={!infiniteRotation}
              onChange={handleRadioChange}
            />
            <span>No</span>
          </label>
        </div>

      </div>
    </div>
  );
};

export default Carousel;
