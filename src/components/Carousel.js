import React, { useState } from 'react';
import PropTypes from 'prop-types';
import Image from './Image';
import CarouselController from './CarouselController';

import './Carousel.scss';

const Carousel = ({ images }) => {
  const [frameWidth, setFrameWidth] = useState(3);
  const [step, setStep] = useState(1);
  const [speed, setSpeed] = useState(1000);
  const [left, setLeft] = useState(0);
  const [imgWidth, setImgWidth] = useState(130);

  const max = -((imgWidth * images.length) - frameWidth * imgWidth);

  const next = () => {
    if (left - step * imgWidth < max) {
      setLeft(max);
    } else {
      setLeft(left - step * imgWidth);
    }
  };

  const previous = () => {
    if (left + step * imgWidth > 0) {
      setLeft(0);
    } else {
      setLeft(left + step * imgWidth);
    }
  };

  const changeFrameWidth = (event) => {
    const imputValue = event.target.value;

    setFrameWidth(imputValue);

    const frameTotalWidth = imputValue * imgWidth;
    const visibleLength = (images.length * imgWidth) + left;

    if (frameTotalWidth > visibleLength) {
      setLeft(left + frameTotalWidth - visibleLength);
    }
  };

  const changeStep = (event) => {
    setStep(event.target.value);
  };

  const changeImgWidth = (event) => {
    setImgWidth(event.target.value);
    setFrameWidth(frameWidth);
  };

  const changeSpeed = (event) => {
    setSpeed(event.target.value);
  };

  return (
    <div className="Carousel">
      <div
        className="Carousel__list-wrapper"
        style={{ width: `${frameWidth * imgWidth}px` }}
      >
        <ul
          className="Carousel__list"
          style={{
            transform: `translateX(${left}px)`,
            transitionDuration: `${speed}ms`,
          }}
        >
          {
            images.map((image, index) => (
              <Image
                key={image}
                imgSrc={image}
                index={index}
                width={imgWidth}
              />
            ))
          }
        </ul>
      </div>

      <div
        className="Carousel__buttons"
        style={{ width: `${frameWidth * imgWidth}px` }}
      >
        <button
          type="button"
          disabled={left >= 0}
          className="Carousel__button"
          onClick={() => previous()}
        >
          <i className="fas fa-chevron-circle-left" />
        </button>

        <button
          type="button"
          disabled={left <= max}
          className="Carousel__button"
          onClick={() => next()}
        >
          <i className="fas fa-chevron-circle-right" />
        </button>
      </div>

      <CarouselController
        frameWidth={frameWidth}
        step={step}
        speed={speed}
        imgWidth={imgWidth}
        changeFrameWidth={changeFrameWidth}
        changeStep={changeStep}
        changeImgWidth={changeImgWidth}
        changeDuration={changeSpeed}
      />

    </div>
  );
};

Carousel.propTypes = {
  images: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

export default Carousel;
