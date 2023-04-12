import React, { useState } from 'react';
import '../styles/Carousel.scss';

type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [itemWidth, setItemWidth] = useState(130);
  const [frameSize, setFrameSize] = useState(3);
  const [step, setSteps] = useState(3);
  const [animationDuration, setAnimationDuration] = useState(300);
  const [infiniteRotation, setInfiniteRotation] = useState('false');

  const handleAnimChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAnimationDuration(Number(event.target.value));
  };

  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSteps(Number(event.target.value));
  };

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInfiniteRotation(event.target.value);
  };

  const containerWidth = frameSize * itemWidth;

  // STYLES region
  const imagesContainerStyles = {
    width: `${containerWidth}px`,
    height: `${itemWidth}px`,
    transition: `all ${animationDuration}ms`,
  };

  const imageStyles = {
    height: `${itemWidth}px`,
    width: `${itemWidth}px`,
  };
  // end STYLES region

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          type="button"
          className="button button-prev"
          disabled
        >
          {'<'}
        </button>
        <div
          className="Carousel__list"
          style={imagesContainerStyles}
        >
          <ul className="Carousel__items">
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
            value={frameSize}
            onChange={(event) => setFrameSize(Number(event.target.value))}
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
              checked={infiniteRotation === 'true'}
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
              checked={infiniteRotation === 'false'}
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
