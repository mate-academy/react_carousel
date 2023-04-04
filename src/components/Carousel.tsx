import React, { useState } from 'react';
import '../styles/Carousel.scss';

type Props = {
  images: string[];
};

const Carousel: React.FC<Props> = ({ images }) => {
  const [value, setValue] = useState('false');

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <button
          type="button"
          className="button button-prev"
        >
          {'<'}
        </button>
        <div className="Carousel__list">
          <ul className="Carousel__items">
            {images.map(image => (
              <li key={image}>
                <img src={image} alt="1" />
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
        <label htmlFor="itemWidth">
          Item width (px):
          <input
            type="number"
            id="itemWidth"
            min="100"
            max="200"
          />
        </label>

        <label htmlFor="frameSize">
          Items in frame:
          <input
            type="number"
            id="frameSize"
            min="1"
            max="5"
          />
        </label>

        <label htmlFor="stepId">
          Step:
          <input
            type="number"
            id="stepId"
            min="1"
            max="5"
          />
        </label>

        <label htmlFor="animationDuration">
          Animation Duration (ms):
          <input
            type="number"
            id="animationDuration"
            min="100"
            max="1000"
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
              checked={value === 'true'}
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
              checked={value === 'false'}
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
