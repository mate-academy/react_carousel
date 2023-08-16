import React, { useState, useRef } from 'react';
import './Carousel.scss';

interface Props {
  img: string[];
}

const Carousel: React.FC<Props> = ({ img }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselListRef = useRef<HTMLUListElement>(null);

  const [imgWidth, setImgWidth] = useState<number>(130);
  const [frameWidth, setFrameWidth] = useState<number>(3);
  const [step, setStep] = useState<number>(3);
  const [animDuration, setAnimDuration] = useState<number>(1000);

  const scrollContainer = (amount: number) => {
    const newIndex = currentIndex + amount;

    if (newIndex >= 0 && newIndex < img.length) {
      setCurrentIndex(newIndex);
    }
  };

  const handleImgWidthChange = (event: React
    .ChangeEvent<HTMLInputElement>) => {
    const newImgWidth = parseInt(event.target.value, 10);

    setImgWidth(newImgWidth);
  };

  const handleFrameWidthChange = (event: React
    .ChangeEvent<HTMLInputElement>) => {
    const newFrameWidth = parseInt(event.target.value, 10);

    setFrameWidth(newFrameWidth);
  };

  const handleStepChange = (event: React
    .ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(event.target.value, 10);

    setStep(newStep);
  };

  const handleAnimDurationChange = (event: React
    .ChangeEvent<HTMLInputElement>) => {
    const newAnimDuration = parseInt(event.target.value, 10);

    setAnimDuration(newAnimDuration);
  };

  const imageWidth = imgWidth;
  const scrollAmount = currentIndex * imageWidth;

  const listStyles = {
    transform: `translateX(-${scrollAmount}px)`,
    transition: `transform ${animDuration}ms ease-in`,
  };

  const containerStyles = {
    width: `${frameWidth * imageWidth}px`,
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container" style={containerStyles}>
        <ul className="Carousel__list" ref={carouselListRef} style={listStyles}>
          {img.map((currImg, index) => (
            <li key={`${index + 1}`} className="Carousel__item">
              <img
                src={currImg}
                alt={`${index}`}
                className="Carousel__img"
                style={{ width: `${imgWidth}px` }}
              />
            </li>
          ))}
        </ul>
      </div>

      <div className="Carousel__control">
        <button
          type="button"
          className="Carousel__btn Carousel__btn_prev"
          onClick={() => scrollContainer(-step)}
        >
          Prev
        </button>

        <button
          type="button"
          className="Carousel__btn Carousel__btn_next"
          data-cy="next"
          onClick={() => scrollContainer(step)}
        >
          Next
        </button>
      </div>

      <div className="Carousel__inputs">
        <label className="Carousel__label">
          Image width
          <input
            type="number"
            value={imgWidth}
            min={50}
            max={350}
            className="Carousel__input"
            placeholder="Enter numbers in px"
            onChange={handleImgWidthChange}
          />
        </label>

        <label className="Carousel__label">
          Images in the carousel
          <input
            type="number"
            value={frameWidth}
            min={1}
            max={5}
            className="Carousel__input"
            placeholder="Enter numbers in px"
            onChange={handleFrameWidthChange}
          />
        </label>

        <label className="Carousel__label">
          Step
          <input
            type="number"
            value={step}
            min={1}
            max={5}
            className="Carousel__input"
            placeholder="Enter numbers"
            onChange={handleStepChange}
          />
        </label>

        <label className="Carousel__label">
          Animation duration: in milliseconds (1000 ms = 1s)
          <input
            type="number"
            value={animDuration}
            step={500}
            min={500}
            max={2500}
            className="Carousel__input"
            placeholder="Enter numbers in milliseconds (1000 ms = 1s)"
            onChange={handleAnimDurationChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Carousel;
