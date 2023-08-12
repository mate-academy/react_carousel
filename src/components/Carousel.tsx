import React, { useState, useRef } from 'react';
import './Carousel.scss';

interface Props {
  img: string[];
}

const Carousel: React.FC<Props> = ({ img }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselListRef = useRef<HTMLUListElement>(null);

  const [frameWight, setFrameWight] = useState<number>(3);
  const [step, setStep] = useState<number>(3);
  const [animDuration, setAnimDuration] = useState<number>(1000);

  const scrollContainer = (amount: number) => {
    const carouselList = carouselListRef.current;
    const imageWidth = carouselList?.querySelector('li')?.offsetWidth || 0;
    const newIndex = currentIndex + amount;

    if (newIndex >= 0 && newIndex < img.length) {
      setCurrentIndex(newIndex);
      const newScrollAmount = newIndex * imageWidth;

      if (carouselList) {
        carouselList.style.transform = `translateX(-${newScrollAmount}px)`;
      }
    }
  };

  const handleFarmeWidthChange = (event: React
    .ChangeEvent<HTMLInputElement>) => {
    const newFrameWidth = parseInt(event.target.value, 10);

    setFrameWight(newFrameWidth);
    scrollContainer(0);

    const containerElement = document.querySelector('.Carousel__container');
    const containerElementCopy = containerElement as HTMLElement;
    const newContainerWidth = newFrameWidth * 130;

    containerElementCopy.style.width = `${newContainerWidth}px`;
  };

  const handleStepChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newStep = parseInt(event.target.value, 10);

    setStep(newStep);
  };

  const handleAnimDurationChange = (event: React
    .ChangeEvent<HTMLInputElement>) => {
    const newAnimDuration = parseInt(event.target.value, 10);

    setAnimDuration(newAnimDuration);

    const carouselList = document.querySelector('.Carousel__list');
    const carouselListCopy = carouselList as HTMLElement;

    carouselListCopy.style.transition = `transform ${newAnimDuration}ms ease-in`;
  };

  return (
    <div className="Carousel">
      <div className="Carousel__container">
        <ul className="Carousel__list" ref={carouselListRef}>
          {img.map((currImg, index) => (
            <li
              key={`${index + 1}`}
              className="Carousel__item"
            >
              <img
                src={currImg}
                alt={`${index}`}
                className="Carousel__img"
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
          Images in the carousel
          <input
            type="number"
            value={frameWight}
            min={1}
            max={5}
            className="Carousel__input"
            placeholder="Enter numbers in px"
            onChange={handleFarmeWidthChange}
          />
        </label>
        <label className="Carousel__label">
          Step
          <input
            type="number"
            value={step}
            min={1}
            max={img.length - 1}
            className="Carousel__input"
            placeholder="Enter numbers"
            onChange={handleStepChange}
          />
        </label>
        <label className="Carousel__label">
          Animation duration
          <input
            type="number"
            value={animDuration}
            step={500}
            min={500}
            max={2500}
            className="Carousel__input"
            placeholder="Enter numbers is seconds"
            onChange={handleAnimDurationChange}
          />
        </label>
      </div>
    </div>
  );
};

export default Carousel;
